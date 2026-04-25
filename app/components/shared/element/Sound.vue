<script setup lang="ts">
interface Props {
  audio: string
}

defineProps<Props>()

const { isMuted } = useMuteState()

const audioRef = useTemplateRef('audio')

watch(isMuted, () => {
  audioRef.value?.play()
})
</script>

<template>
  <audio
    ref="audio"
    :src="audio"
    :controls="false"
    :loop="true"
    :autoplay="true"
    :muted="isMuted"
  />
</template>

<style scoped>

</style>
