<script setup lang="ts">
  defineProps({
    trail: {
      type: Object,
      required: true
    }
  })
</script>

<template>
  <div class="card">
    <img 
      :src="trail.pictures[0]" 
      :alt="trail.title + ' image'" 
    />
    <h2>{{ trail.title }}</h2>
    <p>{{ trail.description }}</p>
    <i class="material-icons card__icon">favorite</i>
  </div>
</template>

<style scoped lang="scss">

  img {
    border-radius: 1rem;
    width: 100%;
  }

  .card__icon {
    color: var(--color-secondary);
    transition: color 0.5s ease, transform 0.5s ease;
    
    &:hover {
      color: var(--color-highlight);
      transform: scale(1.2);
    }
  }
</style>
