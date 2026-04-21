import type { ColorsSocials } from '~/types/colors'

export const useSocialColorsState = () => {
  const colors = useState<ColorsSocials | undefined>('socialsColorsVars')

  const setColors = (cssVars: ColorsSocials) => {
    colors.value = cssVars
  }

  return {
    colors,
    setColors,
  }
}
