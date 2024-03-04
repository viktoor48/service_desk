<script setup lang="ts">
import { employees } from '~/constants/data'
import { useAuthStore } from '~/store/auth'

const store = useAuthStore()
const router = useRouter()

const isLoading = ref(true);
const employers = ref(null) as any;

// Проверяем, является ли пользователь администратором
(async () => {
  if (store.getRole !== 'admin')
    await router.push('/client')
  else
    isLoading.value = false // Устанавливаем isLoading в false, когда проверка завершена
})()

//Подгружаем работников
isLoading.value = true;
await store.loadExecutors()
employers.value = store.getExecutors;
isLoading.value = false;

const getEmployers = computed(() => {
  return employers.value;
})
console.log(employers.value);
</script>

<template>
  <Loading v-if="isLoading"/>
  <TableEmployers v-else :employers="getEmployers" class="py-5"/>
</template>

<style scoped>

</style>
