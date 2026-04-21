<script setup lang="ts">
import type { ColorsMap } from '~/types/colors'

interface Props {
  projects: Project[]
  pins?: Project['pins']
  zoomControl?: boolean
  zoom?: number
  markerView?: 'desktop' | 'mobile' | undefined
  center?: [number, number]
  colors?: ColorsMap['map']
}

withDefaults(
  defineProps<Props>(),
  {
    zoomControl: true,
    zoom: 12,
  },
)
</script>

<template>
  <section class="size-full overflow-hidden">
    <SharedBlockMapRaw
      :center="center || getCoordinatesFromString(projects?.[0]?.coordinates)"
      :zoom="zoom"
      :markers="projects"
      :sub-markers="pins"
      :use-clusterer="true"
      :zoom-control="zoomControl"
    >
      <template #marker="{ marker }">
        <div class="flex flex-col items-center">
          <div class="bg-white text-secondary-foreground w-16 p-1">
            <Image
              class="size-full object-cover aspect-square"
              :src="marker?.cover?.url"
              :thumbnail="marker?.cover?.formats?.thumbnail?.url"
            />
          </div>
          <Text
            class="py-1.5 px-3 bg-white whitespace-nowrap"
            variant="sm"
            leading="tight"
          >
            {{ marker?.name }}
          </Text>
        </div>
      </template>
      <template #submarker="{ marker }">
        <SharedBlockMapSubMarker
          :icon="marker?.category?.icon"
          :label="marker?.name"
          :distance="marker?.distance"
        />
      </template>
    </SharedBlockMapRaw>
  </section>
</template>

<style scoped>
:deep(#map-cluster) {
  background: v-bind('colors?.text');
  color: v-bind('colors?.background');
}
</style>
