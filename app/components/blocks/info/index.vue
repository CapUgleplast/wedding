<script setup lang="ts">
import type { Schema } from '#shared/types/api'
import { AdaptiveButton } from '@/components/shared/element/adaptive-button'
import { useHeaderStore } from '~~/layers/header/app/stores/header'

const { data } = defineProps<{
  data: Schema<'BlocksInfoComponent'>
}>()
const { download } = useDownload()
const handleDownloadUrl = (url: string) => {
  download(url)
}

const { section } = useTheme('dark')
const colors = useColors(data.colors).getCssVars()

const anchor = useHeaderStore().getMenuLink(data.anchor?.value)?.value
</script>

<template>
  <section
    :id="anchor"
    ref="section"
    class="root-info-colors relative pb-10 sm:pb-20 pt-10 sm:pt-20 md:pt-28"
  >
    <Container
      variant="wild"
    >
      <SharedElementAnimatedText
        :text="data.text"
        component="Text"
        variant="lg"
        class="text-primary w-full lg:w[80dvw] xl:w-[1017px] 3xl:w-[1337px] max-sm:mb-8 mb-10"
        weight="bolder"
        leading="teen"
      />

      <AdaptiveButton
        v-if="!!data.button && !data.file"
        variant="accent-filled"
        :label="data.button.name || ''"
        class="w-max sm:mb-10"
        :href="data.button?.link"
        :type="data.button?.type || 'link'"
        :colors="colors?.button"
      >
        <Icon
          name="icons:arrow-right"
          size="14"
          class=""
        />
      </AdaptiveButton>

      <Button
        v-if="data.file"
        variant="accent-filled"
        :colors="colors?.button"
        class="w-max sm:mb-10"
        @click="handleDownloadUrl(data.file?.url || '')"
      >
        {{ data?.button?.name || '' }}
        <Icon
          name="icons:download"
          size="14"
        />
      </Button>

      <ul
        v-if="data.items"
        class="flex flex-wrap justify-self-start items-start max-sm:gap-y-8 gap-y-12.5 gap-x-30 mt-10"
      >
        <li
          v-for="item in data.items"
          :key="item.id"
          class="max-md:w-full"
        >
          <Heading
            variant="2"
            class="accent-color mb-2 "
            weight="bolder"
            leading="none"
          >
            {{ item.key }}
          </Heading>

          <Text
            variant="sm"
            class="text-primary max-w-3xs"
            weight="normal"
            leading="tight"
          >
            {{ item.value }}
          </Text>
        </li>
      </ul>
    </Container>

    <!-- <SharedElementAnimatedImage>
      <Image
        v-if="data?.image"
        class="size-full object-cover min-h-[457px] max-h-[900px] aspect-3/4 md:aspect-video mt-10 sm:mt-20"
        :src="data?.image?.url"
        :thumbnail="data?.image?.formats?.thumbnail?.url"
      />
    </SharedElementAnimatedImage> -->
  </section>
  <div
    v-if="data?.image"
    class="sticky top-0 h-svh w-full -z-2"
  >
    <SharedElementAnimatedImage class="size-full">
      <SharedBlockAdaptiveImage
        class="size-full object-cover"
        :image="data?.image"
      />
    </SharedElementAnimatedImage>
  </div>
</template>

<style scoped>
.root-info-colors {
  color: v-bind('colors?.base?.text');
  background-color: v-bind('colors?.base?.background');
}

.accent-color {
  color: v-bind('colors?.accent_text');
}
</style>
