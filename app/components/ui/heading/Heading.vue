<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import type { PrimitiveProps } from 'reka-ui'
import { headingVariants } from '.'
import type { HeadingVariants } from '.'
import { cn } from '~/lib/utils'

interface Props extends PrimitiveProps {
  variant?: HeadingVariants['variant']
  weight?: HeadingVariants['weight']
  leading?: HeadingVariants['leading']
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {})

const getTag = computed(() => {
  return props.as || ('h' + Math.min(Math.max(Number(props.variant) || 3, 1), 6))
})
</script>

<template>
  <Primitive
    :as="getTag"
    :as-child="asChild"
    :class="cn(headingVariants({ variant, weight, leading }), props.class)"
  >
    <slot />
  </Primitive>
</template>
