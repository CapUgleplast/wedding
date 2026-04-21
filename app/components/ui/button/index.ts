import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Button } from './Button.vue'
export { default as ButtonContentWrapper } from './ButtonContentWrapper.vue'

export const buttonVariants = cva(
  'inline-flex items-center cursor-pointer justify-center gap-3 whitespace-nowrap font-medium transition-all '
  + 'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-90 outline-none',
  {
    variants: {
      variant: {
        'accent-filled':
          'border border-accent bg-accent text-primary-foreground ',
        'accent-outline':
          'border border-accent bg-transparent text-accent ',
        'secondary-filled':
          'border border-secondary bg-secondary text-accent ',
        'secondary-outline':
          'border border-secondary bg-transparent text-secondary ',
        'link': '!whitespace-nowrap [&>*]:!whitespace-nowrap relative !p-0 !h-auto '
          + 'before:absolute before:inset-0 before:right-full before:transition-all '
          + 'before:border-b before:border-current lg:hover:before:right-0 lg:group-hover:before:right-0 ',
        'link-reversed': '!whitespace-nowrap [&>*]:!whitespace-nowrap relative !p-0 !h-auto '
          + 'before:absolute before:inset-0 before:left-0 before:transition-all '
          + 'before:border-b before:border-current lg:hover:before:left-full lg:group-hover:before:left-full ',
        'simple':
          'bg-transparent text-current lg:hover:text-accent ',
        'empty': '',
      },
      size: {
        'default': 'py-2.75 px-5 h-11 max-md:animate-boop',
        'icon': 'p-3.25 rounded-base max-md:animate-boop',
        'icon-sm': 'p-1.75 rounded-base max-md:animate-boop',
        'none': 'p-0',
      },
    },
    defaultVariants: {
      variant: 'accent-filled',
      size: 'default',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
