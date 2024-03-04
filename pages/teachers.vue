<script setup lang="ts">
import { useAuthStore } from "~/store/auth";
import { useVfm } from "vue-final-modal";

const store = useAuthStore();
const router = useRouter();
const vfm = useVfm();

const isLoading = ref(true);
const teachers = ref(null) as any;

// Проверяем, является ли пользователь администратором
(async () => {
  if (store.getRole !== "admin") await router.push("/client");
  else isLoading.value = false; // Устанавливаем isLoading в false, когда проверка завершена
})();

//Подгружаем работников
isLoading.value = true;
await store.loadUsers();
teachers.value = store.getUsers;
isLoading.value = false;

const getTeachers = computed(() => {
  return teachers.value;
});
console.log(teachers.value);
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
