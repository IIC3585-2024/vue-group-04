<template>
  <div class="flex">
    <div v-if="loading">
      <Loader />
    </div>
    <div v-else-if="error">
      <ErrorMessage :error="error" />
    </div>
    <div v-else>
      <div class="trail">
        <Carrousel :pictures="trail.pictures" />
        <div class="trail__head">
          <div class="trail__title">{{ trail.title }}</div>
        </div>
        <div class="trail__content">
          <div class="trail__activity">
            <Badge icon="hiking" :text="trail.activity" />
            <div class="trail__icons">
              <Rating :score="trail.stats.rank" />
              <Favorite
                :isFavorite="favoritesStore.isFavorite(trail.id)"
                @click="favoritesStore.toggleFavorite(trail.id)"
              />
            </div>
          </div>
          <div class="trail__description">{{ trail.description }}</div>
          <div class="trail__minimap">
            <MiniMap :latitude="trail.latitude" :longitude="trail.longitude"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Loader from '@/components/Loader.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import Badge from '@/components/Badge.vue'
import Carrousel from '@/components/Carrousel.vue'
import Rating from '@/components/Rating.vue'
import Favorite from '@/components/Favorite.vue'
import { getTrail } from '@/services/trailsService'
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useFavoritesStore } from '@/stores/favorites'
import type { Trail } from '@/types/Trail'
import MiniMap from '@/components/MiniMap.vue'

const route = useRoute()
const loading = ref(true)
const trail = ref({} as Trail)
const error = ref<Error | null>(null)

const favoritesStore = useFavoritesStore()

const id = route.params.id as string

watch(
  route,
  async () => {
    loading.value = true
    error.value = null

    try {
      trail.value = await getTrail(id)
    } catch (e) {
      if (e instanceof Error) {
        error.value = e
      }
    } finally {
      loading.value = false
    }
  },
  { immediate: true }
)
</script>

<style scoped lang="scss">
.trail {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: var(--sizing-sm);
  margin: var(--spacing-5) var(--spacing-3) var(--spacing-5) var(--spacing-3);
  padding: var(--spacing-1);

  &__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
  }

  &__title {
    font-size: var(--font-size-med);
    font-weight: bold;
  }

  &__activity {
    margin-bottom: var(--spacing-1);
    margin-top: var(--spacing-1);
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  &__icons {
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-2);
  }

  &__minimap {
    width: 100%;
    height: 100%;
  }
}
</style>
