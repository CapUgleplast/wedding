import { defineStore } from 'pinia'
import type { ColorsFos } from '../../../../app/types/colors'
import { useFos } from '../composables/useFos'
import { useColors } from '../../../../app/composables/useColors'
import type { FosData } from '../types/fos'

export const useFosStore = defineStore('fos', () => {
  const fos = ref<FosData | null>(null)
  const colors = ref<ColorsFos>({})

  const getFosDefaultData = async (slug: string) => {
    if (fos.value) return fos.value

    const { data } = await useFos(slug)

    fos.value = data.value || {}

    const cssVarsValue = processColors(fos.value.colors || {})

    colors.value = cssVarsValue

    return data.value
  }

  const processColors = (colors: ColorsFos) => {
    const { getCssVars } = useColors(colors)

    return getCssVars()
  }

  return {
    getFosDefaultData,
    colors,
    processColors,
  }
})
