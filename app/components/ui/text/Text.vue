<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import type { PrimitiveProps } from 'reka-ui'
import { textVariants } from '.'
import type { TextVariants } from '.'
import { cn } from '~/lib/utils'

interface Props extends PrimitiveProps {
  variant?: TextVariants['variant']
  weight?: TextVariants['weight']
  leading?: TextVariants['leading']
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'p',
  indents: false,
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(textVariants({ variant, weight, leading }), props.class)"
  >
    <slot />
  </Primitive>
</template>
