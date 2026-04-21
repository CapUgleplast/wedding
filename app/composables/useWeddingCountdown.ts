import { computed, onMounted, onUnmounted, ref } from 'vue'

export interface WeddingCountdownState {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function toState(diffMs: number): WeddingCountdownState {
  const clamped = Math.max(0, diffMs)
  const totalSeconds = Math.floor(clamped / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return { days, hours, minutes, seconds }
}

export function useWeddingCountdown(target: Date) {
  const now = ref<number>(Date.now())
  let timer: ReturnType<typeof setInterval> | null = null

  const diffMs = computed(() => target.getTime() - now.value)
  const state = computed(() => toState(diffMs.value))

  onMounted(() => {
    now.value = Date.now()
    timer = setInterval(() => {
      now.value = Date.now()
    }, 1000)
  })

  onUnmounted(() => {
    if (timer)
      clearInterval(timer)
  })

  return {
    state,
    isEnded: computed(() => diffMs.value <= 0),
  }
}

