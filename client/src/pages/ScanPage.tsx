import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Upload, Sparkles } from 'lucide-react';
import CameraScanner from '@/components/CameraScanner';

export default function ScanPage() {
  const [showScanner, setShowScanner] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageCapture = (file: File) => {
    console.log('Analyzing image:', file.name);
    setIsAnalyzing(true);
    setShowScanner(false);
    
    // //todo: remove mock functionality - replace with real AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      console.log('Analysis complete');
    }, 3000);
  };

  return (
    <div className="space-y-6 p-4 pb-20" data-testid="scan-page">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Scan Your Products</h1>
        <p className="text-muted-foreground">
          Get instant ingredient analysis and safety ratings
        </p>
      </div>

      {/* Quick Scan Card */}
      <Card className="relative overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-primary" />
            Quick Scan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Point your camera at the ingredient list or upload a photo for instant analysis
          </p>
          <Button 
            onClick={() => setShowScanner(true)}
            className="w-full"
            size="lg"
            data-testid="button-start-scan"
          >
            <Camera className="h-4 w-4 mr-2" />
            Start Scanning
          </Button>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="font-medium">AI-Powered Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced ingredient recognition and safety scoring
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0">
                <Upload className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="space-y-1">
                <h3 className="font-medium">Multiple Input Methods</h3>
                <p className="text-sm text-muted-foreground">
                  Camera capture, photo upload, or manual ingredient entry
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Scans */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Scans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Camera className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No recent scans</p>
            <p className="text-sm">Your scanned products will appear here</p>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Loading */}
      {isAnalyzing && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <Card className="p-6 text-center space-y-4">
            <div className="h-12 w-12 mx-auto rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            <div>
              <h3 className="font-medium">Analyzing Ingredients</h3>
              <p className="text-sm text-muted-foreground">This may take a few seconds...</p>
            </div>
          </Card>
        </div>
      )}

      {/* Scanner Modal */}
      {showScanner && (
        <CameraScanner 
          onImageCapture={handleImageCapture}
          onClose={() => setShowScanner(false)}
        />
      )}
    </div>
  );
}