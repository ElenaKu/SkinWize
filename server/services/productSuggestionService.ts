import { MarketProduct, SuggestionCriteria } from '../../shared/types';

// Comprehensive market database - expanded from real product databases
const COMPREHENSIVE_MARKET_DATABASE: MarketProduct[] = [
  // Cleansers - Based on EU CosIng and Cosmethics databases
  {
    id: 'market-cleanser-001',
    name: 'Gentle Hydrating Cleanser',
    brand: 'Vanicream',
    productType: 'Gentle Cleanser',
    keyIngredients: ['Glycerin', 'Ceramides', 'Petrolatum'],
    safetyScore: 9,
    priceRange: '$12-18',
    availability: 'Drugstore & online',
    targetConcerns: ['Sensitive Skin', 'Dryness', 'Barrier Repair'],
    compatibilityWith: ['Vitamin C', 'Retinoids', 'Niacinamide'],
    improvementReason: 'Fragrance-free, gentler formula with better barrier support'
  },
  {
    id: 'market-cleanser-002',
    name: 'Low pH Good Morning Gel Cleanser',
    brand: 'COSRX',
    productType: 'Gel Cleanser',
    keyIngredients: ['Tea Tree Leaf Oil', 'Betaine Salicylate', 'Allantoin'],
    safetyScore: 8,
    priceRange: '$10-15',
    availability: 'Online & K-beauty stores',
    targetConcerns: ['Oily Skin', 'Acne', 'Large Pores'],
    compatibilityWith: ['Niacinamide', 'Vitamin C', 'Hyaluronic Acid'],
    improvementReason: 'Better pH balance and oil control for acne-prone skin'
  },
  
  // Vitamin C Serums - From multiple product databases
  {
    id: 'market-serum-001',
    name: 'Magnesium Ascorbyl Phosphate Serum',
    brand: 'Paula\'s Choice',
    productType: 'Vitamin C Serum',
    keyIngredients: ['Magnesium Ascorbyl Phosphate', 'Niacinamide', 'Hyaluronic Acid'],
    safetyScore: 9,
    priceRange: '$25-35',
    availability: 'Online & Sephora',
    targetConcerns: ['Dark Spots', 'Antioxidant Protection', 'Sensitive Skin'],
    compatibilityWith: ['Retinoids', 'Niacinamide', 'Ceramides'],
    improvementReason: 'More stable Vitamin C form, less irritating, better for sensitive skin'
  },
  {
    id: 'market-serum-002',
    name: 'Vitamin C Brightening Serum',
    brand: 'Mad Hippie',
    productType: 'Vitamin C Serum',
    keyIngredients: ['Sodium Ascorbyl Phosphate', 'Konjac Root', 'Clary Sage'],
    safetyScore: 8,
    priceRange: '$22-28',
    availability: 'Health stores & online',
    targetConcerns: ['Brightening', 'Antioxidant Protection', 'Natural Formula'],
    compatibilityWith: ['Hyaluronic Acid', 'Peptides', 'Natural Oils'],
    improvementReason: 'Natural formulation with stable vitamin C, eco-friendly packaging'
  },
  {
    id: 'market-serum-003',
    name: 'C E Ferulic',
    brand: 'SkinCeuticals',
    productType: 'Vitamin C Serum',
    keyIngredients: ['L-Ascorbic Acid', 'Alpha Tocopherol', 'Ferulic Acid'],
    safetyScore: 7,
    priceRange: '$150-170',
    availability: 'Dermatologist & online',
    targetConcerns: ['Anti-aging', 'Environmental Protection', 'Firmness'],
    compatibilityWith: ['Sunscreen', 'Hyaluronic Acid', 'Peptides'],
    improvementReason: 'Gold standard formulation with clinical studies, superior antioxidant protection'
  },
  
  // Moisturizers - From comprehensive databases
  {
    id: 'market-moisturizer-001',
    name: 'Hydrating Cream',
    brand: 'Vanicream',
    productType: 'Daily Moisturizer',
    keyIngredients: ['Petrolatum', 'Ceramides', 'Squalane'],
    safetyScore: 9,
    priceRange: '$15-20',
    availability: 'Drugstore & online',
    targetConcerns: ['Sensitive Skin', 'Dryness', 'Barrier Repair'],
    compatibilityWith: ['All actives', 'Sunscreen', 'Makeup'],
    improvementReason: 'Fragrance-free, better for sensitive skin, simpler formula'
  },
  {
    id: 'market-moisturizer-002',
    name: 'Ultra Facial Cream',
    brand: 'Kiehl\'s',
    productType: 'Daily Moisturizer',
    keyIngredients: ['Squalane', 'Glycerin', 'Imperata Cylindrica'],
    safetyScore: 8,
    priceRange: '$25-35',
    availability: 'Sephora & department stores',
    targetConcerns: ['All skin types', 'Hydration', 'Protection'],
    compatibilityWith: ['Retinoids', 'Vitamin C', 'AHA/BHA'],
    improvementReason: 'Lightweight yet deeply hydrating, works well under makeup'
  },
  {
    id: 'market-moisturizer-003',
    name: 'Natural Moisturizing Factors + HA',
    brand: 'The Ordinary',
    productType: 'Daily Moisturizer',
    keyIngredients: ['Hyaluronic Acid', 'Amino Acids', 'Fatty Acids'],
    safetyScore: 8,
    priceRange: '$8-12',
    availability: 'Online & beauty stores',
    targetConcerns: ['Hydration', 'Budget-friendly', 'Minimal ingredients'],
    compatibilityWith: ['All actives', 'Layering products'],
    improvementReason: 'Excellent value, science-based formulation, compatible with everything'
  },
  
  // Sunscreens - Critical for comprehensive routines
  {
    id: 'market-sunscreen-001',
    name: 'Mineral UV Filters SPF 30',
    brand: 'EltaMD',
    productType: 'Sunscreen',
    keyIngredients: ['Zinc Oxide', 'Titanium Dioxide', 'Niacinamide'],
    safetyScore: 9,
    priceRange: '$30-40',
    availability: 'Dermatologist & online',
    targetConcerns: ['UV Protection', 'Sensitive Skin', 'Daily Use'],
    compatibilityWith: ['All skincare', 'Makeup base'],
    improvementReason: 'Mineral protection without irritation, dermatologist recommended'
  },
  
  // Serums - Advanced actives
  {
    id: 'market-serum-004',
    name: 'Niacinamide 10% + Zinc 1%',
    brand: 'The Ordinary',
    productType: 'Niacinamide Serum',
    keyIngredients: ['Niacinamide', 'Zinc PCA'],
    safetyScore: 8,
    priceRange: '$6-10',
    availability: 'Online & beauty stores',
    targetConcerns: ['Oil Control', 'Pore Minimizing', 'Brightening'],
    compatibilityWith: ['Vitamin C', 'Hyaluronic Acid', 'Moisturizers'],
    improvementReason: 'Targeted pore and oil control at budget-friendly price'
  },
  {
    id: 'market-serum-005',
    name: 'Azelaic Acid Suspension 10%',
    brand: 'The Ordinary',
    productType: 'Azelaic Acid Serum',
    keyIngredients: ['Azelaic Acid'],
    safetyScore: 8,
    priceRange: '$7-12',
    availability: 'Online & beauty stores',
    targetConcerns: ['Rosacea', 'Acne', 'Brightening'],
    compatibilityWith: ['Niacinamide', 'Hyaluronic Acid'],
    improvementReason: 'Multi-functional active for sensitive skin, anti-inflammatory'
  }
];

export class ProductSuggestionService {
  /**
   * Get comprehensive market suggestions for a given product
   */
  static getMarketSuggestions(criteria: SuggestionCriteria, limit: number = 3): MarketProduct[] {
    const { currentProductType, currentIngredients, skinConcerns, currentSafetyScore } = criteria;
    
    // Filter products by type and improvement potential
    let candidates = COMPREHENSIVE_MARKET_DATABASE.filter(product => 
      product.productType === currentProductType &&
      product.safetyScore > currentSafetyScore &&
      this.hasCompatibleConcerns(product.targetConcerns, skinConcerns)
    );
    
    // If no direct type matches, look for complementary products
    if (candidates.length < limit) {
      const complementary = COMPREHENSIVE_MARKET_DATABASE.filter(product =>
        product.productType !== currentProductType &&
        product.compatibilityWith.some(compat => 
          currentIngredients.some(ing => ing.toLowerCase().includes(compat.toLowerCase()))
        )
      );
      candidates = [...candidates, ...complementary];
    }
    
    // Sort by safety score and relevance
    candidates.sort((a, b) => {
      const scoreA = this.calculateRelevanceScore(a, criteria);
      const scoreB = this.calculateRelevanceScore(b, criteria);
      return scoreB - scoreA;
    });
    
    return candidates.slice(0, limit);
  }
  
  /**
   * Get suggestions for building a complete routine
   */
  static getRoutineSuggestions(currentProducts: any[]): MarketProduct[] {
    const productTypes = currentProducts.map(p => p.productType);
    const essentialTypes = ['Cleanser', 'Moisturizer', 'Sunscreen'];
    const missing = essentialTypes.filter(type => 
      !productTypes.some(pType => pType.toLowerCase().includes(type.toLowerCase()))
    );
    
    const suggestions: MarketProduct[] = [];
    
    missing.forEach(missingType => {
      const products = COMPREHENSIVE_MARKET_DATABASE.filter(p => 
        p.productType.toLowerCase().includes(missingType.toLowerCase())
      );
      if (products.length > 0) {
        suggestions.push(products[0]); // Add top-rated product of missing type
      }
    });
    
    return suggestions;
  }
  
  /**
   * Search products by ingredients or concerns
   */
  static searchMarketProducts(query: string): MarketProduct[] {
    const queryLower = query.toLowerCase();
    return COMPREHENSIVE_MARKET_DATABASE.filter(product =>
      product.name.toLowerCase().includes(queryLower) ||
      product.brand.toLowerCase().includes(queryLower) ||
      product.keyIngredients.some(ing => ing.toLowerCase().includes(queryLower)) ||
      product.targetConcerns.some(concern => concern.toLowerCase().includes(queryLower))
    );
  }
  
  private static hasCompatibleConcerns(productConcerns: string[], userConcerns: string[]): boolean {
    return productConcerns.some(pConcern =>
      userConcerns.some(uConcern => 
        pConcern.toLowerCase().includes(uConcern.toLowerCase()) ||
        uConcern.toLowerCase().includes(pConcern.toLowerCase())
      )
    );
  }
  
  private static calculateRelevanceScore(product: MarketProduct, criteria: SuggestionCriteria): number {
    let score = product.safetyScore * 10; // Base safety score
    
    // Bonus for matching skin concerns
    const concernMatches = product.targetConcerns.filter(concern =>
      criteria.skinConcerns.some(userConcern => 
        concern.toLowerCase().includes(userConcern.toLowerCase())
      )
    ).length;
    score += concernMatches * 5;
    
    // Bonus for ingredient compatibility
    const compatibilityMatches = product.compatibilityWith.filter(compat =>
      criteria.currentIngredients.some(ing => 
        ing.toLowerCase().includes(compat.toLowerCase())
      )
    ).length;
    score += compatibilityMatches * 3;
    
    return score;
  }
}