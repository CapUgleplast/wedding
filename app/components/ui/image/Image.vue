<script setup lang="ts">
const props = defineProps({
  useNuxt: {
    type: Boolean,
    default: true,
  },
  thumbnail: {
    type: String,
    default: '',
  },
  src: {
    type: String,
    required: false,
    default: '',
  },
  alt: {
    type: String,
    required: false,
    default: 'UNISTROY',
  },
  lazy: {
    type: Boolean,
    default: true,
  },
})
const baseURL = useRuntimeConfig().public.imgproxyUrl || useRuntimeConfig().public.strapiUrl.replace(/\/api\/?$/, '')

const getPlaceholder = computed(() => {
  return props.thumbnail ? baseURL + props.thumbnail : undefined
})
</script>

<template>
  <NuxtImg
    v-if="useNuxt"
    v-slot="{ isLoaded, imgAttrs }"
    :src="src"
    :placeholder="getPlaceholder"
    :alt="alt"
    format="webp"
    :custom="true"
    :loading="lazy && !thumbnail ? 'lazy' : undefined"
  >
    <div
      :data-loaded="isLoaded"
      v-bind="{ class: imgAttrs.class }"
      :class="{
        'relative before:transition-all before:absolute before:inset-0 data-[loaded=true]:before:backdrop-blur-none data-[loaded=false]:before:backdrop-blur-md': !!thumbnail,
      }"
    >
      <img
        v-if="isLoaded"
        v-bind="imgAttrs"
        :src="src"
      >
      <img
        v-else
        v-bind="imgAttrs"
        :src="getPlaceholder"
      >
    </div>
  </NuxtImg>
  <img
    v-else
    ref="img"
    :src="src"
    :alt="alt"
    loading="lazy"
  >
</template>

<style scoped></style>
