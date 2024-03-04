<script setup lang="ts">
import { useField } from 'vee-validate'

interface Props {
  name: string
  text: string
  type: 'tel' | 'email' | 'text' | 'password'
  theme?: 'dark' | 'light'
  value?: string
  placeholder?: string
}

const props = defineProps<Props>()

// Переменная errorMessage принимает в себя error-значение(string) после валидации - используется в showError и отоброжении ошибок
// Переменная value связка через v-modal со значениями в input
const { errorMessage, value: inputValue } = useField(props.name)
inputValue.value = props.value
// Переменная, которая используется при focus эффекте на input
const isFocused = ref(false)
// Используется, как индикатор отображение ошибок
const showError = ref(false)
// Массив стилей для input
const inputStyleArr: Map<string, string> = new Map([['dark', 'bg-white/10 p-4'], ['default', 'bg-gray p-4']])
// Массив стилей для span
const spanStyleArr: Map<string, string> = new Map([['dark', 'text-[14px]'], ['default', 'text-base']])
// Массив стилей для анимации span
const translateStyleArr: Map<string, string> = new Map([['dark', 'translate-y-4'], ['darkActive', 'translate-y-2 text-sm opacity-0'], ['default', 'translate-y-5'], ['defaultActive', 'translate-y-2 text-sm']])
// Массив стилей для errorMessage
const errorMessageStyleArr: Map<string, string> = new Map([['dark', 'text-[12px]'], ['default', 'text-base']])

// Настройка патернов v-mask
// А: Включает в себя все симловы, кроме поблов и отступов - используется для поля Почта
// В: Включает в себя только символы русского и английского алфавитов - используется для поля Имя
const options = {
  tokens: {
    A: {
      pattern: /\S/,
      multiple: true,
    },
    B: {
      pattern: /[\s\S]*/,
      multiple: true,
    },
  },
}
// Отвечает за анимацию во время focus эффекта на input, так же не позволяет опуститься тексту, когда input не пустой
const isActive = computed(() => {
  return isFocused.value || inputValue.value
})

// Отвечает за выбор паттерна ввода для разных типов input
const maskPattern = computed(() => {
  switch (props.type) {
    case 'tel':
      return '+7 (###) ###-##-##'
    case 'text':
      return 'B'
  }
  return 'A'
})

function getInputStyles() {
  return inputStyleArr.get(props.theme || 'default')!
}

function getSpanStyles() {
  return spanStyleArr.get(props.theme || 'default')!
}

function getTranclateStylse() {
  // Выбор активной версии стиля в зависимости от mode
  const modeActive = props.theme ? `${props.theme}Active` : 'defaultActive'
  // Выбор пасивной версии стиля в зависимости от mode
  const modeDisabled = props.theme ? props.theme : 'default'
  const style = isActive.value ? modeActive : modeDisabled

  return translateStyleArr.get(style)!
}

function getErrorMessageStyles() {
  return errorMessageStyleArr.get(props.theme || 'default')!
}
</script>

<template>
  <div class="group relative">
    <!-- Текст подсказка, которая выводится поверх input -->
    <span class="text-gray-dark pointer-events-none relative left-1 select-none duration-300" :class="[getSpanStyles(), getTranclateStylse()]">
      {{ text }}
    </span>
    <!-- validate-on-input используется, чтобы производить постоянную проверку валидации при первом ее провале -->
    <input
      v-model="inputValue"
      v-maska:[options]
      :data-maska="maskPattern"
      :type="type"
      class="w-full rounded-xl focus:outline-none"
      :class="[{ 'border border-red': !!errorMessage && showError }, getInputStyles()]"
      :name="name"
      :placeholder="placeholder"
      @focus="isFocused = true"
      @blur="[isFocused = false, showError = !!errorMessage && !!inputValue]"
    >
    <p v-if="!!errorMessage && showError" class="ml-5 mt-1 text-red" :class="getErrorMessageStyles()">
      {{ errorMessage }}
    </p>
  </div>
</template>

<style scoped>

</style>
