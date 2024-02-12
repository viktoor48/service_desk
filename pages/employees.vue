<script setup lang="ts">
import { employees } from '~/constants/data'

const arrHeaders = ['Имя', 'Телефон', 'Должность']
</script>

<template>
  <TableBasis :headers="arrHeaders" :content="employees" class="py-5" />
</template>

<style scoped>

</style>
