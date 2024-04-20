<script setup lang="ts">
import { useVfm } from 'vue-final-modal'
import { useAuthStore } from '~/store/auth'

const props = defineProps<{
  teachers: any[]
}>()

const store = useAuthStore()

const vfm = useVfm()

// function openEditRequest(teachers: teachers) {
//   console.log(teachers);
//   store.setTargetRequest(teachers);
//   vfm.open("AdminEditRequest");
// }

const defaultHeaders = [
  '№',
  'Фамилия',
  'Имя',
  'Отчество',
  'Кафедра',
  'Факультет',
]
</script>

<template>
  <div>
    <table
      class="bteachers-collapse bteachers-b-[3px] bteachers-solid bteachers-[#fffff] mb-5 w-full bg-white text-base"
    >
      <thead>
        <tr>
          <TableHeader v-for="(text, ind) in defaultHeaders" :key="ind">
            {{ text }}
          </TableHeader>
        </tr>
      </thead>
      <tbody>
        <TableRow
          v-for="(teachers, ind) in props.teachers"
          :key="ind"
        >
          <TableData>
            <NuxtLink class="cursor-pointer">
              {{ teachers.id }}
            </NuxtLink>
          </TableData>
          <TableData>
            <NuxtLink class="cursor-pointer">
              {{ teachers.lastName }}
            </NuxtLink>
          </TableData>
          <TableData>
            <NuxtLink class="cursor-pointer">
              {{ teachers.name }}
            </NuxtLink>
          </TableData>
          <TableData>
            <NuxtLink class="cursor-pointer">
              {{
                teachers.patronymic
              }}
            </NuxtLink>
          </TableData>
          <TableData>
            <NuxtLink class="cursor-pointer">
              {{ teachers.department }}
            </NuxtLink>
          </TableData>
          <TableData class="max-w-[200px]">
            <NuxtLink class="cursor-pointer">
              {{ teachers.faculty }}
            </NuxtLink>
          </TableData>
        </TableRow>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
