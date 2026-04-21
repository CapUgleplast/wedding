<script lang="ts" setup>
import { VueLenis } from 'lenis/vue'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>

<template>
  <VueLenis
    root
    :options="{ lerp: 0.1, duration: 1.5, smoothWheel: true }"
  >
    <Header />
    <main class="min-h-lvh">
      <NuxtPage />
    </main>
    <Footer />
    <Cookies />
    <SharedModalDocument />
    <VueQueryDevtools />
  </VueLenis>
</template>
