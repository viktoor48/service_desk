<script setup lang="ts">
import { useField } from 'vee-validate'

interface Props {
  name: string
  text: string
  value?: string
  placeholder?: string
}

const props = defineProps<Props>()

const { value: inputValue } = useField(props.name) as any
inputValue.value = props.value

const isFocused = ref(false)

const isActive = computed(() => {
  return isFocused.value || inputValue.value
})
</script>

<template>
  <div class="relative">
    <span class="text-gray-dark pointer-events-none relative left-1 select-none duration-300" :class="{ 'translate-y-2 text-sm': isActive, 'translate-y-5': !isActive }">
      {{ text }}
    </span>
    <textarea
      v-model="inputValue"
      class="h-[120px] w-full resize-none rounded-xl bg-gray p-4 focus:outline-none"
      maxlength="190"
      @focus="isFocused = true"
      @blur="isFocused = false"
      :placeholder="placeholder"
    />
  </div>
</template>

<style scoped>

</style>
