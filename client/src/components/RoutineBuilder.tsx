import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Sun, Moon, Clock, MoreVertical } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface RoutineStep {
  id: string;
  productName: string;
  brand: string;
  order: number;
  category: 'cleanser' | 'toner' | 'serum' | 'moisturizer' | 'sunscreen' | 'treatment';
  image?: string;
}

interface RoutineBuilderProps {
  morningRoutine: RoutineStep[];
  eveningRoutine: RoutineStep[];
  onAddProduct: (period: 'morning' | 'evening') => void;
  onRemoveProduct: (period: 'morning' | 'evening', productId: string) => void;
}

const categoryColors = {
  cleanser: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
  toner: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
  serum: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  moisturizer: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
  sunscreen: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
  treatment: 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400',
};

export default function RoutineBuilder({
  morningRoutine,
  eveningRoutine,
  onAddProduct,
  onRemoveProduct
}: RoutineBuilderProps) {
  const [activeTab, setActiveTab] = useState<'morning' | 'evening'>('morning');

  const RoutineSteps = ({ 
    steps, 
    period 
  }: { 
    steps: RoutineStep[]; 
    period: 'morning' | 'evening' 
  }) => (
    <div className="space-y-3" data-testid={`routine-${period}`}>
      {steps.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex items-center justify-center py-8">
            <div className="text-center space-y-2">
              <div className="text-muted-foreground">No products in your {period} routine</div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onAddProduct(period)}
                data-testid={`button-add-first-product-${period}`}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add First Product
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {steps.map((step, index) => (
            <Card key={step.id} className="relative" data-testid={`routine-step-${step.id}`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                    {index + 1}
                  </div>
                  
                  {step.image && (
                    <div className="h-10 w-10 rounded-md overflow-hidden bg-muted">
                      <img 
                        src={step.image} 
                        alt={step.productName}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm truncate" data-testid={`text-product-name-${step.id}`}>
                        {step.productName}
                      </h4>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${categoryColors[step.category]}`}
                      >
                        {step.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {step.brand}
                    </p>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => onRemoveProduct(period, step.id)}
                    data-testid={`button-remove-product-${step.id}`}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => onAddProduct(period)}
            data-testid={`button-add-product-${period}`}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </>
      )}
    </div>
  );

  return (
    <div className="space-y-4" data-testid="routine-builder">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">My Routine</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Estimated: 15 min</span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'morning' | 'evening')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="morning" className="flex items-center gap-2" data-testid="tab-morning">
            <Sun className="h-4 w-4" />
            Morning ({morningRoutine.length})
          </TabsTrigger>
          <TabsTrigger value="evening" className="flex items-center gap-2" data-testid="tab-evening">
            <Moon className="h-4 w-4" />
            Evening ({eveningRoutine.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="morning" className="mt-4">
          <RoutineSteps steps={morningRoutine} period="morning" />
        </TabsContent>
        
        <TabsContent value="evening" className="mt-4">
          <RoutineSteps steps={eveningRoutine} period="evening" />
        </TabsContent>
      </Tabs>

      {(morningRoutine.length > 0 || eveningRoutine.length > 0) && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="space-y-2">
              <h3 className="font-medium text-sm">Routine Tips</h3>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Wait 5-10 minutes between each step for better absorption</li>
                <li>• Always apply sunscreen as the last step in your morning routine</li>
                <li>• Start with thinnest to thickest consistency</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}