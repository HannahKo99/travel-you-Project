<script setup>
import { useUserStore } from '@/stores/user'
import {
  Bell as BellIcon,
  LogOut as LogOutIcon,
  Menu as MenuIcon,
  Navigation2 as NavigationIcon,
  Search as SearchIcon,
  Settings as SettingsIcon,
  ShoppingCart as ShoppingCartIcon,
  User as UserIcon,
} from 'lucide-vue-next'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

// 控制選單開關
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

// 導航到個人檔案
const goToProfile = () => {
  closeMenu()
  router.push('/profile') // 假設您的路由設定為 /profile
}

//登入頁面
const goToLogin = () => {
  router.push('/login')
}

const handleLogout = () => {
  if (confirm('確定要登出嗎？')) {
    userStore.logout() //這邊是 store 的 layout 函數
    closeMenu()
    router.push('/') //登出後跳轉回首頁
  }
}
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 pixel-header z-50 h-16 md:h-18 flex items-center px-3 md:px-4"
  >
    <div
      class="cursor-pointer flex items-center space-x-1 md:space-x-2 mr-2 md:mr-8"
      @click="router.push('/')"
    >
      <NavigationIcon
        class="w-6 h-6 md:w-8 md:h-8 text-indigo-600 fill-indigo-600 transform rotate-45"
      />
      <span class="text-lg md:text-2xl font-black text-amber-900 tracking-tight logo-text">
        🐱 TripMate
      </span>
    </div>

    <div class="hidden lg:flex flex-1 max-w-xl relative">
      <input
        type="text"
        placeholder="搜尋文章、行程..."
        class="w-full py-3 pl-5 pr-12 pixel-input bg-white text-base rounded-none"
      />
      <SearchIcon class="absolute right-4 top-3.5 w-6 h-6 text-gray-600" />
    </div>

    <div class="flex items-center space-x-2 md:space-x-4 ml-auto">
      <button class="p-2 hover:bg-gray-100 rounded-full transition">
        <BellIcon class="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
      </button>

      <button class="p-2 hover:bg-gray-100 rounded-full transition">
        <ShoppingCartIcon class="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
      </button>

      <div v-if="!userStore.isLoggedIn" class="flex items-center">
        <button
          class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold"
          @click="goToLogin"
        >
          登入/註冊
        </button>
      </div>

      <div v-else class="relative">
        <button
          class="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-lg border-2 border-transparent hover:border-indigo-300 transition overflow-hidden bg-indigo-100"
          @click="toggleMenu"
        >
          <img
            v-if="userStore.userProfile.avatar"
            :src="userStore.userProfile.avatar"
            class="w-full h-full object-cover"
            alt="User Avatar"
          />
          <UserIcon v-else class="w-5 h-5 text-indigo-600" />
        </button>

        <div
          v-if="isMenuOpen"
          class="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border-2 border-gray-100 overflow-hidden animate-fade-in z-50 pixel-dropdown"
        >
          <div class="p-3 border-b border-gray-100 bg-gray-50">
            <p class="font-bold text-gray-800 truncate">{{ userStore.userProfile.name }}</p>
            <p class="text-xs text-gray-500 truncate">{{ userStore.userProfile.id }}</p>
          </div>

          <div class="p-1">
            <button
              class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg flex items-center transition"
              @click="goToProfile"
            >
              <UserIcon class="w-4 h-4 mr-2" />
              個人檔案
            </button>
            <button
              class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg flex items-center transition"
              @click="closeMenu"
            >
              <SettingsIcon class="w-4 h-4 mr-2" />
              設定與隱私
            </button>
            <div class="h-px bg-gray-100 my-1"></div>
            <button
              class="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center transition"
              @click="handleLogout"
            >
              <LogOutIcon class="w-4 h-4 mr-2" />
              登出
            </button>
          </div>
        </div>

        <div v-if="isMenuOpen" class="fixed inset-0 z-40 cursor-default" @click="closeMenu"></div>
      </div>

      <button class="p-2 hover:bg-gray-100 rounded-full lg:hidden">
        <MenuIcon class="w-6 h-6 text-gray-600" />
      </button>
    </div>
  </header>
</template>

<style scoped>
.pixel-header {
  background: linear-gradient(180deg, #ffd5dc 0%, #ffc0cb 100%);
  border-bottom: 4px solid #d4a574;
  box-shadow: 0 4px 0px 0px rgba(139, 111, 71, 0.2);
}

.logo-text {
  text-shadow:
    2px 2px 0px rgba(255, 255, 255, 0.8),
    -1px -1px 0px rgba(139, 111, 71, 0.3);
}

.pixel-input {
  border: 3px solid #c9a882;
  box-shadow: inset 2px 2px 0px 0px rgba(139, 111, 71, 0.1);
}

.pixel-dropdown {
  /* 讓下拉選單也有一點像素風格的陰影 */
  box-shadow:
    4px 4px 0px 0px rgba(139, 111, 71, 0.15),
    0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 0.15s ease-out;
}
</style>
