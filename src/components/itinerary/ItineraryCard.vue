<script setup>
import {
  MapPin as MapPinIcon,
  Calendar as CalendarIcon,
  Bookmark as BookmarkIcon,
  Eye as EyeIcon,
  DollarSign as DollarSignIcon,
  // 🟢 修正 1: 確保引入留言和分享圖示
  MessageCircle as MessageCircleIcon,
  Repeat2 as Repeat2Icon,
} from 'lucide-vue-next'

const props = defineProps({
  itinerary: {
    type: Object,
    required: true,
    default: () => ({}),
  },
})

// 定義 Emit 事件
const emit = defineEmits(['open-detail', 'open-share'])

// 格式化價格
const formatPrice = (price) => {
  return price
    .toLocaleString('en-US', {
      style: 'currency',
      currency: 'TWD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
    .replace('TWD', 'NT$')
}

// 根據 animal 標籤決定圖標
const getAnimalEmoji = (animal) => {
  switch (animal) {
    case 'Cat':
      return '🐱'
    case 'Eagle':
      return '🦅'
    case 'Wolf':
      return '🐺'
    case 'Panda':
      return '🐼'
    default:
      return '🧳'
  }
}
</script>

<template>
  <div
    class="pixel-card bg-white overflow-hidden cursor-pointer transition hover:scale-[1.02] active:scale-[0.98] duration-150"
  >
    <div
      class="relative w-full h-48 md:h-52 overflow-hidden bg-gray-100"
      @click="emit('open-detail', props.itinerary, false)"
    >
      <img
        :src="props.itinerary.coverImage"
        :alt="props.itinerary.title"
        class="w-full h-full object-cover"
      />

      <div
        v-if="props.itinerary.isFeatured"
        class="absolute top-2 right-2 bg-yellow-500 text-gray-900 font-black text-xs px-2 py-1 pixel-card-mini"
      >
        FEATURED
      </div>

      <div
        class="absolute bottom-2 left-2 bg-indigo-600 text-white font-black text-sm px-3 py-1 rounded-full flex items-center shadow-lg"
      >
        <DollarSignIcon class="w-4 h-4 mr-0.5" />
        <span>{{ formatPrice(props.itinerary.price) }}</span>
      </div>
    </div>

    <div class="p-4 flex flex-col space-y-3">
      <div
        v-if="props.itinerary.agencyName"
        class="text-xs font-bold text-orange-600 tracking-wider"
      >
        由 {{ props.itinerary.agencyName }} 服務
      </div>

      <h3
        class="text-lg font-black text-gray-900 line-clamp-2 hover:text-orange-500 transition"
        @click="emit('open-detail', props.itinerary, false)"
      >
        {{ props.itinerary.title }}
      </h3>

      <div class="flex items-center space-x-4 text-sm text-gray-600">
        <div class="flex items-center space-x-1">
          <CalendarIcon class="w-4 h-4 text-green-500" />
          <span>{{ props.itinerary.durationDays }} 天</span>
        </div>
        <div class="flex items-center space-x-1">
          <MapPinIcon class="w-4 h-4 text-red-500" />
          <span class="font-bold line-clamp-1">
            {{ props.itinerary.destinations.join(', ') }}
          </span>
        </div>
      </div>

      <div class="flex items-center justify-between border-t border-gray-100 pt-3">
        <div class="flex items-center space-x-4 text-xs text-gray-500">
          <div class="flex items-center space-x-1">
            <EyeIcon class="w-4 h-4" />
            <span>{{ props.itinerary.totalViews.toLocaleString() }}</span>
          </div>
          <button class="flex items-center space-x-1 hover:text-red-500 transition">
            <BookmarkIcon class="w-4 h-4" />
            <span>{{ props.itinerary.totalSaves.toLocaleString() }}</span>
          </button>
        </div>

        <div class="flex items-center space-x-4 text-gray-500">
          <button
            class="flex items-center space-x-1 hover:text-indigo-600 transition"
            @click.stop="emit('open-detail', props.itinerary, true)"
          >
            <MessageCircleIcon class="w-4 h-4" />
            <span>{{ props.itinerary.comments ? props.itinerary.comments.length : 0 }}</span>
          </button>

          <button
            class="flex items-center space-x-1 hover:text-gray-600 transition"
            @click.stop="emit('open-share', props.itinerary.id)"
          >
            <Repeat2Icon class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pixel-card-mini {
  border: 2px solid #374151;
  box-shadow: 2px 2px 0px 0px rgba(55, 65, 81, 0.5);
}
</style>
