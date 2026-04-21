import type { CarouselApi } from '~/components/ui/carousel'
import type { AutoplayType } from 'embla-carousel-autoplay'

export const useGalleryAutoplay = (
  isAutoplay: boolean = true,
  AUTOPLAY_STOP_DELAY: number = 5000,
) => {
  let AUTOPLAY_DELAY = 0
  const ANIM_PROGRESS_TIMEOUT = 200

  const progress = ref(0)
  const duration = ref(0)
  const totalSlides = ref(0)
  const currentSlide = ref(0)
  const autoplayStopTimeout = ref<NodeJS.Timeout | 0>(0)

  const api = ref<CarouselApi>()
  const autoplay = ref<AutoplayType | undefined>()

  async function setApi(val: CarouselApi) {
    api.value = val
  }

  const startProgress = (timeUntilNext: number | null) => {
    if (timeUntilNext == null) return

    setProgress(100, timeUntilNext - ANIM_PROGRESS_TIMEOUT, ANIM_PROGRESS_TIMEOUT)
  }

  const resetProgress = () => {
    setProgress(0, 0)
  }

  const setProgress = (progressVal: number, durationVal: number, timeout: boolean | number = false) => {
    const setValues = () => {
      duration.value = durationVal
      progress.value = progressVal
    }

    if (timeout) {
      const timeoutId = setTimeout(() => {
        setValues()
        clearTimeout(timeoutId)
      }, +timeout)
    }
    else {
      setValues()
    }
  }

  const onManualClick = () => {
    autoplay.value?.stop()
    setProgress(100, 0, ANIM_PROGRESS_TIMEOUT)
    currentSlide.value = (api.value?.selectedScrollSnap() ?? 0)
    autoplayReinit()
  }

  const autoplayReinit = () => {
    if (autoplayStopTimeout.value) {
      clearTimeout(autoplayStopTimeout.value)
      autoplayStopTimeout.value = 0
    }

    autoplayStopTimeout.value = setTimeout(() => {
      autoplay.value?.play()
    }, AUTOPLAY_STOP_DELAY)
  }

  watch(currentSlide, (val) => {
    api.value?.scrollTo(val)
  })

  watch(api, async () => {
    if (!api.value) return

    if (isAutoplay) {
      autoplay.value = api.value?.plugins()?.autoplay
      AUTOPLAY_DELAY = autoplay.value?.timeUntilNext() ?? 0
    }

    const timeout = setTimeout(() => {
      totalSlides.value = api.value?.scrollSnapList()?.length || 1
      clearTimeout(timeout)
    }, 1)
    currentSlide.value = api.value?.selectedScrollSnap()

    api.value
      .on('init', () => {
        resetProgress()
        startProgress(AUTOPLAY_DELAY)
      })
      .on('autoplay:timerset', () => {
        startProgress(AUTOPLAY_DELAY)
      })
      .on('autoplay:select', () => {
        resetProgress()
        currentSlide.value = (api.value?.selectedScrollSnap() ?? 0)
      })
      .on('autoplay:stop', () => {
        resetProgress()
      })
      .on('select', () => {
        currentSlide.value = (api.value?.selectedScrollSnap() ?? 0)

        if (autoplay.value?.isPlaying()) {
          onManualClick()
        }
      })
      .on('destroy', () => {
        api.value?.destroy()
      })
  })

  return {
    api,
    setApi,
    onManualClick,
    progress,
    duration,
    totalSlides,
    currentSlide,
    AUTOPLAY_DELAY,
  }
}
