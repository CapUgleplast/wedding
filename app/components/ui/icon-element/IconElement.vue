<script setup lang="ts">
interface Props {
  name: string
}

const props = defineProps<Props>()

const iconName = computed(() => {
  return `icons:${props.name}`
})
</script>

<template>
  <Icon
    :name="iconName"
    size="16"
  />
</template>

<style scoped>

</style>
