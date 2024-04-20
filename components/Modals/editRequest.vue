<script setup lang="ts">
import { VueFinalModal, useVfm } from 'vue-final-modal'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useAuthStore } from '~/store/auth'
import { employees, priorityArray, statusArray } from '~/constants/data'

const emit = defineEmits<{
  (e: 'confirm'): void
}>()

const store = useAuthStore()

interface CreateRequestForm {
  requestTitle?: string
  requestDeclarer?: string
  requestPriority?: string
  requestExecutor?: string
  requestDescription?: string
  requestStatus?: string
}

const vfm = useVfm()

const selectedRequest = computed(() => {
  return store.getTargetRequest
})

watch(selectedRequest, (newValue, oldValue) => {
  console.log('New value:', newValue)
})

// Получение списка работников из стора
const getWorkers = computed(() => {
  // return store.getWorkers;
  return employees
})

function getEmployersName() {
  return getWorkers.value.map(worker => worker.name)
}

// Правила валидации полей
const createRequestValidationSchema = yup.object().shape({
  requestTitle: yup.string().required().min(2, 'Минимум 2 символа'),
  requestDeclarer: yup.string().required().min(2, 'Минимум 2 символа'),
  requestPriority: yup.string().required(),
  requestExecutor: yup.string(),
  requestStatus: yup.string(),
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

function sendForm() {
  // isLoading.value = true;
  const requestBody = new FormData()

  Object.entries(values).forEach(([key, value]) => {
    requestBody.append(key, value)
    console.log(key, value)
  })

  // fetch(`${apiURL}/editRequest`, {
  //   method: "POST",
  //   body: requestBody,
  // })
  //   .then((response) => {
  //     if (response.ok) {
  //       vfm.close("clientCreateRequest");
  //       emit("confirm");
  //     } else {
  //       throw new Error("response not ok");
  //     }
  //   })
  //   .catch(() => {
  //     requestErrorMessage.value =
  //       "Не удалось отправить сообщение, попробуйте позднее.";
  //   })
  //   .finally(() => {
  //     isLoading.value = false;
  //   });
}

function closeForm() {
  requestErrorMessage.value = ''
  isLoading.value = false
  vfm.close('editRequest')
}
</script>

<template>
  <VueFinalModal
    modal-id="editRequest"
    content-class="fixed inset-0 sm:rounded-3xl bg-white p-10 md:bottom-auto md:left-1/2 md:right-auto md:top-1/2 md:w-[640px] md:-translate-x-1/2 md:-translate-y-1/2"
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
        <InputText name="requestTitle" :value="selectedRequest?.name" type="text" text="Название проблемы *" />
        <InputText
          name="requestDeclarer"
          type="text"
          text="Кабинет/Кафедра *"
          :value="selectedRequest?.applicant"
        />
        <InputSelectText
          name="requestPriority"
          text="Приоритет *"
          :options="priorityArray"
          :default-value="selectedRequest?.priority"
        />
        <InputSelectText
          name="requestStatus"
          text="Статус"
          :options="statusArray"
          :default-value="selectedRequest?.status"
        />
        <InputText name="requestExecutor" :value="selectedRequest?.executor" type="text" text="Исполнитель" />
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
