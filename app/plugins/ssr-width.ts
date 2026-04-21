import { provideSSRWidth } from '@vueuse/core'

export default defineNuxtPlugin((nuxtApp) => {
  const event = nuxtApp.ssrContext?.event
  const ua = event?.node?.req?.headers['user-agent'] || ''

  const isMobile = /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(ua)

  provideSSRWidth(isMobile ? 768 : 1920, nuxtApp.vueApp)
})
