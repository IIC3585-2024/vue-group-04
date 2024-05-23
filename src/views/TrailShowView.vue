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
          <Rating :score="trail.stats.rank" />
        </div>
        <div class="trail__content">
          <div class="trail__activity">
            <Badge icon="hiking" :text="trail.activity" />
          </div>
          <div class="trail__description">{{ trail.description }}</div>
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
import { getTrail } from '@/services/trailsService'
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { Trail } from '@/types/Trail'
import Rating from '@/components/Rating.vue'

const route = useRoute()
const loading = ref(true)
const trail = ref({} as Trail)
const error = ref<Error | null>(null)

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
  }
}
</style>
