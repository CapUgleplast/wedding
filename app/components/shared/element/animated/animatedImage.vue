<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import type { HTMLAttributes } from 'vue'

interface Props {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {})

gsap.registerPlugin(ScrollTrigger)

const imageRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!imageRef.value) return

  const ctx = gsap.context(() => {
    gsap.fromTo(
      imageRef.value,
      {
        translateY: -10,
        scale: 1.1,
      },
      {
        translateY: 0,
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: imageRef.value,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      },
    )
  }, imageRef)

  onBeforeUnmount(() => ctx.revert())
})
</script>

<template>
  <div :class="cn('relative overflow-hidden w-full h-full', props.class)">
    <div
      ref="imageRef"
      class="w-full h-full will-change-transform transform-gpu origin-center"
    >
      <slot />
    </div>
  </div>
</template>
