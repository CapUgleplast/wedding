<script setup lang="ts">
interface Props {
  icon?: string
  title?: string
  description?: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-col items-center w-[400px] 3xl:w-[24dvw]">
    <slot name="icon">
      <IconElement
        v-if="icon"
        :name="icon ?? ''"
        class="size-10!"
      />
    </slot>
    <slot name="title">
      <Heading
        as="p"
        variant="3"
        class="mt-5 mb-10 lg:mb-26 -indent-8 ml-6 mix-blend-color xl:text-[3rem] !whitespace-pre"
        leading="custom"
      >
        {{ title }}
      </Heading>
    </slot>
    <slot name="description">
      <Heading
        variant="2"
        class="text-center leading-none max-md:w-[106%]"
      >
        {{ description }}
      </Heading>
    </slot>
  </div>
</template>

<style scoped>

</style>
