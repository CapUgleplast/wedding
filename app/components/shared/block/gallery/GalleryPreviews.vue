<script setup lang="ts">
interface Props {
  slides: GallerySlide[]
  currentSlide: number
  position: 'left' | 'bottom'
}

defineProps<Props>()

const emit = defineEmits(['onClick'])

const onClick = (idx: number) => {
  emit('onClick', idx)
}
</script>

<template>
  <div class="overflow-auto scrollbar-hide w-fit">
    <div
      class="flex gap-3 w-fit"
      :class="position === 'bottom' ? '' : 'lg:flex-col'"
    >
      <div
        v-for="(slide, idx) in slides"
        :key="slide.id"
        :data-state="currentSlide == idx ? 'active' : 'inactive'"
        class="size-[50px] md:size-[4.5rem] p-1 border border-transparent transition-all duration-300
             data-[state=inactive]:hover:brightness-75 data-[state=inactive]:cursor-pointer"
        :class="position === 'bottom' ? 'data-[state=active]:!border-primary md:data-[state=active]:!border-current' : 'data-[state=active]:!border-primary'"
        @click="onClick(idx)"
      >
        <Image
          class="size-full object-cover"
          :src="slide.image.url"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
