<script setup lang="ts">
import { ref } from 'vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'

const activity = [
  { id: 1, type: 'created', person: { name: 'Chelsea Hagon' }, date: '7d ago', dateTime: '2023-01-23T10:32' },
  { id: 2, type: 'edited', person: { name: 'Chelsea Hagon' }, date: '6d ago', dateTime: '2023-01-23T11:03' },
  { id: 3, type: 'sent', person: { name: 'Chelsea Hagon' }, date: '6d ago', dateTime: '2023-01-23T11:24' },
  {
    id: 4,
    type: 'commented',
    person: {
      name: 'Chelsea Hagon',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    comment: 'Called client, they reassured me the invoice would be paid by the 25th.',
    date: '3d ago',
    dateTime: '2023-01-23T15:56',
  },
  { id: 5, type: 'viewed', person: { name: 'Alex Curren' }, date: '2d ago', dateTime: '2023-01-24T09:12' },
]
</script>

<template>
  <ul role="list" class="space-y-6">
    <li v-for="(activityItem, activityItemIdx) in activity" :key="activityItem.id" class="relative flex gap-x-4">
      <div
        :class="[activityItemIdx === activity.length - 1 ? 'h-6' : '-bottom-6', 'absolute left-0 top-0 flex w-6 justify-center']">
        <div class="w-px bg-blck-100" />
      </div>
      <template v-if="activityItem.type === 'commented'">
        <img :src="activityItem.person.imageUrl" alt="" class="relative mt-3 h-6 w-6 flex-none rounded-full bg-blck-950" />
        <div class="flex-auto rounded-md p-3 ring-1 ring-inset ring-blck-50">
          <div class="flex justify-between gap-x-4">
            <div class="py-0.5 text-xs leading-5 text-gray-400">
              <span class="font-medium text-white">{{ activityItem.person.name }}</span> commented
            </div>
            <time :datetime="activityItem.dateTime" class="flex-none py-0.5 text-xs leading-5 text-gray-400">{{
              activityItem.date }}</time>
          </div>
          <p class="text-sm leading-6 text-white">{{ activityItem.comment }}</p>
        </div>
      </template>
      <template v-else>
        <div class="relative flex h-6 w-6 flex-none items-center justify-center bg-black">
          <div class="h-1.5 w-1.5 rounded-full bg-blck-950 ring-1 ring-blck-50" />
        </div>
        <p class="flex-auto py-0.5 text-xs leading-5 text-gray-400">
          <span class="font-medium text-white">{{ activityItem.person.name }}</span> {{ activityItem.type }} the
          invoice.
        </p>
        <time :datetime="activityItem.dateTime" class="flex-none py-0.5 text-xs leading-5 text-gray-400">{{
          activityItem.date }}</time>
      </template>
    </li>
  </ul>
</template>