<script setup lang="ts">
import TrailList from '../components/TrailList.vue'
import { onMounted, ref } from 'vue'
import { getTrails } from '@/services/trailsService'
import type { Trail } from '@/types/Trail'
import SearchBar from '../components/SearchBar.vue'

const trails = ref<Trail[]>([])

const handleSearch = async (value: string) => {
  trails.value = await getTrails({ title: value })
}

onMounted(async () => {
  trails.value = await getTrails()
})
</script>

<template>
  <main>
    <div class="trails-index">
      <h1>Explore some trails</h1>
      <SearchBar :handleSearch="handleSearch" placeholder="Search for a trail"/>
      <TrailList :trails />
    </div>
  </main>
</template>

<style scoped lang="scss">
.search-bar {
  width: 70%;
}

.trails-index {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-2);
}
</style>
