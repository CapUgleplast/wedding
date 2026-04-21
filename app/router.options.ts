import type { RouterConfig } from '@nuxt/schema'

export default {
  scrollBehavior(to, from, savedPosition) {
    // Удалили hash → не трогаем скролл
    if ((from.hash && !to.hash) || !!Object.values(from.query).length || !!Object.values(to.query).length) {
      return false
    }

    // Есть hash → скроллим к якорю
    if (to.hash) {
      const offset = 70 // px

      return new Promise((resolve) => {
        // Ждём, пока элемент появится в DOM (важно для SSR)
        setTimeout(() => {
          const el = document.querySelector(to.hash)
          if (el) {
            const y = el.getBoundingClientRect().top + window.pageYOffset - offset

            resolve({
              top: y,
              behavior: 'smooth',
            })
          }
          else {
            resolve({ top: 0 })
          }
        }, 0)
      })
    }

    if (savedPosition) {
      return savedPosition
    }

    return { top: 0 }
  },
} satisfies RouterConfig
