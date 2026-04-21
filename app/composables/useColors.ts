export function useColors<T extends object>(
  colors?: T,
) {
  const cssVars = ref<T>()
  // const varsList = ref<Record<string, string>>()

  /* const getVarsList = () => {
    const vars: Record<string, string> = {}

    if (!colors) return vars

    const walk = (obj: Record<string, unknown>, path: string[] = []) => {
      Object.entries(obj).forEach(([key, value]) => {
        const nextPath = [...path, key]

        if (typeof value === 'string') {
          const varName = `--${nextPath.join('-')}`
          vars[varName] = `var(--${value})`
          return
        }

        if (value && typeof value === 'object') {
          walk(value as Record<string, unknown>, nextPath)
        }
      })
    }

    walk(colors as Record<string, unknown>)

    varsList.value = vars

    return vars
    } */

  const getCssVars = (): T => {
    if (!colors) return {} as T

    const transform = (
      obj: Record<string, unknown>,
      path: string[] = [],
    ): Record<string, unknown> => {
      const result: Record<string, unknown> = {}

      Object.entries(obj).forEach(([key, value]) => {
        const nextPath = [...path, key]

        if (typeof value === 'string') {
          result[key] = `var(--${value})`
        }
        else if (value && typeof value === 'object' && !Array.isArray(value)) {
          result[key] = transform(value as Record<string, unknown>, nextPath)
        }
      })

      return result
    }

    const transformed = transform(colors as Record<string, unknown>) as T
    cssVars.value = transformed

    return transformed
  }

  return { /* getVarsList, */ getCssVars, cssVars }
}
