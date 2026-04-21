<script setup lang="ts">
import ContentContainer from './ContentContainer.vue'
import type { PictureBlock } from './types'

defineProps<{ block: PictureBlock }>()
</script>

<template>
  <ContentContainer class="h-[200px] sm:h-[382px] mt-5 -mb-5">
    <NuxtImg
      class="size-full object-cover"
      :src="block.picture.url"
    />
  </ContentContainer>
</template>
