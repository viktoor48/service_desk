<script setup lang="ts">
import { useVfm } from 'vue-final-modal'

const vfm = useVfm()

function confirm() {
  vfm.open('confirm')
}
</script>

<template>
  <ModalsWriteUsUser @confirm="confirm" />
  <ModalsWriteUsCompany @confirm="confirm" />
  <ModalsAuthorization @confirm="confirm" />
  <ModalsClientCreateRequest @confirm="confirm" />
  <ModalsConfirm />
</template>

<style scoped>

</style>
