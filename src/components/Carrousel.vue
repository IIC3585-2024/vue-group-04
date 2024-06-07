<template>
  <div class="carousel">
    <div :class="'carousel__toggle--' + type" @click="previousSlide">
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
    <div :class="'carousel__toggle--' + type" @click="nextSlide">
      <i class="material-icons">arrow_circle_right</i>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// Define and extract props correctly
const props = withDefaults(defineProps<{
  pictures: string[];
  type?: string;
  automaticSlide?: boolean;
}>(), {
  type: 'shown',
  automaticSlide: false
});

const { pictures, automaticSlide } = props;

// Reactive variable to track the current slide
const currentSlide = ref(0);
let intervalId: ReturnType<typeof setInterval>;

function nextSlide() {
  console.log('nextSlide');
  currentSlide.value = (currentSlide.value + 1) % pictures.length;
}

function previousSlide() {
  console.log('previousSlide');
  currentSlide.value = (currentSlide.value - 1 + pictures.length) % pictures.length;
}

function startAutoSlide() {
  intervalId = setInterval(() => {
    nextSlide();
  }, 2000);
}

function stopAutoSlide() {
  if (intervalId) {
    clearInterval(intervalId);
  }
}

onMounted(() => {
  if (automaticSlide) {
    startAutoSlide();
  }
});

onUnmounted(() => {
  stopAutoSlide();
});
</script>

<style scoped lang="scss">
.carousel {
  display: flex;

  &__toggle {
			&--shown {
				display: flex;
				padding: var(--spacing-1);
				align-items: center;
				cursor: pointer;
				user-select: none;
			}

			&--hidden {
				display: none;
			}
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
