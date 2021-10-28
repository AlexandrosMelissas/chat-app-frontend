<template>
  <div>
    <div
      class="w-full cursor-pointer text-dark-100 bg-light-700 px-6 py-3 text-center rounded rounded-md"
      @click="logout"
    >
      Logout
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router'
import { useAuth } from '../Auth.hook'
const router = useRouter()
const logout = () => {
  useAuth().logout()
  router.push('/auth/login')
}

</script>

<style scoped>
</style>
