<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/">OutdoorLife</RouterLink>
    <RouterLink to="/trails">Trails</RouterLink>
    <RouterLink to="/favorites">Favorites</RouterLink>
  </nav>
</template>

<style scoped lang="scss">
nav {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  
  font-size: 12px;

  & a.router-link-exact-active {
    color: var(--color-text);
  }

  & a.router-link-exact-active:hover {
    background-color: transparent;
  }

  & a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
  }

  & a:first-of-type {
    border: 0;
  }

  
  & a:hover {
    background-color: var(--color-primary-light);
  }
}

@media (min-width: 1024px) {
  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
  }
}
</style>
