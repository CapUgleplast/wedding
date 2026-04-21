<script setup lang="ts">
import type { ColorsMap } from '~/types/colors'
import { useHeaderStore } from '~~/layers/header/app/stores/header'

interface Props {
  data?: {
    anchor?: Schema<'ContentTextComponent'>
    project?: Project
    pins?: Schema<'ProjectPinComponent'>
    items?: Schema<'SharedImageGroupComponent'>
    colors?: ColorsMap
  }
}

const props = defineProps<Props>()

const sliderData = {
  items: props.data?.items ? [...(props.data?.items || [])] : [],
}

const { isLargeScreen } = useScreenSize()
const anchor = useHeaderStore().getMenuLink(props.data?.anchor?.value)?.value

const colors = useColors(props.data?.colors).getCssVars()

const { section } = useTheme('dark')
</script>

<template>
  <section
    :id="anchor"
    ref="section"
    class="root-map-colors size-full flex flex-col py-10 sm:py-12 md:py-14"
  >
    <Container
      variant="wild"
      class="size-full relative h-[95vw] sm:h-[65lvh] 3xl:h-[80lvh] mb-6 sm:mb-8 lg:mb-10"
    >
      <BlocksMapDesktop
        v-if="isLargeScreen"
        :project="data?.project"
        :pins="data?.pins"
        :colors="colors.map"
      />
      <LazyBlocksMapMobile
        v-else
        :project="data?.project"
        :pins="data?.pins"
        :colors="colors.map"
      />
    </Container>

    <SharedBlockSliderWithCads
      :data="sliderData"
      disable-controls
      :show-pagination="!isLargeScreen"
      class="basis-11/13 sm:basis-[60%] md:basis-[45%] first:pl-5 last:pr-5 lg:first:pl-0 lg:last:pr-0 lg:pr-3"
    >
      <template #content="{ item: i }">
        <SharedElementCardWithImage
          :text="i.text"
          :image="i.image"
          class="h-[443px] sm:h-[540px] 3xl:h-[720px]"
          variant="4"
        />
      </template>
    </SharedBlockSliderWithCads>
  </section>
</template>

<style scoped>
.root-map-colors {
  background-color: v-bind('colors?.base?.background');
  color: v-bind('colors?.base?.text');
}
</style>
