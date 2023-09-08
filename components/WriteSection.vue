<script setup lang="ts">
import { ref } from 'vue'
import Modal from './Modal.vue';

const logText = ref(null)

const submit = () => {
  console.log(logText.value);
  logText.value = null;
}

const isOpen = ref(false)
</script>

<template>
  <div class="mb-5">
    <form @submit.prevent="submit">
      <input type="text" class="input input-sm" v-model="logText" autofocus>
    </form>

    <button type="button" @click="() => isOpen = true"
      class="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
      Open dialog
    </button>
  </div>

  <Modal :isOpen="isOpen" :submit-btn="false" :backdrop-close="false" title="This is Title" @close="() => isOpen = false">
    <div class="mt-2">
      <p class="text-sm text-gray-500">
        Your payment has been successfully submitted. We’ve sent you
        an email with all of the details of your order.
      </p>
    </div>
  </Modal>
</template>

