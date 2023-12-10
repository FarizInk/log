<script setup lang="ts">
import Timeline from '@/components/Timeline.vue';
import WriteSection from '@/components/WriteSection.vue';
import tinykeys from "@/utils/tinykeys";
import axios from 'axios'
// import { token } from '@/store'
import { ref } from 'vue'
import { useStorage } from '@vueuse/core'
import CalendarIcon from '@/icons/CalendarIcon.vue'
import { globalDate } from '@/store';
import { onLongPress } from '@vueuse/core'

onMounted(async () => {
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

  // for now using light mode only
  document.documentElement.classList.remove('dark')

  // trigger modal on key shortcut
  tinykeys(window, {
    "$mod+Shift+KeyF": event => {
      event.preventDefault()
      modalSignIn.value = true
    },
  })
})

useHead({
  title: '~',
  bodyAttrs: {
    class: 'bg-black'
  }
})

const htmlRefHook = ref<HTMLElement | null>(null)
const modalSignIn = ref(false)
const modalMenu = ref(false)
const modalCalendar = ref(false)
const password = ref(null);
const token = useStorage('token', null)

const submitPassword = async () => {
  const { data } = await axios.post('/api/login', {
    password: password.value
  })

  if (data.token && password.value !== null) {
    token.value = data.token
  } else {
    token.value = null
  }

  password.value = null
  modalSignIn.value = false
}

const formatDate = (date) => new Date(date)
  .toLocaleDateString("en-US", {
    // weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

onLongPress(
  htmlRefHook,
  () => !token.value ? modalSignIn.value = true : modalMenu.value = true,
  {
    modifiers: {
      prevent: true
    }
  }
)

const menus = [
  { name: 'Log', description: 'History of my daily bacod.', action: () => null, icon: CalendarIcon },
  { name: 'Tasks', description: 'My Daily Task', action: () => null, icon: CalendarIcon },
]
</script>

<template>
  <Toaster theme="dark" position="top-center" richColors closeButton />
  <Modal :isOpen="modalSignIn" :footer="false" :header="false" title="Password" @close="() => modalSignIn = false">
    <form @submit.prevent="submitPassword">
      <input type="password" class="input input-sm" v-model="password" autofocus autocomplete="off">
    </form>
  </Modal>

  <Modal width="max-w-sm" :isOpen="modalMenu" :header="false" @close="() => modalMenu = false">
    <button type="button" v-for="item in menus" :key="item.name"
      class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-blck-500 w-full outline-none">
      <div class="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-blck-700 group-hover:bg-white">
        <component :is="item.icon" class="h-6 w-6 text-white group-hover:text-blck-50" aria-hidden="true" />
      </div>
      <div class="text-left">
        <div class="font-semibold text-white">
          {{ item.name }}
          <span class="absolute inset-0" />
        </div>
        <p class="text-gray-400 text-sm">{{ item.description }}</p>
      </div>
    </button>

    <template #footer>
      <div :class="['flex divide-x divide-gray-900/5 border-t border-blck-50', token === null ? 'bg-blck-800' : 'bg-red-900/30']">
        <button type="button" v-if="token === null"
        @click="() => {
          modalMenu = false;
          modalSignIn = true;
        }"
          class="flex-1 flex items-center justify-center gap-x-2.5 p-3 font-semibold text-white hover:bg-blck-100 outline-none">
          <CalendarIcon aria-hidden="true" class="h-5 w-5 flex-none text-white" />
          Login
        </button>
        <button type="button" v-else
        @click="() => token = null"
          class="flex-1 flex items-center justify-center gap-x-2.5 p-3 font-semibold text-white hover:bg-red-900 outline-none">
          <CalendarIcon aria-hidden="true" class="h-5 w-5 flex-none text-white" />
          Logout
        </button>
      </div>
    </template>
  </Modal>

  <Modal :isOpen="modalCalendar" :footer="false" :header="false" title="Password" @close="() => modalCalendar = false">
    <CalendarMini />
  </Modal>

  <div class="flex items-center justify-center text-white">
    <div class="container max-w-sm min-h-screen">
      <div class="sticky top-0 z-10 bg-black px-4 py-3">
        <div class="text-center flex items-center justify-center gap-2 mb-3">
          <CalendarIcon class="h-6 text-white cursor-pointer" @click="() => modalCalendar = true" />
          <span ref="htmlRefHook">{{ formatDate(globalDate) }}</span>
        </div>
        <WriteSection v-if="token !== null" />
      </div>
      <div class="px-4">
        <Timeline />
      </div>
    </div>
  </div>
</template>
