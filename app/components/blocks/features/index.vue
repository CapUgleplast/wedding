<script setup lang="ts">
import type { Schema } from '#shared/types/api'

import { useHeaderStore } from '~~/layers/header/app/stores/header'

const { data } = defineProps<{
  data: Schema<'BlocksFeatureComponent'>
}>()

const formatIndex = (idx: number) =>
  String(idx + 1).padStart(2, '0')

const anchor = useHeaderStore().getMenuLink(data.anchor?.value)?.value

const colors = useColors(data.colors).getCssVars()

const { section } = useTheme('dark')
</script>

<template>
  <Container
    :id="anchor"
    ref="section"
    variant="wild"
    as="section"
    class="root-features-colors py-10 sm:py-12 md:py-14"
  >
    <SharedElementAnimatedText
      :text="data.title"
      component="Heading"
      variant="3"
      class="text-primary lg:hidden mb-8 sm:mb-10"
      weight="bolder"
      leading="custom"
    />
    <div class="grid lg:grid-cols-2 lg:gap-5">
      <div class="lg:sticky lg:top-14 h-[457px] md:h-[680px] 3xl:h-[886px]">
        <SharedElementAnimatedImage>
          <Image
            class="size-full object-cover md:aspect-square"
            :src="data.image?.url"
            :thumbnail="data.image?.formats?.thumbnail?.url"
          />
        </SharedElementAnimatedImage>
      </div>

      <div class="lg:px-5 py-3 sm:py-10 flex flex-col h-full">
        <SharedElementAnimatedText
          :text="data.title"
          component="Heading"
          variant="3"
          class="text-current max-lg:hidden"
          weight="bolder"
          leading="custom"
        />

        <ul
          v-if="data.items?.length"
          class="flex flex-col lg:mt-40"
        >
          <li
            v-for="(i, idx) in data.items"
            :key="i.id"
            class="border-b border-current/15 last:border-none py-5 flex gap-3 sm:gap-5 flex-col"
          >
            <Text
              variant="sm"
              class="accent-color"
            >
              {{ formatIndex(idx) }}
            </Text>
            <div class="grid sm:grid-cols-2 gap-x-8 gap-y-4">
              <Heading
                variant="5"
                weight="bolder"
                leading="none"
              >
                {{ i.key }}
              </Heading>
              <Text
                variant="base"
                leading="tight"
                class="text-current/80"
              >
                {{ i.value }}
              </Text>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </Container>
</template>

<style scoped>
.root-features-colors {
  background-color: v-bind('colors?.background');
  color: v-bind('colors?.text');
}

.accent-color {
  color: v-bind('colors?.active');
}
</style>
