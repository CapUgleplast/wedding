<script setup lang="ts">
import type { BannerBlock } from './types'
import ContentContainer from './ContentContainer.vue'

defineProps<{ block: BannerBlock }>()
</script>

<template>
  <ContentContainer class="pt-8 md:pt-10">
    <div class="w-full flex flex-col lg:flex-row overflow-hidden">
      <div class="w-full lg:w-1/2 flex flex-col justify-between items-start bg-card ">
        <Heading
          class=""
          variant="4"
        >
          {{ block.title }}
        </Heading>
        <SharedModalFos>
          <template #trigger>
            <Button
              variant="primary"
              class="w-min mt-5"
            >
              {{ block.button_text }}
            </Button>
          </template>
        </SharedModalFos>
      </div>
      <NuxtImg
        class="w-full lg:w-1/2 h-[200px] sm:h-[382px] object-cover"
        :src="block.image.url"
      />
    </div>
  </ContentContainer>
</template>
