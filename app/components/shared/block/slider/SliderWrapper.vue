<script setup lang="ts">
import Autoplay from 'embla-carousel-autoplay'
import { useGalleryAutoplay } from '~/components/shared/block/gallery/useGalleryAutoplay'

interface Props {
  disableAutoplay?: boolean
  disableControls?: boolean
  showPagination?: boolean
  showNav?: boolean
  slidesCount?: number
}

const props = withDefaults(defineProps<Props>(), {
  showPagination: false,
  showNav: false,
})

const emit = defineEmits(['change'])

const { isLargeScreen } = useScreenSize()

const getPlugins = () => {
  if (props.disableAutoplay) return []
  return [
    Autoplay({ delay: 4500 }),
  ]
}

const { api, setApi, currentSlide, onManualClick } = useGalleryAutoplay(!props.disableAutoplay)

const snapCount = ref(0)

onMounted(() => {
  currentSlide.value = 0
  snapCount.value = api.value?.scrollSnapList()?.length || 0
})

watch(() => props.slidesCount, (value) => {
  emit('change', value)
  snapCount.value = api.value?.scrollSnapList()?.length || 0
})
</script>

<template>
  <div class="min-h-[10lvh]">
    <Carousel
      :plugins="getPlugins()"
      orientation="horizontal"
      class="relative size-full *:data-[slot='carousel-content']:size-full flex items-center justify-center max-md:flex-col"
      @init-api="setApi"
    >
      <CarouselPrevious
        v-if="showNav"
        class="h-max"
      />
      <CarouselContent
        class="size-full m-0!"
      >
        <!-- :class="{
          'justify-center': snapCount == 1,
        }" -->
        <slot />
      </CarouselContent>

      <CarouselNext
        v-if="showNav"
        class="h-max"
      />

      <CarouselFloatControl
        v-if="!disableControls && isLargeScreen"
        class="absolute inset-0 bottom-1/5"
        @on-scroll="onManualClick"
      />
    </Carousel>
    <div
      v-if="showPagination && snapCount > 1"
      class="flex mt-6 w-full justify-center px-4"
    >
      <div
        v-for="(_, idx) in snapCount"
        :key="idx"
        class="size-1.5 rounded-full ml-1 gap-2 transition-all ease-in"
        :class="idx === currentSlide ? 'bg-current w-3' : 'bg-current/40'"
      />
    </div>
    <div>
      <slot name="after" />
    </div>
  </div>
</template>
