<script setup lang="ts">
interface Props {
  icon: string
  label: string
  distance: number
}

defineProps<Props>()

const isDesktop = useMediaQuery('(min-width: 1024px)')
</script>

<template>
  <TooltipComponent
    side="right"
    :use-click="!isDesktop"
  >
    <template #trigger>
      <Button
        id="map-submarker"
        variant="empty"
        class="bg-accent text-white rounded-none"
        size="icon"
      >
        <IconElement :name="icon" />
      </Button>
    </template>
    <template #content>
      <Heading
        variant="7"
        as="p"
        weight="bolder"
      >
        <div class="max-w-[14em]">
          {{ label }}
        </div>
      </Heading>
    </template>
  </TooltipComponent>
</template>

<style scoped>

</style>
