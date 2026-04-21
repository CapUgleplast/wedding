<script setup lang="ts">
import type { ToggleGroupVariants } from '~/components/ui/toggle-group/index'
import type { ToggleGroupRootProps } from 'reka-ui'

interface Props {
  items: {
    label: string
    value: string
  }[]
  itemsVariant?: ToggleGroupVariants['variantItem']
  variant?: ToggleGroupVariants['variantGroup']
}

const props = defineProps<ToggleGroupRootProps & Props>()

const model = defineModel<string>()
</script>

<template>
  <ToggleGroup
    v-model="model"
    :variant="variant"
    v-bind="props"
  >
    <template
      v-for="item in items"
      :key="item.value"
    >
      <ToggleGroupItem
        :variant="itemsVariant"
        :value="item.value"
        class="h-full"
      >
        <slot :item="item">
          <Heading
            variant="6"
            leading="none"
          >
            {{ item.label }}
          </Heading>
        </slot>
      </ToggleGroupItem>
    </template>
  </ToggleGroup>
</template>

<style scoped>

</style>
