<script setup lang="ts">
import type { CollapsibleContentProps } from 'reka-ui'
import { CollapsibleContent } from 'reka-ui'

const props = defineProps<CollapsibleContentProps>()
</script>

<template>
  <CollapsibleContent
    v-bind="props"
    data-slot="collapsible-content"
    class="collapsible-content overflow-hidden transition-all duration-300 will-change-[height]
    data-[state=closed]:overflow-hidden
    data-[state=closed]:opacity-0
    data-[state=closed]:animate-collapsible-up
    data-[state=open]:opacity-100
    data-[state=open]:animate-collapsible-down"
  >
    <slot />
  </CollapsibleContent>
</template>
