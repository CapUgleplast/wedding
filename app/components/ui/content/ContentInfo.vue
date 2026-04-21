<script setup lang="ts">
import type { InfoBlock } from './types'
import ContentContainer from './ContentContainer.vue'

defineProps<{ block: InfoBlock }>()
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
      <ul class="flex flex-col gap-5 pl-4">
        <li
          v-for="(item, idx) in block.items"
          :key="idx"
        >
          <Text
            variant="md"
            leading="teen"
            weight="bolder"
          >
            {{ item.key }}
          </Text>
          <Text
            variant="md"
            leading="teen"
            weight="normal"
            class="mt-3"
          >
            {{ item.value }}
          </Text>
        </li>
      </ul>
    </div>
  </ContentContainer>
</template>
