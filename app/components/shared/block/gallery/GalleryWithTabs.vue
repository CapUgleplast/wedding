<script setup lang="ts">
import type { Schema, Image } from '#shared/types/api'

interface GalleryOption {
  value: string
  label: string
  gallery?: Image[]
  verticalGallery?: Image[]
}

const { data } = defineProps<{
  data: Schema<'BlocksGalleryWithTabsComponent'>
}>()

const selected = ref('')

const { isSmallScreen } = useScreenSize()

const options = computed(() => {
  const tabs = data?.galleryTabs?.map(el => ({
    value: el.id,
    label: el.text,
    gallery: el.gallery?.map(i => ({ image: { url: i.url } })),
    verticalGallery: el.vertical_gallery?.map(i => ({ image: { url: i.url } })),
  }))

  return [
    { value: '', label: 'Все' },
    ...tabs ?? [],
  ]
})

const currentGallery = computed(() => {
  const getBestGallery = (item: GalleryOption) => {
    if (isSmallScreen.value) {
      return (item.verticalGallery && item.verticalGallery.length > 0)
        ? item.verticalGallery
        : item.gallery
    }
    return item.gallery
  }

  if (!selected.value) {
    return options.value
      .filter(i => i.value !== '')
      .flatMap(i => getBestGallery(i) ?? [])
  }

  const found = options.value.find(i => i.value === selected.value)
  return found ? getBestGallery(found) : []
})
const colors = useColors(data.colors).getCssVars()
</script>

<template>
  <section>
    <SharedBlockGallery
      :slides="currentGallery"
      :colors="colors.slider_button"
      :disable-controls="false"
      show-pagination
    >
      <template #header>
        <ClientOnly>
          <Tabs
            id="hide-float-controls"
            v-model="selected"
          >
            <TabsList class="flex gap-2 data-[state=active]:bg-primary">
              <TabsTrigger
                v-for="i in options"
                :key="i.value"
                :value="i.value ?? ''"
                :colors="colors.tabs"
              >
                {{ i.label }}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </ClientOnly>
      </template>
    </SharedBlockGallery>
  </section>
</template>
