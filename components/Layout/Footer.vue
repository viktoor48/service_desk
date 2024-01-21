<script setup lang="ts">
</script>

<template>
  <footer class="px-5 lg:px-10">
    <div class="grid gap-7 border-t border-black py-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-5 lg:py-10">
      <div class="flex flex-col items-start gap-5 lg:order-2">
        <NuxtLink to="/" class="text-black transition-colors duration-300 hover:text-red">
          Сотрудничество для партнеров
        </NuxtLink>
        <NuxtLink to="/" class="text-black transition-colors duration-300 hover:text-red">
          Пользовательское соглашение
        </NuxtLink>
      </div>

      <div class="flex flex-col gap-5 md:items-end md:justify-start lg:order-3 lg:items-start">
        <NuxtLink to="tel:+74952680256" class="text-black transition-colors duration-300 hover:text-red">
          +7 495 268-02-56
        </NuxtLink>
        <NuxtLink to="mailto:mail@intaro.ru" class="text-black transition-colors duration-300 hover:text-red">
          mail@intaro.ru
        </NuxtLink>
      </div>

      <div class="lg:order-1">
        <p>
          Работаем на рынке веб‑разработки с 2006 года. Входим&nbsp;в&nbsp;топ‑100&nbsp;веб‑разработчиков Рунета и&nbsp;в&nbsp;топ‑5&nbsp;разработчиков интернет‑магазинов.
        </p>
      </div>

      <div class="flex items-end justify-end lg:hidden">
        <Button class="w-full md:w-auto">
          Написать нам
        </Button>
      </div>
    </div>
  </footer>
</template>
