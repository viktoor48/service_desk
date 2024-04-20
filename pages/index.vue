<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/store/auth'

const store = useAuthStore()
const router = useRouter()

const isLoading = ref(true)
const requests = ref(null) as any

// Вотчер, который проверяет авторизацию пользователя и отправляет запрос на получение заявок
watchEffect(async () => {
  // Получаем пользователя
  const user = store.getUser.user

  // Если пользователь авторизован, делаем запрос на получение заявок
  if (user) {
    if (!user.roles.includes('Админ')) {
      await router.push('/client')
      return
    }
    try {
      console.log('делаем запрос')
      await store.fetchRequests()
      requests.value = store.getRequests
      isLoading.value = false
    }
    catch (error) {
      console.error('Error fetching requests:', error)
      isLoading.value = false
    }
  }
})

const getRequests = computed(() => {
  return requests.value
})

console.log(getRequests)
</script>

<template>
  <div>
    <Loading v-if="isLoading" />
    <TableAdmin :requests="getRequests" class="py-5" />
  </div>
</template>

<style scoped></style>
