import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

export { default as Text } from './Text.vue'

export const textVariants = cva('-tracking-[calc(1em*0.06)]', {
  variants: {
    variant: {
      lg: '3xl:text-5xl lg:text-4xl text-2xl',
      md: '3xl:text-[1.375rem] lg:text-lg text-base',
      base: '3xl:text-xl sm:text-base text-sm',
      sm: '3xl:text-base text-sm',
      xs: '3xl:text-sm text-xs',
      xxs: '3xl:text-xs text-[0.625rem]',
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
    },
  },
  defaultVariants: {
    variant: 'md',
    weight: 'lighter',
    leading: 'teen',
  },
})

export type TextVariants = VariantProps<typeof textVariants>

export const setIndents = (element: HTMLElement) => {
  if (!element?.innerHTML) return
  element.innerHTML = element?.innerHTML
    .split('\n')
    .map(p => p.trim())
    .filter(p => p.length)
    .map((p, idx, arr) => `<p class="indent-[40px] ${idx === arr.length - 1 ? '' : 'mb-4'}">${p}</p>`)
    .join('')
}
