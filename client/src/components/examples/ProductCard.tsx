import ProductCard from '../ProductCard';
import cleanserImage from '@assets/generated_images/skincare_cleanser_bottle_85916adc.png';

export default function ProductCardExample() {
  const handleViewDetails = (id: string) => {
    console.log('View details for product:', id);
  };

  return (
    <div className="max-w-sm">
      <ProductCard
        id="cleanser-001"
        name="Gentle Foaming Cleanser"
        brand="CeraVe"
        image={cleanserImage}
        safetyLevel="safe"
        safetyScore={8}
        keyIngredients={['Ceramides', 'Niacinamide', 'Hyaluronic Acid']}
        skinConcerns={['Dryness', 'Barrier Repair', 'Hydration']}
        usageDuration="3 months"
        productType="Gentle Cleanser"
        compatibilityScore={95}
        isInUse={true}
        currentUsage="both"
        recommendedUsage="both"
        scanDate="2 days ago"
        onViewDetails={handleViewDetails}
      />
    </div>
  );
}