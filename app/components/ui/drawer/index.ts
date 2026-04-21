import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Drawer } from './Drawer.vue'
export { default as DrawerClose } from './DrawerClose.vue'
export { default as DrawerContent } from './DrawerContent.vue'
export { default as DrawerDescription } from './DrawerDescription.vue'
export { default as DrawerFooter } from './DrawerFooter.vue'
export { default as DrawerHeader } from './DrawerHeader.vue'
export { default as DrawerOverlay } from './DrawerOverlay.vue'
export { default as DrawerTitle } from './DrawerTitle.vue'
export { default as DrawerTrigger } from './DrawerTrigger.vue'
export { default as DrawerComponent } from './DrawerComponent.vue'

export const drawerVariants = cva(
  '', {
    variants: {
      content: {
        default: 'overflow-y-auto overflow-x-clip size-full',
        accent: 'overflow-y-auto overflow-x-clip size-full bg-accent text-primary-foreground',
      },
      button: {
        default: 'absolute top-4 right-4 lg:top-6 lg:right-6',
        accent: 'absolute top-4 right-4 lg:top-6 lg:right-6 bg-secondary text-accent',
      },
    },
    defaultVariants: {
      content: 'default',
      button: 'default',
    },
  },
)

export type DrawerVariants = VariantProps<typeof drawerVariants>
