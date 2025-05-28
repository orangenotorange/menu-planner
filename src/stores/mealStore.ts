import { ref, computed } from 'vue';
import type { Meal, WeekPlan, DayPlan } from '../types/meals';

export const useMealStore = () => {
  const currentWeekPlan = ref<WeekPlan>({
    startDate: new Date(),
    days: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(new Date().setDate(new Date().getDate() + i)),
      breakfast: null,
      lunch: null,
      dinner: null,
    })),
  });

  const sampleMeals: Meal[] = [
    {
      id: '1',
      name: 'Pancakes with Fresh Berries',
      category: 'breakfast',
      servings: { adult: 2, child: 2 },
      ingredients: [
        { name: 'flour', amount: 2, unit: 'cups' },
        { name: 'milk', amount: 2, unit: 'cups' },
        { name: 'eggs', amount: 2, unit: 'units' },
        { name: 'mixed berries', amount: 2, unit: 'cups' },
      ],
      preparationTime: 30,
      dietaryTags: ['vegetarian'],
    },
    {
      id: '2',
      name: 'Grilled Chicken Salad',
      category: 'lunch',
      servings: { adult: 2, child: 2 },
      ingredients: [
        { name: 'chicken breast', amount: 600, unit: 'g' },
        { name: 'mixed greens', amount: 400, unit: 'g' },
        { name: 'cherry tomatoes', amount: 200, unit: 'g' },
        { name: 'cucumber', amount: 1, unit: 'unit' },
      ],
      preparationTime: 25,
      dietaryTags: ['high-protein', 'low-carb'],
    },
    {
      id: '3',
      name: 'Quick Pasta with Marinara',
      category: 'dinner',
      servings: { adult: 2, child: 2 },
      ingredients: [
        { name: 'pasta', amount: 500, unit: 'g' },
        { name: 'marinara sauce', amount: 500, unit: 'ml' },
        { name: 'parmesan cheese', amount: 100, unit: 'g' },
        { name: 'garlic', amount: 2, unit: 'cloves' },
        { name: 'olive oil', amount: 2, unit: 'tbsp' },
      ],
      preparationTime: 20,
      dietaryTags: ['vegetarian', 'kid-friendly'],
    },
    {
      id: '4',
      name: 'Fish Tacos',
      category: 'dinner',
      servings: { adult: 2, child: 2 },
      ingredients: [
        { name: 'white fish fillets', amount: 600, unit: 'g' },
        { name: 'corn tortillas', amount: 8, unit: 'pieces' },
        { name: 'lime', amount: 2, unit: 'units' },
        { name: 'slaw mix', amount: 200, unit: 'g' },
        { name: 'sour cream', amount: 100, unit: 'g' },
        { name: 'taco seasoning', amount: 2, unit: 'tbsp' },
      ],
      preparationTime: 25,
      dietaryTags: ['high-protein', 'kid-friendly'],
    },
    {
      id: '5',
      name: 'Quick Stir-Fry Rice',
      category: 'dinner',
      servings: { adult: 2, child: 2 },
      ingredients: [
        { name: 'cooked rice', amount: 600, unit: 'g' },
        { name: 'frozen vegetables', amount: 400, unit: 'g' },
        { name: 'eggs', amount: 3, unit: 'units' },
        { name: 'soy sauce', amount: 3, unit: 'tbsp' },
        { name: 'sesame oil', amount: 2, unit: 'tbsp' },
      ],
      preparationTime: 15,
      dietaryTags: ['vegetarian', 'kid-friendly'],
    },
    {
      id: '6',
      name: 'Sheet Pan Sausage and Veggies',
      category: 'dinner',
      servings: { adult: 2, child: 2 },
      ingredients: [
        { name: 'chicken sausage', amount: 500, unit: 'g' },
        { name: 'bell peppers', amount: 3, unit: 'units' },
        { name: 'broccoli', amount: 400, unit: 'g' },
        { name: 'olive oil', amount: 2, unit: 'tbsp' },
        { name: 'italian seasoning', amount: 1, unit: 'tbsp' },
      ],
      preparationTime: 25,
      dietaryTags: ['high-protein', 'low-carb', 'kid-friendly'],
    },
    {
      id: '7',
      name: 'Quesadilla Party',
      category: 'dinner',
      servings: { adult: 2, child: 2 },
      ingredients: [
        { name: 'flour tortillas', amount: 8, unit: 'pieces' },
        { name: 'shredded cheese', amount: 400, unit: 'g' },
        { name: 'rotisserie chicken', amount: 300, unit: 'g' },
        { name: 'bell pepper', amount: 1, unit: 'unit' },
        { name: 'sour cream', amount: 100, unit: 'g' },
        { name: 'salsa', amount: 200, unit: 'ml' },
      ],
      preparationTime: 20,
      dietaryTags: ['kid-friendly', 'high-protein'],
    },
    {
      id: '8',
      name: 'Breakfast for Dinner',
      category: 'dinner',
      servings: { adult: 2, child: 2 },
      ingredients: [
        { name: 'eggs', amount: 8, unit: 'units' },
        { name: 'bacon', amount: 200, unit: 'g' },
        { name: 'bread', amount: 8, unit: 'slices' },
        { name: 'butter', amount: 50, unit: 'g' },
        { name: 'cheese', amount: 100, unit: 'g' },
      ],
      preparationTime: 20,
      dietaryTags: ['kid-friendly', 'high-protein'],
    },
    {
      id: '9',
      name: 'Pesto Tortellini',
      category: 'dinner',
      servings: { adult: 2, child: 2 },
      ingredients: [
        { name: 'cheese tortellini', amount: 500, unit: 'g' },
        { name: 'pesto sauce', amount: 200, unit: 'g' },
        { name: 'cherry tomatoes', amount: 200, unit: 'g' },
        { name: 'parmesan cheese', amount: 50, unit: 'g' },
        { name: 'pine nuts', amount: 30, unit: 'g' },
      ],
      preparationTime: 15,
      dietaryTags: ['vegetarian', 'kid-friendly'],
    },
    {
      id: '10',
      name: 'Asian Noodle Bowl',
      category: 'dinner',
      servings: { adult: 2, child: 2 },
      ingredients: [
        { name: 'udon noodles', amount: 400, unit: 'g' },
        { name: 'frozen edamame', amount: 200, unit: 'g' },
        { name: 'carrots', amount: 2, unit: 'units' },
        { name: 'soy sauce', amount: 4, unit: 'tbsp' },
        { name: 'sesame oil', amount: 2, unit: 'tbsp' },
        { name: 'green onions', amount: 3, unit: 'units' },
      ],
      preparationTime: 20,
      dietaryTags: ['vegetarian', 'kid-friendly'],
    },
    {
      id: '11',
      name: 'Turkey Wrap Station',
      category: 'dinner',
      servings: { adult: 2, child: 2 },
      ingredients: [
        { name: 'large tortillas', amount: 8, unit: 'pieces' },
        { name: 'sliced turkey', amount: 400, unit: 'g' },
        { name: 'lettuce', amount: 1, unit: 'head' },
        { name: 'sliced cheese', amount: 200, unit: 'g' },
        { name: 'mayo', amount: 100, unit: 'g' },
        { name: 'mustard', amount: 50, unit: 'g' },
      ],
      preparationTime: 15,
      dietaryTags: ['high-protein', 'kid-friendly'],
    },
    {
      id: '12',
      name: 'Quick Greek Pita Pizzas',
      category: 'dinner',
      servings: { adult: 2, child: 2 },
      ingredients: [
        { name: 'pita bread', amount: 6, unit: 'pieces' },
        { name: 'hummus', amount: 300, unit: 'g' },
        { name: 'cherry tomatoes', amount: 200, unit: 'g' },
        { name: 'cucumber', amount: 1, unit: 'unit' },
        { name: 'feta cheese', amount: 150, unit: 'g' },
        { name: 'olives', amount: 100, unit: 'g' },
      ],
      preparationTime: 15,
      dietaryTags: ['vegetarian', 'mediterranean'],
    },
    {
      id: '13',
      name: 'Sweet Potato Bowl',
      category: 'dinner',
      servings: { adult: 2, child: 2 },
      ingredients: [
        { name: 'sweet potatoes', amount: 4, unit: 'medium' },
        { name: 'black beans', amount: 400, unit: 'g' },
        { name: 'corn', amount: 200, unit: 'g' },
        { name: 'avocado', amount: 2, unit: 'units' },
        { name: 'lime', amount: 1, unit: 'unit' },
        { name: 'taco seasoning', amount: 2, unit: 'tbsp' },
      ],
      preparationTime: 25,
      dietaryTags: ['vegetarian', 'vegan', 'gluten-free'],
    },
    {
      id: '14',
      name: 'BBQ Chicken Sliders',
      category: 'dinner',
      servings: { adult: 2, child: 2 },
      ingredients: [
        { name: 'slider buns', amount: 12, unit: 'pieces' },
        { name: 'rotisserie chicken', amount: 500, unit: 'g' },
        { name: 'bbq sauce', amount: 200, unit: 'ml' },
        { name: 'coleslaw mix', amount: 300, unit: 'g' },
        { name: 'mayo', amount: 100, unit: 'g' },
      ],
      preparationTime: 20,
      dietaryTags: ['kid-friendly', 'high-protein'],
    },
    {
      id: '16',
      name: 'Mediterranean Couscous',
      category: 'dinner',
      servings: { adult: 2, child: 2 },
      ingredients: [
        { name: 'couscous', amount: 300, unit: 'g' },
        { name: 'chickpeas', amount: 400, unit: 'g' },
        { name: 'cucumber', amount: 1, unit: 'unit' },
        { name: 'cherry tomatoes', amount: 200, unit: 'g' },
        { name: 'feta cheese', amount: 100, unit: 'g' },
        { name: 'olive oil', amount: 3, unit: 'tbsp' },
      ],
      preparationTime: 15,
      dietaryTags: ['vegetarian', 'mediterranean'],
    },
    {
      id: '17',
      name: 'Creamy Mac and Cheese',
      category: 'dinner',
      servings: { adult: 2, child: 2 },
      ingredients: [
        { name: 'macaroni', amount: 500, unit: 'g' },
        { name: 'cheddar cheese', amount: 300, unit: 'g' },
        { name: 'milk', amount: 500, unit: 'ml' },
        { name: 'butter', amount: 60, unit: 'g' },
        { name: 'flour', amount: 40, unit: 'g' },
        { name: 'breadcrumbs', amount: 100, unit: 'g' },
      ],
      preparationTime: 25,
      dietaryTags: ['vegetarian', 'kid-friendly'],
    },
    {
      id: '18',
      name: 'Cuban-Style Rice and Beans',
      category: 'dinner',
      servings: { adult: 2, child: 2 },
      ingredients: [
        { name: 'rice', amount: 400, unit: 'g' },
        { name: 'black beans', amount: 500, unit: 'g' },
        { name: 'onion', amount: 1, unit: 'unit' },
        { name: 'garlic', amount: 3, unit: 'cloves' },
        { name: 'bell pepper', amount: 1, unit: 'unit' },
        { name: 'cumin', amount: 2, unit: 'tsp' },
      ],
      preparationTime: 25,
      dietaryTags: ['vegetarian', 'vegan', 'kid-friendly'],
    }
  ];

  const availableMeals = ref<Meal[]>(sampleMeals);

  const addMealToDay = (dayIndex: number, meal: Meal, mealType: 'breakfast' | 'lunch' | 'dinner') => {
    if (dayIndex >= 0 && dayIndex < currentWeekPlan.value.days.length) {
      currentWeekPlan.value.days[dayIndex][mealType] = meal;
    }
  };

  const removeMealFromDay = (dayIndex: number, mealType: 'breakfast' | 'lunch' | 'dinner') => {
    if (dayIndex >= 0 && dayIndex < currentWeekPlan.value.days.length) {
      currentWeekPlan.value.days[dayIndex][mealType] = null;
    }
  };

  const calculateServings = (meal: Meal) => {
    const totalAdults = 2;
    const totalChildren = 2;
    const servingMultiplier = Math.max(
      totalAdults / meal.servings.adult,
      totalChildren / meal.servings.child
    );

    return meal.ingredients.map(ingredient => ({
      ...ingredient,
      amount: ingredient.amount * servingMultiplier,
    }));
  };

  const generateRandomWeeklyPlan = () => {
    const dinnerMeals = availableMeals.value.filter((meal: Meal) => meal.category === 'dinner');
    const usedMealIds = new Set<string>();

    currentWeekPlan.value.days.forEach((day: DayPlan, index: number) => {
      let availableDinners = dinnerMeals.filter((meal: Meal) => !usedMealIds.has(meal.id));
      
      // If we've used all meals, reset the available options
      if (availableDinners.length === 0) {
        availableDinners = dinnerMeals;
        usedMealIds.clear();
      }

      const randomIndex = Math.floor(Math.random() * availableDinners.length);
      const selectedMeal = availableDinners[randomIndex];
      
      addMealToDay(index, selectedMeal, 'dinner');
      usedMealIds.add(selectedMeal.id);
    });
  };

  // Generate initial weekly plan
  generateRandomWeeklyPlan();

  return {
    currentWeekPlan,
    availableMeals,
    addMealToDay,
    removeMealFromDay,
    calculateServings,
    generateRandomWeeklyPlan,
  };
}; 