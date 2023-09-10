<script setup lang="ts">
import { ref } from 'vue'

const logText = ref(null)

const submit = () => {
  console.log(logText.value);
  logText.value = null;
}

</script>

<template>
  <div class="mb-5">
    <form @submit.prevent="submit">
      <input type="text" class="input input-sm" v-model="logText" autofocus>
    </form>
  </div>
</template>

