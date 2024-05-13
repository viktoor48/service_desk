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
  requestBuilding?: string
  requestCabinet?: string
  requestDescription?: string
  requestType?: string
  requestDevice?: string
}

const vfm = useVfm()

const selectedRequest = computed(() => {
  return store.getTargetRequest
})

const executors = ref()
const typeRequests = ref()
const devices = ref()
const teacherId = computed(() => {
  return store.getUser?.id
})

watch(selectedRequest, (newValue, oldValue) => {
  executors.value = newValue.workers
  console.log(executors.value)
})

await store.fetchWorkers()
await store.fetchTypeRequests()
await store.fetchDevices()
employers.value = store.getWorkers
typeRequests.value = store.getTypeRequest
devices.value = store.getDevices

console.log(devices.value)

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

const getDevices = computed(() => {
  console.log(devices.value)
  return devices.value.reduce((acc: any, device: any) => {
    if (!Array.isArray(acc))
      acc = []

    acc.push(device.name)
    return acc
  }, [])
})

const getSelectedDevice = computed(() => {
  const name = values.requestDevice
  return devices.value.filter((device: any) => device.name === name)
})

console.log(getTypeRequest.value)

async function sendForm() {
  isLoading.value = true

  const data = {
    status: 'Новая',
    device_id: getSelectedDevice.value[0].id,
    cabinet: values.requestCabinet,
    number_building: values.requestBuilding,
    description: values.requestDescription,
    type_request_id: getSelectedTypeRequest.value[0].id,
    teacher_id: teacherId.value,
  }

  console.log(data)

  try {
    const isSuccess = await store.createRequest(data)

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
  vfm.close('clientCreateRequest')
}
</script>

<template>
  <VueFinalModal
    modal-id="clientCreateRequest"
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
          Оформление заявки
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
          :default-value="getTypeRequest[0]"
        />
        <InputSelectText
          name="requestDevice"
          text="Устройство"
          :options="getDevices"
          :default-value="getDevices[0]"
        />
        <InputText
          name="requestCabinet"
          type="text"
          text="Кабинет"
        />
        <InputText
          name="requestBuilding"
          type="text"
          text="Корпус"
        />
        <!-- Опциональные поля: -->
        <InputTextArea
          name="requestDescription"
          type="text"
          text="Описание проблемы"
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
