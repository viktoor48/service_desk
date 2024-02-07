<script setup lang="ts">
interface Props {
  inHeader?: boolean
}

const props = defineProps<Props>()

const component = computed(() => {
  if (!props.inHeader)
    return resolveComponent('NuxtLink')

  return 'tr'
})
</script>

<template>
  <component :is="component" class="table-row even:bg-[#f8f8f8]" :class="[!props.inHeader ? 'hover:bg-[#CCCCCC] hover:duration-150' : '']">
    <slot />
  </component>
</template>

<style scoped>

</style>
