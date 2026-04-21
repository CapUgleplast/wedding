<script setup lang="ts">
import { animate, stagger, inView } from 'motion'
import { Heading, Text } from '#components'
import type { HeadingVariants } from '~/components/ui/heading'
import type { TextVariants } from '~/components/ui/text'
import type { HTMLAttributes } from 'vue'

type ComponentType = 'Heading' | 'Text'

interface Props {
  component?: ComponentType
  text?: string
  variant?: HeadingVariants['variant'] | TextVariants['variant']
  weight?: HeadingVariants['weight'] | TextVariants['weight']
  leading?: HeadingVariants['leading'] | TextVariants['leading']
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  component: 'Text',
  text: '',
  weight: 'normal',
  leading: 'tight',
})

const containerRef = ref<HTMLElement | null>(null)

const computedVariant = computed(() => {
  return props.variant ?? (props.component === 'Heading' ? '5' : 'base')
})

const computedComponent = computed<Component>(() => {
  return props.component === 'Heading' ? Heading : Text
})

function splitText(el: HTMLElement) {
  const content = el.textContent || ''
  el.innerHTML = ''

  const parts = content.split(/(\s+)/)

  return parts.map((part) => {
    const span = document.createElement('span')
    span.textContent = part

    if (part.trim() !== '') {
      span.style.display = 'inline-block'
      span.style.opacity = '0'
      span.className = 'split-word'
    }

    el.appendChild(span)
    return span
  }).filter(span => span.className === 'split-word')
}

onMounted(() => {
  document.fonts.ready.then(() => {
    const target = containerRef.value?.querySelector('.reveal-content') as HTMLElement
    if (!target) return

    const words = splitText(target)

    inView(containerRef.value, () => {
      animate(
        words,
        { opacity: [0, 1], y: [20, 0] },
        {
          type: 'spring',
          duration: 0.8,
          bounce: 0.3,
          delay: stagger(0.04),
        },
      )
      return () => {
        animate(words, { opacity: 0, y: 20 }, { duration: 0 })
      }
    })
  })
})
</script>

<template>
  <div
    ref="containerRef"
    :class="cn('text-reveal-container', props.class)"
  >
    <component
      :is="computedComponent"
      :variant="computedVariant"
      :weight="props.weight"
      :leading="props.leading"
      class="reveal-content whitespace-pre-line transition-opacity"
    >
      {{ text }}
    </component>
  </div>
</template>

<style scoped>
.split-word {
    white-space: nowrap;
    will-change: transform, opacity;
}
</style>
