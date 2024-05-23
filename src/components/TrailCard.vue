<script setup lang="ts">
import Favorite from './Favorite.vue'

defineProps({
  /**
   * Trail object to display
   */
  trail: {
    type: Object,
    required: true
  },
  /**
   * Boolean to check if the trail is a favorite
   */
  isFavorite: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['handle-favorite'])

</script>

<template>
  <div class="card">
    <div
      class="card__image"
      :style="{ backgroundImage: 'url(' + trail.pictures[0] + ')' }"
    >
      <div class="card__favorite">
        <Favorite
          :isFavorite="isFavorite"
          type="filled"
          @click.stop.prevent="emit('handle-favorite', trail.id)"
        />
      </div>
    </div>
    <h2>{{ trail.title }}</h2>
    <p>{{ trail.description }}</p>
  </div>
</template>

<style scoped lang="scss">
.card {
  padding: var(--size-2);
    border-radius: var(--size-1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0);
  transition: box-shadow 0.5s ease;

  &:hover {
      box-shadow: 0px 354px 99px 0px rgba(163, 163, 163, 0.00), 0px 226px 91px 0px rgba(163, 163, 163, 0.01), 0px 127px 76px 0px rgba(163, 163, 163, 0.03), 0px 57px 57px 0px rgba(163, 163, 163, 0.04), 0px 14px 31px 0px rgba(163, 163, 163, 0.05);
      cursor: pointer;
    }
}

.card {
  padding: var(--size-2);
  border-radius: var(--size-1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.0);
  transition: box-shadow 0.5s ease;

  &:hover {
    box-shadow: 0px 354px 99px 0px rgba(163, 163, 163, 0.00), 0px 226px 91px 0px rgba(163, 163, 163, 0.01), 0px 127px 76px 0px rgba(163, 163, 163, 0.03), 0px 57px 57px 0px rgba(163, 163, 163, 0.04), 0px 14px 31px 0px rgba(163, 163, 163, 0.05);
    cursor: pointer;
  }

  &__image {
    width: 100%;
    height: var(--size-20);
    background-size: cover;
    background-position: center;
    border-radius: 1rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: flex-end;
  }

  &__favorite {
    margin: var(--spacing-2);
  }
}

</style>
