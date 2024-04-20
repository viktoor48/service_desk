<script setup lang="ts">
import { useVfm } from 'vue-final-modal'
import { useAuthStore } from '~/store/auth'

const store = useAuthStore()
const router = useRouter()
const vfm = useVfm()

const isLoading = ref(true)
const teachers = ref(null) as any
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
await store.fetchTeachers()
teachers.value = store.getTeachers
isLoading.value = false

const getTeachers = computed(() => {
  return teachers.value
})
console.log(teachers.value)
</script>

<template>
  <div>
    <Button class="mt-5" @click="vfm.open('CreateTeacher')">
      Зарегестрировать преподавателя
    </Button>
  </div>
  <Loading v-if="isLoading" />
  <TableTeachers v-else :teachers="getTeachers" class="py-5" />
</template>

<style scoped></style>
