<script setup lang="ts">
import type { VideoBlock } from './types'
import ContentContainer from './ContentContainer.vue'
import Video from '~/components/ui/video/Video.vue'

// const STRAPI_URL = useRuntimeConfig().public.imgproxyUrl

const props = defineProps<{ block: VideoBlock }>()

const videoFormatter = computed(() => {
  return {
    ...props.block.video,
    url: props.block.video?.url,
  }
})
</script>

<template>
  <ContentContainer class="mt-5 -mb-5">
    <div class="prose prose-sm max-w-none overflow-hidden">
      <Video
        video-class="w-full h-[200px] sm:h-[382px] object-cover"
        :video="videoFormatter"
      />
    </div>
  </ContentContainer>
</template>
