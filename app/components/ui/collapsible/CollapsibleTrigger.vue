<script setup lang="ts">
import type { CollapsibleTriggerProps } from 'reka-ui'
import { CollapsibleTrigger } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { type CollapsibleTriggerVariants, collapsibleTriggerVariants } from '.'
import { cn } from '@/lib/utils'

interface Props extends CollapsibleTriggerProps {
  textClass?: HTMLAttributes['class']
  iconClass?: HTMLAttributes['class']
  variant?: CollapsibleTriggerVariants['variant']
  theme?: CollapsibleTriggerVariants['theme']
  class?: HTMLAttributes['class']
  showIcon?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  showIcon: false,
})
</script>

<template>
  <CollapsibleTrigger
    data-slot="collapsible-trigger"
    v-bind="props"
    :class="cn(`group-[&:not(.reversed)]/collapsible:data-[state=open]:border-b
                group-[.reversed]/collapsible:data-[state=open]:border-t
                border-muted/40 `,
               collapsibleTriggerVariants({
                 variant: props.variant,
                 theme: props.theme,
               }),
               props.class,
    )"
    as="button"
  >
    <slot name="text">
      <span
        :class="textClass"
        class="text-start transition-opacity
               group-hover/collapsible-trigger:opacity-100
               group-data-[state=open]/collapsible-trigger:opacity-100"
      >
        <slot name="default" />
      </span>
    </slot>
    <slot name="icon">
      <Icon
        v-if="showIcon"
        name="icons:arrow-down"
        class="opacity-100 transition-transform duration-200 ease-out group-data-[state=open]/collapsible-trigger:-scale-y-100"
      />
    </slot>
  </CollapsibleTrigger>
</template>
