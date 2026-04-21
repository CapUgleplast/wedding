<script setup lang="ts">
import { useFosStore } from '~~/layers/fos/app/stores/fos'
import type { FosData } from '~~/layers/fos/app/types/fos'

interface Props {
  data?: FosData
}

const props = defineProps<Props>()

const slug = useRoute().params.slug || ''

const model = defineModel<boolean>()

const { colors, getFosDefaultData, processColors } = useFosStore()
await getFosDefaultData(slug)
const fosData = await getFosDefaultData(slug)

const getFosData = computed(() => {
  if (!fosData) return {}
  if (!props.data) return fosData

  return {
    ...Object.fromEntries(
      Object.entries(fosData).map(([key, value]) => [
        key,
        props.data?.[key] || value,
      ]),
    ),
  }
})

const getFosColors = computed(() => {
  if (!props.data?.colors) return colors

  return processColors(props.data?.colors)
})
</script>

<template>
  <Drawer
    v-model:open="model"
    direction="right"
  >
    <DrawerTrigger>
      <slot name="trigger" />
    </DrawerTrigger>
    <DrawerContent
      :overlay-style="{ color: getFosColors.overlay }"
      :close-colors="getFosColors.button"
      class="max-md:min-w-dvw md:w-[478px]! max-w-[478px] 2xl:min-w-[28dvw] "
    >
      <template #default>
        <div
          :style="{
            backgroundColor: getFosColors.base?.background,
            color: getFosColors.base?.text,
          }"
          class="p-4 sm:p-10 h-full flex flex-col justify-center items-center"
        >
          <FosTabs
            :colors="{
              form: getFosColors.form || {},
              button: getFosColors.button || {},
            }"
            :description="getFosData?.description"
            :title="getFosData?.title"
            :logo="true"
            variant="light"
          />
        </div>
      </template>
    </DrawerContent>
  </Drawer>
</template>
