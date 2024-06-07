<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Carrousel from '@/components/Carrousel.vue'
import MapComponent from '@/components/Map.vue';
import Tooltip from '@/components/Tooltip.vue';
import { obtainRandomTrails } from '@/services/trailsService';
import type { Trail } from '@/types/Trail'

const trails = ref<Trail[]>([])

onMounted(async () => {
  trails.value = await obtainRandomTrails(4)
});

</script>

<template>
  <main>
    <div class="home__section">
      <div class="flex">
        <div class="home__greetings">
      <h2 class="home__app">Outdoor Life</h2>
      <h1 class="home__title">
        Discover the <span class="home__title--highlight">best trails</span> in the world!
      </h1>
      <p>
        Get personalized trail recommendations, read reviews and view maps. Outdoor Life makes your
        hiking adventures easy and enjoyable.
      </p>
    </div>
    <div class="home__images">
      <div class="home__vimages">
          <Tooltip
            v-for="(trail, index) in trails.slice(0, 2)"
            :title="trail.title"
          >
            <a :href="'/trails/' + trail.id">
                <Carrousel 
                  v-if="index === 0"
                  :pictures="trail.pictures"
                  type="hidden" 
                  :automaticSlide="true" 
                />
                <img 
                  v-else
                  class="home__image" 
                  :src="trail.pictures[0]"
                  :alt="'Picture trail ' + trail.id" 
                />
            </a>
          </Tooltip>
      </div>
      <div class="home__vimages">
          <Tooltip 
            v-for="trail in trails.slice(2)"  
            :title="trail.title"
          >
            <a 
              :href="'/trails/' + trail.id"
            >
              <img 
                class="home__image" 
                :src="trail.pictures[0]"
                :alt="'Picture trail ' + trail.id" 
              />
            </a>
          </Tooltip>
      </div>
    </div>
      </div>
      <MapComponent />
    </div>
  </main>
</template>

<style lang="scss">
.flex {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-3);
}

	.home {

    &__section {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: space-between;
      flex-wrap: wrap;
      flex: 0.6;
      gap: var(--spacing-3);
      padding: var(--spacing-5);
    }

		&__greetings {
			display: flex;
			flex-direction: column;
			justify-content: center;
      width: 30%;
		}

		&__app {
			color: var(--color-primary);
		}

		&__title {
			font-size: var(--font-size-xlg);
			font-weight: 500;
			color: var(--color-primary);
			margin: 0 0 var(--spacing-3) 0;

			&--highlight {
				font-weight: 700;
				color: var(--color-highlight);
			}
		}

		&__images {
			display: flex;
			flex-direction: row;
			justify-content: center;
			flex-wrap: wrap;
			align-items: center;
			gap: var(--spacing-5);
		}

		&__vimages {
			width: var(--size-20);
			display: flex;
			flex-direction: column;
			gap: var(--spacing-5);
		}

		&__image {
			border-radius: var(--border-radius-3);
			margin: 0 0 var(--spacing-5) 0;
			width: 100%;
			box-shadow: var(--shadow);
			cursor: pointer;
		}
	}
</style>
