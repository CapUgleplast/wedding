import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

export { default as Heading } from './Heading.vue'

export const headingVariants = cva('sm:whitespace-pre-line -tracking-[calc(1em*0.05)] font-heading', {
  variants: {
    variant: {
      ['1']: '3xl:text-[6.5rem] lg:text-[5rem] text-[4rem]',
      ['2']: '3xl:text-7xl sm:text-[4rem] text-[2.625rem]',
      ['3']: '3xl:text-[4rem] sm:text-5xl text-[2rem]',
      ['4']: '3xl:text-[2.75rem] sm:text-[2.25rem] text-2xl',
      ['5']: '3xl:text-[2rem] lg:text-2xl text-xl',
      ['6']: '3xl:text-2xl lg:text-lg text-base',
      ['7']: '3xl:text-xl text-sm',
    },
    weight: {
      lighter: 'font-light',
      normal: 'font-normal',
      bolder: 'font-medium',
    },
    leading: {
      none: 'leading-none',
      teen: 'leading-teen',
      rem: 'leading-rem',
      tight: 'leading-tight',
      normal: 'leading-normal',
      custom: 'leading-[90%]',
    },
  },
  defaultVariants: {
    variant: '1',
    weight: 'bolder',
    leading: 'teen',
  },
})

export type HeadingVariants = VariantProps<typeof headingVariants>
