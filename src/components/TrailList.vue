<template>
    <div class="trail-list">
        <div v-for="(trail, i) in trails" :key="i">
            <RouterLink :to="'/trails/' + trail.id">
            <TrailCard
                :trail="trail"
                :isFavorite="favoritesStore.isFavorite(trail.id)"
                @handle-favorite="favoritesStore.toggleFavorite"
            />
            </RouterLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Trail } from '../types/Trail'
import TrailCard from '../components/TrailCard.vue';
import { useFavoritesStore } from '../stores/favorites';
const favoritesStore = useFavoritesStore();

defineProps(
    {
        trails: Array<Trail>,
    }
)

</script>

<style scoped>
.trail-list {
  display: grid;
  gap: 2rem;


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