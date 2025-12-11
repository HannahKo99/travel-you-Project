// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/discussion',
      name: 'discussion',
      // 使用 lazy-loading 動態載入，效能較好
      component: () => import('../views/DiscussionPage.vue'),
    },
    {
      path: '/find-traveler',
      name: 'find_traveler',
      component: () => import('../views/FindTravelerPage.vue'),
    },
    {
      path: '/featured',
      name: 'featured_itinerary',
      component: () => import('../views/FeaturedItineraryPage.vue'),
    },
    {
      path: '/my-itinerary',
      name: 'my_itinerary',
      component: () => import('../views/MyItineraryPage.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfilePage.vue'),
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('../views/FavoritesPage.vue'),
    },
  ],
  // 切換頁面時自動捲動到頂部
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
