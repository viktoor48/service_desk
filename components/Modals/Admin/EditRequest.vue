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
  requestStatus?: string
}

const vfm = useVfm()

const selectedRequest = computed(() => {
  return store.getTargetRequest
})

const executors = ref()

watch(selectedRequest, (newValue, oldValue) => {
  executors.value = newValue.workers
  console.log(executors)
})

await store.fetchWorkers()
employers.value = store.getWorkers

const getEmployers = computed(() => {
  return employers.value
})

function getEmployersName() {
  return getEmployers.value.map((worker: any) => worker.name)
}

const statusArray = ['Новая', 'В работе', 'Закрыта', 'Ожидание']

// Правила валидации полей
const createRequestValidationSchema = yup.object().shape({
  requestTitle: yup.string().required().min(1, 'Минимум 1 символ'),
  requestBuilding: yup.string().required().min(1, 'Минимум 1 символ'),
  requestCabinet: yup.string().required().min(1, 'Минимум 1 символ'),
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
  const data = {
    typeRequestName: values.requestTitle,
    cabinet: values.requestCabinet,
    numberBuilding: values.requestBuilding,
    status: values.requestStatus,
    workers: [
      executors.value,
    ],
    description: values.requestDescription,
  }

  console.log(data)

  // fetch(`${apiURL}/AdminEditRequest`, {
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
  vfm.close('AdminEditRequest')
}

const getExecutors = computed(() => {
  return executors.value
    .map((executor: any) => `${executor.lastName} ${executor.name}`)
    .join(', ')
})
console.log(getExecutors)

// Функция добавления работника в список исполнителей
function addWorker(worker: any) {
  if (executors.value.includes(worker)) {
    executors.value = executors.value.filter((w: any) => w !== worker)
    return
  }
  executors.value.push(worker)
}

const searchText = ref('')

const filteredWorkers = computed(() => {
  if (!searchText.value.trim()) {
    return getEmployers.value
  }
  else {
    return getEmployers.value.filter(
      (worker: any) =>
        worker.name.toLowerCase().includes(searchText.value)
        || worker.lastName.toLowerCase().includes(searchText.value)
        || worker.patronymic.toLowerCase().includes(searchText.value),
    )
  }
})

const isShowWorkers = ref(false)
</script>

<template>
  <VueFinalModal
    modal-id="AdminEditRequest"
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
        <InputText
          name="requestTitle"
          :value="selectedRequest?.typeRequest.name"
          type="text"
          text="Название проблемы *"
          :disabled="true"
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
        <InputSelectText
          name="requestStatus"
          text="Статус"
          :options="statusArray"
          :default-value="selectedRequest?.status"
        />
        <div class="group relative">
          <span
            class="text-gray-dark pointer-events-none relative left-1 select-none text-sm duration-300"
          >
            Исполнители
          </span>
          <input
            v-model="getExecutors"
            type="text"
            class="mb-4 w-full rounded-xl bg-gray p-4 focus:outline-none"
            disabled
          >
        </div>
        <div class="relative">
          <input
            v-model="searchText"
            type="text"
            placeholder="Поиск работника"
            class="border-gray-300 mb-4 w-full rounded border p-2"
          >
          <div
            class="absolute right-0 top-[4px] cursor-pointer p-1"
            @click="isShowWorkers = !isShowWorkers"
          >
            <svg
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#999999"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
                  fill="#999999"
                />
              </g>
            </svg>
          </div>
          <ul :class="{ hidden: !isShowWorkers }">
            <li
              v-for="worker in filteredWorkers"
              :key="worker.id"
              class="cursor-pointer gap-1 border-b border-b-black/20 py-2 text-xxs last:border-none hover:bg-gray"
              @click="addWorker(worker)"
            >
              {{ `${worker.lastName} ${worker.name}  ${worker.patronymic}` }}
            </li>
          </ul>
        </div>
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
