<script setup lang="ts">
import type { Image } from '#shared/types/api'
import type { HTMLAttributes } from 'vue'
import type { ColorsTextBgActive } from '~/types/colors'

interface Props {
  area?: number
  price?: number
  image?: Image
  class?: HTMLAttributes['class']
  tags?: Schema<'FlatTag'>[]
  colors?: ColorsTextBgActive
}

const props = defineProps<Props>()
</script>

<template>
  <div :class="cn('relative size-full h-[420px] sm:h-[480px] 3xl:h-[516px] select-none group flex flex-col p-5 md:p-8 flats-card-colors', props.class)">
    <div class="absolute z-1 inset-x-5 top-5 md:inset-x-8 md:top-8 flex flex-wrap gap-1 bg-inherit">
      <Badge
        v-for="tag in tags"
        :key="tag.id"
        class="whitespace-break-spaces text-start"
      >
        {{ tag.name }}
      </Badge>
    </div>
    <div
      id="image"
      class="py-0 sm:pb-8 h-full justify-center flex items-center"
    >
      <Image
        v-if="image"
        id="image"
        class="w-full object-contain max-h-full content-center"
        :src="image?.url"
        :thumbnail="image?.formats?.thumbnail?.url"
      />
    </div>
    <div class="flex justify-between items-end">
      <Heading
        variant="5"
        weight="bolder"
        leading="custom"
        class="accent-color text-nowrap!"
      >
        {{ area }} м²
      </Heading>
      <Heading
        v-if="price"
        variant="6"
        weight="bolder"
        leading="custom"
        class="text-current/80 text-nowrap! "
      >
        от {{ sliceThousand(price) }} ₽
      </Heading>
    </div>
    <!-- <div
      :class="['flex justify-between size-full']"
    /> -->
  </div>
</template>

<style scoped>
.flats-card-colors {
  background-color: v-bind('colors?.background');
  color: v-bind('colors?.text');
}

.accent-color {
  color: v-bind('colors?.active');
}
</style>
