/**
 * Torafirma Design System v2 — Tailwind Configuration
 * Expanded from Section 21.10 with full token coverage
 * and 12 component family theme extensions.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  theme: {
    extend: {
      /* ─────────────────────────────────────────────────────────────────────
         Colors — Full Torafirma Palette
         Includes root surfaces, steel scale, operational semantics,
         specialty colors, and 12 component family accents.
         ───────────────────────────────────────────────────────────────────── */
      colors: {
        tf: {
          /* Root Surfaces */
          black: '#050608',
          void: '#080B0F',
          charcoal: '#0E1318',
          graphite: '#141A20',
          panel: {
            DEFAULT: '#10161C',
            raised: '#171F27',
            inset: '#090D11',
          },

          /* Steel Scale */
          steel: {
            950: '#0A0E12',
            900: '#1A222A',
            800: '#222C35',
            700: '#2D3A45',
            600: '#40505C',
            500: '#5F6E7A',
            400: '#7C8A95',
            300: '#9BAAB5',
            200: '#BCC8D0',
            100: '#D6E0E6',
          },
          white: '#F4F7F8',

          /* Operational Semantics — Green */
          green: {
            DEFAULT: '#36D47B',
            dim: '#1F7F4D',
            dark: '#0B1A12',
          },

          /* Operational Semantics — Red */
          red: {
            DEFAULT: '#F24B4B',
            dim: '#8F2C2C',
            dark: '#1C0B0B',
            critical: '#B00020',
          },

          /* Operational Semantics — Amber */
          amber: {
            DEFAULT: '#F2B84B',
            dim: '#9E6F24',
            dark: '#1D1608',
          },

          /* Operational Semantics — Orange */
          orange: {
            DEFAULT: '#F07A2A',
            dim: '#984B1A',
            dark: '#1B0D05',
          },

          /* Operational Semantics — Blue */
          blue: {
            DEFAULT: '#4BA3F2',
            dim: '#2D6394',
            dark: '#07111F',
          },

          /* Operational Semantics — Cyan */
          cyan: {
            DEFAULT: '#35D0E3',
            dim: '#1B7783',
            dark: '#041417',
          },

          /* Operational Semantics — Purple */
          purple: {
            DEFAULT: '#A678F2',
            dim: '#5F4A8B',
            dark: '#110B1F',
          },

          /* Operational Semantics — Gold */
          gold: {
            DEFAULT: '#D6A84F',
            dim: '#8A6A30',
            dark: '#1A1407',
          },

          /* Operational Semantics — Slate */
          slate: {
            DEFAULT: '#6E7F8D',
            dim: '#46535D',
            dark: '#10161B',
          },

          /* Specialty Colors (Section 4.1) */
          'black-green': '#07120C',
          'radar-green': '#76FF9F',
          phosphor: '#B8FFCC',
          'blood-red': '#B00020',
          'deep-blue': '#07111F',
          gridline: '#1C2A33',

          /* v2: Component Family Color Accents */
          family: {
            action: {
              accent: '#36D47B',
              'accent-dim': '#1F7F4D',
              bg: '#0B1A12',
            },
            feedback: {
              info: '#4BA3F2',
              success: '#36D47B',
              warning: '#F2B84B',
              error: '#F24B4B',
              critical: '#B00020',
            },
            input: {
              border: '#2D3A45',
              'border-focus': '#4BA3F2',
              bg: '#080B0F',
              'bg-readonly': '#0A0E12',
            },
            nav: {
              border: '#1C2630',
              bg: '#0E1318',
              'bg-hover': '#1A222A',
              accent: '#35D0E3',
            },
            data: {
              border: '#1C2630',
              'header-bg': '#0E1318',
              'row-hover': 'rgba(255, 255, 255, 0.03)',
            },
            overlay: {
              backdrop: 'rgba(0, 0, 0, 0.65)',
              bg: '#0E1318',
              border: '#26323C',
            },
            authority: {
              accent: '#D6A84F',
              'accent-dim': '#8A6A30',
              bg: '#1A1407',
            },
            ai: {
              accent: '#A678F2',
              'accent-dim': '#5F4A8B',
              'accent-soft': '#7C5FBF',
              bg: '#110B1F',
            },
            stream: {
              accent: '#35D0E3',
              'accent-dim': '#1B7783',
              bg: '#041417',
            },
            safety: {
              stop: '#F24B4B',
              'stop-dim': '#8F2C2C',
              'stop-bg': '#1C0B0B',
              armed: '#F2B84B',
              'armed-bg': '#1D1608',
              safe: '#36D47B',
            },
            trace: {
              accent: '#35D0E3',
              'accent-dim': '#1B7783',
              bg: '#041417',
            },
            layout: {
              bg: '#050608',
              panel: '#0E1318',
              'panel-raised': '#141A20',
              border: '#26323C',
            },
          },
        },
      },

      /* ─────────────────────────────────────────────────────────────────────
         Border Radius — Full Torafirma Radius Scale
         ───────────────────────────────────────────────────────────────────── */
      borderRadius: {
        tf: {
          none: '0px',
          xs: '1px',
          sm: '2px',
          DEFAULT: '2px',
          md: '4px',
          lg: '6px',
          xl: '8px',
        },
      },

      /* ─────────────────────────────────────────────────────────────────────
         Font Family — Torafirma Typography Stack
         ───────────────────────────────────────────────────────────────────── */
      fontFamily: {
        tf: ['Inter', 'IBM Plex Sans', 'system-ui', 'sans-serif'],
        'tf-condensed': ['Roboto Condensed', 'DIN 2014', 'Inter', 'system-ui', 'sans-serif'],
        'tf-mono': ['JetBrains Mono', 'IBM Plex Mono', 'Roboto Mono', 'ui-monospace', 'monospace'],
        'tf-display': ['Rajdhani', 'Oxanium', 'Inter', 'system-ui', 'sans-serif'],
      },

      /* ─────────────────────────────────────────────────────────────────────
         Font Size — Torafirma Text Scale
         ───────────────────────────────────────────────────────────────────── */
      fontSize: {
        'tf-2xs': ['10px', { lineHeight: '1.25', letterSpacing: '0.04em' }],
        'tf-xs': ['11px', { lineHeight: '1.25', letterSpacing: '0.04em' }],
        'tf-sm': ['12px', { lineHeight: '1.45', letterSpacing: '0' }],
        'tf-base': ['13px', { lineHeight: '1.45', letterSpacing: '0' }],
        'tf-md': ['14px', { lineHeight: '1.45', letterSpacing: '0' }],
        'tf-lg': ['18px', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'tf-xl': ['22px', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'tf-2xl': ['28px', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'tf-display': ['40px', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
      },

      /* ─────────────────────────────────────────────────────────────────────
         Line Height — Torafirma Line Scale
         ───────────────────────────────────────────────────────────────────── */
      lineHeight: {
        'tf-tight': '1.1',
        'tf-compact': '1.25',
        'tf-normal': '1.45',
        'tf-readable': '1.65',
      },

      /* ─────────────────────────────────────────────────────────────────────
         Letter Spacing — Torafirma Tracking Scale
         ───────────────────────────────────────────────────────────────────── */
      letterSpacing: {
        'tf-tight': '-0.01em',
        'tf-normal': '0',
        'tf-label': '0.04em',
        'tf-command': '0.06em',
        'tf-micro': '0.08em',
      },

      /* ─────────────────────────────────────────────────────────────────────
         Font Weight — Torafirma Weight Scale
         ───────────────────────────────────────────────────────────────────── */
      fontWeight: {
        'tf-regular': '400',
        'tf-medium': '500',
        'tf-semibold': '600',
        'tf-bold': '700',
        'tf-black': '800',
      },

      /* ─────────────────────────────────────────────────────────────────────
         Spacing — Torafirma Space Scale mapped to Tailwind utilities
         ───────────────────────────────────────────────────────────────────── */
      spacing: {
        'tf-0': '0px',
        'tf-1': '2px',
        'tf-2': '4px',
        'tf-3': '6px',
        'tf-4': '8px',
        'tf-5': '12px',
        'tf-6': '16px',
        'tf-7': '24px',
        'tf-8': '32px',
        'tf-9': '48px',
        'tf-10': '64px',

        /* v2: Mobile spacing tokens */
        'tf-mobile-1': '4px',
        'tf-mobile-2': '8px',
        'tf-mobile-3': '12px',
        'tf-mobile-4': '16px',
        'tf-mobile-5': '20px',
        'tf-mobile-6': '24px',
        'tf-mobile-8': '32px',

        /* v2: Layout-specific spacing */
        'tf-sidebar': '240px',
        'tf-sidebar-collapsed': '48px',
        'tf-topbar': '40px',
        'tf-footer': '28px',
        'tf-drawer': '360px',
        'tf-toast-max': '400px',
        'tf-command-palette': '640px',
      },

      /* ─────────────────────────────────────────────────────────────────────
         Height — Torafirma Control Height Scale
         ───────────────────────────────────────────────────────────────────── */
      height: {
        'tf-control-xs': '22px',
        'tf-control-sm': '26px',
        'tf-control-md': '30px',
        'tf-control-lg': '36px',
        'tf-control-xl': '44px',
        'tf-control-mobile-sm': '40px',
        'tf-control-mobile-md': '44px',
        'tf-control-mobile-lg': '48px',
      },

      /* ─────────────────────────────────────────────────────────────────────
         Box Shadow — Shadows and Semantic Glows
         ───────────────────────────────────────────────────────────────────── */
      boxShadow: {
        /* Elevation shadows */
        'tf-none': 'none',
        'tf-sm': '0 1px 2px rgba(0, 0, 0, 0.35)',
        'tf-md': '0 4px 12px rgba(0, 0, 0, 0.45)',
        'tf-lg': '0 12px 32px rgba(0, 0, 0, 0.55)',
        'tf-xl': '0 20px 48px rgba(0, 0, 0, 0.65)',

        /* Semantic glows */
        'tf-run': '0 0 0 1px #36D47B, 0 0 18px rgba(54, 212, 123, 0.24)',
        'tf-danger': '0 0 0 1px #F24B4B, 0 0 18px rgba(242, 75, 75, 0.24)',
        'tf-warning': '0 0 0 1px #F2B84B, 0 0 18px rgba(242, 184, 75, 0.22)',
        'tf-instability': '0 0 0 1px #F07A2A, 0 0 18px rgba(240, 122, 42, 0.22)',
        'tf-info': '0 0 0 1px #4BA3F2, 0 0 18px rgba(75, 163, 242, 0.22)',
        'tf-stream': '0 0 0 1px #35D0E3, 0 0 18px rgba(53, 208, 227, 0.22)',
        'tf-model': '0 0 0 1px #A678F2, 0 0 18px rgba(166, 120, 242, 0.22)',
        'tf-authority': '0 0 0 1px #D6A84F, 0 0 18px rgba(214, 168, 79, 0.24)',

        /* v2: Expanded glow variants for 12 component families */
        'tf-ai': '0 0 0 1px #A678F2, 0 0 24px rgba(166, 120, 242, 0.28), 0 0 48px rgba(166, 120, 242, 0.12)',
        'tf-ai-soft': '0 0 0 1px #5F4A8B, 0 0 12px rgba(166, 120, 242, 0.16)',
        'tf-ai-intense': '0 0 0 1px #A678F2, 0 0 24px rgba(166, 120, 242, 0.32), 0 0 56px rgba(166, 120, 242, 0.16)',
        'tf-stream-soft': '0 0 0 1px #1B7783, 0 0 12px rgba(53, 208, 227, 0.16)',
        'tf-stream-pulse': '0 0 0 1px #35D0E3, 0 0 18px rgba(53, 208, 227, 0.28), 0 0 36px rgba(53, 208, 227, 0.14)',
        'tf-success': '0 0 0 1px #36D47B, 0 0 18px rgba(54, 212, 123, 0.24)',
        'tf-fault': '0 0 0 1px #F24B4B, 0 0 18px rgba(242, 75, 75, 0.24), 0 0 36px rgba(242, 75, 75, 0.12)',
        'tf-locked': '0 0 0 1px #D6A84F, 0 0 18px rgba(214, 168, 79, 0.24)',
      },

      /* ─────────────────────────────────────────────────────────────────────
         Transition Timing — Torafirma Motion Tokens
         ───────────────────────────────────────────────────────────────────── */
      transitionDuration: {
        'tf-instant': '60ms',
        'tf-fast': '100ms',
        'tf-normal': '160ms',
        'tf-panel': '220ms',
        'tf-slow': '360ms',
        'tf-enter': '280ms',
        'tf-exit': '200ms',
        'tf-complex': '480ms',
        'tf-stagger': '80ms',
      },
      transitionTimingFunction: {
        'tf-standard': 'cubic-bezier(0.2, 0, 0, 1)',
        'tf-sharp': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'tf-enter': 'cubic-bezier(0, 0, 0.2, 1)',
        'tf-exit': 'cubic-bezier(0.4, 0, 1, 1)',
        'tf-spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'tf-bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'tf-smooth': 'cubic-bezier(0.45, 0.05, 0.55, 0.95)',
        'tf-dramatic': 'cubic-bezier(0.87, 0, 0.13, 1)',
        'tf-ai-reveal': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'tf-stream-flow': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      /* ─────────────────────────────────────────────────────────────────────
         Z-Index — Torafirma Stacking Scale
         ───────────────────────────────────────────────────────────────────── */
      zIndex: {
        'tf-base': '0',
        'tf-panel': '10',
        'tf-sticky': '20',
        'tf-dropdown': '40',
        'tf-popover': '45',
        'tf-tooltip': '50',
        'tf-command-palette': '60',
        'tf-modal-backdrop': '80',
        'tf-modal': '90',
        'tf-drawer': '95',
        'tf-critical-alert': '100',
        'tf-breaker': '110',
        'tf-toast': '120',
      },

      /* ─────────────────────────────────────────────────────────────────────
         Border Color — Torafirma Semantic Borders
         ───────────────────────────────────────────────────────────────────── */
      borderColor: {
        'tf-subtle': '#1C2630',
        'tf-normal': '#26323C',
        'tf-strong': '#51616D',
      },

      /* ─────────────────────────────────────────────────────────────────────
         v2: Backdrop Blur — for overlays and modals
         ───────────────────────────────────────────────────────────────────── */
      backdropBlur: {
        'tf-modal': '8px',
        'tf-drawer': '6px',
      },
    },
  },
  plugins: [],
};
