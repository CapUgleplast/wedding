<script setup>
import { useTabs } from '~/components/ui/tabs/useTabs'

const { list, currentTab, currentTabIndex } = useTabs()

const api = ref(null)

const setApi = (carouselApi) => {
  api.value = carouselApi
}

watch(api, async () => {
  if (!api.value) return

  api.value
    .on('select', () => {
      currentTab.value = list.value[(api.value?.selectedScrollSnap() ?? 0)]
    })
    .on('destroy', () => {
      api.value?.destroy()
    })
})

watch(currentTabIndex, (val) => {
  if (!api.value) return
  api.value.scrollTo(val)
})
</script>

<template>
  <Carousel
    class="absolute size-full [&>*]:size-full"
    @init-api="setApi"
  >
    <CarouselContent class="size-full">
      <CarouselItem
        v-for="(_, idx) in list"
        :key="idx"
        class="size-full"
      />
    </CarouselContent>
  </Carousel>
</template>

<style scoped>
</style>
