<template>
  <div class="badge">
    <div v-if="icon">
      <i class="material-icons">{{ icon }}</i>
    </div>
    <div>{{ text }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon?: string
  text: string
}>()
</script>

<style scoped>
.badge {
  display: flex;
  gap: var(--spacing-1);
  align-items: center;
  background-color: var(--color-secondary);
  padding: 0 var(--spacing-1) 0 var(--spacing-1);
  border-radius: var(--border-radius-3);
  font-size: var(--font-size-sm);

  i {
    margin-top: 0.3rem;
    font-size: var(--font-size-med);
  }
}
</style>
