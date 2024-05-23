<template>
  <div class="rating">
    <FontAwesomeIcon class="rating__star" :icon="['fas', 'star']" />
    <div>{{ score }}</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

defineProps({
  score: {
    type: String,
    required: true
  }
})
</script>

<style scoped lang="scss">
.rating {
  display: flex;
  align-items: center;
  gap: var(--spacing-1);

  &__star {
    color: #f1c40f;
  }
}
</style>
