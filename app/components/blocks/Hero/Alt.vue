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

const scrollStart = ref(0)
const scrollCurrent = ref(0)

const getOffset = () => {
  return scrollCurrent.value = section.value?.$el?.offsetTop
}

onMounted(() => {
  scrollStart.value = section.value?.$el?.parentElement?.offsetTop || 0
  getOffset()
})

useEventListener(window, 'scroll', getOffset)

const isScrolled = computed(() => scrollCurrent.value > scrollStart.value + 100)
</script>

<template>
  <section
    :id="anchor"
    class="h-[180lvh]"
  >
    <Container
      ref="section"
      variant="wild"
      class="root-colors overflow-hidden h-svh sticky top-0
           flex flex-col items-start justify-end max-sm:py-4 max-sm:gap-10"
    >
      <div
        class="z-1 flex justify-between md:items-end w-full gap-10 max-md:sm:flex-col-reverse
             max-md:sm:h-full pt-24 pb-10 max-sm:contents"
      >
        <div
          class="z-1 flex flex-col sm:gap-y-6 gap-y-5 transition-transform duration-500"
          :class="{
            '-translate-x-[150%]': isScrolled,
          }"
        >
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
            class="max-md:sm:flex hidden"
          >
            <Icon name="icons:arrow-right" />
          </AdaptiveButton>
        </div>
        <div
          class="z-1 flex flex-col sm:items-end sm:gap-y-6 gap-y-5
               w-full sm:w-fit max-md:sm:self-end max-sm:order-3 transition-transform duration-500"
          :class="{
            'translate-x-[150%]': isScrolled,
          }"
        >
          <AdaptiveButton
            v-if="data.button?.name"
            :href="data.button?.link"
            :type="data.button?.type || 'fos'"
            :label="data.button?.name"
            :data="data.button?.fos"
            :colors="colors.button"
            class="max-md:sm:hidden"
          >
            <Icon name="icons:arrow-right" />
          </AdaptiveButton>

          <BlocksHeroSale
            v-if="data.sale"
            :data="data.sale"
            class=""
          />
        </div>
      </div>
      <div
        class="z-1 transition-transform absolute bottom-0 left-0 right-0 duration-500"
        :class="{
          'translate-y-full': !isScrolled,
        }"
      >
        <BlocksHeroFactsAlt :data="data.facts || []" />
      </div>
      <div class="absolute -bottom-16 -left-16 size-[70%] opacity-70 blur-3xl bg-linear-to-tr from-black to-transparent" />
      <SharedElementAnimatedImage class="size-full inset-0 absolute -z-1">
        <SharedBlockAdaptiveImage
          class="size-full inset-0 absolute -z-1"
          :image="data.info?.image || {}"
          :lazy="false"
        />
      </SharedElementAnimatedImage>
    </Container>
  </section>
</template>

<style scoped>
.root-colors {
  color: v-bind('colors.text');
}

:deep(#fact-icon) {
  color: v-bind('colors.button?.text');
  background-color: v-bind('colors.button?.background');
}
</style>
