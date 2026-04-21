<script setup lang="ts">
import { useScrollCardsAnimation } from './useScrollCardsAnimation'

import { useHeaderStore } from '~~/layers/header/app/stores/header'

interface Props {
  data: Schema<'BlocksScrollSectionComponent'>
  position?: number
}

const { data } = defineProps<Props>()

const { init, destroy, isSmallScreen } = useScrollCardsAnimation()

const container = useTemplateRef('container')
const cards = useTemplateRef('cards')
const foreground = useTemplateRef('foreground')

tryOnMounted(async () => {
  await init(container.value, cards.value, foreground.value)
})

tryOnBeforeUnmount(() => {
  destroy()
})

watch(isSmallScreen, async (val) => {
  if (val) {
    destroy()
  }
  else {
    await init(container.value, cards.value, foreground.value)
  }
})

const sliderData = {
  title: data?.title,
  items: data?.items ? [...(data?.items || [])] : [],
}

const anchor = useHeaderStore().getMenuLink(data.anchor?.value)?.value
const colors = useColors(data?.colors).getCssVars()

const { section: sectionTheme } = useTheme('dark')

onMounted(() => {
  sectionTheme.value = container.value
})
</script>

<template>
  <Container
    :id="anchor"
    ref="section"
    variant="wild"
    class="scroll-root-colors size-full relative max-xl:hidden py-10 sm:py-12 md:py-14"
  >
    <div
      ref="container"
      class="relative"
    >
      <div
        ref="pinner"
        class="absolute "
      />
      <SharedSectionCentered
        class="h-svh sticky top-0"
      >
        <template #foreground>
          <div ref="foreground">
            <SharedBlockGroupCentered
              :title="data.title"
            />
          </div>
        </template>
        <template #background>
          <BackgroundAnimated variant="alt" />
          <div
            ref="cards"
            class="absolute inset-0 "
          >
            <SharedElementCardWithImage
              v-for="(item, idx) in data.items?.slice(0, 3)"
              :key="idx"
              :text="item.text"
              :image="item.image"
              :class="[
                'scroll-card-colors absolute w-[30dvw]! h-auto! max-w-[440px] 3xl:max-w-[23dvw] object-cover aspect-square',
                { 'left-0 top-0': idx === 0,
                  'left-1/2 -translate-x-1/2': idx === 1,
                  'right-0 top-0': idx === 2 },
              ]"
            />
          </div>
        </template>
      </SharedSectionCentered>
    </div>
  </Container>
  <div
    class="xl:hidden"
  >
    <SharedBlockSliderWithCads
      :title="sliderData.title"
      :data="sliderData"
      disable-controls
      :show-pagination="true"
      class="basis-11/13 md:basis-[44%] lg:basis-1/3 lg:first:pl-0"
      :container-class="'max-lg:px-0! bg-background py-10 sm:py-12 md:py-14'"
    >
      <template #content="{ item: i }">
        <SharedElementCardWithImage
          :text="i.text"
          :image="i.image"
          class="scroll-card-colors"
        />
      </template>
    </SharedBlockSliderWithCads>
  </div>
</template>

<style scoped>
.scroll-root-colors {
  background-color: v-bind(colors?.background);
  color: v-bind(colors?.text);
}

.scroll-card-colors {
  background-color: v-bind('colors?.text');
  color: v-bind('colors?.image_text');
}
</style>
