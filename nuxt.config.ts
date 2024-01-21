// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
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
        wght: [400, 600],
      },
      Unbounded: {
        wght: [700],
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
})
