<script setup lang="ts">
import { timelinePayload, getTimeline, isTimelineLoading } from '@/store'

onMounted(async () => getTimeline())

const generateTime = (unixTime) => {
  const date = new Date(unixTime)
  return ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
}
</script>

<template>
  <ul role="list" class="space-y-6">
    <li v-for="(item, index) in timelinePayload" :key="index" class="relative flex gap-x-4" v-if="!isTimelineLoading">
      <div
        :class="[index === timelinePayload.length - 1 ? 'h-6' : '-bottom-6', 'absolute left-0 top-0 flex w-6 justify-center']">
        <div class="w-px bg-blck-100" />
      </div>
      <div class="relative flex h-6 w-6 flex-none items-center justify-center bg-black">
        <div class="h-1.5 w-1.5 rounded-full bg-blck-950 ring-1 ring-blck-50" />
      </div>
      <div class="flex-auto rounded-md p-3 ring-1 ring-inset ring-blck-50">
        <div class="flex justify-between gap-x-4">
          <div class="py-0.5 text-xs leading-5 text-gray-400">
            <span class="font-medium text-white">~</span> /bacod
          </div>
          <time :datetime="item.timestamp" class="flex-none py-0.5 text-xs leading-5 text-gray-400">{{
            generateTime(item.timestamp) }}</time>
        </div>
        <p class="text-sm leading-6 text-white">{{ item.content }}</p>
      </div>
    </li>
    <li v-else v-for="item in 7" :key="item" class="relative flex gap-x-4">
      <div class="border border-blck-100 shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div class="animate-pulse flex space-x-4">
          <div class="rounded-full bg-blck-700 h-10 w-10"></div>
          <div class="flex-1 space-y-6 py-1">
            <div class="h-2 bg-blck-700 rounded"></div>
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-4">
                <div class="h-2 bg-blck-700 rounded col-span-2"></div>
                <div class="h-2 bg-blck-700 rounded col-span-1"></div>
              </div>
              <div class="h-2 bg-blck-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>