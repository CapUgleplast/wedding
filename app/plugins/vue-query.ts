import { VueQueryPlugin, QueryClient, dehydrate, hydrate } from '@tanstack/vue-query'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin({
  name: 'vue-query',
  enforce: 'pre',
  setup: (nuxtApp) => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: 1,
          refetchOnWindowFocus: false,
          staleTime: 1000 * 60 * 2, // 2 минуты
        },
      },
    })

    nuxtApp.vueApp.use(VueQueryPlugin, { queryClient })

    // SSR → клиент
    if (import.meta.server) {
      nuxtApp.hooks.hook('app:rendered', () => {
        nuxtApp.payload.vueQueryState = dehydrate(queryClient)
      })
    }
    if (import.meta.client) {
    // TypeScript fix: provide window property type
      hydrate(queryClient, (window as Window & typeof globalThis).__VUE_QUERY_STATE__)
    }
  },
})
