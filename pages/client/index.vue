<script setup lang="ts">
import { useRouter } from 'vue-router'
import { orders } from '~/constants/data'
import { useAuthStore } from '~/store/auth'

definePageMeta({
  layout: 'client',
})

const store = useAuthStore()
const router = useRouter()

const isLoading = ref(true);

(async () => {
  if (store.getRole === 'admin')
    await router.push('/')
  else
    isLoading.value = false // Устанавливаем isLoading в false, когда проверка завершена
})()

const order = [orders[0]]
// const order = [] as any;
</script>

<template>
  <div class="pt-5 font-title text-2xl">
    Мои заявки
  </div>
  <Loading v-if="isLoading" />
  <div v-else>
    <TableBasis v-if="order.length" :content="order" class="py-5" />
    <div v-else class="py-5 text-lg">
      Список заявок пуст
    </div>
  </div>
</template>

<style scoped></style>
