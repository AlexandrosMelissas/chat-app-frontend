<template>
  <div class="bg-white rounded rounded-lg py-2 px-2 h-full">
    <div class="flex flex-col h-full ">
      <router-link
        v-for="user in getters.getUsers.value"
        :key="user.id"
        :to="`/chat/${user.id}`"
        class="flex mb-6 hover:bg-light-800 cursor-pointer px-5 py-4 rounded rounded-md"
      >
        <div class="relative">
          <img
            class="rounded rounded-full h-16 w-16 mr-4"
            src="/assets/user-1.jpg"
            alt=""
            srcset=""
          >
          <div
            class="h-4 w-4 border border-2 border-light-100 rounded rounded-full absolute right-1/4 bottom-0"
            :class="user.online ? 'bg-green-300' : 'bg-gray-400'"
          />
        </div>
        <div class="flex flex-col">
          <h3 class="font-semibold text-gray-600 mb-1">
            {{ user.username }}
          </h3>
          <p class="text-gray-500 text-sm font-normal">
            Hi there, How are you?
          </p>
        </div>
        <div class="ml-auto">
          <span class="text-gray-600 font-semibold">
            09:00
          </span>
        </div>
      </router-link>

      <div class="mt-auto w-full">
        <hr class="w-full bg-dark-50 h-0.6 mb-3">
        <Logout class="w-full" />
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { getters, useUser } from '../../user/User.hook'
import { onMounted } from '@vue/runtime-core'
import Logout from '../../auth/components/Logout.vue'

const { fetchUsers } = useUser()

onMounted(async () => {
  await fetchUsers()
  console.log(getters.getUsers.value)
})

</script>

<style scoped>

</style>
