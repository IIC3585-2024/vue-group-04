<template>
  <div class="badge">
    <div v-if="icon">
      <FontAwesomeIcon :icon="icon" />
    </div>
    <div>{{ text }}</div>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

defineProps<{
  icon?: [string, string] | null
  text: string
}>()
</script>

<style scoped>
.badge {
  display: flex;
  gap: var(--spacing-1);
  background-color: var(--color-secondary);
  padding: var(--spacing-1);
  border-radius: var(--border-radius-3);
  font-size: var(--font-size-sm);
}
</style>
