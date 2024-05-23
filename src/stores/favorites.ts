import { ref, watch, onMounted, computed } from 'vue'
import { defineStore } from 'pinia'
import { getTrails } from '../services/trailsService'
import type { Trail } from '../types/Trail'

export const useFavoritesStore = defineStore('favorites', () => {    

    const favorites = ref<number[]>([])
    const trails = ref<Trail[]>([])

    const noFavorites = computed(() => favorites.value.length === 0)

    const favoriteTrails = computed(() => trails.value.filter(trail => isFavorite(trail.id)))

    watch(favorites, () => {
        updateLocalStorage()
    }, {
        deep: true
    })

    onMounted(async () => {
        trails.value = await getTrails()

        const storedFavorites = localStorage.getItem('favorites')
        if (storedFavorites) {
            try {
                favorites.value = JSON.parse(storedFavorites) as number[]
            } catch (error) {
                console.error('Failed to parse favorites from localStorage', error)
                favorites.value = []
            }
        }
    })

    function updateLocalStorage(): void {
        localStorage.setItem('favorites', JSON.stringify(favorites.value))
    }

    function isFavorite(id: number): boolean {
        return favorites.value.includes(id)
    }

    /**
     * Toggles the favorite status of a given trail by its ID.
     * If the trail is already a favorite, it removes it from the favorites.
     * If the trail is not a favorite, it adds it to the favorites.
     *
     * @param {number} id - The ID of the trail to toggle as favorite.
     * @returns {void}
     */
    function toggleFavorite(id: number): void {
        if (isFavorite(id)) {
            favorites.value = favorites.value.filter(favorite => favorite !== id)
        } else {
            favorites.value.push(id)
        }
    }

    return {
        favorites,
        toggleFavorite,
        isFavorite,
        noFavorites,
        favoriteTrails
    }
})