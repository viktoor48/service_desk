<script setup lang="ts">
import Logo from '~/assets/images/logo.svg?skipsvgo'

const isMenuOpen = ref(false)
function openMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header class="sticky top-0 z-10 w-full bg-white px-5 lg:px-10">
    <div class="relative z-10 flex h-16 grid-cols-header content-center items-center justify-between border-b border-black bg-white lg:grid lg:h-24">
      <nav class="hidden items-center lg:flex">
        <ul class="flex gap-7">
          <li>
            <NuxtLink to="/" class="underline-animation relative inline-block text-sm font-semibold uppercase text-black transition-colors duration-300 hover:text-red">
              Кейсы
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/" class="underline-animation relative inline-block text-sm font-semibold uppercase text-black transition-colors duration-300 hover:text-red">
              Услуги
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/" class="underline-animation relative inline-block text-sm font-semibold uppercase text-black transition-colors duration-300 hover:text-red">
              О нас
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/" class="underline-animation relative inline-block text-sm font-semibold uppercase text-black transition-colors duration-300 hover:text-red">
              Карьера
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/" class="underline-animation relative inline-block text-sm font-semibold uppercase text-black transition-colors duration-300 hover:text-red">
              Блог
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/" class="underline-animation relative inline-block text-sm font-semibold uppercase text-black transition-colors duration-300 hover:text-red">
              Контакты
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <NuxtLink to="/">
        <Logo class="h-10 w-auto lg:h-auto" />
      </NuxtLink>

      <div class="hidden items-center justify-end lg:flex">
        <Button>
          Написать нам
        </Button>
      </div>

      <div class="lg:hidden">
        <button type="button" class="relative flex h-6 w-6" @click="openMenu()">
          <span class="absolute top-[7px] h-0.5 w-full bg-black transition-transform duration-300" :class="{ 'translate-y-1 rotate-45': isMenuOpen }" />
          <span class="absolute bottom-[7px] h-0.5 w-full bg-black transition-transform duration-300" :class="{ '-translate-y-1 -rotate-45': isMenuOpen }" />
        </button>
      </div>
    </div>

    <div class="absolute left-0 top-full z-0 grid w-full gap-5 bg-white p-5 shadow-md transition duration-300 md:grid-cols-2 md:py-10 lg:hidden" :class="[isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0']">
      <nav>
        <ul class="flex flex-col gap-5 font-title text-lg font-bold md:gap-10">
          <li>
            <NuxtLink to="/">
              Кейсы
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/">
              Услуги
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/">
              Решения
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <nav>
        <ul class="flex flex-col gap-5 font-title text-lg font-bold md:gap-10">
          <li>
            <NuxtLink to="/">
              О нас
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/">
              Карьера
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/">
              Контакты
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="postcss">
.underline-animation {
  @apply after:bg-red after:h-0.5 after:w-full after:absolute after:left-0 after:bottom-0 after:-translate-y-1 after:transition after:duration-300 after:opacity-0 hover:after:translate-y-0 hover:after:opacity-100
}
</style>
