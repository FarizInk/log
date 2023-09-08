<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: null,
  },
  footer: {
    type: Boolean,
    default: true,
  },
  backdropClose: {
    type: Boolean,
    default: true,
  },
  submitBtn: {
    type: Boolean,
    default: true
  },
  submitText: {
    type: String,
    default: 'Submit'
  },
  cancelBtn: {
    type: Boolean,
    default: true
  },
  cancelText: {
    type: String,
    default: 'Cancel'
  },
  isPreventClose: {
    type: Boolean,
    default: true,
  },
  width: {
    type: String,
    default: 'max-w-md',
  },
  justify: {
    type: String,
    default: 'justify-center',
  },
  align: {
    type: String,
    default: 'items-center',
  },
})

const { isPreventClose } = toRefs(props)
const emit = defineEmits(['close', 'submit'])

function closeModal() {
  emit('close')
}

function submitModal() {
  emit('submit')
  if (!isPreventClose.value) {
    closeModal()
  }
}
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="() => backdropClose ? closeModal() : null" class="relative z-10">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div :class="[justify, align, 'flex min-h-full p-4 text-center']">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel
              :class="[width, 'w-full transform overflow-hidden rounded-2xl bg-black p-6 text-left align-middle shadow-xl transition-all border border-blck-100']">
              <slot name="header">
              </slot>
              
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-white" v-if="title">
                {{ title }}
              </DialogTitle>
              
              <slot />
              
              <slot name="footer" v-if="footer">
                <div class="mt-4 flex gap-2 justify-end">
                  <button type="button" class="btn-simple btn-sm" @click="closeModal" v-if="cancelBtn">
                    {{ cancelText }}
                  </button>

                  <button type="button" class="btn primary btn-sm" @click="submitModal" v-if="submitBtn">
                    {{ submitText }}
                  </button>
                </div>
              </slot>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>