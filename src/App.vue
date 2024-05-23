<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <header>
    <Navbar />
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
  header {
    line-height: 1.5;
    max-height: 100vh;
    width: 100%;
  }

  .logo {
    display: block;
    margin: 0 auto 2rem;
  }

  @media (min-width: 1024px) {
    header {
      display: flex;
      place-items: center;
      width: 100%;
    }

    .logo {
      margin: 0 2rem 0 0;
    }

    header .wrapper {
      display: flex;
      place-items: flex-start;
      flex-wrap: wrap;
    }
  }
</style>
