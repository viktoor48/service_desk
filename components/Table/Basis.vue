<script setup lang="ts">
import type { Order } from '~/types/index'

const props = defineProps<{
  orders: Order[]
}>()
</script>

<template>
  <div>
    <table
      class="mb-5 w-full border-collapse border-b-[3px] border-solid border-[#fffff] bg-white text-base"
    >
      <thead>
        <TableRow :in-header="true">
          <TableHeader>№</TableHeader>
          <TableHeader>Статус</TableHeader>
          <TableHeader>Приоритет</TableHeader>
          <TableHeader>Наименование заявки</TableHeader>
          <TableHeader>Заявитель</TableHeader>
          <TableHeader>Исполнители</TableHeader>
          <TableHeader>Изменена</TableHeader>
        </TableRow>
      </thead>
      <tbody>
        <TableRow v-for="order in props.orders" :key="order.id">
          <TableData>{{ order.id }}</TableData>
          <TableData>{{ order.status }}</TableData>
          <TableData>{{ order.priority }}</TableData>
          <TableData>{{ order.name }}</TableData>
          <TableData>{{ order.applicant }}</TableData>
          <TableData>{{ order.executor }}</TableData>
          <TableData>{{ order.edited }}</TableData>
        </TableRow>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
