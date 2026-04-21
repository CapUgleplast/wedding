<script setup lang="ts">
import type { GalleryBlock } from './types'
import ContentContainer from './ContentContainer.vue'

const props = defineProps<{ block: GalleryBlock }>()

const galleryFormatter = computed(() => {
  return props.block.gallery?.map(slide => ({
    image: {
      ...slide,
    },
  }))
})

const isDesktop = useMediaQuery('(min-width: 640px)')
</script>

<template>
  <ContentContainer class="h-[200px] sm:h-[382px] mt-5 -mb-5">
    <SharedBlockGallery
      v-slot="{ currentSlide, slidesNumber }"
      class="!h-full w-full overflow-hidden"
      :disable-autoplay="true"
      :disable-controls="true"
      :slides="galleryFormatter"
      :disable-previews="isDesktop"
    >
      <div class="absolute bottom-0 inset-x-0 px-5 pb-5 hidden lg:block ">
        <CarouselPagination
          :slides-number="slidesNumber"
          :current-slide="currentSlide"
        />
      </div>
    </SharedBlockGallery>
  </ContentContainer>
</template>
