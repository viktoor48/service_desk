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
      blue: {
        DEFAULT: '#3274d6',
        dark: '#2557a1',
      },
      error: '#B8282B',
      success: '#6FAB22',
      warning: '#FFA800',
    },
    fontFamily: {
      montserrat: ['Montserrat', 'sans-serif'],
    },
    fontSize: {
      'xxs': ['0.875rem', '1rem'],
      'xs': ['0.75rem', '1.125rem'],
      'sm': ['0.8rem', '1rem'],
      'base': ['1rem', '1.5rem'],
      'lg': ['1.125rem', '1.75rem'],
      'xl': ['1.25rem', '2.125rem'],
      '2xl': ['1.5rem', '2rem'],
      '3xl': ['1.75rem', '2.25rem'],
      'title': ['3rem', '3.75rem'],
      'title-2xl': ['5.25rem', '6.5rem'],
      'title-xl': ['4rem', '5rem'],
      'title-md': ['2.25rem', '2.75rem'],
      'title-sm': ['1.5rem', '1.875rem'],
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1408px',
      '3xl': '1536px',
      '4xl': '1664px',
      '5xl': '1792px',
    },
    extend: {
      gridTemplateColumns: {
        header: '1fr auto 1fr',
      },
    },
  },
}
