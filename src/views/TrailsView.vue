<script setup lang="ts">
  import { useTrailsStore } from '../stores/trails.js';
  import TrailCard from '../components/TrailCard.vue';

  const trails = useTrailsStore()
</script>

<template>
  <main>
    <div class="flex">
      <h1>Explore some trails</h1>
      <div class="cards-container">
        <TrailCard 
          v-for="(trail, i) in trails.selectedTrails" 
          :key="i" 
          :trail="trail" 
        />
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
  .cards-container {
    display: grid;
    gap: 2rem;
    margin: 2rem;

    @media (min-width: 1200px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (min-width: 992px) and (max-width: 1199px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 991px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
</style>
