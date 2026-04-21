<script setup lang="ts">
import type { TabsAnimateClass } from '~/components/ui/tabs/index'

const classes: TabsAnimateClass | undefined = inject('animateClasses')

const container = useTemplateRef('container')

onMounted(() => {
  nextTick(() => {
    const tab: HTMLElement | null | undefined = container.value?.querySelector('[data-slot=tabs-content]')
    if (tab) {
      tab.style.setProperty('display', 'block', 'important')
    }
  })
})
</script>

<template>
  <div
    ref="container"
    class="[&>*]:duration-[500ms] [&>*]:transition-all [&:has(div[data-state=inactive])>*]:w-full
           [&:has(div[data-state=inactive])]:order-[-1] [&:has(div[data-state=inactive])]:size-0
           [&:has(div[data-state=active])]:size-full [&>div[data-state=active]]:animate-in
           [&>div[data-state=inactive]]:animate-out [&>div[data-state=inactive]]:absolute"
    :class="[classes?.active, classes?.inactive]"
    data-slot="tabs-content-animate"
  >
    <slot />
  </div>
</template>

<style scoped>

</style>
