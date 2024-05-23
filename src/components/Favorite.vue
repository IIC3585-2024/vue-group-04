<script setup lang="ts">
defineProps({
  /**
   * Boolean to check if the trail is a favorite
   */
  isFavorite: {
    type: Boolean,
    default: false
  },
  isCard: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <div class="favorite">
    <i 
      class="material-icons favorite__heart"
      :class="{ 
        'favorite__heart_favorite': isFavorite,
        'favorite__heart_card': isCard
      }"
    >
      {{ isFavorite ? 'favorite' : 'favorite_border'}}
    </i>
  </div>
</template>

<style scoped lang="scss">

.favorite {
  display: flex;
  align-items: center;
  gap: var(--spacing-1);

  &__heart {
    color: var(--color-secondary);
    border-radius: var(--size-5);
    transition: color 0.5s ease, transform 0.5s ease;
    
    &_card {
      color: var(--color-background);
      margin: var(--size-05);
      padding: var(--size-05);
      background-color: var(--color-background-30);
      
    }

    &_favorite {
      color: var(--color-highlight);
    }
    
    &:hover {
      cursor: pointer;
    }
  }
}
</style>