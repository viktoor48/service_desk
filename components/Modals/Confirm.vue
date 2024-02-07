<script setup lang="ts">
import { VueFinalModal, useVfm } from 'vue-final-modal'

const vfm = useVfm()
</script>

<template>
  <VueFinalModal
    content-class="fixed inset-0 z-20 sm:rounded-3xl bg-white p-10 md:bottom-auto md:left-1/2 md:right-auto md:top-1/3 md:w-[640px] md:-translate-x-1/2 md:-translate-y-1/4"
    modal-id="confirm"
  >
    <div>
      <button type="button" class="absolute right-6 top-6" @click="vfm.close('confirm')">
        <div class="relative flex size-6">
          <span class="absolute top-[7px] h-0.5 w-full translate-y-1 rotate-45 bg-black" />
          <span class="absolute bottom-[7px] h-0.5 w-full -translate-y-1 -rotate-45 bg-black" />
        </div>
      </button>
      <img src="~/assets/images/Emoji.svg?url" class="mx-auto" alt="">
      <p class="mt-5 text-center font-title text-title-sm font-bold sm:text-title-md">
        Успешно
      </p>
    </div>
  </VueFinalModal>
</template>

<style scoped>

</style>
