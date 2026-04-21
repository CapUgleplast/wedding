<script setup lang="ts">
import { useCarousel } from '~/components/ui/carousel/useCarousel'

const emit = defineEmits(['onScroll'])

interface Props {
  direction: 'next' | 'prev'
}

const props = defineProps<Props>()

const currentSlide = ref(0)

const { canScrollNext, scrollNext, canScrollPrev, scrollPrev, carouselApi } = useCarousel()

const getCurrentSlide = () => {
  currentSlide.value = carouselApi.value?.selectedScrollSnap() || 0
}

const onClick = () => {
  if (props.direction === 'next' && canScrollNext.value) {
    scrollNext()
  }
  else if (props.direction === 'prev' && canScrollPrev.value) {
    scrollPrev()
  }
  getCurrentSlide()
  emit('onScroll')
}
</script>

<template>
  <button
    class="size-10 p-3 bg-accent text-accent-foreground rounded-sm flex items-center justify-center"
    @click="onClick"
  >
    <Icon
      v-if="direction == 'next'"
      name="icons:arrow-right"
      class="animate-in slide-in-from-start-[200%] fade-in-0 size-4! duration-300"
    />
    <Icon
      v-if="direction == 'prev'"
      name="icons:arrow-right"
      class="animate-in slide-in-from-start-[200%] fade-in-0 size-4! duration-300 -scale-100"
    />
  </button>
</template>

<style scoped>

</style>
