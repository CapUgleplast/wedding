<script setup lang="ts">
import type { CollapsibleRootEmits, CollapsibleRootProps } from 'reka-ui'
import { CollapsibleRoot, useForwardPropsEmits } from 'reka-ui'

const props = defineProps<CollapsibleRootProps & { reversed?: boolean }>()
const emits = defineEmits<CollapsibleRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <CollapsibleRoot
    v-slot="{ open }"
    data-slot="collapsible"
    v-bind="forwarded"
    class="bg-white group/collapsible flex flex-col"
    :class="{
      'reversed flex-col-reverse': reversed,
      'mb-5 md:mb-8': open,
      '!mb-3': open,
    }"
  >
    <slot :open="open" />
  </CollapsibleRoot>
</template>
