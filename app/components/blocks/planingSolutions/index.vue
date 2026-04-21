<script setup lang="ts">
import type { Schema } from '#shared/types/api'
import type { ColorsPlaningSolutions } from '~/types/colors'
import { useFosStore } from '~~/layers/fos/app/stores/fos'

import { useHeaderStore } from '~~/layers/header/app/stores/header'

const { data } = defineProps<{
  data: Schema<'ProjectPlaningSolutionComponent'>
    & {
      colors?: ColorsPlaningSolutions
    }
}>()

const { isLargeScreen } = useScreenSize()

const selected = ref(data?.items?.[0]?.id ?? '')

const options = computed(() => {
  // Если данных нет или в них нет массива items, возвращаем пустой массив
  if (!data?.items) return []

  // Обязательно добавляем return перед map
  return data.items.map(el => ({
    value: el.id,
    label: el.type,
    plans: {
      items: [...(el.plan ?? [])],
    },
  }))
})

const current = computed(() => {
  return options.value?.find(i => i.value === selected.value)?.plans ?? []
})

const anchor = useHeaderStore().getMenuLink(data?.anchor?.value)?.value
const colors = useColors(data.colors).getCssVars()
const { colors: fosColors } = useFosStore()

const { section } = useTheme('dark')
</script>

<template>
  <Container
    v-if="data"
    :id="anchor"
    ref="section"
    as="section"
    variant="wild"
    class="flats-root-colors max-lg:px-0! text-primary-foreground overflow-hidden py-10 sm:py-12 md:py-14"
  >
    <div class="flex justify-between lg:px-0 px-5 overflow-x-scroll scrollbar-hide mb-12 sm:mb-14 lg:mb-16">
      <Tabs
        id="hide-float-controls"
        v-model="selected"
      >
        <TabsList class="flex gap-2">
          <TabsTrigger
            v-for="i in options"
            :key="i.value"
            :colors="colors.tabs"
            :value="i.value ?? ''"
          >
            {{ i.label }}
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <SharedElementAdaptiveButton
        v-if="isLargeScreen && data.button?.name"
        :href="data.button?.link"
        :type="data.button?.type || 'fos'"
        :label="data.button?.name"
        :data="data.button?.fos"
        :colors="colors.consult_button"
      >
        <Icon
          ref="buttonRef"
          name="icons:arrow-right"
        />
      </SharedElementAdaptiveButton>
    </div>
    <Motion
      v-if="current?.items?.length"
      :key="current?.items[0]?.id"
      :initial="{ opacity: 0, scale: 1, y: 10 }"
      :animate="{ opacity: 1, scale: 1, y: 0 }"
      :exit="{ opacity: 0, scale: 1, y: 10 }"
      :transition="{ duration: 0.6, ease: 'easeOut' }"
      :class="cn('')"
    >
      <SharedBlockSliderWithCads
        :data="current"
        disable-controls
        :show-nav="isLargeScreen"
        :show-pagination="!isLargeScreen"
        container-class="px-0!"
        class="2xl:basis-1/4 lg:last:pr-0"
      >
        <template #content="{ item: i }">
          <DrawerComponent
            :direction="'right'"
            :overlay-style="{
              color: fosColors.overlay,
            }"
            :close-colors="fosColors.button"
          >
            <template #trigger>
              <SharedElementCardPlaning
                :area="i?.area"
                :price="i?.minPrice"
                :image="i?.picture"
                :tags="i?.tags"
                :colors="colors.card"
                class="flex flex-col justify-between cursor-pointer max-md:animate-boop [&>div>div>img]:max-h-[250px] sm:[&>div>div>img]:max-h-[270px]"
              />
            </template>

            <template #content>
              <div
                :style="{
                  color: fosColors.base?.text,
                  backgroundColor: fosColors.base?.background,
                }"
                class="min-h-lvh w-dvw md:w-[478px] lg:w-[80dvw] mx-auto flex lg:items-center max-lg:flex-col"
              >
                <div
                  class="px-4 py-5 lg:hidden"
                >
                  <Logo class="!h-8" />
                </div>
                <div class="size-full lg:h-dvh">
                  <SharedElementCardPlaning
                    :area="i?.area"
                    :price="i?.minPrice"
                    :image="i?.picture"
                    :colors="colors.card"
                    class="h-full! p-4 min-h-0 [&>div]:pb-0 gap-0 md:p-10 flex flex-col-reverse justify-end [&>#image]:pt-12 [&>#image>div]:h-full max-lg:[&>div>div>img]:max-h-[250px]"
                  />
                </div>
                <div
                  class="p-10 w-full lg:w-[57dvw] max-md:mt-auto flex lg:justify-center flex-col size-full "
                >
                  <FosTabs
                    :description="data?.button?.fos?.description"
                    :title="data?.button?.fos?.title"
                    :colors="fosColors"
                  />
                </div>
              </div>
            </template>
          </DrawerComponent>
        </template>
      </SharedBlockSliderWithCads>
    </Motion>
    <div class="px-5 mt-10">
      <SharedModalFos
        v-if="!isLargeScreen"
        :data="data?.button?.fos"
      >
        <template #trigger>
          <Button
            :colors="colors.consult_button"
            variant="secondary-filled"
            class="w-full"
          >
            {{ data.button?.name }}
            <Icon
              name="icons:arrow-right"
              size="14"
            />
          </Button>
        </template>
      </SharedModalFos>
    </div>
  </Container>
</template>

<style scoped>
.flats-root-colors {
  background-color: v-bind('colors?.base?.background');
  color: v-bind('colors?.base?.text');
}

:deep([data-id="carousel-previous"]), :deep([data-id="carousel-next"]) {
  color: v-bind('colors?.slider_button?.text');
  background-color: v-bind('colors?.slider_button?.background');
  border-color: v-bind('colors?.slider_button?.border');
}

.fos-root-colors {
  color: v-bind('fosColors?.base?.text');
  background-color: v-bind('fosColors?.base?.background');
}
</style>
