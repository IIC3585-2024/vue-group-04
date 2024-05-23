<template>
  <div>
    <div v-if="loading">
      <Loader />
    </div>
    <div v-else-if="error">
      <ErrorMessage :error="error" />
    </div>
    <div v-else>{{ JSON.stringify(trail) }}</div>
  </div>
</template>

<script setup lang="ts">
import Loader from '@/components/Loader.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import { getTrail } from '@/services/trailsService'
import { watch, ref } from 'vue'
import type { Ref } from 'vue'
import { useRoute } from 'vue-router'
import type { Trail } from '@/types'

const route = useRoute()
const loading = ref(true)
const trail: Ref<Trail | null> = ref(null)
const error = ref<Error | null>(null)

const id = route.params.id as string

watch(
  route,
  async () => {
    loading.value = true
    error.value = null
    trail.value = null

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

<style scoped></style>
