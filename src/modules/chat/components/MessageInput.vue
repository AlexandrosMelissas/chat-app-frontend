<template>
  <div class="flex">
    <div class="bg-gray-100 px-6 w-full items-center rounded-3xl  flex">
      <input
        :value="props.modelValue"
        class="ml-4 w-full tracking-wider placeholder-dark-200 border-none bg-gray-100 outline-none"
        placeholder="Type a message"
        type="text"
        @input="$emit('update:modelValue', $event.target.value)"
      >
    </div>
    <div class="col-span-1 flex items-center">
      <div
        class="rounded cursor-pointer flex justify-center items-center bg-green-600 rounded-full h-20 ml-3 w-20"
        @click="$emit('sendMessage')"
      >
        <ion-icon
          class="text-3xl text-white"
          name="send-outline"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
// eslint-disable-next-line no-unused-vars
const emits = defineEmits(['update:modelValue', 'sendMessage'])
// eslint-disable-next-line no-undef
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

</script>

<style scoped>
</style>
