<script setup lang="ts">
import type { ToggleGroupRootEmits, ToggleGroupRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ToggleGroupRoot, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'
import { toggleGroupVariants, type ToggleGroupVariants } from '~/components/ui/toggle-group/index'

const props = defineProps<ToggleGroupRootProps & {
  class?: HTMLAttributes['class']
  variant?: ToggleGroupVariants['variantGroup']
  size?: ToggleGroupVariants['size']
}>()
const emits = defineEmits<ToggleGroupRootEmits>()

const delegatedProps = reactiveOmit(props, 'class', 'size', 'variant')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ToggleGroupRoot
    v-slot="slotProps"
    data-slot="toggle-group"
    v-bind="forwarded"
    :class="cn('group/toggle-group overflow-auto [&>div]:flex [&>div]:w-full [&>div]:items-center',
               toggleGroupVariants({ variantGroup: variant, variantItem: null, size: null }),
               props.class)"
  >
    <div class="size-full flex justify-between flex-col">
      <slot v-bind="slotProps" />
    </div>
  </ToggleGroupRoot>
</template>
