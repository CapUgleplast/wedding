<script setup lang="ts">
interface Props {
  items: {
    label: string
    value: string
  }[]
  type?: 'multiple' | 'single'
  title?: string
}

defineProps<Props>()

const model = defineModel<string | string[]>()
</script>

<template>
  <div class="h-full">
    <Heading
      v-if="title"
      variant="6"
      class="text-primary/70 mb-5"
      as="div"
    >
      {{ title }}
    </Heading>
    <SharedBlockFilterSelects
      v-model="model"
      :items="items"
      :type="type"
      class="max-h-80 overflow-auto scrollbar-primary pr-4"
    />
  </div>
</template>

<style scoped>

</style>
