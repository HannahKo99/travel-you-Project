<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  Navigation2 as Navigation2Icon,
  Search as SearchIcon,
  Bell as BellIcon,
  ShoppingCart as ShoppingCartIcon,
  User as UserIcon,
  Menu as MenuIcon,
} from 'lucide-vue-next'

const router = useRouter()
const searchQuery = ref('')
const emit = defineEmits(['toggle-mobile-menu'])

function goToHome() {
  router.push({ name: 'home' })
}
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 pixel-header z-50 h-16 md:h-18 flex items-center px-3 md:px-4"
  >
    <div
      @click="goToHome"
      class="cursor-pointer flex items-center space-x-1 md:space-x-2 mr-2 md:mr-8"
    >
      <Navigation2Icon
        class="w-6 h-6 md:w-8 md:h-8 text-indigo-600 fill-indigo-600 transform rotate-45"
      />
      <span
        class="text-lg md:text-2xl font-black text-amber-900 tracking-tight"
        style="
          text-shadow:
            2px 2px 0px rgba(255, 255, 255, 0.8),
            -1px -1px 0px rgba(139, 111, 71, 0.3);
        "
      >
        🐱 TripMate
      </span>
    </div>

    <div class="hidden lg:flex flex-1 max-w-xl relative">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="搜尋文章、行程..."
        class="w-full py-3 pl-5 pr-12 pixel-input bg-white text-base"
        style="font-size: 16px; border-radius: 0"
      />
      <SearchIcon class="absolute right-4 top-3.5 w-6 h-6 text-gray-600" />
    </div>

    <div class="flex items-center space-x-1 md:space-x-3 ml-auto">
      <button class="p-1.5 md:p-2 hover:bg-gray-100 rounded-full">
        <BellIcon class="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
      </button>
      <button class="p-1.5 md:p-2 hover:bg-gray-100 rounded-full">
        <ShoppingCartIcon class="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
      </button>
      <button
        @click="router.push({ name: 'profile' })"
        class="p-1.5 md:p-2 hover:bg-gray-100 rounded-full"
      >
        <UserIcon class="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
      </button>
      <button
        @click="emit('toggle-mobile-menu')"
        class="p-1.5 md:p-2 hover:bg-gray-100 rounded-full lg:hidden"
      >
        <MenuIcon class="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
      </button>
    </div>
  </header>
</template>

<style scoped>
/* Header 樣式 */
.pixel-header {
  background: linear-gradient(180deg, #ffd5dc 0%, #ffc0cb 100%);
  border-bottom: 4px solid #d4a574;
  box-shadow: 0 4px 0px 0px rgba(139, 111, 71, 0.2);
}
.pixel-input {
  border: 3px solid #c9a882;
  box-shadow:
    inset 2px 2px 0px 0px rgba(139, 111, 71, 0.1),
    inset -1px -1px 0px 0px rgba(255, 255, 255, 0.4);
  font-family: 'Pixelify Sans', monospace;
  background: #fffef7;
}
.pixel-input:focus {
  outline: none;
  border-color: #d4a574;
  box-shadow:
    inset 2px 2px 0px 0px rgba(139, 111, 71, 0.15),
    inset -1px -1px 0px 0px rgba(255, 255, 255, 0.5),
    0 0 0 3px rgba(212, 165, 116, 0.2);
}
</style>
