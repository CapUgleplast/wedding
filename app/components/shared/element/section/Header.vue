<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

interface Props {
  title?: string
  subtitle?: string
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <div :class="cn('flex max-md:flex-col gap-4 md:gap-5 mb-10', props.class)">
    <SharedElementAnimatedText
      v-if="subtitle"
      :text="subtitle"
      component="Heading"
      variant="7"
      class="text-current/70 min-w-[305px]"
      weight="bolder"
      leading="none"
    />
    <SharedElementAnimatedText
      :text="title"
      component="Heading"
      variant="3"
      class="text-current w-full"
      weight="bolder"
      leading="custom"
    />
  </div>
</template>

<style scoped>

</style>
