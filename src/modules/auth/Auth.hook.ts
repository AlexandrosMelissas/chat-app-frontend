import axios, { AxiosResponse } from 'axios'
import { reactive, computed, ComputedRef } from 'vue'
import { User } from '../user/models/User'

interface AuthState {
    loading: number,
    token: string | null
    user: User | null
}

interface ChatGetters {
  getLoading: ComputedRef<number>
  isLoggedIn: ComputedRef<boolean>
  getToken: ComputedRef<string | null>
  getUser: ComputedRef<User | null>
}

const state: AuthState = reactive({
  loading: 0,
  token: localStorage.getItem('token') ?? null,
  user: null
})

export const getters: ChatGetters = {
  getLoading: computed(() => state.loading),
  isLoggedIn: computed(() => (state.user !== null && state.token !== null && localStorage.getItem('token') !== null)),
  getToken: computed(() => state.token),
  getUser: computed(() => state.user)
}

// Methods
export const useAuth = () => {
  // Login
  const login = async (usernameOrEmail: string, password: string) => {
    try {
      state.loading++
      const response = await axios.post('http://localhost:3000/auth/login', {
        usernameOrEmail,
        password
      }) as AxiosResponse<User>

      state.user = response.data
      state.token = response.data.jwtToken

      if (state.token !== null) {
        localStorage.setItem('token', state.token)
        axios.defaults.headers.common.Authorization = `Bearer ${state.token}`
      }

      return response.data
    } catch (e) {
      console.log(e)
    } finally {
      state.loading--
    }
  }

  const fetchUserWithToken = async () => {
    try {
      const res = await axios.get('http://localhost:3000/auth/me') as AxiosResponse<User>

      state.user = res.data
    } catch (e) {
      console.log(e)
    }
  }

  // Logout
  const logout = () => {
    state.token = null
    localStorage.removeItem('token')
    state.user = null
  }

  return {
    login,
    logout,
    fetchUserWithToken
  }
}
