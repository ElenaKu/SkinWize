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
        ingredientCount={15}
        flaggedIngredients={0}
        scanDate="2 days ago"
        onViewDetails={handleViewDetails}
      />
    </div>
  );
}