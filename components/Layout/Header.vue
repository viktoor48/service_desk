<script setup lang="ts">
import { useVfm } from 'vue-final-modal'
import Logo from '~/assets/images/Logo.svg?skipsvgo'
import { useIsScrollBlocked } from '~/composables/useState'
import LogoBlack from '~/assets/images/LogoBlack.svg?skipsvgo'
import { useAuthStore } from '~/store/auth'

const props = defineProps<Props>()
const vfm = useVfm()
const store = useAuthStore()

const shouldOpenAuthModal = computed(() => {
  return !store.isLoggedIn
})

// Если shouldOpenAuthModal будет true, открывается модальное окно авторизации
watchEffect(() => {
  if (shouldOpenAuthModal.value)
    vfm.open('authorization')
})

interface Props {
  theme?: 'dark' | 'light'
}

const StyleArr: Map<string, string> = new Map([
  ['dark', 'bg-black text-white border-white'],
  ['default', 'bg-white text-black border-black'],
])
const NavStyleArr: Map<string, string> = new Map([
  ['dark', 'bg-white'],
  ['default', 'bg-black'],
])
const LogoArr: Map<string, any> = new Map([
  ['dark', LogoBlack],
  ['default', Logo],
])

const isScrollBlocked = useIsScrollBlocked()

const isMenuOpen = ref(false)

function openMenu() {
  isMenuOpen.value = !isMenuOpen.value
  isScrollBlocked.value = !isScrollBlocked.value
}

function getStyle() {
  return StyleArr.get(props.theme || 'default')!
}

function getNavStyle() {
  return NavStyleArr.get(props.theme || 'default')!
}

function getLogo() {
  return LogoArr.get(props.theme || 'default')!
}

// Проверяем, является ли пользователь администратором
const isAdminUser = computed(() => store.getRole === 'admin')
</script>

<template>
  <header class="sticky top-0 z-10 w-full px-5 lg:px-10" :class="getStyle()">
    <div
      class="relative z-10 flex h-16 grid-cols-header content-center items-center justify-between border-b lg:grid lg:h-24"
      :class="getStyle()"
    >
      <nav class="hidden items-center lg:flex">
        <ul class="flex gap-3 xl:gap-7">
          <template v-if="isAdminUser">
            <li>
              <NuxtLink
                to="/"
                class="underline-animation relative inline-block text-sm font-semibold uppercase transition-colors duration-300 hover:text-blue"
              >
                Заявки
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/employers"
                class="underline-animation relative inline-block text-sm font-semibold uppercase transition-colors duration-300 hover:text-blue"
              >
                Сотрудники
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/teachers"
                class="underline-animation relative inline-block text-sm font-semibold uppercase transition-colors duration-300 hover:text-blue"
              >
                Преподаватели
              </NuxtLink>
            </li>
          </template>
          <template v-else>
            <li>
              <NuxtLink
                class="underline-animation relative inline-block cursor-pointer text-sm font-semibold uppercase transition-colors duration-300 hover:text-blue"
                @click="vfm.open('clientCreateRequest')"
              >
                Создать заявку
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/client"
                class="underline-animation relative inline-block text-sm font-semibold uppercase transition-colors duration-300 hover:text-blue"
              >
                Мои заявки
              </NuxtLink>
            </li>
          </template>
        </ul>
      </nav>

      <NuxtLink to="/">
        <component :is="getLogo()" class="h-10 w-auto lg:h-auto" alt="" />
      </NuxtLink>

      <div class="hidden items-center justify-end lg:flex">
        <Button v-if="store.isLoggedIn" @click="store.logout">
          Выйти
        </Button>
        <Button v-else @click="vfm.open('authorization')">
          Войти
        </Button>
      </div>

      <div class="lg:hidden">
        <button type="button" class="relative flex size-6" @click="openMenu()">
          <span
            class="absolute top-[7px] h-0.5 w-full bg-black transition-transform duration-300"
            :class="[{ 'translate-y-1 rotate-45': isMenuOpen }, getNavStyle()]"
          />
          <span
            class="absolute bottom-[7px] h-0.5 w-full bg-black transition-transform duration-300"
            :class="[
              { '-translate-y-1 -rotate-45': isMenuOpen },
              getNavStyle(),
            ]"
          />
        </button>
      </div>
    </div>

    <div
      class="absolute left-0 top-full z-0 flex h-[calc(100vh-64px)] w-full flex-col px-5 shadow-md transition duration-300 lg:hidden"
      :class="[
        isMenuOpen
          ? 'translate-y-0 opacity-100'
          : '-translate-y-full opacity-0',
        getStyle(),
      ]"
    >
      <div
        class="flex flex-auto flex-col gap-5 py-5 md:grid md:grid-cols-2 md:py-10"
      >
        <nav>
          <ul
            class="flex flex-col gap-5 font-title text-lg font-bold md:gap-10"
          >
            <template v-if="isAdminUser">
              <li>
                <NuxtLink to="/" @click="openMenu">
                  Заявки
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/employers" @click="openMenu">
                  Сотрудники
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/teachers" @click="openMenu">
                  Преподаватели
                </NuxtLink>
              </li>
            </template>
            <template v-else>
              <li>
                <NuxtLink
                  @click="
                    () => {
                      openMenu();
                      vfm.open('clientCreateRequest');
                    }
                  "
                >
                  Создать заявку
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/client" @click="openMenu">
                  Мои заявки
                </NuxtLink>
              </li>
            </template>
          </ul>
        </nav>
      </div>
      <LayoutFooter :is-in-header="true" :theme="theme" />
    </div>
  </header>
</template>

<style scoped lang="postcss">
.underline-animation {
  @apply after:bg-blue after:h-0.5 after:w-full after:absolute after:left-0 after:bottom-0 after:-translate-y-1 after:transition after:duration-300 after:opacity-0 hover:after:translate-y-0 hover:after:opacity-100;
}
</style>
