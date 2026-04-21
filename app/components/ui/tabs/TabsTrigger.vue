<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { TabsTrigger, useForwardProps } from 'reka-ui'
import type { TabsTriggerProps } from 'reka-ui'
import { cn } from '@/lib/utils'
import { tabsVariants, useTabs } from '~/components/ui/tabs'
import type { TabsVariants } from '~/components/ui/tabs'
import type { ColorsTabs } from '~/types/colors'

const props = defineProps<TabsTriggerProps & {
  class?: HTMLAttributes['class']
  variant?: TabsVariants['variant']
  size?: TabsVariants['size']
  colors?: ColorsTabs
}>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)

const { initEmptyTab } = useTabs()

initEmptyTab(props.value.toString())
</script>

<template>
  <TabsTrigger
    data-slot="tabs-trigger"
    v-bind="forwardedProps"
    :class="cn('trigger-colors-base',
               tabsVariants({ variant, size }),
               props.class,
    )"
  >
    <slot />
    <span
      v-if="$slots.label"
      id="label"
    >
      <slot name="label" />
    </span>
  </TabsTrigger>
</template>

<style scoped>
.trigger-colors-base {
  background-color: v-bind('colors?.base?.background');
  color: v-bind('colors?.base?.text');
  border-color: v-bind('colors?.base?.border');

  @media (width >= 64rem /* 1024px */) {
     &[data-state="inactive"] {
       &:hover {
         background-color: v-bind('colors?.hover?.background');
         color: v-bind('colors?.hover?.text');
         border-color: v-bind('colors?.hover?.border');
       }
     }
   }

   &[data-state="active"] {
     background-color: v-bind('colors?.active?.background');
     color: v-bind('colors?.active?.text');
     border-color: v-bind('colors?.active?.border');
    }
}
</style>
