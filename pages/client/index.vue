<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/store/auth'

// definePageMeta({
//   layout: "client",
// });

const store = useAuthStore()
const router = useRouter()

const isLoading = ref(true)
const requests = ref(null) as any

// Вотчер, который проверяет авторизацию пользователя и отправляет запрос на получение заявок
watchEffect(async () => {
  // Получаем пользователя
  const user = store.getUser
  console.log(user)

  // Если пользователь авторизован, делаем запрос на получение заявок
  if (user) {
    console.log(user)
    if (!user?.isTeacher) {
      isLoading.value = false
      await router.push('/')
      return
    }
    try {
      console.log('делаем запрос')
      await store.fetchRequestsTeacher(user.id)
      requests.value = store.getTeachersRequest
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

console.log('заявки препода')
console.log(getRequests)
</script>

<template>
  <div class="pt-5 font-title text-2xl">
    Мои заявки
  </div>
  <div>
    <Loading v-if="isLoading" />
    <div v-else>
      <div v-if="!getRequests.length" class="py-5 text-lg">
        Список заявок пуст
      </div>
      <TableClient v-else :content="getRequests" class="py-5" />
    </div>
  </div>
</template>

<style scoped></style>
