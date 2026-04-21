<script setup lang="ts">
// TODO: Вынести в ui

import type { RadioGroupRootProps } from 'reka-ui'

interface Props {
  items: {
    label: string
    value: string
  }[]
}

const props = defineProps<RadioGroupRootProps & Props>()

const model = defineModel<string>()
</script>

<template>
  <RadioGroup
    v-model="model"
    v-bind="props"
  >
    <template
      v-for="item in items"
      :key="item.value"
    >
      <Label
        :for="item.value"
        class="flex items-center gap-2 justify-between
               not-last:border-b border-b-primary/5"
      >
        <Heading
          variant="6"
          leading="none"
        >
          {{ item.label }}
        </Heading>
        <RadioGroupItem
          :id="item.value"
          :value="item.value"
        />
      </Label>
    </template>
  </RadioGroup>
</template>

<style scoped>

</style>
