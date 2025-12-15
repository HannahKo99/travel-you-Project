<script setup>
import { ref } from 'vue'
import {
  Calendar as CalendarIcon,
  FolderOpen as FolderIcon,
  Plus as PlusIcon,
  Briefcase as BriefcaseIcon,
} from 'lucide-vue-next'
import { useUserStore } from '@/stores/user'
import ItineraryDetailModal from '@/components/modals/ItineraryDetailModal.vue'

const userStore = useUserStore()

const isDetailModalOpen = ref(false)
const selectedItinerary = ref(null)

// 開啟行程詳情 (編輯)
const openItineraryDetail = (itinerary) => {
  selectedItinerary.value = JSON.parse(JSON.stringify(itinerary))
  isDetailModalOpen.value = true
}

// 開啟新增行程 (空白)
const openAddItineraryModal = () => {
  selectedItinerary.value = {
    id: Date.now(),
    title: '',
    startDate: '',
    endDate: '',
    status: 'planning',
    days: [{ day: 1, date: 'Day 1', activities: [] }],
    packingList: [
      { category: '證件', items: [] },
      { category: '衣物', items: [] },
      { category: '電子產品', items: [] },
    ],
  }
  isDetailModalOpen.value = true
}

// 開啟草稿
const openDraft = (draft) => {
  if (draft.type === 'my_itinerary' && draft.data) {
    selectedItinerary.value = JSON.parse(JSON.stringify(draft.data))
    isDetailModalOpen.value = true
  } else {
    alert(`這是 ${draft.typeLabel} 的草稿，請至對應區塊編輯。`)
  }
}

// 處理「暫存草稿」
const handleSaveDraft = (draftItinerary) => {
  const draftItem = {
    id: draftItinerary.id,
    type: 'my_itinerary',
    typeLabel: '我的行程',
    saveTime: new Date().toLocaleString('zh-TW', {
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }),
    title: draftItinerary.title || '未命名行程',
    content: `日期: ${draftItinerary.startDate || '未定'} | 天數: ${draftItinerary.days.length} 天`,
    data: draftItinerary,
  }

  const existingIndex = userStore.drafts.findIndex((d) => d.id === draftItem.id)
  if (existingIndex !== -1) {
    userStore.drafts[existingIndex] = draftItem
  } else {
    userStore.drafts.unshift(draftItem)
  }

  isDetailModalOpen.value = false
}

// 處理儲存 (發布/更新行程)
const handleSaveItinerary = (updatedItinerary) => {
  if (!updatedItinerary.title.trim()) updatedItinerary.title = '新旅程'

  const index = userStore.myItineraries.findIndex((i) => i.id === updatedItinerary.id)

  if (index !== -1) {
    userStore.myItineraries[index] = updatedItinerary
  } else {
    userStore.myItineraries.push(updatedItinerary)
  }

  // 從草稿夾移除
  const draftIndex = userStore.drafts.findIndex((d) => d.id === updatedItinerary.id)
  if (draftIndex !== -1) {
    userStore.drafts.splice(draftIndex, 1)
  }

  isDetailModalOpen.value = false
}

const handleDeleteItinerary = (id) => {
  userStore.deleteItinerary(id)
  const draftIndex = userStore.drafts.findIndex((d) => d.id === id)
  if (draftIndex !== -1) {
    userStore.drafts.splice(draftIndex, 1)
  }
  isDetailModalOpen.value = false
}

// 🟢 修改：顏色對照表
const getTagColor = (type) => {
  if (type === 'discussion') return 'bg-pink-500 text-white border-pink-600' // 🟢 改為粉紅色
  if (type === 'traveler') return 'bg-green-500 text-white border-green-600'
  if (type === 'my_itinerary') return 'bg-indigo-500 text-white border-indigo-600' // 🟢 改為靛藍色
  return 'bg-gray-500 text-white'
}
</script>

<template>
  <div class="p-4 md:p-0">
    <div class="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
      <div
        class="lg:col-start-1 lg:row-start-1 bg-indigo-500 text-white font-black text-2xl p-4 border-none shadow-[4px_4px_0px_0px_rgba(79,70,229,1)] flex items-center rounded-none"
      >
        <div class="flex items-center space-x-3">
          <BriefcaseIcon class="w-6 h-6 text-white fill-indigo-300" />
          <span>我的行程</span>
        </div>
      </div>

      <div
        class="lg:col-start-1 lg:row-start-2 bg-white rounded-xl p-6 pixel-card relative overflow-hidden"
      >
        <div class="flex items-center mb-6 pb-4 border-b-2 border-gray-100">
          <div class="bg-indigo-100 p-2 rounded-lg border-2 border-indigo-200 mr-4">
            <CalendarIcon class="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h3 class="text-xl font-bold text-gray-800">行程列表</h3>
            <p class="text-sm text-gray-500">查看並管理你的旅遊行程</p>
          </div>
        </div>

        <div class="space-y-4">
          <div
            v-for="item in userStore.myItineraries"
            :key="item.id"
            class="border-2 border-gray-200 rounded-lg p-4 hover:border-indigo-400 hover:bg-indigo-50 transition cursor-pointer group"
            @click="openItineraryDetail(item)"
          >
            <div class="flex justify-between items-center">
              <div>
                <h4 class="font-bold text-lg text-gray-800 group-hover:text-indigo-700 mb-1">
                  {{ item.title }}
                </h4>
                <div class="flex items-center text-sm text-gray-500">
                  <span class="bg-gray-100 px-2 py-0.5 rounded text-xs mr-2 border border-gray-300"
                    >日期</span
                  >
                  {{ item.startDate }} - {{ item.endDate }}
                </div>
              </div>
              <div class="text-gray-300 group-hover:text-indigo-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <button
          class="w-full mt-8 bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(79,70,229,0.4)] active:translate-y-1 active:shadow-none border-2 border-indigo-800"
          @click="openAddItineraryModal"
        >
          <PlusIcon class="w-5 h-5 mr-2" />
          新增行程
        </button>
      </div>

      <div class="lg:col-start-2 lg:row-start-2 bg-white rounded-xl p-5 pixel-card">
        <div class="flex items-center mb-6">
          <div class="bg-amber-100 p-2 rounded-lg border-2 border-amber-200 mr-3">
            <FolderIcon class="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h3 class="text-lg font-bold text-gray-800">草稿夾</h3>
            <p class="text-xs text-gray-500">查看你儲存的貼文草稿</p>
          </div>
        </div>

        <div class="space-y-4">
          <div
            v-for="draft in userStore.drafts"
            :key="draft.id"
            class="border border-gray-200 rounded-lg p-3 hover:shadow-md transition bg-gray-50 cursor-pointer"
            @click="openDraft(draft)"
          >
            <div class="flex justify-between items-center mb-2">
              <span
                :class="[
                  getTagColor(draft.type),
                  'text-[10px] px-2 py-0.5 rounded border font-bold',
                ]"
              >
                {{ draft.typeLabel }}
              </span>
              <span class="text-[10px] text-gray-400"
                >儲存於: {{ draft.saveTime.split(' ')[0] }}</span
              >
            </div>
            <h4 class="font-bold text-sm text-gray-800 mb-1 line-clamp-1">{{ draft.title }}</h4>
            <p class="text-xs text-gray-500 line-clamp-2">{{ draft.content }}</p>
          </div>
        </div>
      </div>
    </div>

    <ItineraryDetailModal
      v-if="isDetailModalOpen"
      :itinerary="selectedItinerary"
      @close="isDetailModalOpen = false"
      @save="handleSaveItinerary"
      @save-draft="handleSaveDraft"
      @delete="handleDeleteItinerary"
    />
  </div>
</template>

<style scoped>
.pixel-card {
  border: 3px solid #8b6f47;
  box-shadow:
    4px 4px 0px 0px rgba(139, 111, 71, 0.2),
    inset -1px -1px 0px 0px rgba(255, 255, 255, 0.3);
}
</style>
