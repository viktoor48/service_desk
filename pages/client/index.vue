<script setup lang="ts">
import { orders } from '~/constants/data'

definePageMeta({
  layout: 'client',
})

const order = [orders[0]]
</script>

<template>
  <div class="pt-5 font-title text-2xl">
    Мои заявки
  </div>
  <TableBasis :content="order" class="py-5" />
</template>

<style scoped>

</style>
