<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useStorage } from '@vueuse/core'
import { getTimeline, globalDate } from '~/store';

const { $toast } = useNuxtApp()

const logText = ref(null)
const isLoading = ref(false)

onMounted(() => {
  tinykeys(window, {
    "$mod+KeyK": event => {
      event.preventDefault()
      document.getElementById('input-bcd')?.focus()
    },
  })
})

const submit = async () => {
  const token = useStorage('token', null)
  isLoading.value = true

  const promise = () => new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.post('/api/create', {
        type: 'simple-text',
        content: logText.value
      }, {
        headers: { Authorization: `Bearer ${token.value}` }
      })

      isLoading.value = false
      resolve(data.data)
      globalDate.value = new Date();
      await getTimeline()
    } catch (error) {
      console.log(error);
      reject(error?.response?.data?.message ?? 'Unknown')
      isLoading.value = false
    } finally {
      logText.value = null;
    }
  });

  $toast.promise(promise, {
    loading: 'Loading...',
    success: () => {
      return `New bacod has been posted.`;
    },
    error: (data: any) => data,
  });
}

</script>

<template>
  <form @submit.prevent="submit">
    <input id="input-bcd" type="text" class="input input-sm" v-model="logText" autofocus :disabled="isLoading" placeholder="bacod here..." autocomplete="off">
  </form>
</template>

