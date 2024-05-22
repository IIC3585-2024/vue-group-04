<script setup lang="ts">
  defineProps({
    trail: {
      type: Object,
      required: true
    }
  })
</script>

<template>
  <div class="trail-card">
    <img 
      :src="trail.pictures[0]" 
      :alt="trail.title + ' image'" 
    />
    <h2>{{ trail.title }}</h2>
    <p>{{ trail.description }}</p>
    <i class="material-icons favorite-icon">favorite</i>
  </div>
</template>

<style scoped lang="scss">
  .trail-card {
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.0);
    transition: box-shadow 0.5s ease;

    &:hover {
      box-shadow: 0px 354px 99px 0px rgba(163, 163, 163, 0.00), 0px 226px 91px 0px rgba(163, 163, 163, 0.01), 0px 127px 76px 0px rgba(163, 163, 163, 0.03), 0px 57px 57px 0px rgba(163, 163, 163, 0.04), 0px 14px 31px 0px rgba(163, 163, 163, 0.05);
      cursor: pointer;
    }
  }

  img {
    border-radius: 1rem;
    width: 100%;
  }

  .favorite-icon {
    color: var(--color-secondary);
    transition: color 0.5s ease, transform 0.5s ease;
    
    &:hover {
      color: var(--color-highlight);
      transform: scale(1.2);
    }
  }
</style>
