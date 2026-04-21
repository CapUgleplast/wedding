import { joinURL } from 'ufo'

import { defineProvider } from '@nuxt/image/runtime'

export default defineProvider({
  getImage(src,
    { modifiers = {}, baseURL }) {
    const operations: string[] = []

    if (modifiers.width || modifiers.height) {
      operations.push(`resize:fit:${modifiers.width || ''}:${modifiers.height || ''}`)
    }

    if (modifiers.quality) {
      operations.push(`quality:${modifiers.quality}`)
    }

    if (modifiers.rotate) {
      operations.push(`rotate:${modifiers.rotate}`)
    }

    // Добавляем поддержку формата
    if (modifiers.format) {
      operations.push(`format:${modifiers.format}`)
    }

    /* const imgproxyPath = operations.length
        ? `/insecure/${operations.join('/')}/plain/${src}`
        : `/insecure/plain/${src}` */

    const imgproxyPath = src

    return {
      url: joinURL(baseURL, imgproxyPath),
    }
  },
})
