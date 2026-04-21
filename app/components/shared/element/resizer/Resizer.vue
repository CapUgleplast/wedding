<script setup lang="ts">
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue'

const containerRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)

const width = ref('auto')
const height = ref('auto')

let resizeObserver: ResizeObserver | null = null

const measureContent = () => {
  if (!contentRef.value || !containerRef.value) return

  // Создаем клон
  const clone = contentRef.value.cloneNode(true) as HTMLElement

  // Общая логика скрытия
  clone.style.cssText = `
    position: absolute;
    left: 0; top: 0;
    visibility: hidden;
    pointer-events: none;
    width: auto;
    height: auto;
  `

  // кладем клон в тот же контейнер
  containerRef.value.appendChild(clone)

  const newWidth = clone.scrollWidth + 'px'
  const newHeight = clone.scrollHeight + 'px'

  // удаляем клон
  clone.remove()

  width.value = newWidth
  height.value = newHeight
}

onMounted(() => {
  resizeObserver = new ResizeObserver(() => {
    requestAnimationFrame(measureContent)
  })

  resizeObserver.observe(contentRef.value!)
  nextTick(() => measureContent())
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
})
</script>

<template>
  <div
    ref="containerRef"
    class="relative overflow-hidden transition-all duration-500 ease-in-out"
    :style="{ width, height }"
  >
    <div
      ref="contentRef"
      class="inline-block min-w-min min-h-min"
    >
      <slot />
    </div>
  </div>
</template>
