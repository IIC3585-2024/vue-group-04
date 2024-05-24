<script setup lang="ts">
import TrailList from '../components/TrailList.vue'
import { useFavoritesStore } from '../stores/favorites'

const favoritesStore = useFavoritesStore()
</script>

<template>
  <main>
    <div class="flex">
      <h1>Favorites</h1>
      <div class="flex">
        <h2 v-if="favoritesStore.noFavorites">Choose some favorite trails</h2>
      </div>
      <TrailList :trails="favoritesStore.favoriteTrails" />
    </div>
  </main>
</template>
