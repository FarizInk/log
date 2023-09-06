<script setup lang="ts">
import Calendar from './components/Calendar.vue';
import Timeline from './components/Timeline.vue';


onMounted(() => {
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

  // for now using light mode only
  document.documentElement.classList.remove('dark')
})

useHead({
  title: '~',
  bodyAttrs: {
    class: 'bg-black'
  }
})
</script>

<template>
  <div class="flex flex-wrap divide-x divide-blck-50 min-h-screen">
    <main class="w-[100%] md:w-[40%] lg:w-[30%] p-4 max-h-screen overflow-y-auto">
      <Timeline/>
    </main>
    <aside class="flex-1 hidden md:flex items-center justify-center p-10 overflow-hidden max-h-screen">
      <Calendar/>
    </aside>
  </div>
</template>
