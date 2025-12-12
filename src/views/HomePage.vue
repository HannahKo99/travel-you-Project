<script setup>
import { ref } from 'vue'
import {
  Sparkles as SparklesIcon,
  Users as UsersIcon,
  Heart as HeartIcon,
  MessageCircle as MessageCircleIcon,
  Repeat2 as Repeat2Icon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from 'lucide-vue-next'
// 🔴 引入新的 Discussions Store
import { useDiscussionsStore } from '@/stores/discussions'
// 🔴 引入新的 Travelers Store
import { useTravelersStore } from '@/stores/travelers'
// 導入詳情和分享組件
import PostDetailModal from '@/components/modals/PostDetailModal.vue'
import ShareModal from '@/components/modals/ShareModal.vue'

// 🔴 初始化兩個 Store
const discussionsStore = useDiscussionsStore()
const travelersStore = useTravelersStore()
const scrollContainer = ref(null)

// 彈窗狀態
const isModalOpen = ref(false)
const selectedPost = ref(null)
const shouldScrollToComments = ref(false)

const scroll = (direction) => {
  if (scrollContainer.value) {
    const scrollAmount = 260
    scrollContainer.value.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }
}

// 處理所有開啟貼文詳情的邏輯
const openPostDetailModal = (post, focusComment = false) => {
  selectedPost.value = post
  shouldScrollToComments.value = focusComment
  isModalOpen.value = true
}

const closePostDetailModal = () => {
  isModalOpen.value = false
  selectedPost.value = null
  shouldScrollToComments.value = false
}

const isShareModalOpen = ref(false)
const shareLink = ref('')

const openShareModal = (postId) => {
  shareLink.value = `https://tripmate.com/post/${postId}`
  isShareModalOpen.value = true
}

const closeShareModal = () => {
  isShareModalOpen.value = false
  shareLink.value = ''
}
</script>

<template>
  <div class="flex flex-col lg:flex-row gap-8 p-4 md:p-0 items-start overflow-x-hidden">
    <div class="w-full lg:w-[calc(100%-610px)]">
      <div class="mb-10 relative group">
        <h2 class="text-xl font-bold text-amber-900 mb-6 mt-4 flex items-center">
          <SparklesIcon class="w-6 h-6 mr-2 text-yellow-500 fill-yellow-500" />
          旅伴推薦
        </h2>

        <button
          @click="scroll('left')"
          class="absolute left-0 top-[60%] -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-amber-900 p-2 rounded-full shadow-xl backdrop-blur-sm transition hover:scale-110 -ml-4 border-2 border-amber-900 flex items-center justify-center"
        >
          <ChevronLeftIcon class="w-6 h-6" />
        </button>

        <div
          ref="scrollContainer"
          class="flex overflow-x-auto space-x-4 pb-4 custom-scrollbar snap-x snap-mandatory scroll-smooth"
        >
          <div
            v-for="item in travelersStore.recommendations"
            :key="item.id"
            class="flex-shrink-0 w-[32%] min-w-[220px] h-48 rounded-[1.5rem] p-4 border-4 border-gray-800 shadow-[4px_4px_0px_0px_rgba(31,41,55,1)] cursor-pointer hover:-translate-y-1 transition relative overflow-hidden group/card bg-gray-800 snap-start"
          >
            <img
              :src="item.image"
              class="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover/card:scale-110 opacity-90"
            />
            <div class="absolute inset-0 bg-black/50 group-hover/card:bg-black/60 transition"></div>

            <div class="relative z-10 h-full flex flex-col justify-between">
              <div class="flex justify-between items-start">
                <span
                  class="bg-indigo-500 text-white border-2 border-white px-2 py-0.5 text-[10px] font-bold rounded -rotate-2 shadow-sm"
                >
                  {{ item.tag }}
                </span>
                <div
                  class="flex items-center bg-red-500 text-white border-2 border-white px-2 py-0.5 text-[10px] font-bold rounded rotate-2 shadow-sm"
                >
                  <UsersIcon class="w-3 h-3 mr-1" />
                  {{ item.people }}
                </div>
              </div>

              <div class="mt-auto text-center">
                <h3
                  class="font-bold text-sm text-white leading-snug mb-2 line-clamp-2"
                  style="text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8)"
                >
                  {{ item.title }}
                </h3>
                <button
                  class="text-[10px] bg-white text-gray-900 border-2 border-gray-900 px-3 py-1 rounded-full font-extrabold hover:bg-gray-100 shadow-lg transition"
                >
                  探索行程
                </button>
              </div>
            </div>
          </div>
        </div>

        <button
          @click="scroll('right')"
          class="absolute right-0 top-[60%] -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-amber-900 p-2 rounded-full shadow-xl backdrop-blur-sm transition hover:scale-110 -mr-4 border-2 border-amber-900 flex items-center justify-center"
        >
          <ChevronRightIcon class="w-6 h-6" />
        </button>
      </div>

      <div>
        <h2 class="text-xl font-bold text-amber-900 mb-6">最新動態</h2>
        <div
          v-for="post in discussionsStore.discussions"
          :key="post.id"
          class="pixel-card p-5 mb-6 hover:translate-x-1 hover:translate-y-1 transition relative bg-[#fffef7]"
        >
          <div class="flex items-center space-x-3 mb-4">
            <img
              :src="post.avatar"
              class="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
            />
            <div>
              <div class="flex items-center space-x-2">
                <span class="font-bold text-gray-800">{{ post.author }}</span>
                <span
                  class="text-xs font-semibold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full"
                >
                  {{ post.spiritAnimal }}
                </span>
              </div>
              <div class="text-xs text-gray-400">{{ post.time }} • 討論區</div>
            </div>
          </div>

          <h3
            @click="openPostDetailModal(post, false)"
            class="text-lg font-bold text-gray-900 mb-2 cursor-pointer hover:text-indigo-600"
          >
            {{ post.title }}
          </h3>

          <p class="text-gray-600 text-sm mb-4 line-clamp-4 leading-relaxed">
            {{ post.content }}
          </p>

          <div class="w-full h-64 rounded-xl overflow-hidden mb-4 border-2 border-amber-100">
            <img
              :src="post.image"
              class="w-full h-full object-cover hover:scale-105 transition duration-500"
            />
          </div>

          <div
            v-if="post.tags && post.tags.length"
            class="flex flex-wrap gap-2 mb-4 border-b border-gray-100 pb-3"
          >
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="text-xs font-medium text-amber-700 bg-amber-100 px-3 py-1 rounded-full cursor-pointer hover:bg-amber-200 transition"
            >
              #{{ tag }}
            </span>
          </div>

          <div class="flex items-center text-gray-400 text-sm pt-1">
            <button class="flex items-center space-x-1 hover:text-red-500 transition mr-6">
              <HeartIcon class="w-4 h-4" /> <span>{{ post.likes }}</span>
            </button>

            <button
              @click="openPostDetailModal(post, true)"
              class="flex items-center space-x-1 hover:text-indigo-600 transition mr-6"
            >
              <MessageCircleIcon class="w-4 h-4" /> <span>{{ post.comments }}</span>
            </button>

            <button class="flex items-center space-x-1 hover:text-yellow-600 transition mr-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </button>

            <button
              @click="openShareModal(post.id)"
              class="ml-auto flex items-center space-x-1 hover:text-gray-600 transition"
            >
              <Repeat2Icon class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="hidden lg:block w-[300px] shrink-0 space-y-6 self-start mt-10">
      <div class="pixel-card p-4 bg-white">
        <h3 class="font-bold text-gray-800 mb-3 text-center">贊助廣告</h3>
        <div
          class="h-[500px] bg-gray-100 rounded-xl flex flex-col items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-300 hover:bg-gray-50 cursor-pointer transition"
        >
          <p class="mb-2 font-bold">直立式廣告</p>
          <p class="text-xs">300 x 500 px</p>
        </div>
      </div>

      <div class="pixel-card p-4 bg-white">
        <h3 class="font-bold text-gray-800 mb-3 text-center">合作夥伴</h3>
        <div
          class="h-[300px] bg-indigo-50 rounded-xl flex flex-col items-center justify-center text-indigo-300 text-sm border-2 border-dashed border-indigo-200 hover:bg-indigo-100 cursor-pointer transition"
        >
          <p class="mb-2 font-bold">方形廣告</p>
          <p class="text-xs">300 x 300 px</p>
        </div>
      </div>
    </div>
  </div>

  <PostDetailModal
    v-if="isModalOpen"
    :post="selectedPost"
    :scroll-to-comments="shouldScrollToComments"
    @close="closePostDetailModal"
  />
  <ShareModal v-if="isShareModalOpen" :post-link="shareLink" @close="closeShareModal" />
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  display: none;
}
.custom-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.pixel-card {
  border: 3px solid #8b6f47;
  box-shadow:
    4px 4px 0px 0px rgba(139, 111, 71, 0.2),
    inset -1px -1px 0px 0px rgba(255, 255, 255, 0.3);
}
</style>
