<template>
  <div class="trail-list">
    <input
      type="text"
      v-model="search"
      placeholder="Search for a trail"
      class="trail-list__search"
    />
    <div class="trail-list__content">
      <div v-for="trail in filteredTrails" :key="trail.id">
        <RouterLink :to="'/trails/' + trail.id">
          <TrailCard
            :trail="trail"
            :isFavorite="favoritesStore.isFavorite(trail.id)"
            @handle-favorite="favoritesStore.toggleFavorite"
          />
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Trail } from '../types/Trail'
import TrailCard from '../components/TrailCard.vue'
import { useFavoritesStore } from '../stores/favorites'
import { ref, computed } from 'vue'

const favoritesStore = useFavoritesStore()

const props = defineProps<{ trails: Trail[] }>()

const search = ref('')

const filteredTrails = computed(() => {
  if (!search.value) {
    return props.trails
  }
  return props.trails.filter((trail) =>
    trail.title.toLowerCase().includes(search.value.toLowerCase())
  )
})
</script>

<style scoped lang="scss">
.trail-list {
  display: flex;
  flex-direction: column;

  &__search {
    margin-bottom: var(--spacing-2);
    padding: var(--spacing-2);
    border: 1px solid var(--color-border);
    border-radius: var(--size-5);
    box-shadow: var(--shadow);
  }

  &__content {
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
}
</style>
