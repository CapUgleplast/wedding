<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

interface Props {
  align?: 'start' | 'end' | 'center'
  side?: 'top' | 'right' | 'bottom' | 'left'
  class?: HTMLAttributes['class']
  arrow?: boolean
  useClick?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  align: 'center',
  side: 'top',
  arrow: false,
})

const open = ref(false)

const onAction = () => {
  open.value = !open.value
}

const getOpenState = computed({
  get: () => {
    return open.value
  },
  set: (value) => {
    if (props.useClick) {
      return open.value
    }
    return open.value = value
  },
})
</script>

<template>
  <TooltipProvider>
    <Tooltip
      v-model:open="getOpenState"
    >
      <TooltipTrigger
        class="inline-block w-fit"
        @click="onAction"
      >
        <slot name="trigger" />
      </TooltipTrigger>
      <TooltipContent
        :align="align"
        :side="side"
        :class="props.class"
        :arrow="arrow"
      >
        <slot name="content" />
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>

<style scoped>

</style>
