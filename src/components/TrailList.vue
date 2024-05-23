<template>
  <div class="trail-list">
    <SearchBar :handleSearch="handleSearch" placeholder="Search for a trail" />
    <div class="trail-list__content">
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
  </div>
</template>

<script setup lang="ts">
import type { Trail } from '../types/Trail'
import TrailCard from '../components/TrailCard.vue'
import SearchBar from '../components/SearchBar.vue'
import { useFavoritesStore } from '../stores/favorites'
import { onMounted, ref } from 'vue'
import { getTrails } from '@/services/trailsService'

const trails = ref<Trail[]>([])

const favoritesStore = useFavoritesStore()

const handleSearch = async (value: string) => {
  trails.value = await getTrails({ title: value })
}

onMounted(async () => {
  trails.value = await getTrails()
})
</script>

<style scoped lang="scss">
.trail-list {
  display: flex;
  flex-direction: column;

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
