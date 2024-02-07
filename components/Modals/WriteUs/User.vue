<script setup lang="ts">
import { VueFinalModal, useVfm } from 'vue-final-modal'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

interface WriteUsForm {
  userName: string
  userPhone: string
  userEmail: string
  userMessage: string
  userFile: null | File
}

const emit = defineEmits<{
  (e: 'confirm'): void
}>()

const vfm = useVfm()

// Правила валидации полей
const writeUsValidationSchema = yup.object().shape({
  userEmail: yup.string().required().email('Почта должна быть в формате: example@domain.com'),
  userPhone: yup.string().required().length(18, 'Телефон должен содержать 11 цифр!'),
  userName: yup.string().required().min(4, 'Имя должно содержать минимум 4 буквы'),
})

const { values, meta } = useForm<WriteUsForm>({ validationSchema: writeUsValidationSchema })
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

  fetch(`${apiURL}/user`, {
    method: 'POST',
    body: requestBody,
  })
    .then((response) => {
      if (response.ok) {
        vfm.close('writeUsUser')
        emit('confirm')
      }
      else {
        throw new Error('response not ok')
      }
    })
    .catch(() => {
      requestErrorMessage.value = 'Не удалось отправить сообщение, попробуйте позднее.'
    })
    .finally(() => {
      isLoading.value = false
    })
}

function closeForm() {
  requestErrorMessage.value = ''
  isLoading.value = false
  vfm.close('writeUsUser')
}
</script>

<template>
  <VueFinalModal
    modal-id="writeUsUser"
    content-class="fixed inset-0 sm:rounded-3xl bg-white p-10 md:bottom-auto md:left-1/2 md:right-auto md:top-1/2 md:w-[640px] md:-translate-x-1/2 md:-translate-y-1/2"
  >
    <form @submit.prevent="sendForm">
      <!-- Тайт popUp + Button для его закрытия -->
      <div class="flex w-full content-center items-center justify-between md:inline-block">
        <p class="text-center font-title text-title-sm font-bold sm:text-title-md">
          Написать нам
        </p>
        <button type="button" class="block md:absolute md:right-6 md:top-6" @click="closeForm()">
          <div class="relative flex size-6">
            <span class="absolute top-[7px] h-0.5 w-full translate-y-1 rotate-45 bg-black" />
            <span class="absolute bottom-[7px] h-0.5 w-full -translate-y-1 -rotate-45 bg-black" />
          </div>
        </button>
      </div>
      <div class="mt-7 flex flex-col gap-2.5">
        <!-- Поля, который проходят валидацию: Имя, телефон, почта -->
        <InputText
          name="userName"
          type="text"
          text="Имя*"
        />
        <InputText
          name="userPhone"
          type="tel"
          text="Телефон*"
        />
        <InputText
          name="userEmail"
          type="email"
          text="Почта*"
        />
        <!-- Опциональные поля: сообщение пользователя и файл-резюме -->
        <InputTextArea
          name="userMessage"
          text="Сообщение"
        />
        <InputFile name="userFile" />
        <Button
          :loading="isLoading"
          :disabled="!isEnabled"
          loading-text="Отправка"
          type="submit"
        >
          отправить
        </Button>
        <p class="mx-1 text-sm">
          Нажимая на кнопку, вы подтверждаете согласие на
          <NuxtLink to="#">
            <span class="text-red">
              обработку персональных данных
            </span>
          </NuxtLink>
        </p>
      </div>
    </form>
  </VueFinalModal>
</template>

<style scoped>

</style>
