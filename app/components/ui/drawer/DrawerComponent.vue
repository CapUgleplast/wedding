<script setup lang="ts">
import type { DrawerRootEmits, DrawerRootProps } from 'vaul-vue'
import { useForwardPropsEmits } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { DrawerVariants } from '~/components/ui/drawer'
import type { ColorsButton } from '~/types/colors'

const props = defineProps<DrawerRootProps & {
  triggerClass?: HTMLAttributes['class']
  contentClass?: HTMLAttributes['class']
  contentStyle?: HTMLAttributes['style']
  overlayClass?: HTMLAttributes['class']
  overlayStyle?: HTMLAttributes['style']
  closeColors?: ColorsButton
  hideCloseButton?: boolean
  variant?: DrawerVariants['content']
}>()
const emits = defineEmits<DrawerRootEmits>()

const forwarded: object = useForwardPropsEmits(props, emits)

const model = defineModel<boolean, 'update:modelValue'>()
</script>

<template>
  <Drawer
    v-model:open="model"
    v-bind="forwarded"
  >
    <DrawerTrigger :class="triggerClass">
      <slot name="trigger" />
    </DrawerTrigger>
    <DrawerContent
      :class="contentClass"
      :overlay-class="overlayClass"
      :overlay-style="overlayStyle"
      :style="contentStyle"
      :close-colors="closeColors"
      :hide-close-button="hideCloseButton"
      :variant="variant"
    >
      <DrawerHeader v-if="$slots.title || $slots.description">
        <DrawerTitle v-if="$slots.title">
          <slot name="title" />
        </DrawerTitle>
        <DrawerDescription v-if="$slots.description">
          <slot name="description" />
        </DrawerDescription>
      </DrawerHeader>
      <slot name="content" />
      <DrawerFooter v-if="$slots.footer">
        <slot name="footer" />
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>
