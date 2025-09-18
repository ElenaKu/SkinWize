import RoutineBuilder from '@/components/RoutineBuilder';
import cleanserImage from '@assets/generated_images/skincare_cleanser_bottle_85916adc.png';
import serumImage from '@assets/generated_images/vitamin_C_serum_bottle_29f17b36.png';
import moisturizerImage from '@assets/generated_images/moisturizer_jar_product_1836a700.png';
import { useState } from 'react';

export default function RoutinePage() {
  // //todo: remove mock functionality - replace with real routine data from storage
  const [morningRoutine, setMorningRoutine] = useState([
    {
      id: '1',
      productName: 'Gentle Cleanser',
      brand: 'CeraVe',
      order: 1,
      category: 'cleanser' as const,
      image: cleanserImage
    },
    {
      id: '2',
      productName: 'Vitamin C Serum',
      brand: 'The Ordinary',
      order: 2,
      category: 'serum' as const,
      image: serumImage
    },
    {
      id: '3',
      productName: 'Daily Moisturizer',
      brand: 'Neutrogena',
      order: 3,
      category: 'moisturizer' as const,
      image: moisturizerImage
    }
  ]);

  const [eveningRoutine, setEveningRoutine] = useState([
    {
      id: '4',
      productName: 'Gentle Cleanser',
      brand: 'CeraVe',
      order: 1,
      category: 'cleanser' as const,
      image: cleanserImage
    },
    {
      id: '5',
      productName: 'Daily Moisturizer',
      brand: 'Neutrogena',
      order: 2,
      category: 'moisturizer' as const,
      image: moisturizerImage
    }
  ]);

  const handleAddProduct = (period: 'morning' | 'evening') => {
    console.log(`Add product to ${period} routine`);
    // //todo: remove mock functionality - implement product selector modal
  };

  const handleRemoveProduct = (period: 'morning' | 'evening', productId: string) => {
    console.log(`Remove product ${productId} from ${period} routine`);
    
    if (period === 'morning') {
      setMorningRoutine(routine => routine.filter(item => item.id !== productId));
    } else {
      setEveningRoutine(routine => routine.filter(item => item.id !== productId));
    }
  };

  return (
    <div className="p-4 pb-20" data-testid="routine-page">
      <RoutineBuilder
        morningRoutine={morningRoutine}
        eveningRoutine={eveningRoutine}
        onAddProduct={handleAddProduct}
        onRemoveProduct={handleRemoveProduct}
      />
    </div>
  );
}