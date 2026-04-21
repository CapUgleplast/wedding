<script setup lang="ts">
import type { Schema } from '~/types/api'
import Autoplay from 'embla-carousel-autoplay'
import { useGalleryAutoplay } from '~/components/shared/block/gallery/useGalleryAutoplay'
import type { ColorsButton } from '~/types/colors'

interface Props {
  slides: Schema<'SharedTitleDescImageGroupComponent'>[]
  button?: Schema<'ContentButtonConditionalComponent'>
  title?: string
  disableAutoplay?: boolean
  disableControls?: boolean
  showPagination?: boolean
  showNav?: boolean
  initialSlide?: number
  colors?: ColorsButton
}

const { slides, disableAutoplay, initialSlide = 0 } = defineProps<Props>()

const getPlugins = () => {
  if (disableAutoplay) return []
  return [
    Autoplay({ delay: 4500 }),
  ]
}

const { isLargeScreen } = useScreenSize()

const { api, setApi, currentSlide } = useGalleryAutoplay()
const snapCount = ref(0)

onMounted(() => {
  snapCount.value = api.value?.scrollSnapList()?.length || 0
  currentSlide.value = initialSlide
  if (initialSlide > 0) {
    api.value?.scrollTo(initialSlide, false)
  }
})
</script>

<template>
  <div class="flex flex-col gap-5 justify-between h-lvh pb-10">
    <div class="py-5 px-0 lg:p-5  max-md:pt-17">
      <SharedElementResizer>
        <Heading
          :key="currentSlide"
          variant="4"
          class="text-current pb-6 sm:mb-8 whitespace-pre-line animate-in fade-in-0 duration-300"
          weight="bolder"
          leading="custom"
        >
          {{ slides[currentSlide]?.title }}
        </Heading>

        <Text
          :key="currentSlide"
          variant="base"
          class="text-current/70 whitespace-pre-line gap-8 animate-in fade-in-0 duration-300"
          weight="bolder"
          leading="teen"
        >
          {{ slides[currentSlide]?.description }}
        </Text>
      </SharedElementResizer>
    </div>

    <div
      id="carousel-container"
      class="overflow-hidden"
    >
      <Carousel
        :plugins="getPlugins()"
        class="relative size-full *:data-[slot='carousel-content']:size-full flex flex-col justify-between"
        @init-api="setApi"
      >
        <CarouselContent class="size-full m-0">
          <CarouselItem
            v-for="(_) in slides"
            :key="_.id"
            class="h-auto w-full p-0"
          >
            <ClientOnly>
              <Image
                class="w-full object-cover brightness-85 h-[360px]"
                :src="_.image?.url"
                :thumbnail="_.image?.formats?.thumbnail?.url"
              />
            </ClientOnly>
          </CarouselItem>
        </CarouselContent>
        <div
          v-show="showPagination"
          class="z-10 w-full flex justify-center pt-5"
        >
          <div
            v-if="isLargeScreen"
            class="text-current flex items-center gap-6 w-full justify-between"
          >
            <CarouselPrevious
              :colors="colors"
              variant="accent-outline"
            />
            <Text variant="base">
              <span class="text-accent">
                {{ currentSlide + 1 }}
              </span> из
              {{ slides.length }}
            </Text>
            <CarouselNext
              :colors="colors"
              variant="accent-outline"
            />
          </div>
          <div
            v-else
            class="flex mt-6 w-full justify-center px-4"
          >
            <div
              v-for="(_, idx) in snapCount"
              :key="idx"
              class="size-1.5 rounded-full ml-1 gap-2 transition-all ease-in"
              :class="idx === currentSlide ? 'bg-current w-3' : 'bg-current/50'"
            />
          </div>
        </div>
      </Carousel>
    </div>
  </div>
</template>
