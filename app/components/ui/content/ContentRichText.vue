<script setup lang="ts">
import ContentContainer from './ContentContainer.vue'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
defineProps<{ block: any }>()
</script>

<template>
  <ContentContainer>
    <template
      v-for="(item, index) in block?.content"
      :key="index"
    >
      <Text
        v-if="item.type === 'paragraph'"
        class="mb-5 mt-5 last:mb-0 text-current/80 first:mt-8 md:first:mt-10 peer-[.font-heading]/heading:mt-5"
        variant="base"
        leading="tight"
      >
        <template
          v-for="(child, childIndex) in item.children"
          :key="childIndex"
        >
          <span
            :class="{
              'font-bold': child.bold,
              'italic': child.italic,
              'underline': child.underline,
              'rounded bg-gray-100 px-1 font-sans': child.code,
            }"
          >{{ child.text }}</span>
          <a
            v-if="child.type === 'link'"
            :href="child.url"
            class="underline hover:no-underline font-medium mt-8 md:mt-10 block tracking-[-0.03em]"
          >{{
            child.children[0].text
          }}</a>
        </template>
      </Text>

      <ul
        v-else-if="item.type === 'list' && item.format === 'unordered'"
        class="list-disc pl-5"
      >
        <Text
          v-for="(listItem, listIndex) in item.children"
          :key="listIndex"
          variant="base"
          as="li"
        >
          <template
            v-for="(listItemChild, listItemChildIndex) in listItem.children"
            :key="listItemChildIndex"
          >
            <a
              v-if="listItemChild.type === 'link'"
              :href="listItemChild.url"
              class="text-blue-600 hover:text-blue-800"
            >
              {{ listItemChild.children[0].text }}
            </a>
            <template v-else>
              {{ listItemChild.text }}
            </template>
          </template>
        </Text>
      </ul>

      <ol
        v-else-if="item.type === 'list' && item.format === 'ordered'"
        class="list-decimal pl-5 my-8"
      >
        <Text
          v-for="(listItem, listIndex) in item.children"
          :key="listIndex"
          as="li"
          variant="md"
          leading="tight"
        >
          {{ listItem.children[0].text }}
        </Text>
      </ol>

      <Heading
        v-else-if="item.type === 'heading'"
        :as="`h${item.level}`"
        :variant="item.level === 1 ? '1' : item.level === 2 ? '2' : item.level === 3 ? '3' : item.level === 4 ? '4' : item.level === 5 ? '5' : item.level === 6 ? '6' : '1'"
        class="mb-8 last:mb-0 mt-8 md:mt-10 peer/heading"
        leading="none"
      >
        {{
          item.children[0].text
        }}
      </Heading>

      <img
        v-else-if="item.type === 'image'"
        :src="item.image.url"
        :alt="item.image.alternativeText"
        class="my-4 rounded-lg shadow-md"
      >

      <div
        v-else
        v-html="item.children[0].text"
      />
    </template>
  </ContentContainer>
</template>
