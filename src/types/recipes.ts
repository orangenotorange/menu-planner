import type { Meal } from './meals';

export interface Recipe {
  meal: Meal;
  instructions: string[];
  tips: string[];
  nutritionInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
} 