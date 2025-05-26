import { ref } from 'vue';
import type { Recipe } from '../types/recipes';
import { useMealStore } from './mealStore';

export const useRecipeStore = () => {
  const { availableMeals } = useMealStore();

  const recipes: Recipe[] = [
    {
      meal: availableMeals.value.find(m => m.name === 'Quick Pasta with Marinara')!,
      instructions: [
        'Bring a large pot of salted water to boil.',
        'Cook pasta according to package instructions until al dente (usually 8-10 minutes).',
        'While pasta cooks, warm marinara sauce in a separate pan over medium heat.',
        'Mince garlic and sauté in olive oil until fragrant (about 1 minute).',
        'Drain pasta and return to pot.',
        'Add warmed marinara sauce and sautéed garlic to pasta.',
        'Toss everything together and serve topped with grated parmesan cheese.'
      ],
      tips: [
        'Reserve some pasta water before draining to help thin the sauce if needed.',
        'Add red pepper flakes for a spicier version.',
        'Can be stored in an airtight container for up to 3 days.'
      ],
      nutritionInfo: {
        calories: 450,
        protein: 15,
        carbs: 65,
        fat: 12
      }
    },
    {
      meal: availableMeals.value.find(m => m.name === 'Fish Tacos')!,
      instructions: [
        'Season fish fillets with taco seasoning on both sides.',
        'Heat a large skillet over medium-high heat.',
        'Cook fish for 3-4 minutes per side until flaky.',
        'While fish cooks, warm the tortillas in a separate pan or microwave.',
        'Mix slaw with a bit of lime juice and salt.',
        'Break fish into chunks.',
        'Assemble tacos with fish, slaw, and a dollop of sour cream.',
        'Serve with lime wedges.'
      ],
      tips: [
        'Use any white fish like cod, tilapia, or halibut.',
        'Make extra slaw for leftovers.',
        'Warm tortillas wrapped in slightly damp paper towels for 30 seconds.'
      ],
      nutritionInfo: {
        calories: 380,
        protein: 28,
        carbs: 35,
        fat: 15
      }
    },
    {
      meal: availableMeals.value.find(m => m.name === 'Quick Stir-Fry Rice')!,
      instructions: [
        'Heat sesame oil in a large wok or skillet over medium-high heat.',
        'Add frozen vegetables and stir-fry until heated through (3-4 minutes).',
        'Push vegetables to one side of the pan.',
        'Beat eggs and pour into the empty side of the pan.',
        'Scramble eggs until just set.',
        'Add cooked rice and soy sauce.',
        'Stir-fry everything together until well combined and heated through.',
        'Top with sliced green onions.'
      ],
      tips: [
        'Day-old rice works best for stir-frying.',
        'Add protein like tofu or chicken if desired.',
        'Customize vegetables based on preferences.'
      ],
      nutritionInfo: {
        calories: 350,
        protein: 12,
        carbs: 55,
        fat: 10
      }
    },
    {
      meal: availableMeals.value.find(m => m.name === 'Sheet Pan Sausage and Veggies')!,
      instructions: [
        'Preheat oven to 400°F (200°C).',
        'Slice sausage into 1-inch pieces.',
        'Cut bell peppers into chunks.',
        'Cut broccoli into florets.',
        'Toss everything with olive oil and Italian seasoning on a sheet pan.',
        'Spread in a single layer.',
        'Roast for 20-25 minutes, stirring halfway through.',
        'Serve hot.'
      ],
      tips: [
        'Line sheet pan with parchment for easy cleanup.',
        'Cut vegetables in similar sizes for even cooking.',
        'Can be meal prepped for lunches.'
      ],
      nutritionInfo: {
        calories: 420,
        protein: 25,
        carbs: 15,
        fat: 28
      }
    },
    {
      meal: availableMeals.value.find(m => m.name === 'Quesadilla Party')!,
      instructions: [
        'Shred rotisserie chicken into small pieces.',
        'Dice bell pepper finely.',
        'Heat a large skillet over medium heat.',
        'Place one tortilla in the skillet.',
        'Layer with cheese, chicken, and bell peppers on one half.',
        'Fold tortilla over and cook until golden brown (2-3 minutes per side).',
        'Cut into wedges.',
        'Serve with sour cream and salsa.'
      ],
      tips: [
        'Use a pizza cutter for easy quesadilla slicing.',
        'Don\'t overfill or ingredients will fall out.',
        'Can add other vegetables like corn or spinach.'
      ],
      nutritionInfo: {
        calories: 400,
        protein: 28,
        carbs: 30,
        fat: 22
      }
    },
    {
      meal: availableMeals.value.find(m => m.name === 'Breakfast for Dinner')!,
      instructions: [
        'Cook bacon in a large skillet until crispy.',
        'Remove bacon and drain on paper towels.',
        'Pour out most of the bacon fat, leaving about 1 tablespoon.',
        'Crack eggs into the same skillet.',
        'Cook to desired doneness.',
        'Meanwhile, toast bread slices.',
        'Butter toast and add cheese if desired.',
        'Serve eggs with bacon and toast.'
      ],
      tips: [
        'Can scramble eggs instead of frying.',
        'Add herbs like chives or parsley for extra flavor.',
        'Serve with hot sauce or ketchup if desired.'
      ],
      nutritionInfo: {
        calories: 550,
        protein: 32,
        carbs: 25,
        fat: 35
      }
    },
    {
      meal: availableMeals.value.find(m => m.name === 'Pesto Tortellini')!,
      instructions: [
        'Bring a large pot of salted water to boil.',
        'Cook tortellini according to package instructions.',
        'Halve cherry tomatoes.',
        'Drain tortellini, reserving ½ cup pasta water.',
        'Return tortellini to pot.',
        'Stir in pesto sauce, adding pasta water if needed to thin sauce.',
        'Add cherry tomatoes.',
        'Top with parmesan cheese and pine nuts.'
      ],
      tips: [
        'Toast pine nuts in a dry pan for extra flavor.',
        'Can use sun-dried tomatoes instead of fresh.',
        'Add baby spinach for extra vegetables.'
      ],
      nutritionInfo: {
        calories: 480,
        protein: 18,
        carbs: 45,
        fat: 25
      }
    },
    {
      meal: availableMeals.value.find(m => m.name === 'Asian Noodle Bowl')!,
      instructions: [
        'Cook udon noodles according to package instructions.',
        'Steam frozen edamame in microwave.',
        'Julienne or grate carrots.',
        'Slice green onions.',
        'Drain noodles and return to pot.',
        'Add edamame, carrots, soy sauce, and sesame oil.',
        'Toss everything together until well combined.',
        'Top with green onions.'
      ],
      tips: [
        'Can use other noodles like soba or rice noodles.',
        'Add sriracha or chili oil for heat.',
        'Serve hot or cold.'
      ],
      nutritionInfo: {
        calories: 380,
        protein: 15,
        carbs: 65,
        fat: 8
      }
    },
    {
      meal: availableMeals.value.find(m => m.name === 'Turkey Wrap Station')!,
      instructions: [
        'Lay out tortillas on a clean surface.',
        'Spread each tortilla with mayo and mustard.',
        'Layer with turkey slices.',
        'Add cheese slices.',
        'Top with lettuce leaves.',
        'Roll up tightly, tucking in sides.',
        'Cut diagonally.',
        'Serve immediately.'
      ],
      tips: [
        'Warm tortillas slightly for easier rolling.',
        'Can add tomatoes or avocado.',
        'Pack components separately for lunch boxes.'
      ],
      nutritionInfo: {
        calories: 350,
        protein: 25,
        carbs: 30,
        fat: 15
      }
    },
    {
      meal: availableMeals.value.find(m => m.name === 'Quick Greek Pita Pizzas')!,
      instructions: [
        'Preheat oven to 375°F (190°C).',
        'Spread hummus on each pita bread.',
        'Halve cherry tomatoes.',
        'Dice cucumber.',
        'Top pitas with tomatoes, cucumber, feta, and olives.',
        'Bake for 10-12 minutes until edges are crispy.',
        'Cut into wedges.',
        'Serve hot.'
      ],
      tips: [
        'Can add red onion or bell peppers.',
        'Drizzle with olive oil before serving.',
        'Use whole wheat pita for extra fiber.'
      ],
      nutritionInfo: {
        calories: 320,
        protein: 12,
        carbs: 40,
        fat: 14
      }
    },
    {
      meal: availableMeals.value.find(m => m.name === 'Sweet Potato Bowl')!,
      instructions: [
        'Pierce sweet potatoes with a fork.',
        'Microwave on high for 8-10 minutes, turning halfway through.',
        'Heat black beans with taco seasoning.',
        'Warm corn.',
        'Split sweet potatoes and fluff with a fork.',
        'Top with black beans and corn.',
        'Add diced avocado.',
        'Squeeze lime juice over top.'
      ],
      tips: [
        'Can bake sweet potatoes instead (45-60 minutes at 400°F).',
        'Add salsa or hot sauce for extra flavor.',
        'Top with cilantro if desired.'
      ],
      nutritionInfo: {
        calories: 380,
        protein: 12,
        carbs: 65,
        fat: 10
      }
    },
    {
      meal: availableMeals.value.find(m => m.name === 'BBQ Chicken Sliders')!,
      instructions: [
        'Shred rotisserie chicken.',
        'Mix with BBQ sauce in a microwave-safe bowl.',
        'Heat chicken mixture in microwave until warm.',
        'Mix coleslaw with mayo.',
        'Split slider buns.',
        'Fill each bun with BBQ chicken.',
        'Top with coleslaw.',
        'Serve immediately.'
      ],
      tips: [
        'Toast buns for extra texture.',
        'Can add pickles or jalapeños.',
        'Make extra for leftovers.'
      ],
      nutritionInfo: {
        calories: 350,
        protein: 25,
        carbs: 35,
        fat: 14
      }
    },
    {
      meal: availableMeals.value.find(m => m.name === 'Mediterranean Couscous')!,
      instructions: [
        'Bring water to boil according to couscous package instructions.',
        'Add couscous, cover, and remove from heat.',
        'Let stand 5 minutes, then fluff with fork.',
        'Drain and rinse chickpeas.',
        'Dice cucumber and halve cherry tomatoes.',
        'Mix couscous with chickpeas, vegetables, and crumbled feta.',
        'Drizzle with olive oil.',
        'Season with salt and pepper to taste.'
      ],
      tips: [
        'Can add fresh herbs like parsley or mint.',
        'Serve warm or cold.',
        'Keeps well for lunch the next day.'
      ],
      nutritionInfo: {
        calories: 380,
        protein: 15,
        carbs: 55,
        fat: 12
      }
    },
    {
      meal: availableMeals.value.find(m => m.name === 'Creamy Mac and Cheese')!,
      instructions: [
        'Cook macaroni in salted water according to package instructions.',
        'Meanwhile, melt butter in a large saucepan over medium heat.',
        'Add flour and whisk for 1 minute to make a roux.',
        'Gradually whisk in milk and cook until thickened.',
        'Add shredded cheese and stir until melted.',
        'Drain pasta and add to cheese sauce.',
        'Top with breadcrumbs.',
        'Broil for 2-3 minutes until golden brown (optional).'
      ],
      tips: [
        'Grate cheese fresh for best melting.',
        'Add a pinch of nutmeg to the sauce.',
        'Can add vegetables like peas or broccoli.'
      ],
      nutritionInfo: {
        calories: 550,
        protein: 22,
        carbs: 65,
        fat: 25
      }
    },
    {
      meal: availableMeals.value.find(m => m.name === 'Cuban-Style Rice and Beans')!,
      instructions: [
        'Rinse rice until water runs clear.',
        'Dice onion and bell pepper.',
        'Mince garlic.',
        'Heat oil in a large pot and sauté onion, pepper, and garlic until soft.',
        'Add rice and cook for 1 minute.',
        'Add water and bring to boil.',
        'Reduce heat, cover, and simmer for 18 minutes.',
        'Add black beans and cumin, heat through.',
        'Let stand 5 minutes before serving.'
      ],
      tips: [
        'Use canned black beans for convenience.',
        'Add bay leaf for extra flavor.',
        'Can top with fresh cilantro.'
      ],
      nutritionInfo: {
        calories: 380,
        protein: 12,
        carbs: 70,
        fat: 6
      }
    }
  ];

  const recipeList = ref<Recipe[]>(recipes);

  const getRecipeByMealId = (mealId: string): Recipe | undefined => {
    return recipeList.value.find(recipe => recipe.meal.id === mealId);
  };

  return {
    recipeList,
    getRecipeByMealId
  };
}; 