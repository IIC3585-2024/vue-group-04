<!-- Like component  -->

<script setup lang="ts">
withDefaults(
  defineProps<{
    isFavorite: boolean
    type?: 'filled'
  }>(),
  {
    isFavorite: false,
    type: undefined
  }
)
</script>

<template>
  <div class="favorite" :class="type ? `favorite--${type}` : ''">
    <i class="material-icons favorite__heart" :class="{ 'favorite__heart--active': isFavorite }">
      {{ isFavorite ? 'favorite' : 'favorite_border' }}
    </i>
  </div>
</template>

<style scoped lang="scss">
.favorite {
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: scale(1.1);
    transition: transform 0.5s ease;
  }

  &--filled {
    background-color: var(--color-background-mute);
    border-radius: var(--size-5);
    padding: var(--size-05);
    box-shadow: var(--shadow);
  }

  &__heart {
    color: var(--color-secondary);
    transition:
      color 0.5s ease,
      transform 0.5s ease;

    &--active {
      color: var(--color-highlight);
    }

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
