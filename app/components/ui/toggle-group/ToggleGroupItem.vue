<script setup lang="ts">
import type { ToggleGroupItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ToggleGroupItem, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'
import { toggleGroupVariants, type ToggleGroupVariants } from '~/components/ui/toggle-group/index'

const props = defineProps<ToggleGroupItemProps & {
  class?: HTMLAttributes['class']
  variant?: ToggleGroupVariants['variantItem']
  size?: ToggleGroupVariants['size']
}>()

const delegatedProps = reactiveOmit(props, 'class', 'size', 'variant')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <ToggleGroupItem
    v-slot="slotProps"
    data-slot="toggle-group-item"
    v-bind="forwardedProps"
    :class="cn(
      toggleGroupVariants({
        variantGroup: null,
        variantItem: variant,
        size: size,
      }),
      'min-w-0 cursor-pointer group'
        + 'focus:z-10 focus-visible:z-10',
      props.class)"
  >
    <slot v-bind="slotProps" />
  </ToggleGroupItem>
</template>
