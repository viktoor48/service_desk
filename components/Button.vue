<script setup lang="ts">
const props = defineProps<{
  disabled?: boolean
  loading?: boolean
  loadingText?: string
  block?: boolean
  to?: string
  theme?: 'dark' | 'light'
}>()

const bgColorArr: Map<string, string> = new Map([['dark', 'disabled:bg-white/10'], ['default', 'disabled:bg-gray']])

const component = computed(() => {
  if (props.to)
    return resolveComponent('NuxtLink')
  return 'button'
})

function getStyleClass() {
  const bgColor = bgColorArr.get(props.theme || 'default')!
  const block = props.block ? 'w-full' : ''

  return `${bgColor} ${block}`
}
</script>

<template>
  <component
    :is="component"
    :to="to"
    :disabled="disabled"
    class="disabled:text-gray-dark relative inline-flex h-[53px] items-center justify-center rounded-xl bg-red px-7 text-[14px] font-semibold uppercase leading-3 text-white transition-colors duration-300 hover:bg-red-dark disabled:bg-gray"
    :class="getStyleClass()"
  >
    <div v-if="loading" class="inline-flex items-center gap-2.5">
      <span>
        {{ loadingText }}
      </span>
      <span class="h-5 w-5 animate-spin rounded-full border-[3px] border-l-gray" />
    </div>
    <div v-else class="inline-flex items-center gap-2.5">
      <span>
        <slot />
      </span>
      <span>
        <Icon class="w-[21px]" name="ArrowRight" />
      </span>
    </div>
  </component>
</template>
>
