<script setup lang="ts">
const { isMuted } = useMuteState()
</script>

<template>
  <Button
    size="none"
    class="size-10 rounded-full border bg-white text-primary relative"
    @click="isMuted = !isMuted"
  >
    <Icon
      v-if="isMuted"
      class="!size-4"
      name="icons:sound-off"
    />
    <Icon
      v-else
      class="!size-4"
      name="icons:sound-on"
    />
    <Image
      class="absolute inset-0 scale-150 animate-spin animation-duration-10000"
      src="/svg/mute.svg"
    />
  </Button>
</template>

<style scoped>

</style>
