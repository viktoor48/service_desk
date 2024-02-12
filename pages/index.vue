<script setup lang="ts">
import { orders } from '~/constants/data'

// import { useAuthStore } from '~/store/auth'
// const store = useAuthStore()
</script>

<template>
  <TableBasis :content="orders" class="py-5" />
</template>

<style scoped>

</style>
