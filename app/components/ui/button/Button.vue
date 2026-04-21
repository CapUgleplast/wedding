<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { ButtonVariants } from '.'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { buttonVariants } from '.'
import { NuxtLink } from '#components'
import type { HeadingVariants } from '~/components/ui/heading'
import type { ColorsButton } from '~/types/colors'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  colors?: ColorsButton
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  textVariant?: HeadingVariants['variant']
  to?: string
  target?: string
  replace?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  textVariant: '7',
})

const getComponent = computed(() => {
  if (props.to) {
    return NuxtLink
  }
  return props.as
})
</script>

<template>
  <Heading
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
      <slot name="before" />
      <ButtonContentWrapper
        data-slot="wrapper"
        :disabled="variant === 'empty' || variant === 'link' || variant === 'link-reversed'"
      >
        <slot />
      </ButtonContentWrapper>
      <slot name="after" />
    </Primitive>
  </Heading>
</template>

<style scoped>

</style>
