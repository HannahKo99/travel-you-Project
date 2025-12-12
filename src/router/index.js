// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import DiscussionPage from '@/views/DiscussionPage.vue'
// 引入新的找旅伴頁面
import FindTravelerPage from '@/views/FindTravelerPage.vue'
// 引入其他頁面，避免路由報錯
import FeaturedItineraryPage from '@/views/FeaturedItineraryPage.vue'
import MyItineraryPage from '@/views/MyItineraryPage.vue'
import FavoritesPage from '@/views/FavoritesPage.vue'
import ProfilePage from '@/views/ProfilePage.vue'

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
      name: 'discussion', // 🎯 必須是 'discussion'
      component: DiscussionPage,
    },
    {
      path: '/find-traveler',
      name: 'find_traveler', // 🎯 必須是 'find_traveler'
      component: FindTravelerPage,
    },
    {
      path: '/featured-itinerary',
      name: 'featured_itinerary',
      component: FeaturedItineraryPage,
    },
    {
      path: '/my-itinerary',
      name: 'my_itinerary',
      component: MyItineraryPage,
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: FavoritesPage,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage,
    },
    // 雖然你可能還沒創建所有頁面，但先註冊路由可以避免 Sidebar 報錯。
  ],
})

export default router
