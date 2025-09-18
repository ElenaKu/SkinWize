import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, MoreVertical, Clock, Target, Sun, Moon, Sunrise, CheckCircle2, TrendingUp, Star } from 'lucide-react';
import SafetyIndicator, { SafetyLevel } from './SafetyIndicator';

type UsageTime = 'morning' | 'evening' | 'both' | 'anytime';

interface ProductSuggestion {
  name: string;
  brand: string;
  improvementReason: string;
  safetyScore: number;
  priceRange: string;
}

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
  isInUse: boolean;
  currentUsage?: 'morning' | 'evening' | 'both';
  recommendedUsage: UsageTime;
  suggestion?: ProductSuggestion;
  onViewDetails: (id: string) => void;
  onConsiderSuggestion?: (productId: string) => void;
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
  isInUse,
  currentUsage,
  recommendedUsage,
  suggestion,
  onViewDetails,
  onConsiderSuggestion,
  scanDate
}: ProductCardProps) {
  const getUsageIcon = (usage: UsageTime) => {
    switch (usage) {
      case 'morning': return Sun;
      case 'evening': return Moon;
      case 'both': return Sunrise;
      case 'anytime': return Clock;
    }
  };

  const getUsageLabel = (usage: UsageTime) => {
    switch (usage) {
      case 'morning': return 'Morning';
      case 'evening': return 'Evening';
      case 'both': return 'AM/PM';
      case 'anytime': return 'Anytime';
    }
  };
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

        {/* Usage Status and Timing */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isInUse ? (
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 text-xs">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  In Use
                </Badge>
              ) : (
                <Badge variant="outline" className="text-xs">
                  Not in Use
                </Badge>
              )}
              
              {isInUse && currentUsage && (
                <Badge variant="secondary" className="text-xs">
                  {(() => {
                    const Icon = getUsageIcon(currentUsage);
                    return (
                      <>
                        <Icon className="h-3 w-3 mr-1" />
                        {getUsageLabel(currentUsage)}
                      </>
                    );
                  })()}
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">Recommended:</span>
            <Badge variant="outline" className="text-xs">
              {(() => {
                const Icon = getUsageIcon(recommendedUsage);
                return (
                  <>
                    <Icon className="h-3 w-3 mr-1" />
                    {getUsageLabel(recommendedUsage)}
                  </>
                );
              })()}
            </Badge>
          </div>
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
        
        {/* Suggestion Box */}
        {suggestion && (
          <div className="bg-primary/5 border border-primary/20 rounded-md p-3 space-y-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                Better Alternative
              </Badge>
              <div className="text-xs text-muted-foreground">
                Score: {suggestion.safetyScore}/10
              </div>
            </div>
            
            <div className="space-y-1">
              <h4 className="font-medium text-sm" data-testid={`text-suggestion-${id}`}>
                {suggestion.name}
              </h4>
              <p className="text-xs text-muted-foreground">{suggestion.brand}</p>
            </div>
            
            <div className="text-xs">
              <p className="text-muted-foreground mb-1">Why it's better:</p>
              <p>{suggestion.improvementReason}</p>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">{suggestion.priceRange}</span>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onConsiderSuggestion?.(id)}
                data-testid={`button-consider-suggestion-${id}`}
              >
                <Star className="h-3 w-3 mr-1" />
                Consider
              </Button>
            </div>
          </div>
        )}
        
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