/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: 'class', // Gestion du mode sombre via classe "dark"
    theme: {
      extend: {
        colors: {
          // Palette Spatiale Galactique
          space: {
            dark: '#0B0C2A',      // Fond principal - bleu nuit très foncé
            darker: '#060714',     // Encore plus foncé pour les contrastes
            navy: '#1a1d3a',       // Navy spatial
            purple: '#8A2BE2',     // Violet néon
            magenta: '#FF00CC',    // Rose magenta
            cyan: '#00FFFF',       // Cyan lumineux
            pink: '#FF1493',       // Rose vif
            blue: '#4169E1',       // Bleu royal
          },
          primary: {
            50: '#f0f0ff',
            100: '#e0e0ff',
            200: '#c7c7ff',
            300: '#a5a5ff',
            400: '#8585ff',
            500: '#8A2BE2',       // Violet néon principal
            600: '#7722cc',
            700: '#6419b6',
            800: '#511499',
            900: '#3d0f7a',
          },
          secondary: {
            50: '#ffe0f7',
            100: '#ffc7f0',
            200: '#ff9ee6',
            300: '#ff75dc',
            400: '#ff4dd2',
            500: '#FF00CC',       // Magenta principal
            600: '#cc00a3',
            700: '#99007a',
            800: '#660052',
            900: '#330029',
          },
          accent: {
            50: '#e0ffff',
            100: '#c7ffff',
            200: '#9effff',
            300: '#75ffff',
            400: '#4dffff',
            500: '#00FFFF',       // Cyan principal
            600: '#00cccc',
            700: '#009999',
            800: '#006666',
            900: '#003333',
          },
        },
        fontFamily: {
          sans: ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui'],
          display: ['Orbitron', 'Exo 2', 'ui-sans-serif'],
          mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular'],
        },
        animation: {
          'fade-in': 'fadeIn 0.5s ease-in-out',
          'slide-up': 'slideUp 0.5s ease-out',
          'bounce-slow': 'bounce 2s infinite',
          'float': 'float 6s ease-in-out infinite',
          'glow-pulse': 'glowPulse 3s ease-in-out infinite',
          'star-twinkle': 'starTwinkle 4s ease-in-out infinite',
          'comet': 'comet 8s linear infinite',
        },
        backgroundImage: {
          'space-gradient': 'linear-gradient(135deg, #0B0C2A 0%, #1a1d3a 50%, #2d1b4e 100%)',
          'glow-radial': 'radial-gradient(circle, rgba(138, 43, 226, 0.3) 0%, transparent 70%)',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          slideUp: {
            '0%': { transform: 'translateY(20px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          float: {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-20px)' },
          },
          glowPulse: {
            '0%, 100%': { opacity: '0.5', filter: 'blur(20px)' },
            '50%': { opacity: '1', filter: 'blur(30px)' },
          },
          starTwinkle: {
            '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
            '50%': { opacity: '1', transform: 'scale(1.2)' },
          },
          comet: {
            '0%': { transform: 'translateX(-100%) translateY(-100%)', opacity: '0' },
            '10%': { opacity: '1' },
            '90%': { opacity: '1' },
            '100%': { transform: 'translateX(100vw) translateY(100vh)', opacity: '0' },
          },
        },
      },
    },
    plugins: [],
  };
  