<script setup lang="ts">
import type { ToggleGroupRootProps } from 'reka-ui'

interface Props {
  items: {
    label: string
    value: string
  }[]
}

defineProps<ToggleGroupRootProps & Props>()

const model = defineModel<string[]>({ default: [] })

const onChange = (value: boolean, itemValue: string) => {
  if (Array.isArray(model.value)) {
    if (value) {
      model.value.push(itemValue)
    }
    else {
      model.value = model.value.filter(item => item !== itemValue)
    }
  }
  else {
    const prevValue = model.value
    model.value = value ? [prevValue, itemValue] : []
  }
}
</script>

<template>
  <div>
    <template
      v-for="item in items"
      :key="item.value"
    >
      <Label
        :for="`${item.value}-checkbox`"
        class="flex items-center gap-2 justify-between
               pt-2 not-last:border-b border-b-primary/5"
      >
        <Heading
          variant="6"
          leading="none"
        >
          {{ item.label }}
        </Heading>
        <Checkbox
          :id="`${item.value}-checkbox`"
          :model-value="model.includes(item.value)"
          :value="item.value"
          @update:model-value="(ev) => onChange(ev, item.value)"
        />
      </Label>
    </template>
  </div>
</template>

<style scoped>

</style>
