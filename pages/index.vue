<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useVfm } from 'vue-final-modal'
import { useAuthStore } from '~/store/auth'

const store = useAuthStore()
const router = useRouter()
const vfm = useVfm()

const isLoading = ref(true)
const requests = ref(null) as any
const user = ref(store.getUser)

const getUser = computed(() => {
  return user.value
})

const isAdminUser = computed(() => {
  return user.value.roles?.includes('Админ')
})

// Вотчер, который проверяет авторизацию пользователя и отправляет запрос на получение заявок
watchEffect(async () => {
  // Если пользователь авторизован, делаем запрос на получение заявок
  if (user) {
    console.log(user)
    if (user.value?.isTeacher) {
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

const getRequestWorker = computed(() => {
  if (!user || !requests.value)
    return []

  const userId = user.value.id
  return requests.value.filter((request: any) => {
    const workers = request.workers || []
    return workers.some((worker: any) => worker.id === userId)
  })
})

console.log(getRequests)
console.log(user)
</script>

<template>
  <div>
    <Loading v-if="isLoading" />
    <div v-else>
      <div class="mt-5 flex items-center">
        <div class="mr-8 text-lg">
          {{ `${getUser.lastName} ${getUser.name} ${getUser.patronymic}` }}
        </div>
        <div v-if="getUser?.roles.includes('Админ')">
          Админ
        </div>
      </div>
      <TableAdmin v-if="isAdminUser" :requests="getRequests" class="py-5" />
      <div v-else>
        <div v-if="!getRequestWorker.length" class="mt-5">
          Список заявок пуст
        </div>
        <TableAdmin v-else :requests="getRequestWorker" class="py-5" />
      </div>
    </div>
  </div>
</template>

<style></style>
