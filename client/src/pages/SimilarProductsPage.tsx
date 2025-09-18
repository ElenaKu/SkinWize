import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Star, Calendar, TrendingUp, Filter, ExternalLink } from 'lucide-react';
import { ProductSuggestionService } from '../../../server/services/productSuggestionService';
import { MarketProduct } from '../../../shared/types';

interface SimilarProductsPageProps {
  productType?: string;
  productId?: string;
}

type SortOption = 'releaseDate' | 'efficiency' | 'safetyScore' | 'name';
type SortDirection = 'asc' | 'desc';

export default function SimilarProductsPage({ productType, productId }: SimilarProductsPageProps) {
  const [location, setLocation] = useLocation();
  const [products, setProducts] = useState<MarketProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<MarketProduct[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('efficiency');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [loading, setLoading] = useState(true);

  // Parse URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const typeFromUrl = urlParams.get('type') || productType;
    const idFromUrl = urlParams.get('productId') || productId;
    
    if (typeFromUrl) {
      loadSimilarProducts(typeFromUrl);
    }
  }, [productType, productId]);

  const loadSimilarProducts = (type: string) => {
    setLoading(true);
    try {
      // Get all products from the comprehensive market database
      const allProducts = ProductSuggestionService.searchMarketProducts('');
      
      const similarProducts = allProducts.filter(product => {
        // Exact match
        if (product.productType === type) return true;
        
        // For cleansers, include all cleanser types
        if ((type.toLowerCase().includes('cleanser') || product.productType.toLowerCase().includes('cleanser')) &&
            (type.toLowerCase().includes('cleanser') && product.productType.toLowerCase().includes('cleanser'))) {
          return true;
        }
        
        // For serums, include all serum types
        if ((type.toLowerCase().includes('serum') || product.productType.toLowerCase().includes('serum')) &&
            (type.toLowerCase().includes('serum') && product.productType.toLowerCase().includes('serum'))) {
          return true;
        }
        
        // Partial match (both directions) for other product types
        if (product.productType.toLowerCase().includes(type.toLowerCase()) ||
            type.toLowerCase().includes(product.productType.toLowerCase())) {
          return true;
        }
        
        return false;
      });
      
      setProducts(similarProducts);
      setFilteredProducts(similarProducts);
    } catch (error) {
      console.error('Error loading similar products:', error);
    } finally {
      setLoading(false);
    }
  };

  const sortProducts = (products: MarketProduct[], sortBy: SortOption, direction: SortDirection): MarketProduct[] => {
    return [...products].sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortBy) {
        case 'releaseDate':
          aValue = new Date(a.releaseDate);
          bValue = new Date(b.releaseDate);
          break;
        case 'efficiency':
          aValue = a.efficiency;
          bValue = b.efficiency;
          break;
        case 'safetyScore':
          aValue = a.safetyScore;
          bValue = b.safetyScore;
          break;
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        default:
          return 0;
      }

      if (direction === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });
  };

  useEffect(() => {
    const sorted = sortProducts(products, sortBy, sortDirection);
    setFilteredProducts(sorted);
  }, [products, sortBy, sortDirection]);

  const handleSortChange = (value: string) => {
    const [newSortBy, newDirection] = value.split('-') as [SortOption, SortDirection];
    setSortBy(newSortBy);
    setSortDirection(newDirection);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 9) return 'text-green-600 dark:text-green-400';
    if (efficiency >= 7) return 'text-blue-600 dark:text-blue-400';
    if (efficiency >= 5) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getSafetyColor = (score: number) => {
    if (score >= 9) return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    if (score >= 7) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    if (score >= 5) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
    return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
  };

  if (loading) {
    return (
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setLocation('/products')}
            data-testid="button-back-to-products"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-muted-foreground">Loading similar products...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setLocation('/products')}
          data-testid="button-back-to-products"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Similar Products</h1>
            <p className="text-muted-foreground">
              {filteredProducts.length} products found
            </p>
          </div>
        </div>

        {/* Sorting Controls */}
        <div className="flex items-center gap-3">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Select value={`${sortBy}-${sortDirection}`} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[200px]" data-testid="select-sort-option">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="efficiency-desc">Efficiency (High to Low)</SelectItem>
              <SelectItem value="efficiency-asc">Efficiency (Low to High)</SelectItem>
              <SelectItem value="releaseDate-desc">Release Date (Newest)</SelectItem>
              <SelectItem value="releaseDate-asc">Release Date (Oldest)</SelectItem>
              <SelectItem value="safetyScore-desc">Safety Score (High to Low)</SelectItem>
              <SelectItem value="safetyScore-asc">Safety Score (Low to High)</SelectItem>
              <SelectItem value="name-asc">Name (A to Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z to A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="hover-elevate flex flex-col h-full" data-testid={`card-product-${product.id}`}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-lg" data-testid={`text-product-name-${product.id}`}>
                    {product.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground" data-testid={`text-brand-${product.id}`}>
                    {product.brand}
                  </p>
                </div>
                <Badge className={getSafetyColor(product.safetyScore)} data-testid={`badge-safety-${product.id}`}>
                  {product.safetyScore}/10
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4 flex-1 flex flex-col">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Efficiency</span>
                  </div>
                  <div className={`font-semibold ${getEfficiencyColor(product.efficiency)}`} data-testid={`text-efficiency-${product.id}`}>
                    {product.efficiency}/10
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Released</span>
                  </div>
                  <div className="text-sm font-medium" data-testid={`text-release-date-${product.id}`}>
                    {formatDate(product.releaseDate)}
                  </div>
                </div>
              </div>

              {/* Key Ingredients */}
              <div className="space-y-2">
                <span className="text-xs text-muted-foreground">Key Ingredients</span>
                <div className="flex flex-wrap gap-1">
                  {product.keyIngredients.slice(0, 3).map((ingredient, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="text-xs"
                      data-testid={`badge-ingredient-${product.id}-${index}`}
                    >
                      {ingredient}
                    </Badge>
                  ))}
                  {product.keyIngredients.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{product.keyIngredients.length - 3}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Target Concerns */}
              <div className="space-y-2 flex-1">
                <span className="text-xs text-muted-foreground">Targets</span>
                <div className="flex flex-wrap gap-1">
                  {product.targetConcerns.map((concern, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="text-xs"
                      data-testid={`badge-concern-${product.id}-${index}`}
                    >
                      {concern}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Consider Button */}
              <div className="flex justify-center pt-2 border-t mt-auto">
                <Button 
                  size="sm" 
                  variant="outline"
                  data-testid={`button-consider-${product.id}`}
                >
                  <Star className="h-3 w-3 mr-1" />
                  Consider
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No similar products found.</p>
        </div>
      )}
    </div>
  );
}