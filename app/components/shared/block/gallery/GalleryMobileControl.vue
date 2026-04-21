<script setup lang="ts">
interface Props {
  currentSlide: number
  slidesNumber: number
}

defineProps<Props>()
</script>

<template>
  <div
    class="bg-gradient-to-t z-[1] from-black/40 to-transparent text-primary-foreground p-4
           w-full flex justify-between items-center"
  >
    <CarouselPrevious />
    <Text class="font-heading">
      {{ currentSlide }}<span class="opacity-40">/{{ slidesNumber }}</span>
    </Text>
    <CarouselNext />
  </div>
</template>

<style scoped>

</style>
