// src/stores/trails.ts
import trailsService from '../services/trailsService';
import { ref, onMounted } from 'vue';
import { defineStore } from 'pinia';
import type { Trail } from '../types';

export const useTrailsStore = defineStore('trails', () => {
  // Trails that are going to be shown
  const selectedTrails = ref<Trail[]>([]);

  onMounted(async () => {
    // Load the first trails to show on page
    const trails = await trailsService.obtainRandomTrails(9);
    selectedTrails.value = trails;
  });

  return {
    selectedTrails
  };
});
