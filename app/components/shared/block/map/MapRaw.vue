<script setup lang="ts">
import {
  YandexMap,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultSchemeLayer,
  YandexMapMarker,
  YandexMapControls,
  YandexMapZoomControl,
  YandexMapClusterer,
} from 'vue-yandex-maps'

import type { LngLat, LngLatBounds, YMap, BehaviorType } from '@yandex/ymaps3-types'
import type { YMapClusterer } from '@yandex/ymaps3-types/packages/clusterer'

export type Marker = {
  coordinates: LngLat
} & Record<string, unknown>

const props = withDefaults(defineProps<{
  center?: LngLat
  zoom?: number
  scrollZoom?: boolean
  markers?: Marker[]
  subMarkers?: Marker[]
  useClusterer?: boolean
  zoomControl?: boolean
}>(), {
  zoomControl: true,
})

const map = shallowRef<YMap | null>(null)
const clusterer = shallowRef<YMapClusterer | null>(null)
const visible = ref(true)
const gridSize = ref(6)
const trueBounds = ref<LngLatBounds>([
  [0, 0],
  [0, 0],
])

const enabledBehaviors = ref<BehaviorType[]>(['drag', 'pinchZoom', 'dblClick'])

const getCoordinates = (coords: string | number[]) => {
  if (coords && typeof coords === 'string') {
    return getCoordinatesFromString(coords)
  }
  return coords
}

watch(
  () => props.scrollZoom,
  (newValue) => {
    enabledBehaviors.value = newValue ? ['drag', 'scrollZoom', 'pinchZoom', 'dblClick'] : ['drag', 'pinchZoom', 'dblClick']
  },
  { immediate: true },
)
</script>

<template>
  <yandex-map
    v-if="visible"
    v-model="map"
    cursor-grab
    :settings="{
      location: {
        center: props.center,
        zoom: props.zoom,
        duration: 200,
      },
      camera: {
        tilt: 0,
        duration: 200,
      },
      behaviors: enabledBehaviors,
    }"
  >
    <yandex-map-default-scheme-layer />
    <yandex-map-default-features-layer />

    <!-- Рендеринг основных маркеров, если они заданы -->
    <yandex-map-marker
      v-for="(marker, index) in markers"
      :key="index"
      :settings="{ coordinates: getCoordinates(marker.coordinates) }"
      position="top left-center"
    >
      <slot
        name="marker"
        :marker="marker"
      />
    </yandex-map-marker>

    <template v-if="useClusterer">
      <yandex-map-clusterer
        v-model="clusterer"
        :grid-size="2.5 ** gridSize"
        zoom-on-cluster-click
        @true-bounds="trueBounds = $event"
      >
        <yandex-map-marker
          v-for="(marker, index) in subMarkers"
          :key="index"
          :settings="{ coordinates: getCoordinates(marker.coordinates), zIndex: 1 }"
          position="top-center left-center"
        >
          <slot
            name="submarker"
            :marker="marker"
          />
        </yandex-map-marker>

        <template #cluster="{ length }">
          <div
            id="map-cluster"
            class="flex size-10 cursor-pointer items-center justify-center"
          >
            {{ length }}
          </div>
        </template>
      </yandex-map-clusterer>
    </template>

    <template v-else>
      <!-- Рендеринг остальных маркеров -->
      <yandex-map-marker
        v-for="(marker, index) in subMarkers"
        :key="index"
        :settings="{ coordinates: getCoordinates(marker.coordinates), zIndex: 1 }"
        position="top-center left-center"
      >
        <slot
          name="submarker"
          :marker="marker"
        />
      </yandex-map-marker>
    </template>

    <yandex-map-controls
      v-if="zoomControl"
      :settings="{ position: 'right' }"
    >
      <yandex-map-zoom-control />
    </yandex-map-controls>
  </yandex-map>
</template>
