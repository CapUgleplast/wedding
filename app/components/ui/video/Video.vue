<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { Picture } from '~/components/ui/image/Picture'
import type { VideoData } from '~/components/ui/video/types'

interface Props {
  video: VideoData
  videoClass?: HTMLAttributes['class']
  autoplay?: boolean
  loop?: boolean
  preload?: string
  muted?: boolean
  prewiew?: boolean
  playsinline?: boolean
  controls?: boolean
  mode?: 'inline' | 'window'
  cover?: unknown
  preloadImg?: Picture
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'inline',
  prewiew: false,
  controls: true,
})

const videoRef = ref<HTMLVideoElement | null>(null)
const isPlaying = ref(false)
const videoDuration = ref()

if (props.autoplay) {
  isPlaying.value = true
}

const playVideo = () => {
  if (props.mode === 'window') return
  videoRef.value?.play()
}

const handleLoadedMetadata = () => {
  videoDuration.value = videoRef?.value?.duration
}

onMounted(() => {
  videoDuration.value = videoRef?.value?.duration
})

const formattedDuration = computed(() => {
  if (!videoDuration.value) return '0:00'

  const minutes = Math.floor(videoDuration.value / 60)
  const seconds = Math.floor(videoDuration.value % 60)

  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds

  return `${minutes}:${formattedSeconds}`
})
</script>

<template>
  <div class="relative">
    <video
      v-if="!prewiew || !preloadImg"
      ref="videoRef"
      :autoplay="autoplay"
      :muted="muted"
      :loop="loop"
      :playsinline="playsinline"
      :preload="preload"
      :controls="controls && isPlaying"
      class="size-full "
      :class="videoClass"
      :src="`${video?.url}#t=0.001`"
      @loadedmetadata="handleLoadedMetadata"
      @playing="isPlaying = true"
    >
      Извините, Ваш браузер не поддерживает видео
    </video>
    <Image
      v-else
      class="size-full select-none object-cover"
      :src="preloadImg"
    />
    <div
      v-if="!isPlaying"
      class="absolute left-0 top-0 flex size-full items-center justify-center backdrop-brightness-[0.85]"
      @click="playVideo"
    >
      <div
        class="hover:scale-110 transition-transform"
        :class="[
          'flex h-[40px] items-center justify-center',
          'cursor-pointer rounded-sm bg-secondary py-3 px-4',
        ]"
      >
        <div class="mb-[2px] pl-[1px] flex items-center text-sm gap-1 font-medium">
          Смотреть {{ formattedDuration }}
          <Icon
            class="text-foreground size-full"
            name="icons:play"
          />
        </div>
      </div>
    </div>
  </div>
</template>
