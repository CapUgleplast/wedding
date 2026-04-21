<script setup lang="ts">
import type { Schema } from '#shared/types/api'
import { AdaptiveButton } from '@/components/shared/element/adaptive-button'

import { useHeaderStore } from '~~/layers/header/app/stores/header'

const { data } = defineProps<{
  data: Schema<'BlocksPurchaseMethodsComponent'>
}>()

const selected = ref(data.methods?.[0]?.id?.toString() ?? '')

const options = computed(() =>
  data?.methods?.map(el => ({
    value: `${el.id}`,
    label: el.type,
    method: { ...el },
  })),
)

const current = computed(() => {
  return options.value?.find(i => i.value == selected.value)?.method ?? {}
})
const anchor = useHeaderStore().getMenuLink(data.anchor?.value)?.value

const colors = useColors(data.colors).getCssVars()

const { section } = useTheme('dark')
watch(selected, () => {
  console.log(selected)
})
</script>

<template>
  <Container
    :id="anchor"
    ref="section"
    variant="wild"
    as="section"
    class="pm-root-colors relative max-lg:px-0 py-10 sm:py-12 md:py-14"
  >
    <div class="flex max-lg:flex-col gap-10 justify-between w-full max-lg:flex-coi mb-10 ">
      <SharedElementAnimatedText
        :text="data.title"
        component="Heading"
        variant="3"
        weight="bolder"
        leading="custom"
        class="max-lg:px-5"
      />

      <div class="flex justify-between overflow-x-scroll scrollbar-hide max-lg:px-5">
        <Tabs
          v-model="selected"
        >
          <TabsList
            id="hide-float-controls"
            class="flex gap-2"
          >
            <TabsTrigger
              v-for="i in options"
              :key="i.value"
              :value="i.value ?? ''"
              :colors="colors.tabs"
            >
              {{ i.label }}
            </TabsTrigger>
          </TabsList>
          <TabsSwipeControl class="lg:hidden inset-0" />
        </Tabs>
      </div>
    </div>

    <AnimatePresence mode="wait">
      <Motion
        v-if="current.picture"
        :key="current.documentId"
        :initial="{ opacity: 0.5, scale: 0.95 }"
        :animate="{ opacity: 1, scale: 1 }"
        :exit="{ opacity: 0.5, scale: 0.95 }"
        :transition="{ duration: 0.2, ease: 'easeIn' }"
        :class="cn('grid lg:grid-cols-2 lg:gap-5 max-lg:px-5')"
      >
        <div class="col-span-1 aspect-3/4 md:aspect-square w-full h-[260px] sm:h-[344px] lg:h-[538px]">
          <!-- <SharedElementAnimatedImage> -->
          <Image
            class="size-full object-cover "
            :src="current.picture?.url"
            :thumbnail="current.picture?.formats?.thumbnail?.url"
          />
          <!-- </SharedElementAnimatedImage> -->
        </div>

        <div class="lg:px-5 py-6 sm:py-10 flex flex-col justify-between">
          <div>
            <SharedElementAnimatedText
              :text="current.description"
              component="Text"
              variant="base"
              class="text-current/80 lg:max-w-md mb-0 sm:mb-10 lg:mb-16"
              weight="normal"
              leading="teen"
            />

            <ul
              v-if="current.parameters"
              class="flex flex-wrap justify-self-start items-start max-sm:justify-between w-full max-sm:gap-x-8 max-sm:gap-y-8 gap-y-12.5 gap-x-30 mt-10"
            >
              <li
                v-for="item in current.parameters"
                :key="item.id"
                class="w-max"
              >
                <SharedElementAnimatedText
                  :text="item.key"
                  component="Heading"
                  variant="4"
                  class="text-current/80 mb-2"
                  weight="bolder"
                  leading="custom"
                />

                <SharedElementAnimatedText
                  :text="item.value"
                  component="Text"
                  variant="sm"
                  class="text-current/80 max-w-[140px]"
                  weight="normal"
                  leading="tight"
                />
              </li>
            </ul>
          </div>

          <AdaptiveButton
            v-if="!!data.button"
            id="hide-float-controls"
            variant="accent-filled"
            :label="data.button.name || ''"
            class="w-full lg:w-max mt-7"
            :data="data.button"
            :href="data.button?.link"
            :type="data.button?.type || 'link'"
            :colors="colors?.button"
          >
            <Icon
              name="icons:arrow-right"
              size="14"
              class=""
            />
          </AdaptiveButton>
        </div>
      </Motion>
    </AnimatePresence>
  </Container>
</template>

<style scoped>
.pm-root-colors {
  color: v-bind('colors?.base?.text');
  background-color: v-bind('colors?.base?.background');
}
</style>
