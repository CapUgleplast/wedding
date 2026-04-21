import { breakpointsTailwind } from '@vueuse/core'

/**
 * SSR-friendly breakpoints
 * Позволяет адаптироваться под разные экраны на этапе рендера на сервере,
 * предотвращая скачки верстки при гидрации в большинстве случаев.
 */
export const useScreenSize = () => {
  const { isDesktop, isTablet } = useDevice()

  const { lg, md, sm } = breakpointsTailwind

  const { smaller, between, greaterOrEqual } = useBreakpoints(breakpointsTailwind, {
    ssrWidth: isDesktop ? lg : (isTablet ? md : sm),
  })

  const isLargeScreen = greaterOrEqual('lg')
  const isMediumScreen = between('md', 'lg')
  const isSmallScreen = smaller('md')

  return {
    isLargeScreen,
    isMediumScreen,
    isSmallScreen,
  }
}
