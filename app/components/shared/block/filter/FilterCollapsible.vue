<script setup lang="ts">
interface Props {
  items: {
    label: string
    value: string
  }[]
  placeholder: string
  type: 'multiple' | 'single'
}

const props = defineProps<Props>()

const model = defineModel<string | string[]>()

const showModel = computed(() => {
  if (model.value?.length) {
    return Array.isArray(model.value) ? model.value.join(', ') : model.value
  }
  return props.placeholder
})
</script>

<template>
  <Collapsible class="last:!mb-0 last:[&>*]!mb-0 not-last:!mb-2">
    <CollapsibleTrigger
      :show-icon="true"
      variant="muted"
      size="sm"
      text-class="font-medium"
    >
      <div class="flex items-center gap-2">
        <Heading
          variant="6"
          leading="none"
          class="line-clamp-1 text-start"
        >
          {{ showModel }}
        </Heading>
        <Icon
          v-if="model?.length"
          name="icons:dot"
          class="text-success !size-1.5 min-w-1.5 min-h-1.5"
        />
      </div>
    </CollapsibleTrigger>

    <CollapsibleContent>
      <SharedBlockFilterList
        v-model="model"
        class="p-4 pt-6"
        :type="type"
        :items="items"
        :title="placeholder"
      />
    </CollapsibleContent>
  </Collapsible>
</template>

<style scoped>

</style>
