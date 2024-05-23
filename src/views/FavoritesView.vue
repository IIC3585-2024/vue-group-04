<script setup lang="ts">
  import { useFavoritesStore } from '../stores/favorites';
  import TrailCard from '../components/TrailCard.vue';

  const favoritesStore = useFavoritesStore();

  const handleFavorite = (id: string) => {
    console.log(id)
  }
</script>

<template>
  <main>
    <div class="flex">
      <h1>Favorites</h1>
      <div class="flex">
        <h2 v-if="favoritesStore.noFavorites">
          Choose some favorite trails
        </h2>
      </div>
      <div class="card__container">
        <TrailCard 
          v-for="(trail, i) in favoritesStore.favorites" 
          :key="i" 
          :trail="trail" 
          :isFavorite="favoritesStore.isFavorite(trail.id)"
          @handle-favorite="favoritesStore.handleFavorite"
        />
      </div>
    </div>
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
