<template>
  <div class="carousel">
    <div class="carousel__toggle" @click="previousSlide">
      <i class="material-icons">arrow_circle_left</i>
    </div>
    <div class="carousel__images" @click="nextSlide">
      <div
        v-for="(slide, index) in pictures"
        :key="index"
        :class="{ active: index === currentSlide }"
      >
        <img class="carousel__image" :src="slide" :alt="`Slide ${index + 1}`" />
      </div>
    </div>
    <div class="carousel__toggle" @click="nextSlide">
      <i class="material-icons">arrow_circle_right</i>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const { pictures } = defineProps<{
  pictures: string[]
}>()

const currentSlide = ref(0)

function nextSlide() {
  console.log('nextSlide')
  currentSlide.value = (currentSlide.value + 1) % pictures.length
}

function previousSlide() {
  console.log('previousSlide')
  currentSlide.value = (currentSlide.value - 1 + pictures.length) % pictures.length
}
</script>

<style scoped lang="scss">
.carousel {
  display: flex;

  &__toggle {
    display: flex;
    padding: var(--spacing-1);
    align-items: center;
    cursor: pointer;
    user-select: none;
  }

  &__images > :not(.active) {
    display: none;
  }

  &__image {
    border-radius: var(--border-radius-3);
    margin: 0 0 var(--spacing-1) 0;
    width: 100%;
    aspect-ratio: 1/1;
    box-shadow: var(--shadow);
  }
}
</style>
