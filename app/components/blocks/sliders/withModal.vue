<script setup lang="ts">
import type { Schema } from '#shared/types/api'
import type { ColorsModal } from '~/types/colors'

import { useHeaderStore } from '~~/layers/header/app/stores/header'

const { data } = defineProps<{
  data: Schema<'BlocksSliderWithModalComponent'> & {
    modal_colors: ColorsModal
  }
}>()

const { isLargeScreen } = useScreenSize()
const { section } = useTheme('dark')

const sliderData = {
  items: data?.items ? [...data.items] : [],
  status: data?.items?.map(() => false) || [],
}
const anchor = useHeaderStore().getMenuLink(data.anchor?.value)?.value

const colors = useColors(data.colors).getCssVars()
const modalColors = useColors(data.modal_colors).getCssVars()
</script>

<template>
  <Container
    :id="anchor"
    ref="section"
    as="section"
    variant="wild"
    class="slider-root-colors max-lg:px-0! py-10 md:py-20 lg:py-28"
  >
    <SharedElementAnimatedText
      :text="data.header"
      component="Heading"
      variant="3"
      class="mb-10 sm:mb-14 lg:mb-17 max-lg:px-4"
      weight="bolder"
      leading="custom"
    />

    <SharedBlockSliderWithCads
      :data="sliderData"
      disable-controls
      :show-nav="isLargeScreen"
      :show-pagination="!isLargeScreen"
      container-class="px-0!"
      class="2xl:basis-1/4"
    >
      <template #content="{ item: i, idx: itemIndex }">
        <DrawerComponent
          direction="right"
          :handle-only="true"
          :close-colors="modalColors?.button"
          content-class=" h-dvh z-60"
          :overlay-style="{
            color: modalColors?.overlay,
          }"
          :content-style="{
            backgroundColor: modalColors?.base?.background,
            color: modalColors?.base?.text,
          }"
        >
          <template #trigger>
            <SharedElementCardWithImage
              :image="i?.cover ?? i?.image"
              class="cursor-pointer max-md:animate-boop"
            >
              <template #header>
                <Heading
                  variant="5"
                  weight="bolder"
                  leading="custom"
                  class="text-start"
                >
                  {{ i.title }}
                </Heading>
              </template>

              <template #button>
                <Button
                  variant="accent-filled"
                  size="icon"
                  class="cursor-pointer"
                  :colors="colors.button"
                >
                  <Icon
                    name="icons:plus"
                    size="14"
                  />
                </Button>
              </template>
            </SharedElementCardWithImage>
          </template>

          <template #content>
            <div class="min-h-dvh lg:w-[50dvw] mx-auto flex">
              <div class="w-full ">
                <div class="p-5 h-full">
                  <SharedBlockSliderWithInfo
                    :slides="sliderData.items"
                    show-nav
                    show-pagination
                    disable-autoplay
                    :colors="modalColors?.slider"
                    :initial-slide="itemIndex"
                    class="!h-full [&>#carousel-container]:overflow-clip max-sm:[&>#carousel-container]:h-80"
                  />
                </div>
              </div>
            </div>
          </template>
        </DrawerComponent>
      </template>
    </SharedBlockSliderWithCads>
  </Container>
</template>

<style scoped>
.slider-root-colors {
  background-color: v-bind('colors?.base?.background');
  color: v-bind('colors?.base?.text');
}

:deep([data-id="carousel-previous"]), :deep([data-id="carousel-next"]) {
  color: v-bind('colors?.slider_button?.text');
  background-color: v-bind('colors?.slider_button?.background');
  border-color: v-bind('colors?.slider_button?.border');
}
</style>
