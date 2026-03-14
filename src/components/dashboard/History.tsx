import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Trash2, Calendar, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HistoryItem {
  id: number;
  originalFileName: string;
  originalFileType: string;
  processedImageUrl: string;
  originalPreview: string;
  timestamp: string;
}

const History = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<HistoryItem | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const storedHistory = JSON.parse(localStorage.getItem("bgRemovalHistory") || "[]");
    setHistory(storedHistory);
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

      toast({
        title: "Success!",
        description: "Image downloaded successfully.",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to download image";
      toast({
        title: "Download Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const deleteItem = (id: number) => {
    const updatedHistory = history.filter((item) => item.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem("bgRemovalHistory", JSON.stringify(updatedHistory));
    setSelectedImage(null);
    toast({
      title: "Deleted",
      description: "Image removed from history.",
    });
  };

  const clearAllHistory = () => {
    if (window.confirm("Are you sure you want to delete all history?")) {
      setHistory([]);
      localStorage.removeItem("bgRemovalHistory");
      setSelectedImage(null);
      toast({
        title: "Cleared",
        description: "All history has been cleared.",
      });
    }
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (history.length === 0) {
    return (
      <div className="glass-card rounded-lg p-12 text-center">
        <Image className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No History Yet</h3>
        <p className="text-muted-foreground">
          Your processed images will appear here after you remove backgrounds.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* History List */}
      <div className="lg:col-span-1">
        <div className="glass-card rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              History ({history.length})
            </h3>
            {history.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllHistory}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {history.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  selectedImage?.id === item.id
                    ? "bg-primary/20 border border-primary"
                    : "bg-muted/30 border border-transparent hover:bg-muted/50"
                }`}
              >
                <p className="text-sm font-medium text-foreground truncate">
                  {item.originalFileName}
                </p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(item.timestamp)}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Image Viewer */}
      <div className="lg:col-span-2">
        {selectedImage ? (
          <div className="glass-card rounded-lg p-6">
            <div className="mb-4">
              <p className="text-xs text-muted-foreground mb-1">File Name</p>
              <p className="text-sm font-medium text-foreground">
                {selectedImage.originalFileName}
              </p>
            </div>

            <div className="mb-4">
              <p className="text-xs text-muted-foreground mb-1">Processed Date</p>
              <p className="text-sm font-medium text-foreground">
                {formatDate(selectedImage.timestamp)}
              </p>
            </div>

            <div className="mb-4">
              <p className="text-xs text-muted-foreground mb-2">Processed Image</p>
              <div className="rounded-lg overflow-hidden bg-muted/30 flex items-center justify-center max-h-96 border border-border/50">
                <img
                  src={selectedImage.processedImageUrl}
                  alt="Processed"
                  className="max-h-96 object-contain"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="gradient"
                className="flex-1"
                onClick={() =>
                  downloadImage(
                    selectedImage.processedImageUrl,
                    selectedImage.originalFileName
                  )
                }
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button
                variant="destructive"
                onClick={() => deleteItem(selectedImage.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="glass-card rounded-lg p-12 text-center">
            <Image className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground">
              Select an image from the history to view details
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
