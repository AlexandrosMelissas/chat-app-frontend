<template>
  <div class="h-screen w-full bg-light-700">
    <div class="grid grid-cols-5 gap-4 h-full p-10">
      <ChatListVue class="col-span-1" />
      <router-view class="col-span-4" />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { onMounted, onUnmounted } from '@vue/runtime-core'
import { useAuth } from '../../auth/Auth.hook'
import { useWebSocket } from '../../reusable/hooks/useWebSocket'
import ChatListVue from '../components/ChatList.vue'

const { fetchUserWithToken } = useAuth()
const { connect, disconnect } = useWebSocket()
onMounted(async () => {
  connect()
  await fetchUserWithToken()
})

onUnmounted(() => {
  disconnect()
})
</script>

<style scoped>
</style>
