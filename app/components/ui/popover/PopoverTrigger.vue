<script setup lang="ts">
import type { PopoverTriggerProps } from 'reka-ui'
import { PopoverTrigger } from 'reka-ui'
import { cn } from '@/lib/utils'
import { popoverTriggerVariants, type PopoverTriggerVariants } from '~/components/ui/popover/index'

import type { HTMLAttributes } from 'vue'

const props = defineProps<PopoverTriggerProps
  & {
    class?: HTMLAttributes['class']
    variant?: PopoverTriggerVariants['variant']
    hideIcon?: boolean
  }>()

const iconClasses = {
  closed: `inset-0 group-data-[state='open']:opacity-0 group-data-[state='open']:absolute
           group-data-[state='closed']:animate-in group-data-[state='closed']:zoom-in-0
           group-data-[state='open']:animate-out group-data-[state='open']:zoom-out-0`,
  open: `left-0 group-data-[state='closed']:opacity-0 group-data-[state='closed']:absolute
         group-data-[state='open']:animate-in group-data-[state='open']:zoom-in-0
         group-data-[state='closed']:animate-out group-data-[state='closed']:zoom-out-0`,
}
</script>

<template>
  <PopoverTrigger
    data-slot="popover-trigger"
    v-bind="props"
    :class="cn(popoverTriggerVariants({ variant }), props.class, '')"
  >
    <slot />
    <slot
      v-if="!hideIcon"
      name="icon"
      :icon-classes="iconClasses"
    >
      <span class="relative flex items-center justify-center">
        <Icon
          name="icons:arrow-down"
          class="size-full"
          :class="iconClasses.closed"
          size="16"
        />
        <Icon
          name="icons:arrow-up"
          class="size-full"
          :class="iconClasses.open"
          size="16"
        />
      </span>
    </slot>
  </PopoverTrigger>
</template>
