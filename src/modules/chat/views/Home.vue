<template>
  <div class="h-screen w-full bg-light-700">
    <div class="grid grid-cols-5 gap-4 h-full p-10">
      <ChatListVue class="col-span-1" />
      <router-view class="col-span-4" />
    </div>
  </div>
</template>

<script setup lang='ts'>
import ChatListVue from '../components/ChatList.vue'
</script>

<style scoped>
</style>
