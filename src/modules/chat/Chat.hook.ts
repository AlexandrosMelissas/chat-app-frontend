import axios, { AxiosResponse } from 'axios'
import { reactive, computed, ComputedRef } from 'vue'
import { Message } from './models/Message'

// Store types
interface ChatState {
    loading: number,
    messages: Message[]
    [x: string]: any
}

interface ChatGetters {
  getLoading: ComputedRef<number>
  getMessages: ComputedRef<Message[]>
}

const state: ChatState = reactive({
  loading: 0,
  messages: []
})

export const getters: ChatGetters = {
  getLoading: computed(() => state.loading),
  getMessages: computed(() => state.messages)
}

export const useChat = () => {
  const fetchUserMessages = async (userId: string) => {
    try {
      state.loading++

      const response = await axios.get(`http://localhost:3000/messages/user/${userId}`) as AxiosResponse<Message[]>
      console.log(response.data)
      state.messages = response.data
    } catch (e) {
      console.log(e)
    } finally {
      state.loading--
    }
  }

  const addMessage = (message: Message) => {
    state.messages.push(message)
  }

  return {
    fetchUserMessages,
    addMessage
  }
}
