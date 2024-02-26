<script setup lang="ts">
import { useField } from 'vee-validate'

interface Props {
  name: string
  text: string
  options?: string[]
  defaultValue?: string
  theme?: 'dark' | 'light'
}

const props = defineProps<Props>()

// Переменная errorMessage принимает в себя error-значение(string) после валидации - используется в showError и отоброжении ошибок
// Переменная value связка через v-modal со значениями в input
const { errorMessage, value: selectedValue } = useField(props.name)
selectedValue.value = props.defaultValue
// Переменная, которая используется при focus эффекте на input
const isFocused = ref(false)
// Используется, как индикатор отображение ошибок
const showError = ref(false)
// Массив стилей для input
const inputStyleArr: Map<string, string> = new Map([
  ['dark', 'bg-white/10 p-4'],
  ['default', 'bg-gray p-5'],
])
// Массив стилей для span
const spanStyleArr: Map<string, string> = new Map([
  ['dark', 'text-[14px]'],
  ['default', 'text-base'],
])
// Массив стилей для анимации span
const translateStyleArr: Map<string, string> = new Map([
  ['dark', 'translate-y-4'],
  ['darkActive', 'translate-y-2 text-sm opacity-0'],
  ['default', 'translate-y-5'],
  ['defaultActive', 'translate-y-2 text-sm'],
])

// Отвечает за анимацию во время focus эффекта на input, так же не позволяет опуститься тексту, когда input не пустой
const isActive = computed(() => {
  return isFocused.value || selectedValue.value
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
</script>

<template>
  <div class="group relative">
    <!-- Текст подсказка, которая выводится поверх input -->
    <span
      class="text-gray-dark pointer-events-none absolute left-5 select-none duration-300"
      :class="[getSpanStyles(), getTranclateStylse()]"
    >
      {{ text }}
    </span>
    <!-- validate-on-input используется, чтобы производить постоянную проверку валидации при первом ее провале -->
    <select
      v-model="selectedValue"
      class="w-full rounded-xl focus:outline-none"
      :class="[
        { 'border border-red': !!errorMessage && showError },
        getInputStyles(),
      ]"
      :name="props.name"
      @focus="isFocused = true"
    >
      <option v-for="option in props.options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<style scoped></style>
