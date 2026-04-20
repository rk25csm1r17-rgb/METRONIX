// ============================================================
//  Metronix — Smart Urban Life Assistant
//  frontend/tailwind.config.js
//  Author: Ravi Kumar | Roll No: 25CSM1R17
// ============================================================

import defaultTheme from 'tailwindcss/defaultTheme';
import colors       from 'tailwindcss/colors';
import plugin       from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  // ── Content Paths ─────────────────────────────────────────
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './src/**/*.css',
  ],

  // ── Dark Mode ─────────────────────────────────────────────
  darkMode: ['attribute', '[data-theme="dark"]'],

  // ── Theme ─────────────────────────────────────────────────
  theme: {
    extend: {
      // ── Color Palette ──────────────────────────────────────
      colors: {
        // Brand
        brand: {
          50:   '#eff6ff',
          100:  '#dbeafe',
          200:  '#bfdbfe',
          300:  '#93c5fd',
          400:  '#60a5fa',
          500:  '#3b82f6',
          600:  '#2563eb',
          700:  '#1d4ed8',
          800:  '#1e40af',
          900:  '#1e3a8a',
          950:  '#172554',
          DEFAULT: '#0f62fe',
        },

        // Metronix custom palette
        metro: {
          'bg-dark':      '#070b12',
          'surface-dark': '#141b27',
          'border-dark':  'rgba(255,255,255,0.07)',
          'accent-cyan':  '#06b6d4',
          'accent-indigo':'#6366f1',
        },

        // AQI Level Colors
        aqi: {
          good:       '#00e400',
          moderate:   '#ffff00',
          sensitive:  '#ff7e00',
          unhealthy:  '#ff0000',
          'very-unhealthy': '#8f3f97',
          hazardous:  '#7e0023',
        },

        // Traffic Level Colors
        traffic: {
          free:     '#10b981',
          light:    '#84cc16',
          moderate: '#f59e0b',
          heavy:    '#f97316',
          jammed:   '#ef4444',
        },

        // Safety Score Colors
        safety: {
          'very-safe': '#10b981',
          safe:        '#84cc16',
          moderate:    '#f59e0b',
          caution:     '#f97316',
          unsafe:      '#ef4444',
        },
      },

      // ── Typography ─────────────────────────────────────────
      fontFamily: {
        display: ['"Syne"', ...defaultTheme.fontFamily.sans],
        body:    ['"DM Sans"', ...defaultTheme.fontFamily.sans],
        mono:    ['"Space Mono"', ...defaultTheme.fontFamily.mono],
        sans:    ['"DM Sans"', ...defaultTheme.fontFamily.sans],
      },

      fontSize: {
        '2xs': ['0.625rem',  { lineHeight: '0.875rem' }],
        xs:    ['0.75rem',   { lineHeight: '1rem' }],
        sm:    ['0.8125rem', { lineHeight: '1.25rem' }],
        base:  ['0.9375rem', { lineHeight: '1.5rem' }],
        lg:    ['1.0625rem', { lineHeight: '1.625rem' }],
        xl:    ['1.1875rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.4375rem', { lineHeight: '2rem' }],
        '3xl': ['1.8125rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem',   { lineHeight: '2.5rem' }],
        '5xl': ['3rem',      { lineHeight: '3.25rem' }],
        '6xl': ['3.75rem',   { lineHeight: '1' }],
      },

      letterSpacing: {
        tighter: '-0.04em',
        tight:   '-0.02em',
        normal:   '0',
        wide:     '0.04em',
        wider:    '0.08em',
        widest:   '0.12em',
      },

      // ── Spacing ────────────────────────────────────────────
      spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '13':  '3.25rem',
        '15':  '3.75rem',
        '17':  '4.25rem',
        '18':  '4.5rem',
        '22':  '5.5rem',
        '26':  '6.5rem',
        '30':  '7.5rem',
        '34':  '8.5rem',
        '38':  '9.5rem',
        '42':  '10.5rem',
        '46':  '11.5rem',
        '50':  '12.5rem',
        '72':  '18rem',
        '84':  '21rem',
        '96':  '24rem',
        '128': '32rem',
      },

      // ── Border Radius ──────────────────────────────────────
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },

      // ── Box Shadow ─────────────────────────────────────────
      boxShadow: {
        'sm':    '0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04)',
        'md':    '0 4px 12px rgba(0,0,0,.08), 0 2px 4px rgba(0,0,0,.04)',
        'lg':    '0 10px 30px rgba(0,0,0,.10), 0 4px 8px rgba(0,0,0,.05)',
        'xl':    '0 20px 60px rgba(0,0,0,.12), 0 8px 20px rgba(0,0,0,.06)',
        '2xl':   '0 40px 100px rgba(0,0,0,.15)',
        'brand': '0 8px 24px rgba(15, 98, 254, 0.25)',
        'brand-lg': '0 16px 48px rgba(15, 98, 254, 0.35)',
        'glow-primary': '0 0 20px rgba(15, 98, 254, 0.4)',
        'glow-success': '0 0 20px rgba(16, 185, 129, 0.4)',
        'glow-danger':  '0 0 20px rgba(239, 68, 68, 0.4)',
        'glow-warning': '0 0 20px rgba(245, 158, 11, 0.4)',
        'card':  '0 2px 8px rgba(0,0,0,.06), inset 0 1px 0 rgba(255,255,255,.06)',
        'card-hover': '0 8px 24px rgba(0,0,0,.12)',
        'inner-top': 'inset 0 1px 0 rgba(255,255,255,.08)',
        'inner-bottom': 'inset 0 -1px 0 rgba(0,0,0,.08)',
        'none':  'none',
      },

      // ── Background Images / Gradients ──────────────────────
      backgroundImage: {
        'gradient-brand':    'linear-gradient(135deg, #0f62fe, #06b6d4)',
        'gradient-brand-v':  'linear-gradient(180deg, #0f62fe, #6366f1)',
        'gradient-success':  'linear-gradient(135deg, #10b981, #34d399)',
        'gradient-danger':   'linear-gradient(135deg, #ef4444, #f97316)',
        'gradient-dark':     'linear-gradient(180deg, #0d1117, #141b27)',
        'gradient-card':     'linear-gradient(145deg, rgba(255,255,255,.04), rgba(255,255,255,.01))',
        'gradient-noise':    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        'mesh-pattern':      'radial-gradient(at 40% 20%, hsla(214,100%,56%,0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,56%,0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(355,100%,56%,0.05) 0px, transparent 50%)',
        'dot-pattern':       'radial-gradient(circle, rgba(255,255,255,.08) 1px, transparent 1px)',
        'grid-pattern':      'linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,.04) 1px, transparent 1px)',
      },

      // ── Backdrop Blur ──────────────────────────────────────
      backdropBlur: {
        xs:   '2px',
        sm:   '8px',
        md:   '16px',
        lg:   '24px',
        xl:   '40px',
        '2xl':'60px',
      },

      // ── Screen Breakpoints ─────────────────────────────────
      screens: {
        xs:   '480px',
        sm:   '640px',
        md:   '768px',
        lg:   '1024px',
        xl:   '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
        // Container max widths
        'max-xs':   { max: '479px' },
        'max-sm':   { max: '639px' },
        'max-md':   { max: '767px' },
        'max-lg':   { max: '1023px' },
      },

      // ── Animations ─────────────────────────────────────────
      animation: {
        'fade-in':       'fadeIn 0.4s ease forwards',
        'fade-out':      'fadeOut 0.3s ease forwards',
        'slide-up':      'slideUp 0.4s cubic-bezier(0.22,1,0.36,1) forwards',
        'slide-down':    'slideDown 0.4s cubic-bezier(0.22,1,0.36,1) forwards',
        'slide-left':    'slideLeft 0.4s ease forwards',
        'slide-right':   'slideRight 0.4s ease forwards',
        'scale-in':      'scaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'spin-slow':     'spin 3s linear infinite',
        'pulse-slow':    'pulse 3s ease-in-out infinite',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'status-pulse':  'statusPulse 2s ease infinite',
        'glow':          'glow 3s ease-in-out infinite alternate',
        'shimmer':       'shimmer 2s linear infinite',
        'count-up':      'countUp 0.5s ease forwards',
        'float':         'float 6s ease-in-out infinite',
        'marquee':       'marquee 20s linear infinite',
      },

      // ── Keyframes ──────────────────────────────────────────
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeOut: {
          from: { opacity: '1' },
          to:   { opacity: '0' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          from: { opacity: '0', transform: 'translateX(20px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          from: { opacity: '0', transform: 'translateX(-20px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.88)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        statusPulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':      { opacity: '0.5', transform: 'scale(0.85)' },
        },
        glow: {
          from: { boxShadow: '0 0 10px rgba(15,98,254,0.3)' },
          to:   { boxShadow: '0 0 30px rgba(15,98,254,0.6)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        countUp: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%':      { transform: 'translateY(-12px) rotate(1deg)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },

      // ── Transition ─────────────────────────────────────────
      transitionTimingFunction: {
        'spring':      'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'out-expo':    'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
        'ui':          'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      transitionDuration: {
        '50':   '50ms',
        '150':  '150ms',
        '250':  '250ms',
        '350':  '350ms',
        '400':  '400ms',
        '600':  '600ms',
        '800':  '800ms',
        '1000': '1000ms',
        '1500': '1500ms',
        '2000': '2000ms',
      },

      // ── Z-Index ────────────────────────────────────────────
      zIndex: {
        '-1':     '-1',
        '0':      '0',
        '10':     '10',
        '20':     '20',
        '30':     '30',
        '40':     '40',
        '50':     '50',
        dropdown: '100',
        sticky:   '200',
        modal:    '300',
        toast:    '400',
        tooltip:  '500',
        max:      '9999',
      },

      // ── Aspect Ratios ──────────────────────────────────────
      aspectRatio: {
        '4/3':  '4 / 3',
        '3/2':  '3 / 2',
        '2/3':  '2 / 3',
        '9/16': '9 / 16',
        '21/9': '21 / 9',
        'map':  '16 / 9',
        'card': '4 / 3',
      },

      // ── Min/Max Dimensions ─────────────────────────────────
      minHeight: {
        '10':   '2.5rem',
        '12':   '3rem',
        '16':   '4rem',
        'screen-75': '75vh',
      },
      maxWidth: {
        '8xl':  '88rem',
        '9xl':  '96rem',
        '10xl': '120rem',
      },
    },
  },

  // ── Plugins ───────────────────────────────────────────────
  plugins: [
    // ── Custom component utilities ───────────────────────────
    plugin(({ addComponents, addUtilities, theme, addBase }) => {
      // Base styles
      addBase({
        '*, *::before, *::after': { boxSizing: 'border-box' },
        ':root': {
          '--sidebar-width':     '240px',
          '--navbar-height':     '64px',
          '--sidebar-collapsed': '72px',
        },
      });

      // Custom components
      addComponents({
        '.card': {
          background:   theme('colors.white'),
          border:       `1px solid ${theme('colors.gray.100')}`,
          borderRadius: theme('borderRadius.xl'),
          padding:      theme('spacing.6'),
          boxShadow:    theme('boxShadow.sm'),
        },
        '.card-dark': {
          background:   '#141b27',
          border:       '1px solid rgba(255,255,255,0.07)',
          borderRadius: theme('borderRadius.xl'),
          padding:      theme('spacing.6'),
          boxShadow:    '0 4px 12px rgba(0,0,0,0.4)',
        },
        '.btn-metro': {
          display:        'inline-flex',
          alignItems:     'center',
          gap:            theme('spacing.2'),
          padding:        `${theme('spacing.2')} ${theme('spacing.4')}`,
          borderRadius:   theme('borderRadius.lg'),
          fontWeight:     '500',
          fontSize:       theme('fontSize.sm[0]'),
          transition:     'all 150ms ease',
          cursor:         'pointer',
          border:         'none',
        },
        '.badge-metro': {
          display:        'inline-flex',
          alignItems:     'center',
          padding:        '2px 10px',
          borderRadius:   '9999px',
          fontSize:       '0.75rem',
          fontWeight:     '600',
          letterSpacing:  '0.03em',
          textTransform:  'uppercase',
          fontFamily:     theme('fontFamily.mono').join(', '),
        },
        '.input-metro': {
          width:          '100%',
          padding:        '10px 14px',
          background:     'var(--surface-2)',
          border:         '1px solid var(--border)',
          borderRadius:   theme('borderRadius.lg'),
          color:          'var(--text-primary)',
          fontSize:       theme('fontSize.sm[0]'),
          outline:        'none',
          transition:     'all 150ms ease',
        },
        '.glass': {
          background:        'rgba(255,255,255,0.04)',
          backdropFilter:    'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border:            '1px solid rgba(255,255,255,0.1)',
          borderRadius:      theme('borderRadius.xl'),
        },
        '.gradient-text': {
          background:              'linear-gradient(135deg, #0f62fe, #06b6d4)',
          WebkitBackgroundClip:    'text',
          WebkitTextFillColor:     'transparent',
          backgroundClip:          'text',
        },
      });

      // Custom utilities
      addUtilities({
        '.text-balance': { textWrap: 'balance' },
        '.text-pretty':  { textWrap: 'pretty' },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width':    'none',
          '&::-webkit-scrollbar': { display: 'none' },
        },
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          '&::-webkit-scrollbar':       { width: '6px', height: '6px' },
          '&::-webkit-scrollbar-track': { background: 'transparent' },
          '&::-webkit-scrollbar-thumb': {
            background:   'rgba(255,255,255,0.15)',
            borderRadius: '3px',
          },
        },
        '.will-change-transform': { willChange: 'transform' },
        '.will-change-opacity':   { willChange: 'opacity' },
        '.perspective-1000': { perspective: '1000px' },
        '.backface-hidden':  { backfaceVisibility: 'hidden' },
        '.transform-3d':     { transformStyle: 'preserve-3d' },
        '.tap-highlight-none': { WebkitTapHighlightColor: 'transparent' },
        '.user-select-none': { userSelect: 'none' },
        '.pointer-events-none': { pointerEvents: 'none' },
        '.pointer-events-auto': { pointerEvents: 'auto' },
      });
    }),
  ],
};
