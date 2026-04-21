<script setup lang="ts">

</script>

<template>
  <section class="size-full relative">
    <slot name="background" />
    <div class="*:absolute absolute inset-0 max-md:hidden">
      <slot name="widget" />
    </div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <slot name="foreground" />
      <div class="md:hidden">
        <slot name="widget" />
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
