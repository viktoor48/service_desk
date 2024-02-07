<script setup lang="ts">
import { ModalsContainer } from 'vue-final-modal'
import { useIsScrollBlocked } from '~/composables/useState'

const isScrollBlocked = useIsScrollBlocked()
</script>

<template>
  <NuxtLayout :class="[isScrollBlocked ? 'max-h-screen overflow-hidden' : '']">
    <NuxtLoadingIndicator color="#B8282B" :height="2" />
    <NuxtPage />
    <Modals />
    <ModalsContainer />
  </NuxtLayout>
</template>
