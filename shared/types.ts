// Comprehensive product suggestion types for market data
export interface MarketProduct {
  id: string;
  name: string;
  brand: string;
  productType: string;
  keyIngredients: string[];
  safetyScore: number;
  priceRange: string;
  availability: string;
  targetConcerns: string[];
  compatibilityWith: string[];
  improvementReason: string;
  releaseDate: string; // YYYY-MM-DD format
  efficiency: number; // 1-10 scale
}

export interface ProductDatabase {
  products: MarketProduct[];
  lastUpdated: string;
  source: string;
}

export interface SuggestionCriteria {
  currentProductType: string;
  currentIngredients: string[];
  skinConcerns: string[];
  currentSafetyScore: number;
  userPreferences?: {
    priceRange?: string;
    brandPreferences?: string[];
    excludeIngredients?: string[];
  };
}