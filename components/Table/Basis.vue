<script setup lang="ts">
const props = defineProps<{
  content: any[]
  headers?: string[]
}>()

const defaultHeaders = ['№', 'Статус', 'Приоритет', 'Наименование заявки', 'Заявитель', 'Исполнители', 'Изменена']
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
        <TableRow v-for="(order, ind) in props.content" :key="ind">
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
