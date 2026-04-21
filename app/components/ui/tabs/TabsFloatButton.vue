<script setup lang="ts">
import { useTabs } from '~/components/ui/tabs'

interface Props {
  direction: 'next' | 'prev'
}

const props = defineProps<Props>()

const { switchNext, switchPrev, canSwitchNext, canSwitchPrev } = useTabs()

const onClick = () => {
  if (props.direction === 'next' && canSwitchNext.value) {
    switchNext()
  }
  else if (props.direction === 'prev' && canSwitchPrev.value) {
    switchPrev()
  }
}
</script>

<template>
  <button
    class="size-10 p-3 bg-accent text-accent-foreground rounded-sm flex items-center justify-center"
    @click="onClick"
  >
    <Icon
      v-if="direction == 'next'"
      name="icons:arrow-right"
      class="animate-in slide-in-from-start-[200%] fade-in-0 !size-4 duration-300"
    />
    <Icon
      v-if="direction == 'prev'"
      name="icons:arrow-right"
      class="animate-in slide-in-from-start-[200%] fade-in-0 !size-4 duration-300 -scale-100"
    />
  </button>
</template>

<style scoped>

</style>
