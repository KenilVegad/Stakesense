
import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['PT Sans', 'sans-serif'],
        headline: ['PT Sans', 'sans-serif'],
        code: ['monospace'],
      },
      colors: {
        background: '#E0E0E0',
        foreground: '#003366',
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#003366',
        },
        popover: {
          DEFAULT: '#FFFFFF',
          foreground: '#003366',
        },
        primary: {
          DEFAULT: '#003366',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#B8860B',
          foreground: '#003366',
        },
        muted: {
          DEFAULT: '#F5F5F5',
          foreground: '#666666',
        },
        accent: {
          DEFAULT: '#B8860B',
          foreground: '#FFFFFF',
        },
        destructive: {
          DEFAULT: '#b91c1c',
          foreground: '#FFFFFF',
        },
        border: '#CCCCCC',
        input: '#FFFFFF',
        ring: '#B8860B',
        positive: '#16a34a',
        negative: '#b91c1c',
        neutral: '#2563eb',
        sidebar: {
          DEFAULT: '#FFFFFF',
          foreground: '#003366',
          primary: '#003366',
          'primary-foreground': '#FFFFFF',
          accent: '#B8860B',
          'accent-foreground': '#FFFFFF',
          border: '#CCCCCC',
          ring: '#B8860B',
        },
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
