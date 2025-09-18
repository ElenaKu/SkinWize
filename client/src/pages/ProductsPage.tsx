import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Plus, Sparkles, TrendingUp, Star } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import IngredientAnalysis from '@/components/IngredientAnalysis';
import { SafetyLevel } from '@/components/SafetyIndicator';
import cleanserImage from '@assets/generated_images/skincare_cleanser_bottle_85916adc.png';
import serumImage from '@assets/generated_images/vitamin_C_serum_bottle_29f17b36.png';
import moisturizerImage from '@assets/generated_images/moisturizer_jar_product_1836a700.png';

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
  scanDate: string;
}

interface ProductSuggestion {
  id: string;
  name: string;
  brand: string;
  image: string;
  replacesProduct: string;
  improvementReason: string;
  keyIngredients: string[];
  safetyScore: number;
  priceRange: string;
  availability: string;
}

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'my-products' | 'suggestions'>('my-products');

  // //todo: remove mock functionality - replace with real data from storage
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
      scanDate: '3 days ago'
    }
  ];

  // //todo: remove mock functionality - replace with real suggestions from AI analysis
  const mockSuggestions: ProductSuggestion[] = [
    {
      id: 'suggestion-001',
      name: 'Magnesium Ascorbyl Phosphate Serum',
      brand: 'Paula\'s Choice',
      image: serumImage,
      replacesProduct: 'serum-001',
      improvementReason: 'More stable Vitamin C form, less irritating, better for sensitive skin',
      keyIngredients: ['Magnesium Ascorbyl Phosphate', 'Niacinamide', 'Hyaluronic Acid'],
      safetyScore: 9,
      priceRange: '$25-35',
      availability: 'Available online'
    },
    {
      id: 'suggestion-002',
      name: 'Hydrating Cream',
      brand: 'Vanicream',
      image: moisturizerImage,
      replacesProduct: 'moisturizer-001',
      improvementReason: 'Fragrance-free, better for sensitive skin, simpler formula',
      keyIngredients: ['Petrolatum', 'Ceramides', 'Squalane'],
      safetyScore: 9,
      priceRange: '$15-20',
      availability: 'Drugstore & online'
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

  const renderSuggestionCard = (suggestion: ProductSuggestion) => {
    const replacedProduct = mockProducts.find(p => p.id === suggestion.replacesProduct);
    
    return (
      <Card key={suggestion.id} className="hover-elevate cursor-pointer transition-all duration-200" data-testid={`suggestion-${suggestion.id}`}>
        <CardHeader className="pb-3">
          <div className="flex items-start gap-3">
            <div className="h-12 w-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
              <img 
                src={suggestion.image} 
                alt={suggestion.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Upgrade
                </Badge>
                <div className="text-xs text-muted-foreground">
                  Score: {suggestion.safetyScore}/10
                </div>
              </div>
              <h3 className="font-medium text-sm" data-testid={`text-suggestion-name-${suggestion.id}`}>
                {suggestion.name}
              </h3>
              <p className="text-xs text-muted-foreground">{suggestion.brand}</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0 space-y-3">
          <div className="text-xs">
            <p className="text-muted-foreground mb-1">Replaces:</p>
            <p className="font-medium">{replacedProduct?.productType} ({replacedProduct?.brand})</p>
          </div>
          
          <div className="text-xs">
            <p className="text-muted-foreground mb-1">Why it's better:</p>
            <p>{suggestion.improvementReason}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1">
              {suggestion.keyIngredients.slice(0, 3).map((ingredient, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {ingredient}
                </Badge>
              ))}
            </div>
            
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">{suggestion.priceRange}</span>
              <span className="text-muted-foreground">{suggestion.availability}</span>
            </div>
          </div>
          
          <Button size="sm" className="w-full" data-testid={`button-consider-${suggestion.id}`}>
            <Star className="h-3 w-3 mr-2" />
            Consider This
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-4 p-4 pb-20" data-testid="products-page">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Products</h1>
        <Button size="sm" data-testid="button-add-product">
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'my-products' | 'suggestions')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="my-products" data-testid="tab-my-products">
            My Products ({mockProducts.length})
          </TabsTrigger>
          <TabsTrigger value="suggestions" className="flex items-center gap-2" data-testid="tab-suggestions">
            <Sparkles className="h-4 w-4" />
            Suggestions ({mockSuggestions.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="my-products" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by ingredients, concerns, type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
                data-testid="input-search-products"
              />
            </div>
            <Button variant="outline" size="icon" data-testid="button-filter">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

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
                  scanDate={product.scanDate}
                  onViewDetails={handleViewDetails}
                />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="suggestions" className="space-y-4">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="font-medium text-sm">AI-Powered Suggestions</h3>
                  <p className="text-xs text-muted-foreground">
                    Better formulations for your routine based on ingredient analysis and compatibility scores.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {mockSuggestions.map(renderSuggestionCard)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}