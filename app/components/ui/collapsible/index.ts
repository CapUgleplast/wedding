import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Collapsible } from './Collapsible.vue'
export { default as CollapsibleContent } from './CollapsibleContent.vue'
export { default as CollapsibleTrigger } from './CollapsibleTrigger.vue'

export const collapsibleTriggerVariants = cva(
  'group/collapsible-trigger w-full transition-all leading-none duration-300 ease-in-out cursor-pointer '
  + 'inline-flex items-center justify-start ',
  {
    variants: {
      variant: {
        default: 'gap-3 py-3.5 px-5',
      },
      theme: {
        light: 'bg-white text-primary',
      },
    },
    defaultVariants: {
      variant: 'default',
      theme: 'light',
    },
  },
)

export type CollapsibleTriggerVariants = VariantProps<typeof collapsibleTriggerVariants>
