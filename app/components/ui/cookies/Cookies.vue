<script setup lang="ts">
const slug = useRoute().params.slug

const cookieAccepted = useLocalStorage('cookieAccepted', false)
const isOpen = ref(false)

const { data } = await useFetch<Schema<'BlocksCookieComponent'>>('/api/cookie/' + slug)

const { getCssVars } = useColors(data.value?.colors)
const cssVars = getCssVars()

const close = () => (isOpen.value = false)
const confirmCookie = () => {
  close()
  cookieAccepted.value = true
}

onMounted(() => {
  setTimeout(() => {
    isOpen.value = !cookieAccepted.value
  }, 2000)
})
</script>

<template>
  <AnimatePresence>
    <Motion
      v-if="isOpen"
      :initial="{
        translateX: '100%',
      }"
      :animate="{
        translateX: '0%',
      }"
      :exit="{
        translateX: '200%',
      }"
      :transition="{ type: 'spring', duration: 0.6, bounce: 0 }"
      class="root-cookies-colors fixed z-30 max-md:w-[90%] left-1/2 -translate-x-1/2 bottom-5 shadow-xs flex
             max-md:justify-center items-center gap-8 p-4 pb-5"
    >
      <div class="flex items-center gap-x-1 max-md:flex-wrap">
        <Heading
          as="p"
          variant="7"
          class="leading-none md:whitespace-nowrap"
        >
          Мы используем
        </Heading>
        <Button
          variant="link-reversed"
          size="none"
          to="?modal=policy"
          class="!h-3.5"
          :replace="true"
        >
          файлы cookie,
        </Button>
        <Heading
          as="p"
          variant="7"
          class="leading-none md:whitespace-nowrap"
        >
          чтобы пользоваться сайтом было удобнее
        </Heading>
      </div>
      <Button
        variant="link"
        size="none"
        class="w-max"
        :colors="{
          text: cssVars.active,
        }"
        @click="confirmCookie"
      >
        Хорошо
      </Button>
    </Motion>
  </AnimatePresence>
</template>

<style scoped>
.root-cookies-colors {
  background-color: v-bind('cssVars.background');
  color: v-bind('cssVars.text');
}
</style>
