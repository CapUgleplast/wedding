<script setup lang="ts">
import type { ColorsMap } from '~/types/colors'

interface Props {
  project: Project
  pins?: Schema<'ProjectPinComponent'>[]
  colors?: ColorsMap['map']
}

defineProps<Props>()
</script>

<template>
  <div class="size-full relative">
    <BlocksMapWrapper
      :projects="[project]"
      :pins="pins"
      marker-view="desktop"
      :zoom="13"
      :zoom-control="false"
      :colors="colors"
      class="pointer-events-none"
    />

    <DrawerComponent
      content-class="!max-h-none [&>div]:!rounded-none z-55"
      theme="light"
      :hide-close-button="true"
      :handle-only="true"
    >
      <template #trigger>
        <Button class="absolute bottom-5 inset-x-5">
          Открыть карту
        </Button>
      </template>
      <template #content>
        <div class="h-dvh relative bg-white">
          <BlocksMapDesktop
            :project="project"
            :pins="pins"
            :colors="colors"
          />
        </div>
      </template>
    </DrawerComponent>
  </div>
</template>

<style scoped>
</style>
