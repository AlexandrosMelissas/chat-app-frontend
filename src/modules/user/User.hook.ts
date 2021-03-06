import axios, { AxiosResponse } from 'axios'
import { reactive, computed, ComputedRef } from 'vue'
import { User } from './models/User'

// Store types
interface UserState {
    loading: number,
    users: User[]
    [x: string]: any
}

interface UserGetters {
  getLoading: ComputedRef<number>
  getUsers: ComputedRef<User[]>
}

const state: UserState = reactive({
  loading: 0,
  users: []
})

export const getters: UserGetters = {
  getLoading: computed(() => state.loading),
  getUsers: computed(() => state.users)
}

export const useUser = () => {
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users') as AxiosResponse<User[]>

      state.users = response.data
    } catch (e) {
      console.log(e)
    }
  }

  const setUserStatus = async (userId: string, online: boolean) => {
    const foundUser = state.users.find(user => user.id === userId)
    if (!foundUser) {
      return
    }

    foundUser.online = online
  }

  return {
    fetchUsers,
    setUserStatus
  }
}
