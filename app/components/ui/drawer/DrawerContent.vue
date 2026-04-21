<script lang="ts" setup>
import type { DialogContentEmits, DialogContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { useForwardPropsEmits } from 'reka-ui'
import { DrawerContent, DrawerPortal } from 'vaul-vue'
import { cn } from '@/lib/utils'
import DrawerOverlay from './DrawerOverlay.vue'
import { drawerVariants, type DrawerVariants } from '~/components/ui/drawer'
import type { ColorsButton } from '~/types/colors'

const props = defineProps<DialogContentProps & {
  class?: HTMLAttributes['class']
  overlayClass?: HTMLAttributes['class']
  overlayStyle?: HTMLAttributes['style']
  closeColors?: ColorsButton
  hideCloseButton?: boolean
  variant?: DrawerVariants['content']
}>()
const emits = defineEmits<DialogContentEmits & { close: () => void }>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <DrawerPortal>
    <DrawerOverlay
      :class="overlayClass"
      :style="overlayStyle"
      data-lenis-prevent
      @click="emits('close')"
    />
    <DrawerContent
      data-slot="drawer-content"
      data-lenis-prevent
      :data-vaul-custom-container="true"
      v-bind="forwarded"
      :style="$attrs.style"
      :class="cn(
        `group/drawer-content fixed z-50 flex h-auto`,
        `data-[vaul-drawer-direction=top]:flex-col-reversed data-[vaul-drawer-direction=bottom]:flex-col data-[vaul-drawer-direction=right]:flex-row data-[vaul-drawer-direction=left]:flex-row-reverse`,
        `data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] `,
        `data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] `,
        `data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-auto data-[vaul-drawer-direction=right]:md:max-w-[80vw] `,
        `data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-auto data-[vaul-drawer-direction=left]:md:max-w-[80vw] `,
        props.class,
      )"
    >
      <slot name="close">
        <DrawerClose
          v-if="!hideCloseButton || !$slots.close"
          as-child
        >
          <Button
            variant="accent-filled"
            size="icon"
            class="cursor-pointer z-1"
            :colors="closeColors"
            :class="drawerVariants({ button: variant, content: null })"
            @click="emits('close')"
          >
            <Icon
              name="icons:close"
              size="16"
            />
          </Button>
        </DrawerClose>
      </slot>
      <div
        data-slot="drawer-main"
        :class="drawerVariants({ button: null, content: variant })"
        class="group-data-[vaul-drawer-direction=bottom]/drawer-content:rounded-t-lg
             group-data-[vaul-drawer-direction=top]/drawer-content:rounded-b-lg"
      >
        <slot />
      </div>
    </DrawerContent>
  </DrawerPortal>
</template>
