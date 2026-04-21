<script setup lang="ts">
interface Props {
  disabled?: boolean
}

defineProps<Props>()
</script>

<template>
  <div
    v-if="!disabled"
    class="relative overflow-hidden"
  >
    <div class="transition-all duration-400 animation-duration-300 md:group-hover:-translate-y-full temp-skew">
      <div class="flex mx-auto justify-center items-center gap-3">
        <slot />
      </div>
      <div class="absolute flex mx-auto justify-center items-center gap-3">
        <slot />
      </div>
    </div>
  </div>
  <template v-else>
    <slot />
  </template>
</template>

<style scoped>
.temp-skew {
  &:is(:where(.group):hover *) {
    @media (width >= 48rem /* 768px */) {
      animation: temp-skew var(--tw-animation-duration, .3s) ease-out;
     }
  }
}

@keyframes temp-skew {
  0% {
    /* transform: skewY(0deg); */
    transform: scaleY(1);
  }
  50% {
    /* transform: skewY(-30deg); */
    transform: scaleY(1.8);
  }
  100% {
    /* transform: skewY(0deg); */
    transform: scaleY(1);
  }
}
</style>
