<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Primitive } from 'reka-ui'
import type { PrimitiveProps } from 'reka-ui'
import { containerVariants } from '.'
import type { ContainerVariants } from '.'
import { cn } from '~/lib/utils'

interface Props extends PrimitiveProps {
  variant?: ContainerVariants['variant']
  paddings?: ContainerVariants['paddings']
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(containerVariants({ variant, paddings }), props.class)"
  >
    <slot />
  </Primitive>
</template>
