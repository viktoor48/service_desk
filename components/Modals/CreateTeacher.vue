<script setup lang="ts">
import { VueFinalModal, useVfm } from 'vue-final-modal'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

interface CreateRequestForm {
  requestFirstName: string
  requesLastName: string
  requesPatronymic: string
  requestBuilding: string
  requestCabinet: string
  requestEmail: string
  requestPassword: string
}

const emit = defineEmits<{
  (e: 'confirm'): void
}>()

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
  requestCabinet: yup.string().required().min(1, 'Минимум 1 символ'),
  requestBuilding: yup.string().required().min(1, 'Минимум 1 символ'),
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

function sendForm() {
  isLoading.value = true
  const requestBody = new FormData()

  Object.entries(values).forEach(([key, value]) => {
    requestBody.append(key, value)
  })

  fetch(`${apiURL}/createTeacher`, {
    method: 'POST',
    body: requestBody,
  })
    .then((response) => {
      if (response.ok) {
        vfm.close('createTeacher')
        emit('confirm')
      }
      else {
        throw new Error('response not ok')
      }
    })
    .catch(() => {
      requestErrorMessage.value
        = 'Не удалось отправить сообщение, попробуйте позднее.'
    })
    .finally(() => {
      isLoading.value = false
    })
}

function closeForm() {
  requestErrorMessage.value = ''
  isLoading.value = false
  vfm.close('CreateTeacher')
}
</script>

<template>
  <VueFinalModal
    modal-id="CreateTeacher"
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
          Регистрация преподавателя
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
          name="requestCabinet"
          type="text"
          text="Кабинет"
          placeholder="327"
        />
        <InputText
          name="requestBuilding"
          type="text"
          text="Корпус"
          placeholder="1"
        />
        <InputText name="requestEmail" type="email" text="Почта" />
        <InputText
          name="requestPassword"
          type="text"
          text="Пароль"
          :value="getPassword"
        />
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
        <p class="mx-1 text-sm">
          Нажимая на кнопку, вы подтверждаете согласие на
          <NuxtLink to="#">
            <span class="text-red"> обработку персональных данных </span>
          </NuxtLink>
        </p>
      </div>
    </form>
  </VueFinalModal>
</template>

<style scoped></style>
