<script setup lang="ts">
import { useSocialColorsState } from '~/components/shared/element/socials/useSocialColorsState'
import type { ButtonVariants } from '~/components/ui/button'

interface Props {
  items?: Array<{
    id?: number
    icon?: string
    link?: string
  }>
  variant?: ButtonVariants['variant']
  iconColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'accent-outline',
})
const { socials } = useContactsState()
const { colors } = useSocialColorsState()

const getIcons = computed(() => {
  if (props.items) {
    return props.items
  }
  return socials.value
})
</script>

<template>
  <div class="flex items-center gap-2">
    <Button
      v-for="(s, idx) in getIcons"
      :key="idx"
      :to="s?.link"
      target="blank"
      :variant="variant"
      size="icon"
      :colors="colors"
    >
      <Icon
        :name="`icons:${s?.icon}` || 'icons:tiktok'"
        class="pointer-events-none"
        :class="iconColor"
        mode="svg"
        size="16"
      />
    </Button>
  </div>
</template>
