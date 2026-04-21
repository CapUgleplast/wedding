<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import type { ButtonVariants } from '@/components/ui/button'
import { useTabs } from './useTabs'
import type { HTMLAttributes } from 'vue'

const props = withDefaults(defineProps<{
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
}>(), {
  variant: 'secondary-outline',
  size: 'icon-sm',
})

const { switchNext, canSwitchNext } = useTabs()
</script>

<template>
  <Button
    data-slot="carousel-next"
    :disabled="!canSwitchNext"
    :class="cn(
      props.class,
    )"
    :variant="variant"
    :size="size"
    @click="switchNext"
  >
    <slot>
      <Icon
        name="icons:arrow-right"
      />
    </slot>
  </Button>
</template>
