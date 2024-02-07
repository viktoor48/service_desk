<script setup lang="ts">
import { useField } from 'vee-validate'

interface Props {
  name: string
}

const props = defineProps<Props>()

const { value: inputValue } = useField(props.name)
const inputFile = ref<HTMLInputElement | null>(null)

function changeFileInput(e: Event): void {
  if (!e.target)
    return
  const inputElement = e.target as HTMLInputElement
  if (inputElement.files)
    inputValue.value = inputElement.files[0]
}

function clearFileInput(): void {
  inputValue.value = ''
  if (!inputFile.value)
    return
  const inputFileValue = inputFile.value as HTMLInputElement
  inputFileValue.value = ''
}
</script>

<template>
  <label v-if="!inputValue" for="inputFile" class="border-gray-dark w-full cursor-pointer rounded-xl border border-dashed p-5 hover:border-solid">
    <span class="text-gray-dark flex content-center items-center justify-center gap-2.5">
      <Icon name="Download" class="shrink-0" />
      <span class="pointer-events-none text-sm">
        Загрузите резюме в формате .pdf
      </span>
    </span>
    <input id="inputFile" ref="inputFile" type="file" class="hidden" accept=".pdf" @change="changeFileInput">
  </label>
  <div v-else class="border-gray-dark w-full rounded-xl border border-dashed p-5">
    <span class="text-gray-dark flex content-center items-center justify-center gap-2.5">
      <span class="text-gray-dark text-sm">
        {{ inputValue.name }}
      </span>
      <button type="button" @click="clearFileInput()">
        <div class="relative flex size-6">
          <span class="absolute top-[7px] h-0.5 w-full translate-y-1 rotate-45 bg-black" />
          <span class="absolute bottom-[7px] h-0.5 w-full -translate-y-1 -rotate-45 bg-black" />
        </div>
      </button>
    </span>
  </div>
</template>

<style scoped>

</style>
