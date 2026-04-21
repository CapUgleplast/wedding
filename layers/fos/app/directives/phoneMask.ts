import { MaskInput } from 'maska'
import type { Directive, DirectiveBinding } from 'vue'

interface PhoneMaskOptions {
  countryCode?: string
  mask?: string
}

export const vPhoneMask: Directive = {
  mounted(el: HTMLInputElement, binding: DirectiveBinding<PhoneMaskOptions>) {
    const options = binding.value || {}
    const COUNTRY_CODE = options.countryCode || '+7'
    const MASK = options.mask || '### ### ## ##'

    const maskOptions = {
      mask: `${COUNTRY_CODE} ${MASK}`,
      preProcess: (value: string): string => {
        const digits = value.replace(/\D/g, '')
        if (digits.startsWith('8342') || digits.startsWith('7342')) {
          return `${COUNTRY_CODE}342${digits.slice(4)}`
        }
        const firstChar = value.charAt(0)
        const processMap: Record<string, string> = {
          8: COUNTRY_CODE,
          7: COUNTRY_CODE,
          9: `${COUNTRY_CODE}${value}`,
          3: `${COUNTRY_CODE}${value}`,
        }
        return processMap[firstChar] || value
      },
    }

    new MaskInput(el, maskOptions)
  },
}
