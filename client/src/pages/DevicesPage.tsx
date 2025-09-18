import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Smartphone, 
  Tablet, 
  Laptop, 
  Watch, 
  Plus, 
  Wifi, 
  WifiOff,
  Battery,
  Settings
} from 'lucide-react';

interface Device {
  id: string;
  name: string;
  type: 'phone' | 'tablet' | 'laptop' | 'watch';
  isConnected: boolean;
  batteryLevel?: number;
  lastSync: string;
  appVersion: string;
}

export default function DevicesPage() {
  const [devices] = useState<Device[]>([
    {
      id: 'phone-1',
      name: 'iPhone 15 Pro',
      type: 'phone',
      isConnected: true,
      batteryLevel: 85,
      lastSync: '2 minutes ago',
      appVersion: '1.2.0'
    },
    {
      id: 'tablet-1', 
      name: 'iPad Air',
      type: 'tablet',
      isConnected: false,
      batteryLevel: 42,
      lastSync: '1 hour ago',
      appVersion: '1.1.5'
    },
    {
      id: 'watch-1',
      name: 'Apple Watch Series 9',
      type: 'watch',
      isConnected: true,
      batteryLevel: 67,
      lastSync: '5 minutes ago',
      appVersion: '1.0.8'
    }
  ]);

  const getDeviceIcon = (type: Device['type']) => {
    switch (type) {
      case 'phone': return Smartphone;
      case 'tablet': return Tablet;
      case 'laptop': return Laptop;
      case 'watch': return Watch;
      default: return Smartphone;
    }
  };

  const getDeviceTypeLabel = (type: Device['type']) => {
    switch (type) {
      case 'phone': return 'Phone';
      case 'tablet': return 'Tablet';
      case 'laptop': return 'Laptop';
      case 'watch': return 'Watch';
      default: return 'Device';
    }
  };

  return (
    <div className="space-y-4 p-4 pb-20" data-testid="devices-page">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">My Devices</h1>
        <Button size="sm" data-testid="button-add-device">
          <Plus className="h-4 w-4 mr-2" />
          Add Device
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
                        {getDeviceTypeLabel(device.type)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {device.isConnected ? (
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 text-xs">
                        <Wifi className="h-3 w-3 mr-1" />
                        Connected
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-xs">
                        <WifiOff className="h-3 w-3 mr-1" />
                        Offline
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0 space-y-3">
                {/* Device Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Last Sync</p>
                    <p className="font-medium" data-testid={`text-last-sync-${device.id}`}>
                      {device.lastSync}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">App Version</p>
                    <p className="font-medium" data-testid={`text-app-version-${device.id}`}>
                      {device.appVersion}
                    </p>
                  </div>
                </div>

                {/* Battery Level */}
                {device.batteryLevel && (
                  <div className="flex items-center gap-2">
                    <Battery className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Battery</span>
                        <span className="font-medium">{device.batteryLevel}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            device.batteryLevel > 50 ? 'bg-green-500' : 
                            device.batteryLevel > 20 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${device.batteryLevel}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1" data-testid={`button-sync-${device.id}`}>
                    <Wifi className="h-3 w-3 mr-1" />
                    Sync
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1" data-testid={`button-settings-${device.id}`}>
                    <Settings className="h-3 w-3 mr-1" />
                    Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Device Management Info */}
      <Card className="bg-primary/5 border-primary/20 mt-6">
        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="font-medium text-sm">📱 Device Management</h3>
            <p className="text-xs text-muted-foreground">
              Manage all your connected skincare tracking devices in one place
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Automatic sync across all devices</p>
              <p>• Secure data synchronization</p>
              <p>• Offline mode support</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}