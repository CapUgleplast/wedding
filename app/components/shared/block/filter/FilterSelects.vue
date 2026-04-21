<script setup lang="ts">
interface Props {
  items: {
    label: 'name'
    value: 'value'
  }[]
  type: 'multiple' | 'single'
}

defineProps<Props>()

const model = defineModel<string | string[]>()

// const isDesktop = useMediaQuery('(min-width: 1024px)')
</script>

<template>
  <CheckboxGroupComponent
    v-if="type === 'multiple'"
    v-model="model"
    :items="items"
  />
  <RadioGroupComponent
    v-else
    v-model="model"
    :items="items"
  />

<!--  <ProjectsFiltersToggleGroupComponent
    v-model="model"
    :type="type"
    :items="items"
    class="h-full"
  /> -->
</template>

<style scoped>

</style>
