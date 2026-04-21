import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as ToggleGroup } from './ToggleGroup.vue'
export { default as ToggleGroupItem } from './ToggleGroupItem.vue'
export { default as ToggleGroupComponent } from './ToggleGroupComponent.vue'

export const toggleGroupVariants = cva(
  'transition-all whitespace-nowrap ', {
    variants: {
      variantGroup: {
        default: 'bg-white p-2 rounded-sm shadow-base',
        custom: 'border-t border-gray-200/50 py-2 bg-white',
        none: '',
      },
      variantItem: {
        default: 'font-medium text-sm w-full text-current '
          + 'lg:hover:bg-current/10 '
          + 'data-[state=on]:text-accent! data-[state=on]:[&>div>p]:bg-accent! data-[state=on]:[&>div>p]:text-white',
      },
      size: {
        default: 'px-5 py-2',
      },
    },
    defaultVariants: {
      variantGroup: 'none',
      variantItem: 'default',
      size: 'default',
    },
  },
)

export type ToggleGroupVariants = VariantProps<typeof toggleGroupVariants>
