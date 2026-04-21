<script setup lang="ts">
import type { Schema } from '#shared/types/api'

import { useHeaderStore } from '~~/layers/header/app/stores/header'

const { data } = defineProps<{
  data: Schema<'BlocksConstructionProgressComponent'>
}>()

const { isLargeScreen } = useScreenSize()

const sliderData = {
  title: data?.title,
  subtitle: data?.subtitle,
  items: data?.items ? [...data.items] : [],
}

const { transformDate } = useTransformDate()
const [useModalTemplate, Modal] = createReusableTemplate()
const anchor = useHeaderStore().getMenuLink(data.anchor?.value)?.value

const colors = useColors(data?.colors).getCssVars()

const { section } = useTheme('dark')
</script>

<template>
  <!-- темплейт модалки для просмотра галереи -->
  <useModalTemplate v-slot="{ item: i }">
    <DrawerComponent
      :direction="'bottom'"
      :handle-only="true"
      content-class="h-dvh w-dvw overflow-hidden scrollbar-hide [&>[data-slot='drawer-main']]:bg-primary z-50 data-[vaul-drawer-direction=bottom]:mt-0 group-data-[vaul-drawer-direction=top]/drawer-content:rounded-none! data-[vaul-drawer-direction=bottom]:max-h-dvh [&>[data-slot='drawer-main']]:rounded-t-none"
    >
      <template #trigger>
        <Button
          :colors="colors.card?.button"
          variant="secondary-filled"
          size="icon"
        >
          <Icon
            name="icons:plus"
            size="16"
          />
        </Button>
      </template>

      <template #content>
        <div>
          <div class="bg-primary h-dvh lg:w-[80dvw] mx-auto">
            <SharedBlockGallery
              :slides="i?.gallery?.map((img, idx) => ({
                id: idx,
                image: img,
              })) || []"
              :show-pagination="true"
              :disable-controls="false"
              content-class="flex items-center [&>div>div>div>div]:h-[250px] sm:[&>div>div>div>div]:h-[480px] md:[&>div>div>div>div]:h-dvh"
            />
          </div>
        </div>
      </template>
    </DrawerComponent>
  </useModalTemplate>

  <section
    :id="anchor"
    ref="section"
    class="construction-root-colors sm:py-10 md:py-14 bg-background"
  >
    <SharedBlockSliderWithCads
      :data="sliderData"
      disable-controls
      :show-pagination="!isLargeScreen"
      class="xl:basis-1/4 lg:first:pl-0 lg:last:pr-0"
    >
      <template #content="{ item: i }">
        <SharedElementCardWithImage
          class="construction-card-colors"
          :text="transformDate(i?.date)"
          :image="i?.cover ?? i?.gallery?.[0]"
        >
          <template #header>
            <Heading
              variant="7"
              weight="bolder"
              leading="none"
              class="flex items-center gap-2"
            >
              <Icon
                name="icons:photo"
                size="16"
              />
              {{ i?.gallery?.length }} фото
            </Heading>
          </template>

          <!-- кнопка открытия модалки на малых экранах -->
          <template
            v-if="!isLargeScreen"
            #button
          >
            <Modal :item="i" />
          </template>

          <!-- контент при ховере на больших экранах -->
          <template
            v-if="isLargeScreen"
            #hoverContent
          >
            <Modal :item="i" />
          </template>
        </sharedelementcardwithimage>
      </template>
    </SharedBlockSliderWithCads>
  </section>
</template>

<style scoped>
.construction-root-colors {
  background-color: v-bind('colors.base?.background');
  color: v-bind('colors.base?.text');
}

.construction-card-colors {
  background-color: v-bind('colors.card?.background');
  color: v-bind('colors.card?.text');
}
</style>
