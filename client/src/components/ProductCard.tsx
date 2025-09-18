import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, MoreVertical } from 'lucide-react';
import SafetyIndicator, { SafetyLevel } from './SafetyIndicator';

interface ProductCardProps {
  id: string;
  name: string;
  brand: string;
  image: string;
  safetyLevel: SafetyLevel;
  safetyScore: number;
  ingredientCount: number;
  flaggedIngredients: number;
  onViewDetails: (id: string) => void;
  scanDate?: string;
}

export default function ProductCard({
  id,
  name,
  brand,
  image,
  safetyLevel,
  safetyScore,
  ingredientCount,
  flaggedIngredients,
  onViewDetails,
  scanDate
}: ProductCardProps) {
  return (
    <Card className="hover-elevate cursor-pointer transition-all duration-200" data-testid={`card-product-${id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <div className="h-12 w-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
              <img 
                src={image} 
                alt={`${brand} ${name}`}
                className="h-full w-full object-cover"
                data-testid={`img-product-${id}`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm truncate" data-testid={`text-product-name-${id}`}>
                {name}
              </h3>
              <p className="text-xs text-muted-foreground truncate" data-testid={`text-brand-${id}`}>
                {brand}
              </p>
              {scanDate && (
                <p className="text-xs text-muted-foreground">
                  Scanned {scanDate}
                </p>
              )}
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0" data-testid={`button-menu-${id}`}>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-3">
        <div className="flex items-center justify-between">
          <SafetyIndicator 
            level={safetyLevel} 
            score={safetyScore} 
            size="sm"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-muted-foreground">Ingredients</span>
            <p className="font-medium" data-testid={`text-ingredient-count-${id}`}>
              {ingredientCount} total
            </p>
          </div>
          <div>
            <span className="text-muted-foreground">Flagged</span>
            <p className={`font-medium ${flaggedIngredients > 0 ? 'text-destructive' : 'text-muted-foreground'}`} 
               data-testid={`text-flagged-count-${id}`}>
              {flaggedIngredients} items
            </p>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={() => onViewDetails(id)}
          data-testid={`button-view-details-${id}`}
        >
          <Eye className="h-3 w-3 mr-2" />
          View Analysis
        </Button>
      </CardContent>
    </Card>
  );
}