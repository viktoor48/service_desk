<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/store/auth'

const store = useAuthStore()
const router = useRouter()

const isLoading = ref(true);
const requests = ref(null) as any;

// Проверяем, является ли пользователь администратором
(async () => {
  if (store.getRole !== 'admin')
    await router.push('/client')
  else
    isLoading.value = false // Устанавливаем isLoading в false, когда проверка завершена
})()

//Подгружаем заявки
await store.loadRequests()
requests.value = store.getRequests;

const getRequests = computed(() => {
  return requests.value;
})
console.log(requests.value);
</script>

<template>
  <div>
    <Loading v-if="isLoading" />
    <TableAdmin :requests="getRequests" class="py-5"/>
  </div>
</template>

<style scoped></style>
