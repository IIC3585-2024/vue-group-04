import { ref, watch, onMounted, computed } from 'vue'
import { defineStore } from 'pinia'
import { getTrails } from '../services/trailsService'
import type { Trail } from '../types'

export const useFavoritesStore = defineStore('favorites', () => {    

    const favorites = ref<Trail[]>([]);
    
    // TODO: evaluar si hacer el store de trails para tener todos los trails en un solo lugar
    const trails = ref<Trail[]>([]);

    onMounted(async () => {
        trails.value = await getTrails()

        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            try {
                favorites.value = JSON.parse(storedFavorites) as Trail[];
            } catch (error) {
                console.error('Failed to parse favorites from localStorage', error);
                favorites.value = [];
            }
        }
    })

    watch(favorites, () => {
        updateLocalStorage()
    }, {
        deep: true
    })

    function updateLocalStorage(): void {
        localStorage.setItem('favorites', JSON.stringify(favorites.value))
    }

    function isFavorite(id: number): boolean {
        return favorites.value.some(favorite => favorite.id === id)
    }

    function deleteFavorite(id: number): void {
        favorites.value = favorites.value.filter(favorite => favorite.id !== id)
    }

    function addFavorite(id: number): void {
        if (!isFavorite(id)) {
            const trail = trails.value.find(trail => trail.id === id)
            if (trail) {
                favorites.value.push(trail)
            }
        }
    }

    function handleFavorite(id: number): void {
        console.log('handleFavorite', id)
        if (isFavorite(id)) {
            deleteFavorite(id)
        } else {
            addFavorite(id)
        }
    }

    const noFavorites = computed(() => favorites.value.length === 0)

    return {
        favorites,
        handleFavorite,
        isFavorite,
        noFavorites
    }
})