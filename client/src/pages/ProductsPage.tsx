import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Plus } from 'lucide-react';
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
  ingredientCount: number;
  flaggedIngredients: number;
  scanDate: string;
}

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  // //todo: remove mock functionality - replace with real data from storage
  const mockProducts: Product[] = [
    {
      id: 'cleanser-001',
      name: 'Gentle Foaming Cleanser',
      brand: 'CeraVe',
      image: cleanserImage,
      safetyLevel: 'safe',
      safetyScore: 8,
      ingredientCount: 15,
      flaggedIngredients: 0,
      scanDate: '2 days ago'
    },
    {
      id: 'serum-001',
      name: 'Vitamin C Serum',
      brand: 'The Ordinary',
      image: serumImage,
      safetyLevel: 'moderate',
      safetyScore: 6,
      ingredientCount: 8,
      flaggedIngredients: 1,
      scanDate: '1 week ago'
    },
    {
      id: 'moisturizer-001',
      name: 'Daily Moisturizer',
      brand: 'Neutrogena',
      image: moisturizerImage,
      safetyLevel: 'safe',
      safetyScore: 7,
      ingredientCount: 20,
      flaggedIngredients: 2,
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
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
            placeholder="Search products..."
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
              {searchTerm ? 'Try a different search term' : 'Start scanning to build your product library'}
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
              ingredientCount={product.ingredientCount}
              flaggedIngredients={product.flaggedIngredients}
              scanDate={product.scanDate}
              onViewDetails={handleViewDetails}
            />
          ))
        )}
      </div>
    </div>
  );
}