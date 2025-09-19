import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Sparkles, 
  Heart, 
  Sun, 
  Plus, 
  Clock,
  Lightbulb,
  Waves,
  Settings,
  Star
} from 'lucide-react';

interface CosmeticDevice {
  id: string;
  name: string;
  brand: string;
  type: 'cleansing' | 'microcurrent' | 'massage' | 'led-therapy';
  isOwned: boolean;
  frequency: string;
  duration: string;
  benefits: string[];
  compatibleProducts: string[];
  priceRange: string;
  description: string;
}

export default function DevicesPage() {
  const [devices] = useState<CosmeticDevice[]>([
    {
      id: 'foreo-luna-4',
      name: 'FOREO LUNA 4',
      brand: 'FOREO',
      type: 'cleansing',
      isOwned: true,
      frequency: 'Daily (normal skin) • 2-3x/week (sensitive)',
      duration: '1 minute',
      benefits: ['Deep pore cleansing', 'Removes 99% of impurities', 'Enhances product absorption'],
      compatibleProducts: ['Gentle cleansers', 'Gel cleansers', 'Serums', 'Moisturizers'],
      priceRange: '$199-299',
      description: 'Silicone facial cleansing device with T-Sonic pulsations for gentle yet effective cleansing.'
    },
    {
      id: 'nuface-trinity',
      name: 'NuFACE Trinity',
      brand: 'NuFACE',
      type: 'microcurrent',
      isOwned: false,
      frequency: '5x/week (initial 60-90 days) • 2-3x/week (maintenance)',
      duration: '5-20 minutes',
      benefits: ['Facial contouring', 'Lifts and tones', 'Reduces fine lines'],
      compatibleProducts: ['Conductive gel/activator', 'Hyaluronic acid serums', 'Peptide serums'],
      priceRange: '$339-399',
      description: 'FDA-cleared microcurrent facial device that sends gentle electrical currents to facial muscles.'
    },
    {
      id: 'gua-sha-stone',
      name: 'Rose Quartz Gua Sha',
      brand: 'Various',
      type: 'massage',
      isOwned: true,
      frequency: '2-3x/week optimal • Daily (advanced)',
      duration: '5-15 minutes',
      benefits: ['Lymphatic drainage', 'Reduces puffiness', 'Improves circulation'],
      compatibleProducts: ['Facial oils (jojoba, rosehip)', 'Hydrating serums', 'Face balms'],
      priceRange: '$15-50',
      description: 'Traditional Chinese healing tool for facial massage and lymphatic drainage.'
    },
    {
      id: 'led-mask',
      name: 'Dr. Dennis Gross SpectraLite',
      brand: 'Dr. Dennis Gross',
      type: 'led-therapy',
      isOwned: false,
      frequency: '3-5x/week • 2-3x/week (sensitive skin)',
      duration: '3-20 minutes',
      benefits: ['Anti-aging (red light)', 'Acne treatment (blue light)', 'Collagen production'],
      compatibleProducts: ['Hyaluronic acid serums', 'Vitamin C (morning)', 'Moisturizers (avoid retinoids same day)'],
      priceRange: '$435-500',
      description: 'FDA-cleared LED light therapy mask combining red and blue light for comprehensive skin treatment.'
    }
  ]);

  const getDeviceIcon = (type: CosmeticDevice['type']) => {
    switch (type) {
      case 'cleansing': return Sparkles;
      case 'microcurrent': return Zap;
      case 'massage': return Heart;
      case 'led-therapy': return Lightbulb;
      default: return Sparkles;
    }
  };

  const getDeviceTypeLabel = (type: CosmeticDevice['type']) => {
    switch (type) {
      case 'cleansing': return 'Facial Cleansing';
      case 'microcurrent': return 'Microcurrent';
      case 'massage': return 'Facial Massage';
      case 'led-therapy': return 'LED Light Therapy';
      default: return 'Cosmetic Device';
    }
  };

  const getDeviceTypeColor = (type: CosmeticDevice['type']) => {
    switch (type) {
      case 'cleansing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'microcurrent': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'massage': return 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400';
      case 'led-therapy': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-4 p-4 pb-20" data-testid="devices-page">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Cosmetic Devices</h1>
          <p className="text-sm text-muted-foreground mt-1">Professional skincare tools for at-home use</p>
        </div>
        <Button size="sm" data-testid="button-add-device">
          <Plus className="h-4 w-4 mr-2" />
          Explore Devices
        </Button>
      </div>

      {/* Devices List */}
      <div className="space-y-3">
        {devices.map((device) => {
          const DeviceIcon = getDeviceIcon(device.type);
          
          return (
            <Card key={device.id} className="hover-elevate cursor-pointer transition-all duration-200" data-testid={`card-device-${device.id}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <DeviceIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base" data-testid={`text-device-name-${device.id}`}>
                        {device.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {device.brand} • {device.priceRange}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {device.isOwned ? (
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 text-xs">
                        <Star className="h-3 w-3 mr-1" />
                        Owned
                      </Badge>
                    ) : (
                      <Badge className={`text-xs ${getDeviceTypeColor(device.type)}`}>
                        {getDeviceTypeLabel(device.type)}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0 space-y-4">
                {/* Description */}
                <p className="text-sm text-muted-foreground">{device.description}</p>

                {/* Usage Information */}
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <span className="text-muted-foreground">Frequency: </span>
                      <span className="font-medium">{device.frequency}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <span className="text-muted-foreground">Duration: </span>
                      <span className="font-medium">{device.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="font-medium text-sm mb-2">Key Benefits:</h4>
                  <div className="flex flex-wrap gap-1">
                    {device.benefits.map((benefit, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Compatible Products */}
                <div>
                  <h4 className="font-medium text-sm mb-2">Compatible Products:</h4>
                  <div className="text-sm text-muted-foreground">
                    {device.compatibleProducts.join(' • ')}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  {device.isOwned ? (
                    <>
                      <Button variant="outline" size="sm" className="flex-1" data-testid={`button-usage-${device.id}`}>
                        <Clock className="h-3 w-3 mr-1" />
                        Usage Guide
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1" data-testid={`button-products-${device.id}`}>
                        <Sparkles className="h-3 w-3 mr-1" />
                        Find Products
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" size="sm" className="flex-1" data-testid={`button-learn-${device.id}`}>
                        <Lightbulb className="h-3 w-3 mr-1" />
                        Learn More
                      </Button>
                      <Button size="sm" className="flex-1" data-testid={`button-shop-${device.id}`}>
                        <Plus className="h-3 w-3 mr-1" />
                        Shop Now
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Usage Tips */}
      <Card className="bg-primary/5 border-primary/20 mt-6">
        <CardContent className="p-4">
          <div className="space-y-3">
            <h3 className="font-medium text-sm flex items-center gap-2">
              <Waves className="h-4 w-4" />
              Professional Usage Tips
            </h3>
            <div className="text-xs text-muted-foreground space-y-2">
              <div>
                <p className="font-medium text-foreground">Start Gradually:</p>
                <p>Begin with lower frequencies to assess skin tolerance, then build up to recommended usage.</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Product Compatibility:</p>
                <p>Always use appropriate conductive gels, oils, or serums as recommended for each device type.</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Consistency is Key:</p>
                <p>Regular use according to guidelines provides better results than occasional intensive sessions.</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Clean After Use:</p>
                <p>Maintain hygiene by cleaning devices with alcohol wipes or mild soap after each session.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}