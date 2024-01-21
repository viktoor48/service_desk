import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFFFFF',
      black: '#000000',
      red: {
        DEFAULT: '#B8282B',
        dark: '#952023',
      },
      gray: {
        DEFAULT: '#E4E4E4',
        light: '#F7F7F7',
      },
      error: '#B8282B',
      success: '#6FAB22',
      warning: '#FFA800',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      title: ['Unbounded', 'sans-serif'],
    },
    extend: {
      gridTemplateColumns: {
        header: '1fr auto 1fr',
      },
    },
  },
}
