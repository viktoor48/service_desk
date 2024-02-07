// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    },
  },
  css: ['vue-final-modal/style.css'],
  modules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-fonts',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@vee-validate/nuxt',
    'nuxt-swiper',
  ],
  googleFonts: {
    families: {
      Inter: {
        wght: [400, 600, 700],
      },
      Unbounded: {
        wght: [400, 600, 700, 800],
      },
      Montserrat: {
        wght: [400, 500, 700],
      },
    },
  },
  eslint: {
    exclude: ['**/node_modules/**', '**/dist/**'],
  },
  vite: {
    plugins: [
      svgLoader({
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  convertColors: {
                    currentColor: true,
                  },
                  removeViewBox: false,
                },
              },
            },
          ],
        },
      }),
    ],
  },
  runtimeConfig: {
    public: {
      host: process.env.HOST || 'localhost',
      port: process.env.PORT || 6002,
      apiURL: process.env.API_URL || '/api',
    },
  },
})
