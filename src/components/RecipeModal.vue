<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex justify-between items-start">
          <h2 class="text-2xl font-bold text-orange-600">{{ recipe.name }}</h2>
          <button 
            @click="$emit('close')" 
            class="text-gray-500 hover:text-gray-700"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="mt-4">
          <div class="flex items-center gap-4 text-sm text-gray-600">
            <span class="flex items-center">
              <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Prep time: {{ recipe.prepTime }} mins
            </span>
            <span class="flex items-center">
              <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              {{ recipe.ingredients.length }} ingredients
            </span>
          </div>

          <div class="mt-6">
            <h3 class="font-semibold text-green-600 mb-2">Ingredients</h3>
            <ul class="list-disc list-inside space-y-1 text-gray-600">
              <li v-for="ingredient in recipe.ingredients" :key="ingredient">
                {{ ingredient }}
              </li>
            </ul>
          </div>

          <div class="mt-6">
            <h3 class="font-semibold text-green-600 mb-2">Instructions</h3>
            <ol class="list-decimal list-inside space-y-2 text-gray-600">
              <li v-for="(step, index) in recipe.instructions" :key="index">
                {{ step }}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    required: true
  },
  recipe: {
    type: Object,
    required: true
  }
})

defineEmits(['close'])
</script> 