<script setup lang="ts">
interface IconProps {
  name: string
  size?: string | number
}

const props = withDefaults(defineProps<IconProps>(), {
  size: '24',
})

function getIcon(splitName: string[]) {
  switch (splitName.length) {
    case 1:
      return defineAsyncComponent(() => import(`~/assets/icons/${splitName[0]}.svg`))
    case 2:
      return defineAsyncComponent(() => import(`~/assets/icons/${splitName[0]}/${splitName[1]}.svg`))
    case 3:
      return defineAsyncComponent(() => import(`~/assets/icons/${splitName[0]}/${splitName[1]}/${splitName[2]}.svg`))
  }
}

const icon = computed(() => {
  const splitName = props.name.split('/')
  return getIcon(splitName)
})
</script>

<template>
  <component
    :is="icon"
    :width="size"
    :height="size"
  />
</template>
