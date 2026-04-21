<script setup lang="ts">
import type { TabsRootEmits, TabsRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { TabsRoot, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'
import { useProvideTabs } from '~/components/ui/tabs/useTabs'

const props = defineProps<TabsRootProps & {
  class?: HTMLAttributes['class']
  tabList?: string[]
}>()

const emits = defineEmits<TabsRootEmits>()

const list = computed(() => props.tabList || [])

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: list.value[0] || '',
})

const { currentTab } = useProvideTabs(list.value, modelValue)

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <TabsRoot
    ref="tabs"
    v-bind="forwarded"
    v-model="currentTab"
    data-slot="tabs"
    :class="cn('inline-flex flex-col gap-2', props.class)"
  >
    <slot :current-tab="currentTab" />
  </TabsRoot>
</template>
