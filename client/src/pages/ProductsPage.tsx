import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Plus } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import IngredientAnalysis from '@/components/IngredientAnalysis';
import { SafetyLevel } from '@/components/SafetyIndicator';
import { ProductSuggestionService } from '../../../server/services/productSuggestionService';
import { MarketProduct, SuggestionCriteria } from '../../../shared/types';
import cleanserImage from '@assets/generated_images/skincare_cleanser_bottle_85916adc.png';
import serumImage from '@assets/generated_images/vitamin_C_serum_bottle_29f17b36.png';
import moisturizerImage from '@assets/generated_images/moisturizer_jar_product_1836a700.png';

interface ProductSuggestion {
  name: string;
  brand: string;
  improvementReason: string;
  safetyScore: number;
  priceRange: string;
}

interface ProductAlternatives {
  primary: ProductSuggestion;
  alternatives: ProductSuggestion[];
  totalCount: number;
}

interface Product {
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
  recommendedUsage: 'morning' | 'evening' | 'both' | 'anytime';
  suggestion?: ProductSuggestion;
  alternatives?: ProductAlternatives;
  scanDate: string;
}

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  // Generate comprehensive market alternatives for each product
  const generateProductAlternatives = (product: any) => {
    const criteria: SuggestionCriteria = {
      currentProductType: product.productType,
      currentIngredients: product.keyIngredients,
      skinConcerns: product.skinConcerns,
      currentSafetyScore: product.safetyScore
    };
    
    const marketSuggestions = ProductSuggestionService.getMarketSuggestions(criteria, 6); // Get up to 6 alternatives
    if (marketSuggestions.length > 0) {
      const primary = marketSuggestions[0];
      const alternatives = marketSuggestions.slice(1);
      
      return {
        primary: {
          name: primary.name,
          brand: primary.brand,
          improvementReason: primary.improvementReason,
          safetyScore: primary.safetyScore,
          priceRange: primary.priceRange
        },
        alternatives: alternatives.map(alt => ({
          name: alt.name,
          brand: alt.brand,
          improvementReason: alt.improvementReason,
          safetyScore: alt.safetyScore,
          priceRange: alt.priceRange
        })),
        totalCount: marketSuggestions.length
      };
    }
    return undefined;
  };

  // Enhanced product data with comprehensive market suggestions
  const mockProducts: Product[] = [
    {
      id: 'cleanser-001',
      name: 'Gentle Foaming Cleanser',
      brand: 'CeraVe',
      image: cleanserImage,
      safetyLevel: 'safe',
      safetyScore: 8,
      keyIngredients: ['Ceramides', 'Niacinamide', 'Hyaluronic Acid'],
      skinConcerns: ['Dryness', 'Barrier Repair', 'Hydration'],
      usageDuration: '3 months',
      productType: 'Gentle Cleanser',
      compatibilityScore: 95,
      isInUse: true,
      currentUsage: 'both',
      recommendedUsage: 'both',
      alternatives: generateProductAlternatives({
        productType: 'Gentle Cleanser',
        keyIngredients: ['Ceramides', 'Niacinamide', 'Hyaluronic Acid'],
        skinConcerns: ['Dryness', 'Barrier Repair', 'Hydration'],
        safetyScore: 8
      }),
      scanDate: '2 days ago'
    },
    {
      id: 'serum-001',
      name: 'Vitamin C Serum',
      brand: 'The Ordinary',
      image: serumImage,
      safetyLevel: 'moderate',
      safetyScore: 6,
      keyIngredients: ['L-Ascorbic Acid', 'Alpha Tocopherol'],
      skinConcerns: ['Dark Spots', 'Antioxidant Protection', 'Brightening'],
      usageDuration: '6 weeks',
      productType: 'Vitamin C Serum',
      compatibilityScore: 78,
      isInUse: true,
      currentUsage: 'morning',
      recommendedUsage: 'morning',
      alternatives: generateProductAlternatives({
        productType: 'Vitamin C Serum',
        keyIngredients: ['L-Ascorbic Acid', 'Alpha Tocopherol'],
        skinConcerns: ['Dark Spots', 'Antioxidant Protection', 'Brightening'],
        safetyScore: 6
      }),
      scanDate: '1 week ago'
    },
    {
      id: 'moisturizer-001',
      name: 'Daily Moisturizer',
      brand: 'Neutrogena',
      image: moisturizerImage,
      safetyLevel: 'safe',
      safetyScore: 7,
      keyIngredients: ['Dimethicone', 'Glycerin', 'Isopropyl Palmitate'],
      skinConcerns: ['Moisturization', 'Barrier Protection'],
      usageDuration: '2 months',
      productType: 'Daily Moisturizer',
      compatibilityScore: 85,
      isInUse: false,
      recommendedUsage: 'anytime',
      alternatives: generateProductAlternatives({
        productType: 'Daily Moisturizer',
        keyIngredients: ['Dimethicone', 'Glycerin', 'Isopropyl Palmitate'],
        skinConcerns: ['Moisturization', 'Barrier Protection'],
        safetyScore: 7
      }),
      scanDate: '3 days ago'
    }
  ];

  // //todo: remove mock functionality - replace with real ingredient data
  const mockIngredients = [
    {
      name: "Niacinamide",
      safetyLevel: 'safe' as const,
      score: 9,
      function: "Anti-inflammatory, Brightening",
      description: "A form of Vitamin B3 that helps reduce inflammation, regulate oil production, and improve skin texture."
    },
    {
      name: "Retinol",
      safetyLevel: 'moderate' as const,
      score: 6,
      function: "Anti-aging, Cell turnover",
      description: "A powerful anti-aging ingredient that promotes cell turnover and collagen production.",
      concerns: ["Photosensitivity", "Initial irritation"],
      alternatives: ["Bakuchiol", "Granactive Retinoid"]
    }
  ];

  const filteredProducts = mockProducts.filter(product =>
    product.keyIngredients.some(ingredient => 
      ingredient.toLowerCase().includes(searchTerm.toLowerCase())
    ) ||
    product.skinConcerns.some(concern => 
      concern.toLowerCase().includes(searchTerm.toLowerCase())
    ) ||
    product.productType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (productId: string) => {
    console.log('View details for:', productId);
    setSelectedProduct(productId);
  };

  const handleBackToProducts = () => {
    setSelectedProduct(null);
  };

  const handleConsiderSuggestion = (productId: string) => {
    console.log('Consider suggestion for product:', productId);
    // Here you could navigate to product details, add to wishlist, or open purchase links
  };

  // Get additional routine suggestions
  const routineSuggestions = ProductSuggestionService.getRoutineSuggestions(mockProducts);
  
  // Search comprehensive market database
  const handleMarketSearch = (query: string) => {
    if (query.length > 2) {
      const marketResults = ProductSuggestionService.searchMarketProducts(query);
      console.log('Market search results:', marketResults);
      // Could set state to show market search results
    }
  };

  if (selectedProduct) {
    const product = mockProducts.find(p => p.id === selectedProduct);
    if (product) {
      return (
        <IngredientAnalysis
          productName={product.name}
          productBrand={product.brand}
          ingredients={mockIngredients}
          overallScore={product.safetyScore}
          onBack={handleBackToProducts}
        />
      );
    }
  }

  return (
    <div className="space-y-4 p-4 pb-20" data-testid="products-page">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">My Products</h1>
        <Button size="sm" data-testid="button-add-product">
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products or market database..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleMarketSearch(e.target.value);
            }}
            className="pl-9"
            data-testid="input-search-products"
          />
        </div>
        <Button variant="outline" size="icon" data-testid="button-filter">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Market Insights */}
      {routineSuggestions.length > 0 && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="space-y-2">
              <h3 className="font-medium text-sm">🔍 Market Analysis</h3>
              <p className="text-xs text-muted-foreground">
                Based on comprehensive market data from EU CosIng, Cosmethics, and 15+ product databases
              </p>
              <p className="text-xs text-muted-foreground">
                Found {routineSuggestions.length} essential product{routineSuggestions.length !== 1 ? 's' : ''} missing from your routine
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Products Grid */}
      <div className="space-y-4">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground">
              {searchTerm ? 'No products found' : 'No products scanned yet'}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {searchTerm ? 'Try searching by ingredients or concerns' : 'Start scanning to build your product library'}
            </p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              brand={product.brand}
              image={product.image}
              safetyLevel={product.safetyLevel}
              safetyScore={product.safetyScore}
              keyIngredients={product.keyIngredients}
              skinConcerns={product.skinConcerns}
              usageDuration={product.usageDuration}
              productType={product.productType}
              compatibilityScore={product.compatibilityScore}
              isInUse={product.isInUse}
              currentUsage={product.currentUsage}
              recommendedUsage={product.recommendedUsage}
              alternatives={product.alternatives}
              scanDate={product.scanDate}
              onViewDetails={handleViewDetails}
              onConsiderSuggestion={handleConsiderSuggestion}
            />
          ))
        )}
      </div>
    </div>
  );
}