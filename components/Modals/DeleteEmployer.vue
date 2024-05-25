<script setup lang="ts">
import { VueFinalModal, useVfm } from 'vue-final-modal'
import { useAuthStore } from '~/store/auth'

const emit = defineEmits<{
  (e: 'confirm'): void
}>()
const store = useAuthStore()
const vfm = useVfm()

const isDisabled = ref(false)

const isDisabledButton = computed(() => {
  return isDisabled.value
})

const currentEmployer = computed(() => {
  return store.getTargetEmployer
})

watch(currentEmployer, (newValue, oldValue) => {
  console.log(currentEmployer.value)
})

function closeForm() {
  vfm.close('deleteEmployer')
}

async function sendForm() {
  isDisabled.value = true
  const user = store.getUser

  const data = {
    worker_id: (currentEmployer.value as any).id,
    current_user_id: user.id,
  }

  console.log(data)

  try {
    const isSuccess = await store.deleteEmployer(data)

    if (isSuccess) {
      closeForm()
      emit('confirm')
    }
    else {
      throw new Error('response not ok')
    }
  }
  catch (e) {
    console.log(e)
  }
  finally {
    isDisabled.value = false
    window.location.reload()
  }
}
</script>

<template>
  <VueFinalModal
    content-class="fixed inset-0 z-20 sm:rounded-3xl bg-white p-10 md:bottom-auto md:left-1/2 md:right-auto md:top-1/3 md:w-[640px] md:-translate-x-1/2 md:-translate-y-1/4"
    modal-id="deleteEmployer"
  >
    <div>
      <button type="button" class="absolute right-6 top-6" @click="vfm.close('deleteEmployer')">
        <div class="relative flex size-6">
          <span class="absolute top-[7px] h-0.5 w-full translate-y-1 rotate-45 bg-black" />
          <span class="absolute bottom-[7px] h-0.5 w-full -translate-y-1 -rotate-45 bg-black" />
        </div>
      </button>
      <p class="mt-5 text-center font-title text-title-sm font-bold">
        Вы действительно хотите удалить работника?
      </p>
      <div class="m-auto flex max-w-60 items-center justify-between py-8">
        <button :disabled="isDisabledButton" class="disabled:text-gray-dark relative inline-flex h-[53px] items-center justify-center rounded-xl bg-blue px-7 text-[14px] font-semibold uppercase leading-3 text-white transition-colors duration-300 hover:bg-blue-dark disabled:bg-gray" @click="sendForm">
          Да
        </button>
        <button class="disabled:text-gray-dark relative inline-flex h-[53px] items-center justify-center rounded-xl bg-blue px-7 text-[14px] font-semibold uppercase leading-3 text-white transition-colors duration-300 hover:bg-blue-dark" @click="vfm.close('deleteEmployer')">
          Нет
        </button>
      </div>
    </div>
  </VueFinalModal>
</template>

<style scoped>

</style>
