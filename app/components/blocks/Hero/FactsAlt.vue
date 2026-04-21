<script setup lang="ts">
import type { HeroFact } from './types'

interface Props {
  data: HeroFact[]
}

const props = defineProps<Props>()

const intervalMs = 4000 // Интервал смены, мс (можно изменить)
const offset = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

const maxFacts = 4

const getFacts = computed(() => {
  if (!props.data?.length) return []
  if (props.data.length <= maxFacts) return props.data
  const start = offset.value
  const end = start + maxFacts
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
  if (props.data.length > maxFacts) {
    timer = setInterval(() => {
      offset.value = (offset.value + maxFacts) % props.data.length
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
    <div class="w-full">
      <dl
        v-if="isMounted"
        class="w-full flex flex-wrap animate-in slide-in-from-bottom-100 duration-300"
      >
        <dt
          v-for="(fact, index) in getFacts"
          :key="index + offset"
          class="flex-1 flex max-lg:min-w-1/2 flex-col border-current/30 border-t lg:gap-12 gap-8
                 lg:px-10 lg:pb-10 lg:pt-5 pr-8 pb-8 pt-4 pl-4
                 not-last:border-r max-sm:w-full max-sm:basis-1/2 backdrop-blur-md"
        >
          <span
            id="fact-icon"
            class="w-fit size-10 animate-in fade-in-0 duration-200 p-2.5"
          >
            <IconElement
              :name="fact.icon_type || ''"
              size="20"
            />
          </span>
          <SharedElementAnimatedText
            :text="fact.label"
            component="Heading"
            variant="5"
            leading="none"
            class="animate-in fade-in-0 duration-200 max-md:[&>*]:!text-sm"
          />
        </dt>
      </dl>
    </div>
  </Heading>
</template>

<style lang="scss" scoped>

</style>
