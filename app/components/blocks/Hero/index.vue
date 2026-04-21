<script setup lang="ts">
import type { HeroData } from './types'
import { AdaptiveButton } from '~/components/shared/element/adaptive-button'
import { useHeaderStore } from '~~/layers/header/app/stores/header'

interface Props {
  data: HeroData
}

const props = defineProps<Props>()

const colors = useColors(props.data.colors).getCssVars()
const anchor = useHeaderStore().getMenuLink(props.data.anchor?.value)?.value

const { section } = useTheme('light')
</script>

<template>
  <Container
    :id="anchor"
    ref="section"
    as="section"
    variant="wild"
    class="hero-alt-root-colors overflow-hidden relative h-[clamp(660px,100svh,100svh)] flex flex-col md:gap-y-14 gap-y-10 items-start justify-end max-sm:py-4"
  >
    <div
      class="flex justify-between md:items-end w-full gap-10 max-md:sm:flex-col-reverse
                max-md:sm:h-full pt-24 max-sm:contents"
    >
      <div class="flex flex-col sm:gap-y-6 gap-y-5">
        <Heading
          variant="1"
          leading="none"
          as="h1"
          class="!whitespace-pre-line max-md:sm:!text-[5rem]"
        >
          {{ data.info?.title }}
        </Heading>
        <Heading
          variant="6"
          leading="none"
          as="h3"
        >
          {{ data.info?.description }}
        </Heading>
        <AdaptiveButton
          v-if="data.button?.name"
          :href="data.button?.link"
          :type="data.button?.type || 'fos'"
          :label="data.button?.name"
          :data="data.button?.fos"
          :colors="colors.button"
          class="sm:mt-4 mt-3"
        >
          <Icon name="icons:arrow-right" />
        </AdaptiveButton>
      </div>
      <BlocksHeroSale
        v-if="data.sale"
        :data="data.sale"
        class="sm:!w-fit max-md:sm:self-end max-sm:order-3"
      />
    </div>
    <BlocksHeroFacts :data="data.facts || []" />
    <SharedElementAnimatedImage class="size-full inset-0 absolute -z-1 brightness-80">
      <SharedBlockAdaptiveImage
        class="size-full inset-0 absolute -z-1 brightness-80"
        :image="data.info?.image || {}"
        :lazy="false"
      />
    </SharedElementAnimatedImage>
  </Container>
</template>

<style scoped>
.hero-alt-root-colors {
  color: v-bind('colors.text');
}
</style>
