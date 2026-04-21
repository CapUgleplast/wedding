<script setup lang="ts">
import type { Image } from '#shared/types/api'
import type { HTMLAttributes } from 'vue'
import type { HeadingVariants } from '~/components/ui/heading'

interface Props {
  text?: string
  image?: Image
  class?: HTMLAttributes['class']
  variant?: HeadingVariants['variant']
  gradient?: 'top' | 'bottom' | null
}

const props = withDefaults(defineProps<Props>(), {
  variant: '5',
})
</script>

<template>
  <div :class="cn('relative size-full h-[440px] 3xl:h-[540px] select-none group bg-current/30', props.class)">
    <!-- Изображение -->
    <div
      v-if="gradient"
      class=" from-black/40 to-transparent absolute inset-0 z-10"
      :class="{
        'bg-linear-to-b bottom-1/2': gradient == 'top',
        'bg-linear-to-t top-1/2': gradient == 'bottom',
      }"
    />
    <Image
      v-if="image"
      class="size-full object-cover object-bottom-right"
      :class="{
        'brightness-80': !gradient,
      }"
      :src="image?.url"
    />

    <!-- Слой 1: Hover Content -->
    <div class="absolute z-20 inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center max-lg:hidden">
      <slot name="hoverContent" />
    </div>

    <!-- Слой 2: Основной текст и кнопка (сверху) -->
    <div :class="cn('p-5 absolute inset-0 z-30 pointer-events-none')">
      <div :class="['flex justify-between size-full', !$slots.header ? ' items-end' : 'flex-col']">
        <div>
          <slot name="header" />
        </div>

        <div class="flex justify-between items-end gap-5 size-full">
          <Heading
            :variant="variant"
            weight="bolder"
            class="pointer-events-auto whitespace-pre-line"
            leading="custom"
          >
            {{ text }}
          </Heading>

          <div class="pointer-events-auto">
            <slot name="button" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
