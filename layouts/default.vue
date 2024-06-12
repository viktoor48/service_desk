<script setup lang="ts">
</script>

<template>
  <div class="flex h-full min-h-screen flex-col font-montserrat">
    <LayoutHeader class="bg-[#323a4d]" />
    <div class="flex-auto">
      <div class="w-full bg-white px-4 sm:px-5 lg:px-10">
        <slot />
      </div>
    </div>
    <LayoutFooter class="bg-[#323a4d]" />
  </div>
</template>
