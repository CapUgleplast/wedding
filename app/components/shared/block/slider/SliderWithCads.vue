<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { Image } from '#shared/types/api'

type Data = {
  title?: string
  subtitle?: string
  items: {
    id?: number
    title?: string
    text?: string
    image?: Image
    picture?: Image
    area?: number
    minPrise?: number
  }[]
}

interface Props {
  data?: Data
  showPagination?: boolean
  disableAutoplay?: boolean
  disableControls?: boolean
  showNav?: boolean
  class?: HTMLAttributes['class']
  containerClass?: HTMLAttributes['class']
  style?: Record<string, string>
}

const props = withDefaults(defineProps<Props>(), {
  showPagination: true,
  disableAutoplay: true,
  disableControls: false,
  showNav: false,
})
</script>

<template>
  <section>
    <Container
      variant="wild"
      :class="cn('max-lg:px-0!', props.containerClass)"
      :style="style"
    >
      <SharedElementHeader
        v-if="data?.title"
        :title="data?.title"
        :subtitle="data?.subtitle"
        class="max-lg:px-5"
      />
      <SharedBlockSliderWrapper
        class="h-full! overflow-hidden"
        :disable-autoplay="disableAutoplay"
        :show-pagination="showPagination"
        :disable-controls="disableControls"
        :slides-count="data?.items?.length"
        :show-nav="showNav"
      >
        <CarouselItem
          v-for="(item, idx) in data?.items ?? []"
          :key="idx"
          :class="cn('relative basis-11/13 sm:basis-[56%] md:basis-[40%] xl:basis-1/3 pl-5 last:pr-5', showNav ? 'first:pl-5' : '', props.class)"
        >
          <ClientOnly>
            <slot
              name="content"
              :item="item"
              :idx="idx"
            />
          </ClientOnly>
        </CarouselItem>
      </SharedBlockSliderWrapper>
    </Container>

    <slot name="after" />
  </section>
</template>
