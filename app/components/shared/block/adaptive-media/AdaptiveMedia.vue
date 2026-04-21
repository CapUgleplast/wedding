<script setup lang="ts">
interface Props {
  media: unknown
}

defineProps<Props>()
</script>

<template>
  <Video
    v-if="media?.mime?.includes('video')"
    :video="media"
    :autoplay="true"
    :muted="true"
    :loop="true"
    :controls="false"
    class="size-full"
    video-class="object-cover"
    v-bind="$attrs"
  />
  <Image
    v-else
    :src="media?.url"
    provider="none"
    class="size-full object-cover bg-secondary"
    alt="image"
    v-bind="$attrs"
  />
</template>

<style scoped>

</style>
