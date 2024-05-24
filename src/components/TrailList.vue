<template>
  <div class="trail-list">
    <div v-for="trail in trails" :key="trail.id">
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
import TrailCard from '../components/TrailCard.vue'
import { useFavoritesStore } from '../stores/favorites'

defineProps<{
  trails: Trail[]
}>()

const favoritesStore = useFavoritesStore()
</script>

<style scoped lang="scss">
.trail-list {
  display: grid;
  gap: 2rem;
  margin: 0 var(--spacing-4);

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
