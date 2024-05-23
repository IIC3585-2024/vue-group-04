<script setup lang="ts">
import { obtainRandomTrails } from '../services/trailsService'
import { ref, onMounted } from 'vue'
import TrailList from '../components/TrailList.vue'
import type { Trail } from '../types/Trail'

const trails = ref<Trail[]>([])

onMounted(async () => {
  trails.value = await obtainRandomTrails(9)
})
</script>

<template>
  <main>
    <div class="flex">
      <h1>Explore some trails</h1>
      <div class="container">
        <TrailList :trails="trails" />
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.trail-list {
  margin: 2rem;
}
</style>
