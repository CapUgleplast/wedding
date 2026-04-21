<script setup lang="ts">
import type { Schema } from '#shared/types/api'

import { useHeaderStore } from '~~/layers/header/app/stores/header'

const { data } = defineProps<{
  data: Schema<'BlocksLandscapingComponent'>
}>()

type item = Schema<'BlocksLandscapingComponent'>['items'][]

const initialImage = computed(() =>
  data.items?.[0]?.image,
)

const activeImage = ref(data.items?.[0]?.image?.id)

watchEffect(() => {
  activeImage.value = initialImage.value
})

const onItemHover = (item: item) => {
  if (item?.image) {
    activeImage.value = item?.image
  }
}

const formatIndex = (idx: number) =>
  String(idx + 1).padStart(2, '0')

const { isLargeScreen } = useScreenSize()

const sliderData = {
  title: data.title,
  subtitle: data?.subtitle,
  items: data?.items ? [...data.items] : [],
}

const anchor = useHeaderStore().getMenuLink(data.anchor?.value)?.value
const colors = useColors(data.colors).getCssVars()

const { section } = useTheme('dark')
</script>

<template>
  <section
    :id="anchor"
    ref="section"
    class="root-landscaping-colors"
  >
    <Container
      v-if="isLargeScreen"
      variant="wild"
      class="py-10 sm:py-12 md:py-14"
    >
      <SharedElementHeader
        :title="data.title"
        :subtitle="data.subtitle"
      />

      <div class="grid grid-cols-3 items-start">
        <div class="col-span-2 mr-10 flex flex-col justify-center h-full">
          <ul
            v-if="data.items?.length"
            class="flex flex-col"
          >
            <li
              v-for="(i, idx) in data.items"
              :key="i.id"
              class="border-b border-primary/15 last:border-none py-5 flex gap-5 items-center cursor-pointer group"
              :class="activeImage?.id === i.image?.id ? 'accent-color' : ''"
              @mouseenter="onItemHover(i as item)"
            >
              <Text
                variant="sm"
                class="min-w-[305px] transition-colors group-hover:accent-color"
              >
                {{ formatIndex(idx) }}
              </Text>

              <Heading
                variant="5"
                weight="bolder"
                leading="none"
                class="transition-colors group-hover:accent-color"
              >
                {{ i.text }}
              </Heading>
            </li>
          </ul>
        </div>

        <AnimatePresence mode="wait">
          <Motion
            v-if="activeImage"
            :key="activeImage.documentId"
            :initial="{ opacity: 0.0, scale: 0.95 }"
            :animate="{ opacity: 1, scale: 1 }"
            :exit="{ opacity: 0.0, scale: 0.98 }"
            :transition="{ duration: 0.2, ease: 'easeIn' }"
            :class="cn('col-span-1 aspect-3/4 md:aspect-square')"
          >
            <Image
              class="size-full object-cover"
              :src="activeImage.url"
              :thumbnail="activeImage.formats?.thumbnail?.url"
            />
          </Motion>
        </AnimatePresence>
      </div>
    </Container>
    <SharedBlockSliderWithCads
      v-else
      :data="sliderData"
      container-class="py-10 sm:py-12 md:py-14"
    >
      <template #content="{ item: i }">
        <SharedElementCardWithImage
          :text="i?.text"
          :image="i?.image"
          variant="4"
          class="landscaping-card-colors"
        />
      </template>
    </SharedBlockSliderWithCads>
  </section>
</template>

<style scoped>
.root-landscaping-colors {
  background-color: v-bind('colors?.base?.background');
  color: v-bind('colors?.base?.text');
}

.accent-color {
  color: v-bind('colors?.base?.active');
}

.landscaping-card-colors {
  background-color: v-bind('colors?.card?.background');
  color: v-bind('colors?.card?.text');
}
</style>
