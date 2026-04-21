<script setup lang="ts">
interface Props {
  markers: unknown[]
  pins?: unknown[]
  zoomControl?: boolean
  zoom?: number
  markerView?: 'desktop' | 'mobile' | undefined
  center?: [number, number]
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
  <section class="w-full h-full overflow-hidden">
    <SharedBlockMapRaw
      :center="center"
      :zoom="zoom"
      :markers="markers"
      :sub-markers="pins"
      :use-clusterer="true"
      :zoom-control="zoomControl"
    >
      <template #marker="{ marker }">
        <div class="bg-secondary text-secondary-foreground">
          {{ marker.title }}
        </div>
      </template>
      <template #submarker="{ marker }">
        <SharedBlockMapSubMarker
          :icon="marker?.category?.icon_type"
          :label="marker?.name"
          :distance="marker?.distance"
        />
      </template>
    </SharedBlockMapRaw>
  </section>
</template>

<style scoped>

</style>
