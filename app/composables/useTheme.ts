export const useTheme = (val: 'dark' | 'light') => {
  const section = ref<HTMLElement | null>(null)

  const { onColorChange } = useThemeColor()

  /**
   * Позиция скролла
   */
  const scrollY = ref(0)

  /**
   * Обновляет позицию скролла
   */
  const updateScrollPosition = () => (scrollY.value = window.scrollY)

  /**
   * Определяет направление скролла
   */
  const getScrollDirection = () =>
    scrollY.value <= window.scrollY ? 'top' : 'bottom'

  const onScrollBottomHandler = () => {
    const component = section.value?.$el || section.value

    if (!component || component.nodeName == '#comment') return false
    return (
      component?.getBoundingClientRect()?.bottom
      <= component?.getBoundingClientRect()?.height
      && component?.getBoundingClientRect()?.bottom >= 100
    )
  }

  const onScrollTopHandler = () => {
    const component: HTMLElement = section.value?.$el || section.value

    if (!component || component.nodeName == '#comment') return false

    return (
      component?.getBoundingClientRect()?.top <= 150
      && component?.getBoundingClientRect()?.top
      >= -component?.getBoundingClientRect()?.height + 50
    )
  }

  /**
   * Определяет появился ли блок в области хедера
   */
  const reachBlock = (): boolean => {
    const direction = getScrollDirection()
    updateScrollPosition()
    return direction === 'top' ? onScrollTopHandler() : onScrollBottomHandler()
  }

  /**
   * Меняет цвет хедера
   */
  const onScrollCallback = useThrottleFn(() => {
    if (reachBlock()) {
      onColorChange(val)
    }
  }, 20)

  onMounted(async () => {
    await onScrollCallback()
    window.addEventListener('scroll', onScrollCallback)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScrollCallback)
  })

  return {
    section,
  }
}
