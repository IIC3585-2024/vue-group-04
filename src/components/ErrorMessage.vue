<template>
  <div class="error">
    <h1>Ha habido un error al cargar la página</h1>
    <div class="error__message">{{ message }}</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const error = defineProps({
  error: {
    type: Error,
    required: true
  }
})

const message = error.error.message
</script>

<style scoped lang="scss">
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__message {
    margin-top: 1rem;
    font-size: 1.5rem;
  }
}
</style>
