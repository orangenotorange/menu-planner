export interface Meal {
  id: string;
  name: string;
  category: 'breakfast' | 'lunch' | 'dinner';
  servings: {
    adult: number;
    child: number;
  };
  servingSize: {
    amount: number;
    unit: string;
  };
  calories: number;
  ingredients: Ingredient[];
  preparationTime: number;
  dietaryTags: string[];
}

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

export interface DayPlan {
  date: Date;
  breakfast: Meal | null;
  lunch: Meal | null;
  dinner: Meal | null;
}

export interface WeekPlan {
  startDate: Date;
  days: DayPlan[];
} 