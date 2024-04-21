<script setup lang="ts">
import { VueFinalModal, useVfm } from 'vue-final-modal'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useAuthStore } from '~/store/auth'

interface CreateRequestForm {
  requestEmail: string
  requestPassword: string
  requestFirstName: string
  requestLastName: string
  requestPatronymic: string
  requestPost: string
}

const emit = defineEmits<{
  (e: 'confirm'): void
}>()

const store = useAuthStore()

const requestIsAdminRole = ref(false)

const getPassword = computed(() => {
  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const numbers = '0123456789'

  const allCharacters = uppercaseLetters + lowercaseLetters + numbers

  let newPassword = ''

  // Генерируем по одному символу из каждой категории символов
  newPassword
    += uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)]
  newPassword
    += lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)]
  newPassword += numbers[Math.floor(Math.random() * numbers.length)]

  // Затем добавляем оставшиеся символы, чтобы добиться длины 12 символов
  for (let i = 3; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * allCharacters.length)
    newPassword += allCharacters[randomIndex]
  }

  return newPassword
})

const vfm = useVfm()

// Правила валидации полей
const createRequestValidationSchema = yup.object().shape({
  requestFirstName: yup
    .string()
    .required()
    .matches(
      /^[а-яА-ЯёЁa-zA-Z]+$/,
      'Фамилия должна содержать только русские или английские буквы',
    ),
  requestLastName: yup
    .string()
    .required()
    .matches(
      /^[а-яА-ЯёЁa-zA-Z]+$/,
      'Имя должно содержать только русские или английские буквы',
    ),
  requestPatronymic: yup
    .string()
    .matches(
      /^[а-яА-ЯёЁa-zA-Z]+$/,
      'Отчество должно содержать только русские или английские буквы',
    ),
  requestPost: yup
    .string()
    .matches(
      /^[а-яА-ЯёЁa-zA-Z\s]+$/,
      'только русские или английские буквы',
    ),
  requestEmail: yup.string().required().email(),
  requestPassword: yup
    .string()
    .required()
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/,
      'Пароль должен содержать хотя бы одну заглавную букву, одну строчную букву и одну цифру',
    ),
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

async function sendForm() {
  isLoading.value = true

  const workerData = {
    name: values.requestFirstName,
    lastName: values.requestLastName,
    patronymic: values.requestPatronymic,
    login: values.requestEmail,
    password: values.requestPassword,
    isAdminRole: requestIsAdminRole.value,
    post: values.requestPost,
  }
  console.log(workerData)

  try {
    const isSuccess = await store.createWorker(workerData)

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
    await store.fetchWorkers()
    window.location.reload()
  }
}

function closeForm() {
  requestErrorMessage.value = ''
  isLoading.value = false
  vfm.close('CreateWorker')
}
</script>

<template>
  <VueFinalModal
    modal-id="CreateWorker"
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
          Регистрация сотрудника
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
        <InputText name="requestLastName" type="text" text="Фамилия *" />
        <InputText name="requestFirstName" type="text" text="Имя *" />
        <InputText name="requestPatronymic" type="text" text="Отчество" />
        <InputText
          name="requestPost"
          type="text"
          text="Должность"
        />
        <InputText name="requestEmail" type="email" text="Почта" />
        <InputText
          name="requestPassword"
          type="text"
          text="Пароль"
          :value="getPassword"
        />
        <div class="flex gap-2">
          <input v-model="requestIsAdminRole" type="checkbox">
          <div>Выдать права админа</div>
        </div>
        <Button
          :loading="isLoading"
          :disabled="!isEnabled"
          loading-text="Отправка"
          type="submit"
        >
          отправить
        </Button>
        <p v-if="requestErrorMessage.length" class="text-red">
          {{ requestErrorMessage }}
        </p>
      </div>
    </form>
  </VueFinalModal>
</template>

<style scoped></style>
