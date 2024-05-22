<script setup lang="ts">
  import TrailCard from '../components/TrailCard.vue';
  import { obtainRandomTrails } from '../services/trailsService';
  import { ref, onMounted } from 'vue';

  const trails = ref();

  onMounted(async () => {
    trails.value = await obtainRandomTrails(9);
  });

</script>

<template>
  <main>

    <!-- Start trails container -->
    <div class="flex">
      <h1>Explore some trails</h1>
      <div class="card__container">
        <TrailCard 
          v-for="(trail, i) in trails" 
          :key="i" 
          :trail="trail" 
        />
      </div>
    </div>
    <!-- End trails container -->

  </main>
</template>

<style scoped lang="scss">
  .card__container {
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
