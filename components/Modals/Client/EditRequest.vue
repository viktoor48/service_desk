<script setup lang="ts">
import { VueFinalModal, useVfm } from 'vue-final-modal'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useAuthStore } from '~/store/auth'

const emit = defineEmits<{
  (e: 'confirm'): void
}>()

const store = useAuthStore()
const employers = ref()

interface CreateRequestForm {
  requestTitle?: string
  requestBuilding?: string
  requestCabinet?: string
  requestExecutor?: string
  requestDescription?: string
  requestType?: string
}

const vfm = useVfm()

const selectedRequest = computed(() => {
  return store.getTargetRequest
})

const executors = ref()
const typeRequests = ref()

watch(selectedRequest, (newValue, oldValue) => {
  executors.value = newValue.workers
  console.log(executors.value)
})

await store.fetchWorkers()
await store.fetchTypeRequests()
employers.value = store.getWorkers
typeRequests.value = store.getTypeRequest

const getEmployers = computed(() => {
  return employers.value
})

// Правила валидации полей
const createRequestValidationSchema = yup.object().shape({
  requestBuilding: yup.string().required().min(1, 'Минимум 1 символ'),
  requestCabinet: yup.string().required().min(1, 'Минимум 1 символ'),
  requestDescription: yup
    .string()
    .max(190, 'Описание должно содержать максимум 190 символов'),
})

const { values, meta } = useForm<CreateRequestForm>({
  validationSchema: createRequestValidationSchema,
})
const isLoading = ref<boolean>(false)
const apiURL = useRuntimeConfig().public.apiURL
const requestErrorMessage = ref<string>('')

const isEnabled = computed(() => {
  return meta.value.valid && !isLoading.value
})

const getTypeRequest = computed(() => {
  return typeRequests.value.reduce((acc: any, request: any) => {
    acc.push(request.name)
    return acc
  }, [])
})

const getSelectedTypeRequest = computed(() => {
  const name = values.requestType
  return typeRequests.value.filter((request: any) => request.name === name)
})

console.log(getTypeRequest.value)

async function sendForm() {
  isLoading.value = true
  const requestId = selectedRequest.value.id

  const data = {
    cabinet: values.requestCabinet,
    numberBuilding: values.requestBuilding,
    description: values.requestDescription,
    typeRequest: getSelectedTypeRequest.value[0],
  }

  console.log(data)

  try {
    const isSuccess = await store.editRequest(requestId, data)

    if (isSuccess) {
      closeForm()
      emit('confirm')
    }
    else {
      throw new Error('response not ok')
    }
  }
  catch (e) {
    requestErrorMessage.value = 'Что-то пошло не так!'
  }
  finally {
    isLoading.value = false
    window.location.reload()
  }
}

function closeForm() {
  requestErrorMessage.value = ''
  isLoading.value = false
  vfm.close('ClientEditRequest')
}
</script>

<template>
  <VueFinalModal
    modal-id="ClientEditRequest"
    content-class="fixed h-full overflow-y-auto inset-0 sm:rounded-3xl bg-white p-10 md:bottom-auto md:left-1/2 md:right-auto md:top-1/2 md:w-[640px] md:-translate-x-1/2 md:-translate-y-1/2"
  >
    <form @submit.prevent="sendForm">
      <!-- Тайт popUp + Button для его закрытия -->
      <div
        class="flex w-full content-center items-center justify-between md:inline-block"
      >
        <p
          class="text-center font-title text-title-sm font-bold sm:text-title-md"
        >
          Изменение заявки
        </p>
        <button
          type="button"
          class="block md:absolute md:right-6 md:top-6"
          @click="closeForm()"
        >
          <div class="relative flex size-6">
            <span
              class="absolute top-[7px] h-0.5 w-full translate-y-1 rotate-45 bg-black"
            />
            <span
              class="absolute bottom-[7px] h-0.5 w-full -translate-y-1 -rotate-45 bg-black"
            />
          </div>
        </button>
      </div>
      <div class="mt-7 flex flex-col gap-2.5">
        <!-- Поля, который проходят валидацию: Имя, телефон, почта, название компании -->
        <InputSelectText
          name="requestType"
          text="Тип заявки"
          :options="getTypeRequest"
          :default-value="selectedRequest?.typeRequest.name"
        />
        <InputText
          name="requestCabinet"
          type="text"
          text="Кабинет"
          :value="selectedRequest?.cabinet"
        />
        <InputText
          name="requestBuilding"
          type="text"
          text="Корпус"
          :value="selectedRequest?.numberBuilding"
        />
        <!-- Опциональные поля: -->
        <InputTextArea
          name="requestDescription"
          type="text"
          text="Описание проблемы"
          :value="selectedRequest?.description"
        />
        <Button
          :loading="isLoading"
          :disabled="!isEnabled"
          loading-text="Отправка"
          type="submit"
        >
          Сохранить
        </Button>
        <p v-if="requestErrorMessage.length" class="text-red">
          {{ requestErrorMessage }}
        </p>
      </div>
    </form>
  </VueFinalModal>
</template>

<style scoped></style>
