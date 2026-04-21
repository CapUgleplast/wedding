<script setup lang="ts">
import type { Sale } from './types'
import { AdaptiveButton } from '~/components/shared/element/adaptive-button'

interface Props {
  data: Sale
}

const props = defineProps<Props>()

const colors = useColors(props.data.colors).getCssVars()

const buttonRef = useTemplateRef('buttonRef')

const click = () => {
  if (buttonRef.value?.$el) {
    buttonRef.value.$el.click()
  }
}
</script>

<template>
  <article
    class="sale-root-colors cursor-pointer group h-fit sm:w-fit w-full bg-accent flex justify-between
           animate-in slide-in-from-right-100 duration-1000"
    @click="click"
  >
    <div class="sm:p-5 p-4 flex flex-col gap-5 justify-between sm:max-w-60">
      <header>
        <Badge
          v-if="data.badge"
          variant="default"
          size="small"
          class="badge-colors mb-3"
        >
          <IconElement :name="data.badge?.icon_type || ''" />
          {{ data.badge?.label }}
        </Badge>
        <Heading
          variant="6"
          leading="none"
          class="lg:w-50 max-md:sm:w-50 w-38"
        >
          {{ data.title }}
        </Heading>
      </header>
      <AdaptiveButton
        v-if="data.button?.name"
        variant="link"
        :href="data.button?.link"
        :type="data.button?.type || 'fos'"
        :label="data.button?.name"
        :data="data.button?.fos"
        :colors="colors.button"
        class="button-colors"
      >
        <Icon
          ref="buttonRef"
          name="icons:arrow-right"
        />
      </AdaptiveButton>
    </div>
    <div class="sm:aspect-[200/174] aspect-square sm:w-50 w-39">
      <Image
        :src="data.cover?.url || ''"
        :alt="data.title"
        class="object-cover size-full *:size-full"
      />
    </div>
  </article>
</template>

<style scoped>
.sale-root-colors {
  background-color: v-bind('colors.background');
  color: v-bind('colors.text');
}

.badge-colors {
  color: v-bind('colors.badge');
}

.button-colors {
  background-color: v-bind('colors.background');
  color: v-bind('colors.button');
}
</style>
