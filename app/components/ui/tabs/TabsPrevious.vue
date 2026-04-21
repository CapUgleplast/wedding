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

const { switchPrev, canSwitchPrev } = useTabs()
</script>

<template>
  <Button
    data-slot="carousel-previous"
    :disabled="!canSwitchPrev"
    :class="cn(
      props.class,
    )"
    :variant="variant"
    :size="size"
    @click="switchPrev"
  >
    <slot>
      <Icon
        name="icons:arrow-right"
        class="rotate-180"
      />
    </slot>
  </Button>
</template>
