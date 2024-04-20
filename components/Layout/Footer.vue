<script setup lang="ts">
import { useVfm } from 'vue-final-modal'
import Logo from '~/assets/images/Logo.svg?skipsvgo'
import { useAuthStore } from '~/store/auth'

const props = defineProps<Props>()

const store = useAuthStore()

interface Props {
  isInHeader?: boolean
  theme?: 'dark' | 'light'
}

const textButton = computed(() => {
  return store.isLoggedIn ? 'Выйти' : 'Войти'
})

const vfm = useVfm()
const StyleArr: Map<string, string> = new Map([
  ['dark', 'bg-black text-white border-white'],
  ['default', 'bg-white text-black border-black'],
])

function getStyle() {
  return StyleArr.get(props.theme || 'default')!
}

const LogoArr: Map<string, any> = new Map([['default', Logo]])

function getLogo() {
  return LogoArr.get(props.theme || 'default')!
}
</script>

<template>
  <footer
    :class="[isInHeader ? 'px-0' : 'px-4 sm:px-5 lg:px-10', getStyle()]"
    class="min-h-[90px]"
  >
    <div
      class="grid justify-center gap-7 border-t py-5 md:grid-cols-2 lg:flex lg:gap-5 lg:py-10"
    >
      <div>
        <NuxtLink to="/">
          <component :is="getLogo()" class="h-10 w-auto lg:h-auto" alt="" />
        </NuxtLink>
      </div>

      <div
        class="fixed inset-x-4 bottom-5 z-[1] flex sm:inset-x-5 md:left-auto lg:hidden"
      >
        <Button class="w-full md:w-auto" @click="vfm.open('authorization')">
          {{ textButton }}
        </Button>
      </div>
    </div>
  </footer>
</template>
