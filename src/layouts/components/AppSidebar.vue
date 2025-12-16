<script setup>
import { Bookmark as BookmarkIcon, Heart as HeartIcon, Pin as PinIcon } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()

// 定義選單項目
const menuItems = [
  { name: 'home', label: '為你推薦', iconColor: 'text-amber-800', textColor: 'text-amber-900' },
  { name: 'discussion', label: '討論區', iconColor: 'text-amber-800', textColor: 'text-amber-900' },
  {
    name: 'find_traveler',
    label: '找旅伴',
    iconColor: 'text-amber-800',
    textColor: 'text-amber-900',
  },
  {
    name: 'featured_itinerary',
    label: '精選行程',
    iconColor: 'text-amber-800',
    textColor: 'text-amber-900',
  },
]

const bottomMenuItems = [
  {
    name: 'my_itinerary',
    label: '我的行程',
    iconColor: 'text-amber-800',
    textColor: 'text-amber-900',
  },
  {
    name: 'profile',
    label: '個人檔案',
    iconColor: 'text-amber-700/80',
    textColor: 'text-amber-900',
  },
]

// 跳轉功能
function goToFavorites() {
  // 需確保 router/index.js 有設定 path: '/favorites', name: 'favorites'
  router.push({ name: 'favorites' })
}

function goToCollections() {
  alert('收藏功能開發中')
}
</script>

<template>
  <aside
    class="fixed left-0 top-20 md:top-18 w-64 p-4 hidden lg:flex flex-col z-40 h-[calc(100vh-4rem)] md:h-[calc(100vh-4.5rem)] custom-scrollbar overflow-y-auto aside-nav"
  >
    <div class="flex justify-between mb-4 pb-4 border-b-4 border-amber-300">
      <div
        class="cursor-pointer w-[48%] aspect-square flex flex-col items-center justify-center pixel-button group transition-transform active:translate-y-1"
        @click="goToFavorites"
      >
        <HeartIcon class="w-8 h-8 text-red-600 group-hover:text-red-700 transition fill-red-600" />
        <span class="text-xs font-bold mt-1 text-black">愛心</span>
      </div>

      <div
        class="cursor-pointer w-[48%] aspect-square pixel-button bg-yellow-300 flex flex-col items-center justify-center hover:bg-yellow-400 group transition-transform active:translate-y-1"
        @click="goToCollections"
      >
        <BookmarkIcon
          class="w-8 h-8 text-amber-700 group-hover:text-amber-800 transition fill-amber-700"
        />
        <span class="text-xs font-bold mt-1 text-black">收藏</span>
      </div>
    </div>

    <nav class="space-y-1">
      <RouterLink
        v-for="item in menuItems"
        :key="item.name"
        :to="{ name: item.name }"
        class="nav-item flex items-center p-3 rounded-xl cursor-pointer"
        active-class="active"
      >
        <PinIcon :class="['w-5 h-5 mr-3 fill-amber-800 transform rotate-45', item.iconColor]" />
        <span
          :class="['font-bold', item.textColor]"
          style="text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.8)"
        >
          {{ item.label }}
        </span>
      </RouterLink>

      <div class="my-2 border-t-3 border-amber-300"></div>

      <RouterLink
        v-for="item in bottomMenuItems"
        :key="item.name"
        :to="{ name: item.name }"
        class="nav-item flex items-center p-3 rounded-xl cursor-pointer hover:opacity-70"
        active-class="active"
      >
        <PinIcon :class="['w-5 h-5 mr-3 transform rotate-45', item.iconColor]" />
        <span
          :class="['font-bold', item.textColor]"
          style="text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.8)"
        >
          {{ item.label }}
        </span>
      </RouterLink>
    </nav>
  </aside>
</template>

<style scoped>
.aside-nav {
  border: 4px solid #8b6f47;
  box-shadow:
    5px 5px 0px 0px rgba(139, 111, 71, 0.2),
    inset -2px -2px 0px 0px rgba(255, 255, 255, 0.3);
  font-family: 'Press Start 2P', monospace;
}

/* 確保按鈕樣式 */
.pixel-button:hover {
  border: 3px solid #8b6f47;
  box-shadow:
    3px 3px 0px 0px rgba(139, 111, 71, 0.3),
    inset -1px -1px 0px 0px rgba(255, 255, 255, 0.4);
  background-color: pink;
}
.pixel-button:active {
  box-shadow: none;
}

.nav-item {
  transition: all 0.2s;
  border: 2px solid transparent;
}
.nav-item:hover {
  background-color: #f5e6d3;
  transform: translateX(3px);
  border: 2px solid #d4a574;
  box-shadow: 2px 2px 0px 0px rgba(139, 111, 71, 0.2);
}
.nav-item.active {
  background-color: #fff5e6;
  border: 3px solid #d4a574;
  box-shadow: 3px 3px 0px 0px rgba(139, 111, 71, 0.2);
}
</style>
