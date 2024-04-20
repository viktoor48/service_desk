<script setup lang="ts">
import { useVfm } from 'vue-final-modal'
import { userStore } from '~/store/user'

const props = defineProps<{
  employers: any[]
}>()

const store = userStore()

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
  'Номер телефона',
  'Должность',
]
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
        >
          <TableData>
            <NuxtLink class="cursor-pointer">
              {{ employer.id }}
            </NuxtLink>
          </TableData>
          <TableData>
            <NuxtLink class="cursor-pointer">
              {{ employer.last_name }}
            </NuxtLink>
          </TableData>
          <TableData>
            <NuxtLink class="cursor-pointer">
              {{ employer.first_name }}
            </NuxtLink>
          </TableData>
          <TableData>
            <NuxtLink class="cursor-pointer">
              {{
                employer.patronymic
              }}
            </NuxtLink>
          </TableData>
          <TableData>
            <NuxtLink class="cursor-pointer">
              {{ employer.phone_number }}
            </NuxtLink>
          </TableData>
          <TableData class="max-w-[200px]">
            <NuxtLink class="cursor-pointer">
              {{ employer.posts.map((post:any) => `${post.title}`).join(', ') }}
            </NuxtLink>
          </TableData>
        </TableRow>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
