const allMeals = [
  {
    name: 'Quick Veggie Stir-Fry',
    prepTime: 20,
    ingredients: ['noodles', 'broccoli', 'carrots', 'soy sauce', 'ginger'],
    instructions: [
      'Cook noodles according to package instructions',
      'Chop vegetables into bite-sized pieces',
      'Heat oil in a wok or large pan',
      'Stir-fry vegetables until crisp-tender',
      'Add cooked noodles and sauce, toss to combine'
    ]
  },
  {
    name: 'Grilled Chicken Salad',
    prepTime: 25,
    ingredients: ['chicken breast', 'lettuce', 'tomatoes', 'cucumber', 'olive oil'],
    instructions: [
      'Season chicken breast with salt and pepper',
      'Grill chicken for 6-7 minutes per side',
      'Chop vegetables and arrange on plates',
      'Slice grilled chicken',
      'Drizzle with olive oil and serve'
    ]
  },
  {
    name: 'One-Pot Pasta',
    prepTime: 15,
    ingredients: ['pasta', 'tomato sauce', 'garlic', 'basil', 'parmesan'],
    instructions: [
      'Combine pasta, sauce, and 2 cups water in a large pot',
      'Bring to a boil, then reduce heat',
      'Cook until pasta is al dente',
      'Stir in fresh basil',
      'Top with grated parmesan'
    ]
  },
  {
    name: 'Fish Tacos',
    prepTime: 20,
    ingredients: ['white fish', 'tortillas', 'cabbage', 'lime', 'avocado'],
    instructions: [
      'Season fish with lime juice and spices',
      'Cook fish in a pan until flaky',
      'Warm tortillas',
      'Shred cabbage and slice avocado',
      'Assemble tacos with toppings'
    ]
  },
  {
    name: 'Buddha Bowl',
    prepTime: 25,
    ingredients: ['quinoa', 'chickpeas', 'sweet potato', 'kale', 'tahini'],
    instructions: [
      'Cook quinoa according to package instructions',
      'Roast sweet potato and chickpeas',
      'Massage kale with olive oil',
      'Prepare tahini dressing',
      'Assemble bowls with all components'
    ]
  },
  {
    name: 'Mediterranean Wrap',
    prepTime: 15,
    ingredients: ['pita bread', 'hummus', 'feta', 'cucumber', 'olives'],
    instructions: [
      'Warm pita bread slightly',
      'Spread hummus on pita',
      'Add chopped vegetables',
      'Sprinkle with feta cheese',
      'Roll up and serve'
    ]
  },
  {
    name: 'Black Bean Quesadillas',
    prepTime: 20,
    ingredients: ['tortillas', 'black beans', 'cheese', 'peppers', 'onions'],
    instructions: [
      'Mash black beans with spices',
      'Layer tortilla with beans and cheese',
      'Add sautéed peppers and onions',
      'Fold and cook until crispy',
      'Cut into wedges'
    ]
  },
  {
    name: 'Shrimp Fried Rice',
    prepTime: 25,
    ingredients: ['rice', 'shrimp', 'peas', 'eggs', 'soy sauce'],
    instructions: [
      'Cook rice and let cool',
      'Sauté shrimp until pink',
      'Scramble eggs separately',
      'Combine all ingredients in wok',
      'Season and stir-fry until hot'
    ]
  },
  {
    name: 'Caprese Sandwich',
    prepTime: 10,
    ingredients: ['bread', 'mozzarella', 'tomatoes', 'basil', 'balsamic'],
    instructions: [
      'Slice bread and mozzarella',
      'Layer with tomato slices',
      'Add fresh basil leaves',
      'Drizzle with balsamic',
      'Top with second slice of bread'
    ]
  },
  {
    name: 'Sweet Potato Curry',
    prepTime: 30,
    ingredients: ['sweet potato', 'chickpeas', 'coconut milk', 'curry paste', 'spinach'],
    instructions: [
      'Cube sweet potatoes',
      'Sauté with curry paste',
      'Add coconut milk and simmer',
      'Stir in chickpeas and spinach',
      'Serve over rice'
    ]
  }
]

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

export function generateWeeklyPlan() {
  // Shuffle the meals array
  const shuffled = [...allMeals].sort(() => Math.random() - 0.5)
  
  // Take the first 5 meals and pair them with days
  return days.map((day, index) => ({
    day,
    meal: shuffled[index]
  }))
}

export function generateNewMeal(currentMeals) {
  // Get the names of current meals
  const currentMealNames = currentMeals.map(m => m.meal.name)
  
  // Filter out meals that are already in the current plan
  const availableMeals = allMeals.filter(meal => !currentMealNames.includes(meal.name))
  
  // If all meals are used (shouldn't happen with 10 meals and 5 days), return a random meal
  if (availableMeals.length === 0) {
    return allMeals[Math.floor(Math.random() * allMeals.length)]
  }
  
  // Return a random meal from the available ones
  return availableMeals[Math.floor(Math.random() * availableMeals.length)]
}

export function getAllMeals() {
  return allMeals
} 