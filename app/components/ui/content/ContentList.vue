<script setup lang="ts">
import type { ListBlock } from './types'
import ContentContainer from './ContentContainer.vue'

const { block } = defineProps<{ block: ListBlock }>()
</script>

<template>
  <ContentContainer class="pt-8 md:pt-10">
    <div class="grid sm:grid-cols-2 gap-5">
      <Heading
        variant="4"
        class="text-2xl"
      >
        {{ block.title }}
      </Heading>
      <ul class="flex flex-col gap-5 ">
        <li
          v-for="(item, idx) in block.items"
          :key="idx"
          class="before:content-['•'] before:mt-[-4px] before:text-primary before:mr-2 before:align-middle flex items-start"
        >
          <Text
            variant="md"
            leading="teen"
          >
            {{ item.value }}
          </Text>
        </li>
        <SharedElementAdaptiveButton
          v-if="block?.button"
          :type="block?.button?.type ?? block?.button?.link ? 'link' : 'fos'"
          variant="primary"
          :href="block?.button?.link"
          :label="block?.button?.name"
          class="w-max md:mt-5"
        >
          <Icon
            name="icons:arrow-right"
            size="16"
          />
        </SharedElementAdaptiveButton>
      </ul>
    </div>
  </ContentContainer>
</template>
