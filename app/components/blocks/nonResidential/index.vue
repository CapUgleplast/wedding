<script setup lang="ts">
import type { Schema } from '#shared/types/api'

import { useHeaderStore } from '~~/layers/header/app/stores/header'

const { data } = defineProps<{
  data: Schema<'BlocksNonResidentialComponent'>
}>()
const buttonRef = useTemplateRef('buttonRef')
const anchor = useHeaderStore().getMenuLink(data.anchor?.value)?.value

const colors = useColors(data?.colors).getCssVars()

const click = () => {
  console.log(buttonRef.value)
  buttonRef.value?.click()
}
</script>

<template>
  <Container
    :id="anchor"
    variant="wild"
    class="nonres-root-colors grid lg:grid-cols-2 gap-5 py-10 sm:py-12 md:py-28"
  >
    <div
      v-for="(item) in data?.nonResidentialItems"
      :key="item.id"
      @click="click"
    >
      <div
        class="nonres-card-colors max-md:animate-boop cursor-pointer group relative p-5 sm:p-8 flex flex-col justify-between h-full min-h-[340px] sm:min-h-[535px] text-secondary overflow-hidden"
      >
        <div class="absolute inset-0">
          <Image
            v-if="item.picture"
            class="size-full object-cover brightness-80 group-hover:brightness-60 duration-500 scale-105 group-hover:scale-100"
            :src="item.picture?.url"
            :thumbnail="item.picture?.formats?.thumbnail?.url"
          />
        </div>
        <!-- v-if="idx % 2 !== 0" только для четных -->
        <div
          class="spoiler-colors absolute inset-0 lg:-translate-x-full group-hover:translate-x-0 transition-transform duration-500
           sm:[clip-path:polygon(0_0,80%_0,40%_100%,0_100%)] max-sm:hidden z-1"
        />
        <Heading
          variant="3"
          weight="bolder"
          leading="custom"
          class="z-1"
        >
          <span v-html="item.title" />
        </Heading>
        <div class="z-1">
          <Text
            variant="base"
            class="max-w-3xs 3xl:max-w-[400px] mb-10"
            weight="normal"
            leading="tight"
          >
            {{ item.description }}
          </Text>
          <Button
            :colors="colors.button"
            variant="secondary-filled"
          >
            {{ data?.button?.name }}
            <Icon
              name="icons:arrow-right"
              size="14"
            />
          </Button>
        </div>
      </div>
    </div>
    <SharedModalFos
      :data="data?.button?.fos"
    >
      <template #trigger>
        <div ref="buttonRef" />
      </template>
    </SharedModalFos>
  </Container>
</template>

<style scoped>
.nonres-root-colors {
  background-color: v-bind('colors?.background');
}

.nonres-card-colors {
  background-color: v-bind('colors?.card?.background');
  color: v-bind('colors?.card?.text');

  .spoiler-colors {
    background-color: v-bind('colors?.card?.active');
  }
}
</style>
