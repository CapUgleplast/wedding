<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { ButtonVariants } from '.'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { buttonVariants } from '.'
import { NuxtLink } from '#components'
import type { ColorsButton } from '~/types/colors'
import type { TextVariants } from '~/components/ui/text'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  colors?: ColorsButton
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  textVariant?: TextVariants['variant']
  to?: string
  target?: string
  replace?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  textVariant: 'base',
})

const getComponent = computed(() => {
  if (props.to) {
    return NuxtLink
  }
  return props.as
})
</script>

<template>
  <Text
    :variant="textVariant"
    leading="teen"
    as-child
  >
    <Primitive
      data-slot="button"
      :as="getComponent"
      :as-child="asChild"
      :to="to"
      :target="target"
      :replace="replace"
      :style="{
        backgroundColor: colors?.background,
        color: colors?.text,
        borderColor: colors?.border,
      }"
      :class="cn('group', buttonVariants({ variant, size }), props.class)"
    >
      <slot />
    </Primitive>
  </Text>
</template>

<style scoped>

</style>
