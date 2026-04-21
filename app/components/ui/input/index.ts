import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

export { default as Input } from './Input.vue'

export const inputVariants = cva([
  'flex h-11 w-full min-w-0 mb-1 px-5 py-4 3xl:text-xl text-sm font-medium transition-[color,box-shadow,border-color] outline-none  ',
  'file:text-foreground file:inline-flex file:h-11 file:border-0 file:bg-transparent file:text-sm file:font-medium ',
  'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40 max-md:animate-boop ',
  'focus-visible:ring-0 ',
], {
  variants: {
    variant: {
      light: 'border border-white text-secondary-foreground bg-white rounded-base '
        + 'group-hover:border-primary-foreground '
        + 'placeholder:text-secondary-foreground/60 '
        + 'aria-[invalid=true]:border-destructive',
    },
  },
  defaultVariants: {
    variant: 'light',
  },
})

export type InputVariants = VariantProps<typeof inputVariants>
