<script setup lang="ts">
import { useVfm } from "vue-final-modal";
import { userStore } from "~/store/user";
import type { Order } from "~/types";
import { getFormttedDate } from "~/composables";

const props = defineProps<{
  requests: any[];
}>();

const store = userStore();

const vfm = useVfm();

function openEditRequest(order: Order) {
  console.log(order);
  store.setTargetRequest(order);
  vfm.open("AdminEditRequest");
}

const defaultHeaders = [
  "№",
  "Статус",
  "Приоритет",
  "Наименование заявки",
  "Заявитель",
  "Исполнители",
  "Описание",
  "Создана",
];

function truncateDescription(description: string): string {
  const maxLength = 60;
  if (description.length > maxLength) {
    return `${description.substring(0, maxLength)}...`;
  } else {
    return description;
  }
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
              {{ order.id }}
            </NuxtLink>
          </TableData>
          <TableData>
            <NuxtLink class="cursor-pointer">
              {{ order.status }}
            </NuxtLink>
          </TableData>
          <TableData>
            <NuxtLink class="cursor-pointer"> приоритет ? </NuxtLink>
          </TableData>
          <TableData>
            <NuxtLink class="cursor-pointer">
              {{ order.type_request_title }}
            </NuxtLink>
          </TableData>
          <TableData>
            <NuxtLink class="cursor-pointer">
              {{
                `${order.user.first_name} ${order.user.last_name} ${order.user.patronymic}`
              }}
            </NuxtLink>
          </TableData>
          <TableData>
            <NuxtLink class="cursor-pointer">
              {{ order.executors.map((executor : any) => `${executor.last_name} ${executor.first_name}`).join(', ') }}
            </NuxtLink>
          </TableData>
          <TableData class="max-w-[200px]">
            <NuxtLink class="cursor-pointer">
              {{ truncateDescription(order.description) }}
            </NuxtLink>
          </TableData>
          <TableData>
            <NuxtLink class="cursor-pointer">
              {{ getFormttedDate(order.time_creation) }}
            </NuxtLink>
          </TableData>
        </TableRow>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
