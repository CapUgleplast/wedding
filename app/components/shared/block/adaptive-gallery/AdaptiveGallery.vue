<script setup lang="ts">
interface Props {
  gallery: unknown[]
}

defineProps<Props>()
</script>

<template>
  <Image
    v-if="gallery?.length <= 1"
    :src="gallery?.[0]?.image?.url"
    class="size-full object-cover bg-secondary"
    alt="image"
  />
  <SharedBlockGallery
    v-else-if="gallery?.length > 1"
    :slides="gallery"
    :disable-autoplay="true"
    class="!size-full"
  >
    <template #default="{ currentSlide, slidesNumber }">
      <div class="lg:hidden absolute bottom-0 inset-x-0">
        <SharedBlockGalleryMobileControl
          :slides-number="slidesNumber"
          :current-slide="currentSlide + 1"
        />
      </div>
    </template>
  </SharedBlockGallery>
</template>

<style scoped>

</style>
