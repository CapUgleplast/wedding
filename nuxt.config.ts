// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@vueuse/nuxt',
    'motion-v/nuxt',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxtjs/device',
    'vue-yandex-maps/nuxt',
    // 'nuxt-umami', //Включить и настроить, после запуска на прод
    'shadcn-nuxt',
    '@pinia/nuxt',
  ],

  components: [
    {
      path: '~/components/shared/block',
      pathPrefix: false,
      prefix: 'SharedBlock',
      extensions: ['.vue'],
    },
    {
      path: '~/components/shared/element',
      pathPrefix: false,
      prefix: 'SharedElement',
      extensions: ['.vue'],
    },
    {
      path: '~/components/shared/animated',
      pathPrefix: false,
      prefix: 'SharedAnimated',
      extensions: ['.vue'],
    },
    '~/components',
  ],

  devtools: {
    enabled: true,
  },

  app: {
    head: {
      link: [{ rel: 'icon', id: 'favicon', type: 'image/x-icon', href: '/favicon.svg' }],
    },
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      strapiUrl: process.env.NUXT_STRAPI_URL || 'http://127.0.0.1:1337/api',
      imageUrl: process.env.NUXT_STRAPI_IMAGE_URL || 'http://127.0.0.1:1337',
    },
  },

  compatibilityDate: '2025-01-15',

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  fonts: {
    families: [
      { name: 'Norms', src: '/fonts/TT Norms Pro Trial Expanded Medium.ttf', weight: 500, global: true },
      { name: 'Norms', src: '/fonts/TT Norms Pro Trial Expanded Normal.ttf', weight: 400, global: true },
    ],
    defaults: {
      weights: [500, 400],
    },
  },

  icon: {
    customCollections: [
      {
        prefix: 'icons',
        dir: './app/assets/icons',
      },
    ],
  },

  image: {
    provider: 'none',
    providers: {
      strapi: {
        name: 'strapi',
        provider: './app/providers/img-proxy.ts',
        options: {
          baseURL: process.env.NUXT_STRAPI_IMAGE_URL,
        },
      },
      none: {
        name: 'none',
        provider: './app/providers/img-proxy.ts',
      },
    },
  },

  shadcn: {
    prefix: '',
    componentDir: './app/components/ui',
  },

  yandexMaps: {
    apikey: 'fa877110-09bd-449b-9c85-81f0d87b64e3',
  },
})
