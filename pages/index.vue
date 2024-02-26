<script setup lang="ts">
import { useRouter } from 'vue-router'
import { orders } from '~/constants/data'
import { useAuthStore } from '~/store/auth'

const store = useAuthStore()
const router = useRouter()

const isLoading = ref(true);

// Проверяем, является ли пользователь администратором
(async () => {
  if (store.getRole !== 'admin')
    await router.push('/client')
  else
    isLoading.value = false // Устанавливаем isLoading в false, когда проверка завершена
})()

store.getRequests()
</script>

<template>
  <div>
    <Loading v-if="isLoading" />
    <TableBasis v-else :content="orders" class="py-5" />
  </div>
</template>

<style scoped></style>
