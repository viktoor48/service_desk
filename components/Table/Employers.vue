<script setup lang="ts">
import { useVfm } from 'vue-final-modal'
import { useAuthStore } from '~/store/auth'

const props = defineProps<{
  employers: any[]
}>()

const store = useAuthStore()

const vfm = useVfm()

// function openEditRequest(employer: employer) {
//   console.log(employer);
//   store.setTargetRequest(employer);
//   vfm.open("AdminEditRequest");
// }

const defaultHeaders = [
  '№',
  'Фамилия',
  'Имя',
  'Отчество',
  'Должность',
]

function openDeleteEmployer(employer: any) {
  store.setTargetEmployer(employer)
  vfm.open('deleteEmployer')
}

const user = store.getUser
</script>

<template>
  <div>
    <table
      class="bemployer-collapse bemployer-b-[3px] bemployer-solid bemployer-[#fffff] mb-5 w-full bg-white text-base"
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
          v-for="(employer, ind) in props.employers"
          :key="ind"
          class="relative"
        >
          <TableData>
            <NuxtLink class="cursor-pointer">
              {{ employer.id }}
            </NuxtLink>
          </TableData>
          <TableData>
            <NuxtLink class="cursor-pointer">
              {{ employer.lastName }}
            </NuxtLink>
          </TableData>
          <TableData>
            <NuxtLink class="cursor-pointer">
              {{ employer.name }}
            </NuxtLink>
          </TableData>
          <TableData>
            <NuxtLink class="cursor-pointer">
              {{
                employer.patronymic
              }}
            </NuxtLink>
          </TableData>
          <TableData class="max-w-[200px]">
            <NuxtLink class="cursor-pointer">
              {{ employer.post }}
            </NuxtLink>
          </TableData>
          <div v-if="employer.id !== user.id" class="absolute right-0 cursor-pointer p-2 text-xl leading-[100%] hover:text-blue" @click="openDeleteEmployer(employer)">
            ×
          </div>
        </TableRow>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
