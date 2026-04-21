<script setup lang="ts">
import ContentContainer from './ContentContainer.vue'
import type { FootnoteBlock } from './types'

defineProps<{ block: FootnoteBlock }>()
</script>

<template>
  <ContentContainer>
    <Heading
      class="text-accent border-y py-5 border-accent/40 mt-8 md:mt-10"
      variant="5"
      leading="teen"
    >
      {{ block.text }}
    </Heading>
  </ContentContainer>
</template>
