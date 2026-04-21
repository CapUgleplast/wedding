<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import { Primitive } from 'reka-ui'

interface Props extends PrimitiveProps {
  animateType?: 'fade' | 'slideRight' | 'slideLeft' | 'slideTop' | 'slideBottom' | 'shutLeft' | 'shutRight' | 'shutTop' | 'shutBottom'
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  animateType: 'fade',
  duration: 300,
})

const animations = {
  fade: {
    active: 'has-[div[data-state=active]]:opacity-100 transition-opacity duration-[800ms] has-[div[data-state=active]]:delay-[400ms]',
    inactive: 'opacity-0',
  },
  slideRight: {
    active: '[&>div[data-state=active]]:slide-in-from-left',
    inactive: '[&>div[data-state=inactive]]:slide-out-to-right',
  },
  slideLeft: {
    active: '[&>div[data-state=active]]:slide-in-from-right',
    inactive: '[&>div[data-state=inactive]]:slide-out-to-left',
  },
  slideTop: {
    active: '[&>div[data-state=active]]:slide-in-from-bottom',
    inactive: '[&>div[data-state=inactive]]:slide-out-to-top',
  },
  slideBottom: {
    active: '[&>div[data-state=active]]:slide-in-from-top',
    inactive: '[&>div[data-state=inactive]]:slide-out-to-bottom',
  },
  shutLeft: {
    active: `[&>div[data-state=active]]:clip-path-full [&>div[data-state=active]]:delay-[700ms]`,
    inactive: '[&>div[data-state=inactive]]:clip-shut-to-left',
  },
  shutRight: {
    active: '[&>div[data-state=active]]:clip-path-full [&>div[data-state=active]]:delay-[700ms]',
    inactive: '[&>div[data-state=inactive]]:clip-shut-to-right',
  },
  shutTop: {
    active: '[&>div[data-state=active]]:clip-path-full [&>div[data-state=active]]:delay-[700ms]',
    inactive: '[&>div[data-state=inactive]]:clip-shut-to-top',
  },
  shutBottom: {
    active: '[&>div[data-state=active]]:clip-path-full [&>div[data-state=active]]:delay-[700ms]',
    inactive: '[&>div[data-state=inactive]]:clip-shut-to-bottom',
  },
}

const getAnimations = computed(() => {
  return animations[props.animateType]
})

provide('animateClasses', getAnimations)
provide('disableHidden', true)
</script>

<template>
  <Primitive
    class="relative flex flex-col"
    :as="as || 'div'"
    :as-child="asChild"
  >
    <slot />
  </Primitive>
</template>

<style scoped>
</style>
