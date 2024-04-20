<script setup lang="ts">
import { useAuthStore } from '~/store/auth'

const store = useAuthStore()
const router = useRouter()

const isLoading = ref(true)
const employers = ref(null) as any
const user = store.getUser.user;

// Проверяем, является ли пользователь администратором
(async () => {
  if (!user.roles.includes('Админ'))
    await router.push('/client')

  else
    isLoading.value = false
})()

// Подгружаем работников
isLoading.value = true
await store.fetchWorkers()
employers.value = store.getWorkers
isLoading.value = false

const getEmployers = computed(() => {
  return employers.value
})
console.log(employers.value)
</script>

<template>
  <Loading v-if="isLoading" />
  <TableEmployers v-else :employers="getEmployers" class="py-5" />
</template>

<style scoped>

</style>
