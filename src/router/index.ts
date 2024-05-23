import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/trails',
            name: 'trails',
            component: () => import('../views/TrailsView.vue')
        },
        {
            path: '/favorites',
            name: 'favorites',
            component: () => import('../views/FavoritesView.vue')
        },
        {
          path: '/trails/:id',
          name: 'trail',
          component: () => import('../views/TrailShowView.vue')
        }
    ]
})

export default router
