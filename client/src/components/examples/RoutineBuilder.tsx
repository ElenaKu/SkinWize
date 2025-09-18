import { useState } from 'react';
import RoutineBuilder from '../RoutineBuilder';
import cleanserImage from '@assets/generated_images/skincare_cleanser_bottle_85916adc.png';
import serumImage from '@assets/generated_images/vitamin_C_serum_bottle_29f17b36.png';

export default function RoutineBuilderExample() {
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
    }
  ]);

  const [eveningRoutine, setEveningRoutine] = useState([
    {
      id: '3',
      productName: 'Gentle Cleanser',
      brand: 'CeraVe',
      order: 1,
      category: 'cleanser' as const,
      image: cleanserImage
    }
  ]);

  const handleAddProduct = (period: 'morning' | 'evening') => {
    console.log(`Add product to ${period} routine`);
  };

  const handleRemoveProduct = (period: 'morning' | 'evening', productId: string) => {
    console.log(`Remove product ${productId} from ${period} routine`);
  };

  return (
    <RoutineBuilder
      morningRoutine={morningRoutine}
      eveningRoutine={eveningRoutine}
      onAddProduct={handleAddProduct}
      onRemoveProduct={handleRemoveProduct}
    />
  );
}