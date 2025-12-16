<script setup>
import TripMateIcon from '@/assets/icons/TripMate_icon.png'
import { useUserStore } from '@/stores/user'
import {
  Bell as BellIcon,
  LogOut as LogOutIcon,
  Menu as MenuIcon,
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
  <header class="fixed top-0 left-0 right-2 z-50 h-16 md:h-18 flex items-center">
    <div
      class="cursor-pointer flex header-logo items-center md:space-x-2 mr-2 md:mr-8"
      @click="router.push('/')"
    >
      <img
        :src="TripMateIcon"
        alt="TripMate Logo"
        class="w-30 h-auto md:w-32 md:h-auto object-contain pbject-center"
      />
      <span
        class="relative text-[28px] md:text-[28px] font-另一個好看一點的字體 font-black bg-gradient-to-b from-white to- bg-clip-text text-transparent logo-text before:content-['找旅伴'] before:absolute before:left-0 before:top-0 before:z-[-1] before:text-[35px] before:md:text-[35px] before:font-另一個好看一點的字體 before:font-black before:stroke-gradient"
      >
        找旅伴
      </span>
    </div>

    <div class="hidden lg:flex max-w-xl absolute left-1/2 -translate-x-1/2">
      <input
        type="text"
        placeholder="搜尋文章、行程..."
        class="relative w-[400px] h-[55px] pixel-input bg-white text-base rounded-none text-center"
      />
      <div class="flex items-center ml-2">
        <button class="p-2 hover:bg-gray-100 rounded-full transition cursor-pointer">
          <SearchIcon class="relative text-gray-600" />
        </button>
      </div>
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
.header-logo {
  padding: 25px 50px 15px 10px;
  border-radius: 0px 0px 0px 0px;
  background: linear-gradient(to bottom, rgb(106, 157, 211), rgba(188, 188, 188, 0.755));
  clip-path: polygon(0 0, 100% 0, 92% 100%, 0% 100%);
}
.pixel-input {
  border: 3px solid rgb(106, 157, 211);
  box-shadow: inset 2px 2px 0px 1px rgba(188, 188, 188, 0.755);
  font-size: 16px;
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
