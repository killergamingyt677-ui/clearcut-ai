import { useState, useCallback } from "react";
import { Upload, Image, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const MAX_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const WEBHOOK_URL = "https://pankaj-bot.app.n8n.cloud/webhook/background_remover";

const UploadZone = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const validateFile = (f: File): string | null => {
    if (!ALLOWED_TYPES.includes(f.type)) return "Only JPG, PNG, and WEBP files are supported.";
    if (f.size > MAX_SIZE) return "File size must be under 10 MB.";
    return null;
  };

  const handleFile = useCallback((f: File) => {
    const err = validateFile(f);
    if (err) { setError(err); return; }
    setError(null);
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  }, [handleFile]);

  const handleRemoveBackground = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      // Convert file to binary format (ArrayBuffer)
      const arrayBuffer = await file.arrayBuffer();
      
      // Create FormData and append the binary data
      const formData = new FormData();
      formData.append("image", file);
      formData.append("fileName", file.name);
      formData.append("fileType", file.type);
      
      // Send the request with binary data
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const result = await response.json();
      
      // Handle the n8n response format: { "url": "..." }
      if (!result.url) {
        throw new Error("Invalid response format: missing URL");
      }

      // Store the processed image URL
      setProcessedImageUrl(result.url);
      
      // Store in local storage
      const historyItem = {
        id: Date.now(),
        originalFileName: file.name,
        originalFileType: file.type,
        processedImageUrl: result.url,
        originalPreview: preview,
        timestamp: new Date().toISOString(),
      };
      
      const existingHistory = JSON.parse(localStorage.getItem("bgRemovalHistory") || "[]");
      existingHistory.unshift(historyItem);
      localStorage.setItem("bgRemovalHistory", JSON.stringify(existingHistory));
      
      toast({
        title: "Success!",
        description: "Background removed successfully!",
      });

      console.log("Background removal response:", result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to process image";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = async (url: string, fileName: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to download image");
      
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `removed-bg-${fileName}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to download image";
      toast({
        title: "Download Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const clear = () => { 
    setFile(null); 
    setPreview(null); 
    setError(null);
    setProcessedImageUrl(null);
  };

  if (preview && file) {
    return (
      <div className="glass-card rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Image className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground truncate max-w-xs">{file.name}</span>
            <span className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(1)} MB</span>
          </div>
          <Button variant="ghost" size="icon" onClick={clear} disabled={isProcessing}><X className="w-4 h-4" /></Button>
        </div>
        
        {/* Display processed image if available */}
        {processedImageUrl ? (
          <div>
            <div className="mb-4">
              <p className="text-xs text-muted-foreground mb-2">Processed Image:</p>
              <div className="rounded-lg overflow-hidden bg-muted/30 flex items-center justify-center max-h-96">
                <img src={processedImageUrl} alt="Processed" className="max-h-96 object-contain" />
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => downloadImage(processedImageUrl, file.name)}
              >
                Download Image
              </Button>
              <Button variant="outline" onClick={clear}>Upload Another</Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="rounded-lg overflow-hidden bg-muted/30 flex items-center justify-center max-h-96">
              <img src={preview} alt="Preview" className="max-h-96 object-contain" />
            </div>
            <div className="mt-4 flex gap-3">
              <Button 
                variant="gradient" 
                className="flex-1"
                onClick={handleRemoveBackground}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Remove Background"
                )}
              </Button>
              <Button variant="outline" onClick={clear} disabled={isProcessing}>Upload Another</Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-input")?.click()}
        className={`cursor-pointer rounded-lg border-2 border-dashed p-16 text-center transition-all duration-200 ${
          dragActive ? "border-primary bg-primary/5 neon-border" : "border-border/50 hover:border-primary/50 hover:bg-primary/5"
        }`}
      >
        <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-foreground font-medium mb-1">Drop your image here or click to browse</p>
        <p className="text-sm text-muted-foreground">Supports JPG, PNG, WEBP • Max 10 MB</p>
        <input id="file-input" type="file" accept=".jpg,.jpeg,.png,.webp" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
      </div>
      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default UploadZone;
