import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

export { default as Container } from './Container.vue'
export const containerVariants = cva('', {
  variants: {
    variant: {
      default: 'container xl:max-2xl:max-w-[72rem]',
      wild: 'w-full',
    },
    paddings: {
      default: '2xl:px-16 lg:px-10 px-5',
      none: 'p-0',
    },
  },
  defaultVariants: {
    variant: 'default',
    paddings: 'default',
  },
})

export type ContainerVariants = VariantProps<typeof containerVariants>
