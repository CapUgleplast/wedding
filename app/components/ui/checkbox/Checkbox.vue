<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'
import type { CheckboxVariants } from '.'
import { checkboxVariants } from '.'

const props = defineProps<CheckboxRootProps & {
  class?: HTMLAttributes['class']
  variant?: CheckboxVariants['variant']
}>()
const emits = defineEmits<CheckboxRootEmits>()

const delegatedProps = reactiveOmit(props, 'class')

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <CheckboxRoot
    data-slot="checkbox"
    v-bind="forwarded"
    :class="
      cn(checkboxVariants({ variant }), props.class)"
  >
    <CheckboxIndicator
      data-slot="checkbox-indicator"
      class="flex items-center justify-center text-current transition-none"
    >
      <slot>
        <Icon
          name="icons:check"
          size="16"
        />
      </slot>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
