<script setup lang="ts">
import AdaptiveButton from '~/components/shared/element/adaptive-button/AdaptiveButton.vue'
import { useScroll } from '@vueuse/core'

interface Props {
  customSetFunction?: (ctx: unknown) => void
  button?: {
    label: string
    type: string
    href: string
  }
}

const props = withDefaults(defineProps<Props>(),
  {
    customSetFunction: () => {},
    button: () => {
      return {
        label: 'Подробнее',
        type: 'link',
        href: '/',
      }
    },
  })

const { x, y } = usePointer()

const isScrollingRef = ref(false)

const container = useTemplateRef('container')
const rect = ref<DOMRect | null>(null)
const relativePos = reactive({ x: 0, y: 0 })
const hideControls = ref(true)

const isVisible = ref(false)

const zonesRects = ref<DOMRect[]>([])

const instance = {
  container,
  relativePos,
}

const checkContainerVisibility = () => {
  if (!container.value || !rect.value) return false

  if (rect.value.top >= 0) {
    return rect.value.top <= window.innerHeight
  }
  else {
    return rect.value.bottom >= 0
  }
}

const checkZonesRect = useThrottleFn(() => {
  let inZone = false

  for (let idx = 0; idx < zonesRects.value.length; idx++) {
    const zoneRect = zonesRects.value[idx]

    if (!zoneRect) return inZone

    if (zoneRect.left < x.value
      && x.value < zoneRect.right
      && zoneRect.top < y.value
      && y.value < zoneRect.bottom) {
      inZone = true
      break
    }
  }

  return inZone
}, 70)

const checkRectEquality = useThrottleFn(() => {
  if (!container.value) return true

  const rectContainer = container.value.getBoundingClientRect()

  return rect.value!.left === rectContainer.left
    && rect.value!.right === rectContainer.right
    && rect.value!.top === rectContainer.top
    && rect.value!.bottom === rectContainer.bottom
}, 70)

const updateCursorPosition = useThrottleFn(async () => {
  if (!isVisible.value) return
  if (isScrollingRef.value) {
    hideControls.value = true
    return
  }

  if (!(await checkRectEquality())) {
    await setContainerRect()
  }

  if (rect.value!.left > x.value
    || x.value > rect.value!.right
    || rect.value!.top > y.value
    || y.value > rect.value!.bottom) {
    hideControls.value = true
    return
  }

  if (await checkZonesRect()) {
    hideControls.value = true
    return
  }

  if (hideControls.value) {
    hideControls.value = false
  }

  relativePos.x = x.value - rect.value!.left - 20
  relativePos.y = y.value - rect.value!.top - 20

  props.customSetFunction(instance)
}, 10)

const setContainerRect = useThrottleFn(() => {
  if (isScrollingRef.value) {
    hideControls.value = true
  }

  if (container.value) {
    rect.value = container.value.getBoundingClientRect()

    isVisible.value = checkContainerVisibility()
  }

  if (!isVisible.value) return

  const zones = document.querySelectorAll('#hide-float-controls')

  zonesRects.value = []

  zones?.forEach((el) => {
    zonesRects.value.push(el.getBoundingClientRect())
  })
}, 10)

useEventListener('mousemove', updateCursorPosition)
useEventListener('scroll', setContainerRect)

onMounted(async () => {
  await nextTick()
  await setContainerRect()

  const { isScrolling } = useScroll(document)

  watch(isScrolling, (val) => {
    isScrollingRef.value = val
  })
})

defineExpose({
  forceUpdateRect: setContainerRect,
  instance,
})
</script>

<template>
  <div
    ref="container"
    class="cursor-none"
    :class="{ 'pointer-events-none cursor-auto': hideControls }"
  >
    <div
      class="absolute"
      :style="`top: ${relativePos.y}px; left: ${relativePos.x}px;`"
    >
      <div
        class="relative transition-all scale-100"
        :class="{
          '!scale-0 opacity-49 pointer-events-none ': hideControls,
        }"
      >
        <slot
          :hide-controls="hideControls"
        >
          <AdaptiveButton
            class="[&>*>button]:cursor-none"
            :label="button.label"
            :type="button.type"
            :href="button.href"
            variant="accent-filled"
          />
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
