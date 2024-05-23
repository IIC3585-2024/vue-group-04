<template>
  <div class="search-bar">
    <input
      type="text"
      v-model="search"
      :placeholder="placeholder"
      class="search-bar__input"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import _ from 'lodash'

const search = ref('')

const props = defineProps({
  handleSearch: {
    type: Function,
    required: true
  },
  placeholder: {
    type: String,
    default: 'Search'
  }
})

watch(
  search,
  _.debounce(() => {
    props.handleSearch(search.value)
  }, 300)
)
</script>

<style scoped lang="scss">
.search-bar {
  &__input {
    width: 100%;
    padding: var(--spacing-2);
    border: 1px solid var(--color-border);
    border-radius: var(--size-5);
    box-shadow: var(--shadow);
  }
}
</style>
