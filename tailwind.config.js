const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        orange: {
          DEFAULT: 'hsl(var(--orange))',
          foreground: 'hsl(var(--orange-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        badge: {
          green: 'hsl(var(--badge-green))',
          greenForeground: 'hsl(var(--badge-green-foreground))',
          amber: 'hsl(var(--badge-amber))',
          amberForeground: 'hsl(var(--badge-amber-foreground))',
          gray: 'hsl(var(--badge-gray))',
          grayForeground: 'hsl(var(--badge-gray-foreground))',
        },
        state: {
          success: {
            DEFAULT: 'hsl(var(--state-success))',
            foreground: 'hsl(var(--state-success-foreground))',
          },
          warning: {
            DEFAULT: 'hsl(var(--state-warning))',
            foreground: 'hsl(var(--state-warning-foreground))',
          },
          error: {
            DEFAULT: 'hsl(var(--state-error))',
            foreground: 'hsl(var(--state-error-foreground))',
          },
          information: {
            DEFAULT: 'hsl(var(--state-information))',
            foreground: 'hsl(var(--state-information-foreground))',
          },
          away: {
            DEFAULT: 'hsl(var(--state-away))',
            foreground: 'hsl(var(--state-away-foreground))',
          },
          feature: {
            DEFAULT: 'hsl(var(--state-feature))',
            foreground: 'hsl(var(--state-feature-foreground))',
          },
          neutral: {
            DEFAULT: 'hsl(var(--state-neutral))',
            foreground: 'hsl(var(--state-neutral-foreground))',
          },
          verified: {
            DEFAULT: 'hsl(var(--state-verified))',
            foreground: 'hsl(var(--state-verified-foreground))',
          },
        },
        
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        mono: ['var(--font-geist-mono)', ...fontFamily.sans],
        sans: ['var(--font-geist-sans)', ...fontFamily.sans],
        heading: ['var(--font-heading)', ...fontFamily.sans],
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
