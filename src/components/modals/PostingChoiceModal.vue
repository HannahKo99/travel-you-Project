<script setup>
import { MessageSquare as MessageSquareIcon, Users as UsersIcon } from 'lucide-vue-next'

defineEmits(['close', 'select-discussion', 'select-find-traveler'])
</script>

<template>
  <div
    class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
    @click.self="$emit('close')"
  >
    <div class="pixel-card p-6 w-full max-w-sm bg-[#fffef7] relative animate-pop-in">
      <h3
        class="text-xl font-bold text-gray-800 mb-6"
        style="text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.1)"
      >
        你想發布什麼？
      </h3>

      <div class="space-y-4">
        <button
          @click="$emit('select-discussion')"
          class="w-full flex items-center p-4 bg-orange-300 hover:bg-orange-400 pixel-button border-4 border-black transition-transform active:translate-y-1"
        >
          <MessageSquareIcon class="w-6 h-6 text-orange-700 mr-4" />
          <div class="text-left">
            <p class="font-bold text-black">發起討論</p>
            <p class="text-xs text-gray-700">分享經驗或尋求建議</p>
          </div>
        </button>

        <button
          @click="$emit('select-find-traveler')"
          class="w-full flex items-center p-4 bg-green-300 hover:bg-green-400 pixel-button border-4 border-black transition-transform active:translate-y-1"
        >
          <UsersIcon class="w-6 h-6 text-green-700 mr-4" />
          <div class="text-left">
            <p class="font-bold text-black">尋找旅伴</p>
            <p class="text-xs text-gray-700">找到志同道合的夥伴</p>
          </div>
        </button>
      </div>

      <button
        @click="$emit('close')"
        class="mt-6 w-full py-2 text-sm text-gray-600 hover:text-gray-800 pixel-button bg-gray-200 border-4 border-black font-bold transition-transform active:translate-y-1"
      >
        取消
      </button>
    </div>
  </div>
</template>

<style scoped>
/* 簡單的彈出動畫 */
@keyframes popIn {
  0% {
    transform: scale(0.9);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
.animate-pop-in {
  animation: popIn 0.15s ease-out forwards;
}

/* 確保按鈕樣式正確 (如果 main.css 沒吃到，這裡補強) */
.pixel-card {
  border: 3px solid #8b6f47;
  box-shadow:
    4px 4px 0px 0px rgba(139, 111, 71, 0.2),
    inset -1px -1px 0px 0px rgba(255, 255, 255, 0.3);
}
.pixel-button {
  box-shadow:
    3px 3px 0px 0px rgba(139, 111, 71, 0.3),
    inset -1px -1px 0px 0px rgba(255, 255, 255, 0.4);
}
.pixel-button:active {
  box-shadow: none;
}
</style>
