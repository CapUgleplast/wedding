<script setup lang="ts">
import type { WithClassAsProps } from './interface'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import type { ButtonVariants } from '@/components/ui/button'
import { useCarousel } from './useCarousel'
import type { ColorsButton } from '~/types/colors'

const props = withDefaults(defineProps<{
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  colors?: ColorsButton
}
& WithClassAsProps>(), {
  variant: 'secondary-filled',
  size: 'icon',
})

const { orientation, canScrollNext, scrollNext } = useCarousel()
</script>

<template>
  <Button
    data-id="carousel-next"
    :disabled="!canScrollNext"
    :colors="colors"
    :class="cn(
      orientation === 'horizontal'
        ? ''
        : 'rotate-90',
      'disabled:opacity-60! ml-3',
      props.class,
    )"
    :variant="variant"
    :size="size"
    @click="scrollNext"
  >
    <slot>
      <Icon
        name="icons:arrow-right"
        size="16"
      />
    </slot>
  </Button>
</template>
