import IngredientAnalysis from '../IngredientAnalysis';

export default function IngredientAnalysisExample() {
  const mockIngredients = [
    {
      name: "Niacinamide",
      safetyLevel: 'safe' as const,
      score: 9,
      function: "Anti-inflammatory, Brightening",
      description: "A form of Vitamin B3 that helps reduce inflammation, regulate oil production, and improve skin texture.",
      concerns: [],
      alternatives: []
    },
    {
      name: "Retinol",
      safetyLevel: 'moderate' as const,
      score: 6,
      function: "Anti-aging, Cell turnover",
      description: "A powerful anti-aging ingredient that promotes cell turnover and collagen production.",
      concerns: ["Photosensitivity", "Initial irritation", "Not suitable for pregnancy"],
      alternatives: ["Bakuchiol", "Granactive Retinoid"]
    },
    {
      name: "Fragrance (Parfum)",
      safetyLevel: 'avoid' as const,
      score: 2,
      function: "Scent",
      description: "Added for fragrance but can cause allergic reactions and sensitivities in many people.",
      concerns: ["Allergic reactions", "Skin sensitization", "Unknown ingredients"],
      alternatives: ["Essential oils", "Natural extracts", "Fragrance-free formulations"]
    }
  ];

  const handleBack = () => {
    console.log('Back to products');
  };

  return (
    <IngredientAnalysis
      productName="Vitamin C Serum"
      productBrand="The Ordinary"
      ingredients={mockIngredients}
      overallScore={7}
      onBack={handleBack}
    />
  );
}