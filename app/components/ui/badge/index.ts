import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-sm py-1.5 px-1.5 text-[0.625rem] font-medium leading-none '
  + 'w-fit whitespace-nowrap shrink-0 gap-1 focus-visible:border-ring transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'bg-current/10 text-current [a&]:hover:bg-current/90',
        empty:
          '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)
export type BadgeVariants = VariantProps<typeof badgeVariants>
