// src/router/index.js
import DiscussionPage from '@/views/DiscussionPage.vue'
import HomePage from '@/views/HomePage.vue'
import { createRouter, createWebHistory } from 'vue-router'
// 引入新的找旅伴頁面
import FindTravelerPage from '@/views/FindTravelerPage.vue'
// 引入其他頁面，避免路由報錯
import FavoritesPage from '@/views/FavoritesPage.vue'
import FeaturedItineraryPage from '@/views/FeaturedItineraryPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import MyItineraryPage from '@/views/MyItineraryPage.vue'
import ProfilePage from '@/views/ProfilePage.vue'
//購物車
import ShoppingCart from '@/views/ShoppingCartPage.vue'
//結帳
import CheckoutLayout from '@/views/CheckoutLayout.vue'
import Step1Confirm from '@/components/checkout/Step1Confirm.vue'
import Step2Form from '@/components/checkout/Step2Form.vue'
import Step3Review from '@/components/checkout/Step3Review.vue'
import Step4Payment from '@/components/checkout/Step4Payment.vue'
import Step5Done from '@/components/checkout/Step5Done.vue'

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
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    // 雖然你可能還沒創建所有頁面，但先註冊路由可以避免 Sidebar 報錯。
    {
      path: '/cart',
      name: 'cart',
      component: ShoppingCart,
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutLayout,
      children: [
        {
          path: 'step1',
          name: 'CheckoutStep1',
          component: Step1Confirm,
        },
        {
          path: 'step2',
          name: 'CheckoutStep2',
          component: Step2Form,
        },
        {
          path: 'step3',
          name: 'CheckoutStep3',
          component: Step3Review,
        },
        {
          path: 'step4',
          name: 'CheckoutStep4',
          component: Step4Payment,
        },
        {
          path: 'step5',
          name: 'CheckoutStep5',
          component: Step5Done,
        },
      ],
    },
  ],
})

export default router
