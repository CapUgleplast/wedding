<script setup lang="ts">
import type { Schema } from '#shared/types/api'

import { useHeaderStore } from '~~/layers/header/app/stores/header'

const { data } = defineProps<{
  data: Schema<'BlocksDeveloperComponent'>
}>()
const hasDescription = computed(() => Boolean(data.text?.length))
const hasItems = computed(() => Boolean(data.items?.length))
const hasMedia = computed(() => Boolean(data.media))
const anchor = useHeaderStore().getMenuLink(data.anchor?.value)?.value

const colors = useColors(data?.colors).getCssVars()
const { section } = useTheme('dark')
</script>

<template>
  <Container
    :id="anchor"
    ref="section"
    as="section"
    variant="wild"
    class="developer-root-colors relative py-10 sm:py-12 md:py-14"
  >
    <SharedElementHeader
      :title="data.title"
      :subtitle="data.subtitle"
      class="mb-6 md:mb-10"
    />
    <div class="grid lg:grid-cols-3 items-start">
      <div class="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col justify-between h-full gap-6 md:mr-5 lg:mr-10">
        <div
          v-if="hasDescription"
          class="flex gap-6 sm:gap-10 flex-wrap"
        >
          <Text
            v-for="t in data.text"
            :key="t.id"
            leading="tight"
            class="sm:max-w-[324px] xl:max-w-[445px]"
          >
            {{ t.value }}
          </Text>
        </div>

        <ul
          v-if="hasItems"
          class="flex flex-wrap justify-self-start max-xl:justify-between items-start mb-10 gap-y-10 xl:gap-20"
        >
          <li
            v-for="item in data.items"
            :key="item.id"
          >
            <Heading
              variant="2"
              class="accent-color mb-2"
              weight="bolder"
              leading="none"
            >
              {{ item.key }}
            </Heading>

            <Text
              variant="sm"
              class="max-w-[140px]"
              weight="normal"
              leading="tight"
            >
              {{ item.value }}
            </Text>
          </li>
        </ul>
      </div>
      <div
        class="
          md:col-span-2
          max-md:mb-3
          min-h-[460px]
          h-[460px]
          sm:h-[860px]
          md:h-[670px]
          3xl:h-[840px]
        "
      >
        <SharedElementAnimatedImage>
          <Image
            v-if="hasMedia"
            class="size-full object-cover"
            :src="data.media?.url"
            :thumbnail="data.media?.formats?.thumbnail?.url"
          />
        </SharedElementAnimatedImage>
      </div>
    </div>
  </Container>
</template>

<style scoped>
.developer-root-colors {
  background-color: v-bind('colors?.background');
  color: v-bind('colors?.text');
}

.accent-color {
  color: v-bind('colors?.active');
}
</style>
