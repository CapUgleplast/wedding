<script setup lang="ts">
import type { HeroFact } from './types'

interface Props {
  data: HeroFact[]
}

const props = defineProps<Props>()
const { isSmallScreen, isMediumScreen } = useScreenSize()

const intervalMs = 4000 // Интервал смены, мс (можно изменить)
const offset = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

const maxFacts = computed(() => (isSmallScreen.value || isMediumScreen.value ? 2 : 4))

const getFacts = computed(() => {
  if (!props.data?.length) return []
  if (props.data.length <= maxFacts.value) return props.data
  const start = offset.value
  const end = start + maxFacts.value
  // Если дошли до конца массива — начинаем с начала
  if (end <= props.data.length) {
    return props.data.slice(start, end)
  }
  else {
    // "кольцевой" срез
    return [...props.data.slice(start), ...props.data.slice(0, end - props.data.length)]
  }
})

function startRotation() {
  stopRotation()
  if (props.data.length > maxFacts.value) {
    timer = setInterval(() => {
      offset.value = (offset.value + maxFacts.value) % props.data.length
    }, intervalMs)
  }
}

function stopRotation() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

watch([() => props.data.length, maxFacts], () => {
  offset.value = 0
  startRotation()
})

const isMounted = useMounted()
onMounted(startRotation)
onUnmounted(stopRotation)
</script>

<template>
  <Heading
    class="w-full"
    variant="7"
  >
    <div class="h-[7em] w-full">
      <dl
        v-if="isMounted"
        class="w-full flex animate-in slide-in-from-bottom-100 duration-300"
      >
        <dt
          v-for="(fact, index) in getFacts"
          :key="index + offset"
          class="flex-1 flex flex-col border-current border-t gap-3 2xl:py-8 md:py-5 py-4 sm:px-10 px-8
             not-last:border-r first:pl-0 last:pr-0 max-sm:w-full max-sm:basis-1/2 "
        >
          <IconElement
            class="animate-in fade-in-0 duration-200"
            :name="fact.icon_type || ''"
          />
          <SharedElementAnimatedText
            :text="fact.label"
            component="Heading"
            variant="7"
            leading="none"
            class="animate-in fade-in-0 duration-200"
          />
        </dt>
      </dl>
    </div>
  </Heading>
</template>

<style lang="scss" scoped>

</style>
