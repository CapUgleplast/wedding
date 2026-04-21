<script setup lang="ts">
import type { Schema } from '#shared/types/api'

import { useHeaderStore } from '~~/layers/header/app/stores/header'

const { data } = defineProps<{
  data: Schema<'BlocksLocationComponent'>
}>()
const anchor = useHeaderStore().getMenuLink(data.anchor?.value)?.value

const colors = useColors(data.colors).getCssVars()
const { section } = useTheme('dark')
</script>

<template>
  <Container
    :id="anchor"
    ref="section"
    variant="wild"
    class="py-10 sm:py-12 md:py-14 root-location-colors"
  >
    <div class="flex flex-col lg:grid lg:grid-cols-2 max-sm:gap-6 gap-10 mb-6 md:mb-14 lg:mb-20">
      <SharedElementAnimatedText
        :text="data.title"
        component="Heading"
        variant="3"
        class="text-primary"
        weight="bolder"
        leading="custom"
      />
      <SharedElementAnimatedText
        :text="data.description"
        component="Text"
        variant="base"
        class="text-primary/70 [&>p]:whitespace-pre-line [&>p]:lg:w-[25dvw] [&>p]:max-sm:columns-1 [&>p]:columns-2 [&>p]:lg:columns-1 [&>p]:gap-8"
        weight="bolder"
        leading="teen"
      />
    </div>
    <SharedElementAnimatedImage v-if="data?.image">
      <SharedBlockAdaptiveImage
        class="size-full object-cover min-h-[457px] max-h-[900px] aspect-3/4 md:aspect-video"
        :image="data?.image"
      />
    </SharedElementAnimatedImage>
  </Container>
</template>

<style scoped>
.root-location-colors {
  background-color: v-bind('colors?.base?.background');
  color: v-bind('colors?.base?.text');
}
</style>
