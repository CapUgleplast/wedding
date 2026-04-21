import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

export { default as Checkbox } from './Checkbox.vue'
export { default as CheckboxGroupComponent } from './CheckboxGroupComponent.vue'

export const checkboxVariants = cva([
  'peer transition-colors focus-visible:ring-[3px] size-5 shrink-0 border-2 outline-none cursor-pointer  '
  + 'aria-invalid:ring-destructive aria-invalid:border-destructive '
  + 'disabled:cursor-not-allowed disabled:opacity-50',
], {
  variants: {
    variant: {
      default: 'border-current text-current '
        + 'lg:group-hover:bg-current/20 lg:hover:bg-current/20 '
        + 'focus-visible:border-current/30',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export type CheckboxVariants = VariantProps<typeof checkboxVariants>
