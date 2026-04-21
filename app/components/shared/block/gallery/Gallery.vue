<script setup lang="ts">
import Autoplay from 'embla-carousel-autoplay'
import { useGalleryAutoplay } from '~/components/shared/block/gallery/useGalleryAutoplay'
import type { GallerySlide } from '~/components/shared/block/gallery/index'
import type { ColorsButton } from '~/types/colors'
import type { HTMLAttributes } from 'vue'

interface Props {
  disableAutoplay?: boolean
  disableControls?: boolean
  showPagination?: boolean
  slides: GallerySlide[]
  colors?: ColorsButton
  contentClass?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const getPlugins = () => {
  if (props.disableAutoplay) return []
  return [
    Autoplay({ delay: 4500 }),
  ]
}

const { api, setApi, currentSlide, onManualClick, AUTOPLAY_DELAY } = useGalleryAutoplay(!props.disableAutoplay)

const snapCount = ref(0)
const getInfos = computed(() => {
  return props.slides?.map(slide => (slide.info!)).filter(item => !!item) || []
})
const { isMediumScreen, isSmallScreen } = useScreenSize()

onMounted(() => {
  snapCount.value = api.value?.scrollSnapList()?.length || 0
  currentSlide.value = 0
})

watch(() => props.slides.length, () => {
  api.value?.scrollTo(0, false)
})
</script>

<template>
  <div class="h-[calc(100lvh-76px)] overflow-hidden">
    <Carousel
      :plugins="getPlugins()"
      class="relative size-full *:data-[slot='carousel-content']:size-full max-md:flex max-md:flex-col"
      @init-api="setApi"
    >
      <div class="absolute top-10 w-full lg:flex justify-center px-4 z-10 overflow-x-scroll scrollbar-hide">
        <slot name="header" />
      </div>

      <CarouselContent
        class=""
        :class="cn('size-full m-0', props.contentClass)"
      >
        <CarouselItem
          v-for="(_) in slides"
          :key="_.id"
          class="h-auto w-full p-0"
        >
          <ClientOnly>
            <SharedElementAnimatedImage>
              <Image
                class="size-full object-cover brightness-85"
                :src="_.image?.url"
                :thumbnail="_.image?.formats?.thumbnail?.url"
              />
            </SharedElementAnimatedImage>
          </ClientOnly>
        </CarouselItem>
      </CarouselContent>

      <slot
        :infos="getInfos"
        :current-slide="currentSlide"
        :slides-number="slides.length"
        :duration="AUTOPLAY_DELAY"
        :on-manual-click="onManualClick"
      />

      <!-- <CarouselFloatControl
        v-if="!disableControls && isMediumScreen && slides.length > 1"
        class="absolute inset-0"
        @on-scroll="onManualClick"
      /> -->

      <div
        v-show="showPagination"
        class="absolute bottom-10 z-10 w-full flex justify-center"
      >
        <div
          v-if="isMediumScreen || !isSmallScreen"
          id="hide-float-controls"
          class="gallery-text-color flex items-center gap-1"
        >
          <CarouselPrevious :colors="colors" />
          <Text variant="base">
            {{ currentSlide + 1 }} из
            {{ slides.length }}
          </Text>
          <CarouselNext :colors="colors" />
        </div>
        <div
          v-else
          class="flex mt-6 w-full justify-center px-4"
        >
          <div
            v-for="(_, idx) in slides.length"
            :key="idx"
            class="size-1.5 rounded-full ml-1 gap-2 transition-all ease-in"
            :class="idx === currentSlide ? 'bg-secondary w-3' : 'bg-gray-300'"
          />
        </div>
      </div>
    </Carousel>
  </div>
</template>

<style scoped>
.gallery-text-color {
  color: v-bind('colors?.background');
}
</style>
