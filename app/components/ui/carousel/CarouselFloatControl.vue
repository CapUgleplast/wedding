<script setup lang="ts">
import { useCarousel } from '~/components/ui/carousel/useCarousel'
import CarouselFloatButton from '~/components/ui/carousel/CarouselFloatButton.vue'

const emit = defineEmits(['onScroll'])

const { canScrollPrev, canScrollNext, carouselApi } = useCarousel()

const controls = useTemplateRef('controls')

const currentDirection = ref<'next' | 'prev'>('next')

const setCurrentButton = (ctx: unknown) => {
  if (!canScrollPrev.value) {
    currentDirection.value = 'next'
    return
  }
  if (!canScrollNext.value) {
    currentDirection.value = 'prev'
    return
  }

  if (!ctx?.container?.value || !ctx?.relativePos?.x) return

  const carouselWidth = ctx.container?.value?.clientWidth

  currentDirection.value = ctx?.relativePos?.x < carouselWidth / 2
    ? 'prev'
    : 'next'
}

const sendEmit = () => {
  emit('onScroll')
}

const slidesEnough = computed(() => carouselApi.value?.scrollSnapList()?.length > 1)

watch([canScrollNext, canScrollPrev], () => {
  const instance = controls.value?.instance
  setCurrentButton(instance)
})
</script>

<template>
  <FloatControl
    v-if="slidesEnough"
    ref="controls"
    :custom-set-function="setCurrentButton"
  >
    <CarouselFloatButton
      :direction="currentDirection"
      class="relative cursor-none"
      @on-scroll="sendEmit"
    />
  </FloatControl>
</template>

<style scoped>

</style>
