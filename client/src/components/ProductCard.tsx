import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, MoreVertical, Clock, Target } from 'lucide-react';
import SafetyIndicator, { SafetyLevel } from './SafetyIndicator';

interface ProductCardProps {
  id: string;
  name: string;
  brand: string;
  image: string;
  safetyLevel: SafetyLevel;
  safetyScore: number;
  keyIngredients: string[];
  skinConcerns: string[];
  usageDuration: string;
  productType: string;
  compatibilityScore?: number;
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
  keyIngredients,
  skinConcerns,
  usageDuration,
  productType,
  compatibilityScore,
  onViewDetails,
  scanDate
}: ProductCardProps) {
  return (
    <Card className="hover-elevate cursor-pointer transition-all duration-200" data-testid={`card-product-${id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex gap-3 flex-1">
            <div className="h-12 w-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
              <img 
                src={image} 
                alt={`${productType} with ${keyIngredients?.join(', ') || 'ingredients'}`}
                className="h-full w-full object-cover"
                data-testid={`img-product-${id}`}
              />
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              {/* Key Ingredients - Most Prominent */}
              <div className="flex flex-wrap gap-1 mb-1">
                {keyIngredients.slice(0, 3).map((ingredient, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="text-xs bg-primary/10 text-primary border-primary/20"
                    data-testid={`badge-ingredient-${id}-${index}`}
                  >
                    {ingredient}
                  </Badge>
                ))}
                {keyIngredients.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{keyIngredients.length - 3}
                  </Badge>
                )}
              </div>
              
              {/* Product Type & Brand - Secondary */}
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-sm text-muted-foreground truncate" data-testid={`text-product-type-${id}`}>
                  {productType}
                </h3>
                <span className="text-xs text-muted-foreground">•</span>
                <p className="text-xs text-muted-foreground truncate" data-testid={`text-brand-${id}`}>
                  {brand}
                </p>
              </div>
              
              {/* Usage Duration */}
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span data-testid={`text-usage-duration-${id}`}>Using for {usageDuration}</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0" data-testid={`button-menu-${id}`}>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-3">
        {/* Safety & Compatibility */}
        <div className="flex items-center justify-between">
          <SafetyIndicator 
            level={safetyLevel} 
            score={safetyScore} 
            size="sm"
          />
          {compatibilityScore && (
            <div className="text-xs text-muted-foreground">
              Compatibility: {compatibilityScore}%
            </div>
          )}
        </div>
        
        {/* Skin Concerns */}
        <div className="space-y-1">
          <div className="flex items-center gap-1">
            <Target className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Targets:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {skinConcerns.slice(0, 3).map((concern, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs"
                data-testid={`badge-concern-${id}-${index}`}
              >
                {concern}
              </Badge>
            ))}
            {skinConcerns.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{skinConcerns.length - 3}
              </Badge>
            )}
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