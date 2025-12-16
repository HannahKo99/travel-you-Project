<script setup>
import PrivateChatWindow from '@/components/chat/PrivateChatWindow.vue'
import PostingChoiceModal from '@/components/modals/PostingChoiceModal.vue'
import AppFABs from '@/components/shared/AppFABs.vue'
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppSidebar from './components/AppSidebar.vue'
// 1. 引入 AI 聊天視窗
import ChatWindow from '@/components/chat/ChatWindow.vue'

const isMobileMenuOpen = ref(false)
const isPostingModalOpen = ref(false)
const isPrivateChatOpen = ref(false)

// 2. 控制 AI 視窗的變數
const isAiChatOpen = ref(false)

const handleOpenPosting = () => {
  isPostingModalOpen.value = true
}
const handleSelectDiscussion = () => {
  isPostingModalOpen.value = false
}
const handleSelectFindTraveler = () => {
  isPostingModalOpen.value = false
}
const handleQuickAction = () => {
  alert('抽卡功能開發中')
}

const handleTogglePrivateChat = () => {
  isPrivateChatOpen.value = !isPrivateChatOpen.value
  isAiChatOpen.value = false // 互斥：關掉 AI
}

// 3. 修改：切換 AI 視窗
const handleToggleAiChat = () => {
  isAiChatOpen.value = !isAiChatOpen.value
  isPrivateChatOpen.value = false // 互斥：關掉私人
}
</script>

<template>
  <div class="min-h-screen bg-[#f5e6d3] pixel-bg relative">
    <AppHeader @toggle-mobile-menu="isMobileMenuOpen = !isMobileMenuOpen" />

    <div class="flex pt-16 md:pt-18 max-w-[1600px] mx-auto min-h-screen">
      <AppSidebar />
      <main class="lg:ml-[280px] w-full pb-24 md:pb-20 px-2 md:px-4">
        <RouterView />
      </main>
    </div>

    <AppFABs
      @open-posting="handleOpenPosting"
      @quick-action="handleQuickAction"
      @toggle-private-chat="handleTogglePrivateChat"
      @toggle-ai-chat="handleToggleAiChat"
    />

    <PostingChoiceModal
      v-if="isPostingModalOpen"
      @close="isPostingModalOpen = false"
      @select-discussion="handleSelectDiscussion"
      @select-find-traveler="handleSelectFindTraveler"
    />

    <PrivateChatWindow v-if="isPrivateChatOpen" @close="isPrivateChatOpen = false" />

    <ChatWindow v-if="isAiChatOpen" @close="isAiChatOpen = false" />
  </div>
</template>

<style scoped>
.pixel-bg {
  background-image: url('https://images.unsplash.com/photo-1618083707368-b3823daa2726?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
