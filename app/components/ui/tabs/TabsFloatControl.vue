<script setup lang="ts">
import { useTabs } from '~/components/ui/tabs/useTabs'

const emit = defineEmits(['onScroll'])

const { canSwitchPrev, canSwitchNext, list } = useTabs()

const controls = useTemplateRef('controls')

const currentDirection = ref<'next' | 'prev'>('next')

const setCurrentButton = (ctx: unknown) => {
  if (!canSwitchPrev.value) {
    currentDirection.value = 'next'
    return
  }
  if (!canSwitchNext.value) {
    currentDirection.value = 'prev'
    return
  }

  if (!ctx?.container?.value || !ctx?.relativePos?.x) return

  const carouselWidth = ctx.container?.value?.clientWidth

  currentDirection.value = ctx?.relativePos?.x < carouselWidth / 2
    ? 'prev'
    : 'next'
}

const sendEmit = () => {
  emit('onScroll')
}

const slidesEnough = computed(() => list.value?.length > 1)

watch([canSwitchNext, canSwitchPrev], () => {
  const instance = controls.value?.instance
  setCurrentButton(instance)
})
</script>

<template>
  <FloatControl
    v-if="slidesEnough"
    ref="controls"
    :custom-set-function="setCurrentButton"
  >
    <TabsFloatButton
      :direction="currentDirection"
      class="relative cursor-none"
      @on-scroll="sendEmit"
    />
  </FloatControl>
</template>

<style scoped>
</style>
