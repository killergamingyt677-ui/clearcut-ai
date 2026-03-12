import { useState, useCallback } from "react";
import { Upload, Image, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const MAX_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const UploadZone = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  const clear = () => { setFile(null); setPreview(null); setError(null); };

  if (preview && file) {
    return (
      <div className="glass-card rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Image className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground truncate max-w-xs">{file.name}</span>
            <span className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(1)} MB</span>
          </div>
          <Button variant="ghost" size="icon" onClick={clear}><X className="w-4 h-4" /></Button>
        </div>
        <div className="rounded-lg overflow-hidden bg-muted/30 flex items-center justify-center max-h-96">
          <img src={preview} alt="Preview" className="max-h-96 object-contain" />
        </div>
        <div className="mt-4 flex gap-3">
          <Button variant="gradient" className="flex-1">Remove Background</Button>
          <Button variant="outline" onClick={clear}>Upload Another</Button>
        </div>
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
