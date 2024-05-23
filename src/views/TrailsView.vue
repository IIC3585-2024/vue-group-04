<script setup lang="ts">
import TrailList from '../components/TrailList.vue'

</script>

<template>
  <main>
    <div class="flex">
      <h1>Explore some trails</h1>
      <div class="container">
        <TrailList/>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.trail-list {
  margin: 2rem;
}
</style>
