<script setup lang="ts">
interface Props {
  src?: string
}

const props = defineProps<Props>()

const svg = useState<string | null>('logo', () => null)
let url = props.src || ''

if (props.src && !svg.value) {
  if (props.src?.slice(0, 1) == '/') {
    const domen = useRuntimeConfig().public.strapiUrl.replace(/\/api\/?$/, '')
    url = domen + url
  }

  // Используем $fetch с responseType: 'text' для получения SVG как текста
  const res = await $fetch<string>(url, {
    responseType: 'text',
  })

  svg.value = res
}
</script>

<template>
  <div
    v-if="svg"
    class="h-full w-fit fill-current"
    v-html="svg"
  />
</template>

<style scoped>

</style>
