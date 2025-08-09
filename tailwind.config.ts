import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2d39f1',
        dark: '#0b0b0f',
      },
      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui'],
        body: ['var(--font-body)', 'system-ui', '-apple-system'],
      },
      animation: {
        'fade-in': 'fade 0.6s ease-out both',
      },
      keyframes: {
        fade: {
          'from': { 
            opacity: '0', 
            transform: 'translateY(10px)' 
          },
          'to': { 
            opacity: '1', 
            transform: 'none' 
          },
        },
      },
    },
  },
  plugins: [],
}
export default config
