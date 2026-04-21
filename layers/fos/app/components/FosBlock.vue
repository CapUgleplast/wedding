<script setup lang="ts">
const props = withDefaults(defineProps<{
  data?: Schema<'BlocksFormComponent'>
  fosType?: 'callback' | 'reserved'

}>(), {
  fosType: 'callback',
})

const { send, dataFormatter } = useForm()
const { isLargeScreen } = useScreenSize()

const onFormData = (data) => {
  const transformedData = dataFormatter(data)
  send(transformedData, '/api/ticket')
}

const fosData = computed(() => props.data?.fos)
const isCompact = computed(() => props.data?.type === 'compact')

const colors = useColors(props.data?.fos?.colors).getCssVars()
</script>

<template>
  <Container
    variant="wild"
    class="root-fos-colors py-10 sm:py-12 md:py-14"
    :class="[isCompact ? 'max-lg:p-0!' : 'px-0!']"
  >
    <div
      :class="[`fos-bg-colors grid max-h-full lg:max-h-[700px] `, isCompact ? ' lg:grid-cols-3 2xl:gap-10 lg:h-[440px]' : 'lg:grid-cols-2 lg:h-svh']"
    >
      <div
        v-if="isCompact"
        class="relative h-full max-lg:hidden"
      >
        <div class="absolute inset-0 z-1">
          <Image
            v-if="data?.image"
            class="size-full object-cover max-w-[440px] 2xl:max-w-[580px]"
            :src="data?.image?.url"
            :thumbnail="data?.image?.formats?.thumbnail?.url"
          />
        </div>
      </div>
      <div
        v-if="fosType && isCompact && isLargeScreen"
        class="flex flex-col justify-center  max-xl:pl-5 max-xl:pr-6"
      >
        <Heading
          variant="3"
          weight="bolder"
          leading="custom"
          class="mb-8 whitespace-pre-line"
        >
          {{ fosData?.title }}
        </Heading>
        <Text
          variant="base"
          weight="normal"
          leading="tight"
          class="max-w-[340px] whitespace-pre-line"
        >
          {{ fosData?.description }}
        </Text>
      </div>
      <div
        v-if="fosData"
        :class="[`flex justify-center flex-col size-full max-w-[478px] 2xl:max-w-[592px] mx-auto`, isCompact ? 'px-4 max-lg:py-20 lg:pl-4 lg:pr-10' : 'py-20 px-4 order-2 lg:order-1']"
        class=""
      >
        <FosForm
          :form-type="fosType"
          :variant="'light'"
          :colors="colors"
          :description="!isCompact || !isLargeScreen ? fosData?.description : ''"
          :title="!isCompact || !isLargeScreen ? fosData?.title : ''"
          :disabled-when-sending="false"
          @form-data="onFormData"
        />
      </div>
      <div
        v-if="!isCompact"
        class="relative h-[360px] sm:h-[700px] lg:h-full order-1 lg:order-2"
      >
        <div class="absolute inset-0 ">
          <SharedElementAnimatedImage v-if="!isCompact && data?.image">
            <Image
              class="size-full object-cover aspect-square "
              :src="data?.image?.url"
              :thumbnail="data?.image?.formats?.thumbnail?.url"
            />
          </SharedElementAnimatedImage>
          <Image
            v-else-if="data?.image"
            class="size-full object-cover aspect-square "
            :src="data?.image?.url"
            :thumbnail="data?.image?.formats?.thumbnail?.url"
          />
        </div>
      </div>
    </div>
  </Container>
</template>

<style scoped>
.root-fos-colors {
  background-color: v-bind('colors?.overlay');
  color: v-bind('colors?.base?.text');
}
.fos-bg-colors {
  background-color: v-bind('colors?.base?.background');
}
</style>
