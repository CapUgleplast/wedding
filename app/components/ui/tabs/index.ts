import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Tabs } from './Tabs.vue'
export { default as TabsContent } from './TabsContent.vue'
export { default as TabsList } from './TabsList.vue'
export { default as TabsTrigger } from './TabsTrigger.vue'
export { default as TabsFloatControl } from './TabsFloatControl.vue'
export { default as TabsFloatButton } from './TabsFloatButton.vue'
export { default as TabsNext } from './TabsNext.vue'
export { default as TabsPrevious } from './TabsPrevious.vue'
export { default as TabsContentAnimate } from './TabsContentAnimate.vue'
export { default as TabsContentAnimateList } from './TabsContentAnimateList.vue'
export { default as TabsSwipeControl } from './TabsSwipeControl.vue'

export { useTabs } from './useTabs'

export const tabsVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap 3xl:text-xl text-sm cursor-pointer leading-none font-medium transition-all duration-300 gap-2 [&>#label]:opacity-40 [&>#label]:ml-2 ',
  {
    variants: {
      variant: {
        default:
            'rounded-base bg-white text-secondary-foreground '
            + 'lg:data-[state=inactive]:hover:text-accent '
            + 'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground ',
      },
      size: {
        default: 'py-3.75 px-5 max-md:animate-boop',
        sm: 'py-1.5 px-3 max-md:animate-boop',
        icon: 'p-3.25 rounded-base [&>[data-slot="wrapper"]]:size-4 max-md:animate-boop',
        none: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type TabsVariants = VariantProps<typeof tabsVariants>

export type TabsAnimateClass = {
  active: string
  inactive: string
}

export type TabsAnimateClasses = Record<'active' | 'inactive', string>
