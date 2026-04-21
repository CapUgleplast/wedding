<script setup lang="ts">
interface Props {
  image: Schema<'ContentImageAdaptiveComponent'>
  lazy?: boolean
}

const props = defineProps<Props>()

const { isSmallScreen } = useScreenSize()

const getImage = computed(() => {
  if (isSmallScreen.value && props.image?.mobile) {
    return props.image?.mobile
  }
  else if (props.image?.desktop) {
    return props.image?.desktop
  }
  return props.image
})
</script>

<template>
  <Image
    :src="getImage?.url"
    :thumbnail="lazy ? getImage?.formats?.thumbnail?.url : undefined"
    :lazy="lazy"
    class="size-full object-cover bg-secondary"
    alt="image"
    v-bind="$attrs"
  />
</template>

<style scoped>

</style>
