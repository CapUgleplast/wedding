import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

export { default as Popover } from './Popover.vue'
export { default as PopoverAnchor } from './PopoverAnchor.vue'
export { default as PopoverContent } from './PopoverContent.vue'
export { default as PopoverTrigger } from './PopoverTrigger.vue'

export const popoverVariants = cva('', {
  variants: {
    variant: {
      default: 'bg-white text-secondary-foreground shadow-base px-1',
      none: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export const popoverTriggerVariants = cva('group flex items-center justify-center cursor-pointer leading-rem transition-colors', {
  variants: {
    variant: {
      primary: `bg-primary text-primary-foreground rounded-sm px-3 py-1.5
                  lg:hover:bg-accent lg:hover:text-accent-foreground
                  data-[state=open]:bg-accent data-[state=open]:text-accent-foreground`,
      none: '',
    },
  },
  defaultVariants: {
    variant: 'none',
  },
})

export type PopoverVariants = VariantProps<typeof popoverVariants>
export type PopoverTriggerVariants = VariantProps<typeof popoverTriggerVariants>
