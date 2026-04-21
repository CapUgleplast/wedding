<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  id: string
  modelValue?: boolean
  variant?: 'light' | 'dark'
}>(), {
  variant: 'light',
})

const emits = defineEmits<{
  (e: 'update:modelValue', payload: boolean): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
})
</script>

<template>
  <div class="flex items-center gap-x-2">
    <Checkbox
      :id="id"
      v-model="modelValue"
    />
    <Label :for="id">
      <Text
        weight="lighter"
        :class="cn('whitespace-normal', variant === 'light' ? '' : '')"
        variant="sm"
      >
        <slot name="label" />
      </Text>
    </Label>
  </div>
</template>
