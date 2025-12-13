<script setup>
import { ref } from 'vue'
import {
  Camera as CameraIcon,
  Edit as EditIcon,
  FileText as FileTextIcon,
  Heart as HeartIcon,
  Settings as SettingsIcon,
  File as FileIcon,
} from 'lucide-vue-next'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const user = userStore.userProfile // 從 Store 取得使用者資料

const activeTab = ref('posts') // 控制下方 Tab 切換 (我的發文 / 我的收藏 / 帳號設定)

const changeCover = () => {
  // 這裡之後可以接上傳圖片功能
  alert('點擊了更換封面圖片')
}

const changeAvatar = () => {
  // 這裡之後可以接上傳頭像功能
  alert('點擊了更換大頭貼')
}
</script>

<template>
  <div class="p-4 md:p-0">
    <div
      class="bg-white rounded-3xl overflow-hidden shadow-lg border-2 border-indigo-100 mb-6 pixel-card"
    >
      <div
        class="h-48 md:h-64 bg-cover bg-center relative"
        :style="{ backgroundImage: `url(${user.coverImage})` }"
      >
        <div class="absolute inset-0 bg-black/10"></div>

        <button
          class="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition opacity-0 hover:opacity-100 group-hover:opacity-100"
          @click="changeCover"
        >
          <CameraIcon class="w-5 h-5" />
        </button>
      </div>

      <div class="bg-[#7c3aed] text-white p-4 md:p-6 relative">
        <div class="flex flex-col md:flex-row items-center md:items-end -mt-16 md:-mt-20">
          <div class="relative group">
            <img
              :src="user.avatar"
              class="w-28 h-28 md:w-36 md:h-36 rounded-2xl border-4 border-white bg-white object-cover shadow-md"
            />
            <button
              class="absolute bottom-2 right-2 bg-indigo-600 p-1.5 rounded-lg border-2 border-white hover:bg-indigo-700 transition"
              @click="changeAvatar"
            >
              <CameraIcon class="w-4 h-4 text-white" />
            </button>
          </div>

          <div class="flex-1 text-center md:text-left mt-3 md:mt-0 md:ml-6 mb-2">
            <h1 class="text-2xl md:text-3xl font-black tracking-wide">{{ user.name }}</h1>
            <p class="text-indigo-200 text-sm font-bold">會員編號: {{ user.id }}</p>

            <div class="flex justify-center md:justify-start space-x-6 mt-4">
              <div class="text-center">
                <div class="text-xl font-bold">{{ user.postsCount }}</div>
                <div class="text-xs text-indigo-200">發文數</div>
              </div>
              <div class="text-center">
                <div class="text-xl font-bold">{{ user.savedCount }}</div>
                <div class="text-xs text-indigo-200">收藏</div>
              </div>
              <div class="text-center">
                <div class="text-xl font-bold">{{ user.likedCount }}</div>
                <div class="text-xs text-indigo-200">按讚</div>
              </div>
            </div>
          </div>

          <button
            class="mb-4 md:mb-2 bg-white text-indigo-600 px-4 py-2 rounded-lg font-bold hover:bg-indigo-50 transition shadow-sm border-2 border-indigo-200 flex items-center"
          >
            <EditIcon class="w-4 h-4 mr-2" />
            編輯資料
          </button>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-2xl shadow-sm border-2 border-gray-100 min-h-[300px] pixel-card">
      <div class="flex border-b-2 border-gray-100">
        <button
          :class="[
            'flex-1 py-4 font-bold text-center flex items-center justify-center transition border-b-4',
            activeTab === 'posts'
              ? 'text-indigo-600 border-indigo-500 bg-indigo-50'
              : 'text-gray-500 border-transparent hover:bg-gray-50',
          ]"
          @click="activeTab = 'posts'"
        >
          <FileTextIcon class="w-5 h-5 mr-2" /> 我的發文
        </button>
        <button
          :class="[
            'flex-1 py-4 font-bold text-center flex items-center justify-center transition border-b-4',
            activeTab === 'saved'
              ? 'text-indigo-600 border-indigo-500 bg-indigo-50'
              : 'text-gray-500 border-transparent hover:bg-gray-50',
          ]"
          @click="activeTab = 'saved'"
        >
          <HeartIcon class="w-5 h-5 mr-2" /> 我的收藏
        </button>
        <button
          :class="[
            'flex-1 py-4 font-bold text-center flex items-center justify-center transition border-b-4',
            activeTab === 'settings'
              ? 'text-indigo-600 border-indigo-500 bg-indigo-50'
              : 'text-gray-500 border-transparent hover:bg-gray-50',
          ]"
          @click="activeTab = 'settings'"
        >
          <SettingsIcon class="w-5 h-5 mr-2" /> 帳號設定
        </button>
      </div>

      <div class="p-8 text-center text-gray-400">
        <div v-if="activeTab === 'posts'">
          <FileIcon class="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p class="text-lg font-bold">還沒有發文</p>
          <p class="text-sm mt-1">快去分享你的旅遊經驗吧！</p>
        </div>
        <div v-if="activeTab === 'saved'">
          <HeartIcon class="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p class="text-lg font-bold">還沒有收藏</p>
          <p class="text-sm mt-1">看到喜歡的文章記得按收藏喔！</p>
        </div>
        <div v-if="activeTab === 'settings'">
          <SettingsIcon class="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p class="text-lg font-bold">帳號設定</p>
          <p class="text-sm mt-1">這裡可以修改密碼和隱私設定</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pixel-card {
  border: 3px solid #8b6f47;
  box-shadow: 4px 4px 0px 0px rgba(139, 111, 71, 0.2);
}
</style>
