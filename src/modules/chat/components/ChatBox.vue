<template>
  <div class="h-full bg-white rounded rounded-lg flex flex-col p-3">
    <div
      v-if="loading === 0"
      class=" h-full"
    >
      <div
        v-for="message in fetchedMessages"
        :key="message.id"
        class="flex"
      >
        <div class="flex flex-col items-center mr-4">
          <img
            class="rounded rounded-full h-20 w-20"
            src="/assets/user-2.jpg"
            alt=""
            srcset=""
          >
          <span class="text-gray-600 font-semibold">09:00</span>
        </div>
        <div class="py-6 px-6 text-center flex items-center rounded rounded-3xl  rounded-tl-none bg-gray-100">
          <p class="text-gray-700 font-medium">
            {{ message.text }}
          </p>
        </div>
      </div>
    </div>
    <Spinner v-else />

    <div class="mt-auto">
      <MessageInput
        v-model="inputMessage"
        class="mt-auto"
        @sendMessage="sendMessage"
      />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted, computed } from 'vue'
import MessageInput from './MessageInput.vue'
import { getters, useChat } from '../../chat/Chat.hook'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import Spinner from '../../reusable/components/Spinner.vue'
import { useWebSocket } from '../../reusable/hooks/useWebSocket'
const inputMessage = ref<string>('')

const { fetchUserMessages } = useChat()
const fetchedMessages = computed(() => getters.getMessages.value)
const loading = computed(() => getters.getLoading.value)

const { connect, joinRoom, sendMessage: sendMessageWS, listenForMessages } = useWebSocket()
const { params } = useRoute()
onMounted(async () => {
  connect()
  joinRoom(params.userId as string)
  await fetchUserMessages(params.userId as string)
  listenForMessages()
})

onBeforeRouteUpdate(async (to) => {
  joinRoom(to.params.userId as string)
  await fetchUserMessages(to.params.userId as string)
})

const sendMessage = () => {
  if (inputMessage.value) {
    sendMessageWS({
      text: inputMessage.value,
      receiverId: params.userId as string
    })
    inputMessage.value = ''
  }
}
</script>

<style scoped>
</style>
