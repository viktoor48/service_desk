<script setup lang="ts">
import { useField } from 'vee-validate'

interface Props {
  name: string
  text: string
}

const props = defineProps<Props>()

const { value: inputValue } = useField(props.name)

const isFocused = ref(false)

const isActive = computed(() => {
  return isFocused.value || inputValue.value
})
</script>

<template>
  <div class="relative">
    <span class="text-gray-dark pointer-events-none absolute left-5 select-none duration-300" :class="{ 'translate-y-2 text-sm': isActive, 'translate-y-5': !isActive }">
      {{ text }}
    </span>
    <textarea
      v-model="inputValue"
      class="h-[120px] w-full resize-none rounded-xl bg-gray p-5 focus:outline-none"
      maxlength="190"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
  </div>
</template>

<style scoped>

</style>
