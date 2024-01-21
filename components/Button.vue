<script setup lang="ts">
const props = defineProps<{
  disabled?: boolean
  loading?: boolean
  block?: boolean
  to?: string
}>()

const component = computed(() => {
  if (props.to)
    return resolveComponent('NuxtLink')
  return 'button'
})
</script>

<template>
  <component
    :is="component"
    :to="to"
    :disabled="disabled"
    class="relative inline-flex h-14 items-center justify-center gap-2.5 rounded-xl bg-red px-7 text-sm font-semibold uppercase text-white transition-colors duration-300 hover:bg-red-dark disabled:bg-gray-light"
    :class="{ 'w-full': block }"
  >
    <span :class="{ 'opacity-0': loading }">
      <slot />
    </span>

    <span :class="{ 'opacity-0': loading }">
      <Icon name="arrow-right" />
    </span>

    <!--    <span v-if="loading" class="absolute inset-0 flex items-center justify-center"> -->
    <!--      <Icon name="loader" class="animate-spin" /> -->
    <!--    </span> -->
  </component>
</template>
