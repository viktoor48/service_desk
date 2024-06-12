<script setup lang="ts">
import { useVfm } from 'vue-final-modal'
import { useAuthStore } from '~/store/auth'
import type { Order } from '~/types'
import { getFormttedDate } from '~/composables'

const props = defineProps<{
  requests: any[]
}>()

const store = useAuthStore()

const vfm = useVfm()

function openEditRequest(order: Order) {
  console.log(order)
  store.setTargetRequest(order)
  vfm.open('AdminEditRequest')
}

const defaultHeaders = [
  '№',
  'Статус',
  'Тип заявки',
  'Описание',
  'Заявитель',
  'Исполнители',
  'Изменена',
]

function truncateDescription(description: string): string {
  const maxLength = 60
  if (description.length > maxLength)
    return `${description.substring(0, maxLength)}...`
  else
    return description
}

function formattedWorkers(workers: any) {
  if (workers.length)
    return workers.map((executor: any) => `${executor.lastName} ${executor.name}`).join(', ')

  return 'Не назначен'
}
</script>

<template>
  <div>
    <table
      class="mb-5 w-full border-collapse border-b-[3px] border-solid border-[#fffff] bg-white text-base"
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
          v-for="(order, ind) in props.requests"
          :key="ind"
          @click="openEditRequest(order)"
        >
          <TableData>
            <NuxtLink class="cursor-pointer">
              {{ ind + 1 }}
            </NuxtLink>
          </TableData>
          <TableData>
            <NuxtLink class="cursor-pointer">
              {{ order.status }}
            </NuxtLink>
          </TableData>
          <TableData>
            <NuxtLink class="cursor-pointer">
              {{ order.typeRequest.name }}
            </NuxtLink>
          </TableData>
          <TableData class="max-w-[200px]">
            <NuxtLink class="cursor-pointer">
              {{ order.description }}
            </NuxtLink>
          </TableData>
          <TableData>
            <NuxtLink class="cursor-pointer">
              {{
                `${order.teacher.lastName} ${order.teacher.name} ${order.teacher.patronymic}`
              }}
            </NuxtLink>
          </TableData>
          <TableData>
            <NuxtLink class="cursor-pointer">
              {{ formattedWorkers(order.workers) }}
            </NuxtLink>
          </TableData>
          <TableData>
            <NuxtLink class="cursor-pointer">
              {{ getFormttedDate(order.timeStart) }}
            </NuxtLink>
          </TableData>
        </TableRow>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
