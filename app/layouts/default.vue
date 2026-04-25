<script lang="ts" setup>
import { VueLenis } from 'lenis/vue'
</script>

<template>
  <VueLenis
    root
    :options="{ lerp: 0.1, duration: 1.5, smoothWheel: true }"
  >
    <main class="min-h-lvh">
      <NuxtPage />
    </main>
    <SharedElementSound audio="/nobody.mp3" />
  </VueLenis>
</template>
