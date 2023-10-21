import React from 'react';
import NutritionBody from './Nutrition';
import { NutritionProvider } from '../../context/nutritionContext';

const Nutrition = (props:any) => {
  return (
    <NutritionProvider>
      <NutritionBody {...props} />
    </NutritionProvider>
  );
};

export default Nutrition;
