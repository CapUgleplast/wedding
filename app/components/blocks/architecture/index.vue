<script setup lang="ts">
import type { Schema } from '#shared/types/api'
import { useHeaderStore } from '~~/layers/header/app/stores/header'

const { data } = defineProps<{
  data: Schema<'BlocksArchitectureComponent'>
}>()

const hasDescription = computed(() => Boolean(data.description))
const hasItems = computed(() => Boolean(data.items?.length))

const { section } = useTheme('dark')
const anchor = useHeaderStore().getMenuLink(data.anchor?.value)?.value

const colors = useColors(data.colors).getCssVars()
</script>

<template>
  <Container
    :id="anchor"
    ref="section"
    as="section"
    variant="wild"
    class="root-architecture-colors py-10 sm:py-12 md:py-14"
  >
    <SharedElementHeader
      :title="data.title"
      :subtitle="data.subtitle"
      class="mb-6 md:mb-10"
    />

    <!-- mobile description -->
    <Text
      v-if="hasDescription"
      leading="tight"
      class="md:hidden mb-8"
    >
      {{ data.description }}
    </Text>

    <div class="grid md:grid-cols-3 items-start">
      <div class="col-span-1 flex flex-col justify-between h-full gap-6 mr-5 lg:mr-10 max-md:order-2">
        <!-- desktop description -->
        <Text
          v-if="hasDescription"
          leading="tight"
          class="max-w-[324px] xl:max-w-[324px] 3xl:max-w-[445px] max-md:hidden"
        >
          {{ data.description }}
        </Text>

        <ul
          v-if="hasItems"
          class="flex flex-col"
        >
          <li
            v-for="item in data.items"
            :key="item.id"
            class="border-b border-primary/15 last:border-none py-5"
          >
            <Heading
              variant="5"
              weight="bolder"
              leading="none"
            >
              {{ item.value }}
            </Heading>
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
          <div class="size-full">
            <Image
              v-if="data.image"
              class="size-full object-cover"
              :src="data.image.url"
              :thumbnail="data.image.formats?.thumbnail?.url"
            />
          </div>
        </SharedElementAnimatedImage>
      </div>
    </div>
  </Container>
</template>

<style scoped>
  .root-architecture-colors {
    background-color: v-bind('colors?.background');
    color: v-bind('colors?.text');
  }
</style>
