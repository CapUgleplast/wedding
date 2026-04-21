<script setup lang="ts">
import ContentContainer from './ContentContainer.vue'
import type { ButtonBlock } from './types'

defineProps<{ block: ButtonBlock }>()
</script>

<template>
  <ContentContainer class="mt-5">
    <SharedElementAdaptiveButton
      v-if="block"
      :type="block?.type ?? block?.link ? 'link' : 'fos'"
      variant="primary"
      :href="block?.link"
      :label="block?.name"
    >
      <Icon
        name="icons:arrow-right"
        size="16"
      />
    </SharedElementAdaptiveButton>
  </ContentContainer>
</template>
