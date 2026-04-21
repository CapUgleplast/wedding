<script setup lang="ts">
const nuxtApp = useNuxtApp()

useHead({
  script: [
    {
      innerHTML: `window.__VUE_QUERY_STATE__ = ${JSON.stringify(
        (nuxtApp.payload).vueQueryState,
      )}`,
    },
  ],
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
