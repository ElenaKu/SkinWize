import { useState } from 'react';
import { Camera, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CameraScannerProps {
  onImageCapture: (file: File) => void;
  onClose?: () => void;
}

export default function CameraScanner({ onImageCapture, onClose }: CameraScannerProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageCapture(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageCapture(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 relative">
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4"
            onClick={onClose}
            data-testid="button-close-scanner"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <Camera className="h-12 w-12 text-primary mx-auto" />
            <h2 className="text-xl font-semibold">Scan Product</h2>
            <p className="text-muted-foreground text-sm">
              Take a photo or upload an image of your skincare product
            </p>
          </div>

          <div
            className={`border-2 border-dashed rounded-lg p-8 transition-colors ${
              isDragOver 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-primary/50'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            data-testid="dropzone-image-upload"
          >
            <div className="space-y-4">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Drag and drop an image here, or
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                  id="file-upload"
                  data-testid="input-file-upload"
                />
                <label htmlFor="file-upload">
                  <Button variant="outline" className="cursor-pointer" data-testid="button-choose-file">
                    Choose File
                  </Button>
                </label>
              </div>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            For best results, ensure the ingredient list is clearly visible
          </div>
        </div>
      </Card>
    </div>
  );
}