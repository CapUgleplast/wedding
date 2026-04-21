<script setup lang="ts">
import type { ButtonVariants } from '~/components/ui/button'
import type { ColorsButton } from '~/types/colors'
import type { Button } from '~~/shared/types/api'

interface Props {
  label: string
  href?: string
  type: 'link' | 'fos'
  variant?: ButtonVariants['variant']
  fosVariant?: 'dark' | 'light'
  target?: string
  data?: Button
  colors?: ColorsButton
}

defineProps<Props>()
</script>

<template>
  <div>
    <Button
      v-if="href && type == 'link'"
      v-bind="$attrs"
      :to="href"
      :target="target"
      :variant="variant"
      :colors="colors"
      class="whitespace-nowrap!"
    >
      {{ label }}
      <template #after>
        <slot />
      </template>
    </Button>

    <template v-else>
      <slot name="modal">
        <SharedModalFos
          :variant="fosVariant"
          :data="data?.fos"
        >
          <template #trigger>
            <Button
              v-bind="$attrs"
              :variant="variant"
              :colors="colors"
              class="whitespace-nowrap!"
            >
              {{ label }}
              <template #after>
                <slot />
              </template>
            </Button>
          </template>
        </SharedModalFos>
      </slot>
    </template>
  </div>
</template>

<style scoped>

</style>
