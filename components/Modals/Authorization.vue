<script setup lang="ts">
import { VueFinalModal, useVfm } from 'vue-final-modal'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useAuthStore } from '~/store/auth'

const emit = defineEmits<{
  (e: 'confirm'): void
}>()

const store = useAuthStore()

interface WriteUsForm {
  userEmail: string
  userPassword: string
}

const vfm = useVfm()

// Правила валидации полей
const authorizationValidationSchema = yup.object().shape({
  userEmail: yup
    .string()
    .required()
    .email('Почта должна быть в формате: example@domain.com'),
  userPassword: yup
    .string()
    .required()
    .min(10, 'Пароль должен содержать 10 цифр!'),
})

const { values, meta } = useForm<WriteUsForm>({
  validationSchema: authorizationValidationSchema,
})
const isLoading = ref<boolean>(false)
const apiURL = useRuntimeConfig().public.apiURL
const requestErrorMessage = ref<string>('')

const isEnabled = computed(() => {
  return meta.value.valid && !isLoading.value
})

async function sendForm() {
  isLoading.value = true

  const login = values.userEmail // Получить значение поля email
  const password = values.userPassword // Получить значение поля pas
  console.log(login, password)

  try {
    const isSuccess = await store.login(login, password)

    if (isSuccess) {
      vfm.close('authorization')
      emit('confirm')
    }
    else {
      throw new Error('response not ok')
    }
  }
  catch (e) {
    requestErrorMessage.value
        = 'Не удалось авторизоваться, попробуйте другие данные.'
  }
  finally {
    isLoading.value = false
  }
}

function closeForm() {
  requestErrorMessage.value = ''
  isLoading.value = false
  vfm.close('authorization')
}

function getInitialValues() {
  return {
    clickToClose: false,
    escToClose: false,
  }
}

const options = ref(getInitialValues())
</script>

<template>
  <VueFinalModal
    modal-id="authorization"
    :click-to-close="options.clickToClose"
    :esc-to-close="options.escToClose"
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
          Авторизация
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
        <!-- Поля, которые проходят валидацию: Пароль, почта -->
        <InputText name="userEmail" type="email" text="Почта*" />
        <InputText name="userPassword" type="password" text="Пароль*" />
        <Button
          :loading="isLoading"
          :disabled="!isEnabled"
          loading-text="Отправка"
          type="submit"
        >
          отправить
        </Button>
      </div>
    </form>
  </VueFinalModal>
</template>

<style scoped></style>
