<template>
  <div
    @mouseover="mouseOver"
    @mouseleave="mouseLeave"
    @mousemove="mouseMove"
  >
    <slot />
  </div>
  <div v-if="isHovered" :style="{ top: `${y}px`, left: `${x}px` }" class="tooltip">
    {{ title }}
    </div>
</template>
  
<script setup lang="ts">
  import { ref } from 'vue'
  
  defineProps({
    /**
     * Title to display in the tooltip
     */
    title: {
      type: String,
      default: ''
    }
  })
  
  const isHovered = ref(false)
  const x = ref(0)
  const y = ref(0)
  
  function mouseOver(event: MouseEvent) {
    isHovered.value = true
    x.value = event.pageX + 5
    y.value = event.pageY + 5
  }
  
  function mouseMove(event: MouseEvent) {
    x.value = event.pageX + 5
    y.value = event.pageY + 5
  }
  
  function mouseLeave() {
    isHovered.value = false
  }
</script>
  
<style scoped>
  .tooltip {
    font-size: var(--font-size-lg);
    border-radius: var(--border-radius-1);
    padding: var(--spacing-1);
    position: absolute;
    /* From https://css.glass */
    background: rgba(255, 255, 255, 0.5);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    width: var(--size-15);
  }
</style>  