<script setup lang="ts">
import { useVfm } from 'vue-final-modal'

interface Props {
  isInHeader?: boolean
  theme?: 'dark' | 'light'
}

const props = defineProps<Props>()

const vfm = useVfm()
const StyleArr: Map<string, string> = new Map([['dark', 'bg-black text-white border-white'], ['default', 'bg-white text-black border-black']])

function getStyle() {
  return StyleArr.get(props.theme || 'default')!
}
</script>

<template>
  <footer
    :class="[isInHeader ? 'px-0' : 'px-4 sm:px-5 lg:px-10', getStyle()]"
  >
    <div class="grid gap-7 border-t py-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-5 lg:py-10">
      <div class="flex flex-col items-start gap-5 lg:order-2">
        <NuxtLink to="/" class="text-xs transition-colors duration-300 hover:text-red md:text-base">
          Сотрудничество для партнеров
        </NuxtLink>
        <NuxtLink to="/" class="text-xs transition-colors duration-300 hover:text-red md:text-base">
          Пользовательское соглашение
        </NuxtLink>
      </div>

      <div class="flex flex-col gap-5 text-xs md:items-end md:justify-start md:text-base lg:order-3 lg:items-start">
        <NuxtLink class="transition-colors duration-300 hover:text-red">
          +7 497 258-02-56
        </NuxtLink>
        <NuxtLink class="transition-colors duration-300 hover:text-red">
          mail@example.ru
        </NuxtLink>
      </div>

      <div class="mb-20 md:mb-0 lg:order-1">
        <p class="text-xs md:text-base">
          © 2024 Service Desk. Все права защищены. Политика конфиденциальности | Условия использования
        </p>
      </div>
      <div class="fixed inset-x-4 bottom-5 z-[1] flex sm:inset-x-5 md:left-auto lg:hidden">
        <Button class="w-full md:w-auto" @click="vfm.open('writeUsCompany')">
          Какой-то текст
        </Button>
      </div>
    </div>
  </footer>
</template>
