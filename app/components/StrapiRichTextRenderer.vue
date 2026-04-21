<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-explicit-any
defineProps<{ block: any }>()
</script>

<template>
  <div
    class="prose prose-headings:text-primary prose-headings:uppercase prose-headings:font-medium prose-p:text-primary/70 prose-ul:text-primary/70 prose-ol:text-primary/70 max-w-none"
  >
    <template
      v-for="(item, index) in block"
      :key="index"
    >
      <p v-if="item.type === 'paragraph'">
        <template
          v-for="(child, childIndex) in item.children"
          :key="childIndex"
        >
          <span
            :class="{
              'font-bold': child.bold,
              'italic': child.italic,
              'underline': child.underline,
              'rounded bg-gray-100 px-1 font-mono': child.code,
            }"
          >{{ child.text }}</span>
          <a
            v-if="child.type === 'link'"
            :href="child.url"
            class="text-blue-600 hover:text-blue-800"
          >{{
            child.children[0].text
          }}</a>
        </template>
      </p>

      <ul
        v-else-if="item.type === 'list' && item.format === 'unordered'"
        class="list-disc pl-5"
      >
        <li
          v-for="(listItem, listIndex) in item.children"
          :key="listIndex"
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
        </li>
      </ul>

      <ol
        v-else-if="item.type === 'list' && item.format === 'ordered'"
        class="list-decimal pl-5"
      >
        <li
          v-for="(listItem, listIndex) in item.children"
          :key="listIndex"
        >
          {{ listItem.children[0].text }}
        </li>
      </ol>

      <component
        :is="`h${item.level}`"
        v-else-if="item.type === 'heading'"
        class="mb-2 mt-4"
      >
        {{
          item.children[0].text
        }}
      </component>

      <img
        v-else-if="item.type === 'image'"
        :src="item.image.url"
        :alt="item.image.alternativeText"
        class="my-4 rounded-lg shadow-md"
      >

      <blockquote
        v-else-if="item.type === 'quote'"
        class="my-4 border-l-4 border-gray-300 pl-4 italic"
      >
        {{ item.children[0].text }}
      </blockquote>
    </template>
  </div>
</template>
