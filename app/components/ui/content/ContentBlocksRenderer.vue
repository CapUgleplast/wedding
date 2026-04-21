<script setup lang="ts">
import type { ContentBlock } from './types'
import ContentButton from './ContentButton.vue'
import ContentGallery from './ContentGallery.vue'
import ContentFootnote from './ContentFootnote.vue'
import ContentRichText from './ContentRichText.vue'
import ContentVideo from './ContentVideo.vue'
import ContentPicture from './ContentPicture.vue'
import ContentBanner from './ContentBanner.vue'
import ContentList from './ContentList.vue'
import ContentInfo from './ContentInfo.vue'

type ComponentName
  = | 'content.button'
    | 'content.gallery'
    | 'content.footnote'
    | 'content.rich-content'
    | 'content.video'
    | 'content.picture'
    | 'content.banner'
    | 'content.list'
    | 'content.info'

const componentMap = {
  'content.button': ContentButton,
  'content.gallery': ContentGallery,
  'content.footnote': ContentFootnote,
  'content.rich-content': ContentRichText,
  'content.video': ContentVideo,
  'content.picture': ContentPicture,
  'content.banner': ContentBanner,
  'content.list': ContentList,
  'content.info': ContentInfo,
} as const

function getBlockComponent(blockName: string) {
  if (blockName in componentMap) {
    return componentMap[blockName as ComponentName]
  }
  console.warn(`No component found for block type: ${blockName}`)
  return undefined
}

defineProps<{ blocks: ContentBlock[] }>()
</script>

<template>
  <div class="grid">
    <component
      :is="getBlockComponent(block.__component)"
      v-for="block in blocks"
      :key="block.id"
      :block="block"
    />
  </div>
</template>
