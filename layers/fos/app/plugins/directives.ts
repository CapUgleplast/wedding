import { vPhoneMask } from '../directives/phoneMask'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('phone-mask', vPhoneMask)
})
