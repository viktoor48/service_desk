<script setup lang="ts">
import { useVfm } from 'vue-final-modal'
import { userStore } from '~/store/user'
import type { Order } from '~/types'

const props = defineProps<{
  content: any[]
  headers?: string[]
}>()

const store = userStore()

const vfm = useVfm()

function openEditRequest(order: Order) {
  console.log(order)
  store.setTargetRequest(order)
  vfm.open('editRequest')
}

const defaultHeaders = ['№', 'Статус', 'Приоритет', 'Наименование заявки', 'Заявитель', 'Исполнители', 'Описание', 'Изменена']
const headersToUse = props.headers ?? defaultHeaders
</script>

<template>
  <div>
    <table
      class="mb-5 w-full border-collapse border-b-[3px] border-solid border-[#fffff] bg-white text-base"
    >
      <thead>
        <tr>
          <TableHeader v-for="(text, ind) in headersToUse" :key="ind">
            {{ text }}
          </TableHeader>
        </tr>
      </thead>
      <tbody>
        <TableRow v-for="(order, ind) in props.content" :key="ind" @click="openEditRequest(order)">
          <TableData v-for="(value, key) in order" :key="key">
            <NuxtLink class="cursor-pointer">
              {{ value }}
            </NuxtLink>
          </TableData>
        </TableRow>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
