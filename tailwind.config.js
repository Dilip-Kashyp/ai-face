/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        'spin': 'spin 1s linear infinite',
        'spin-slow': 'spin 3s linear infinite',
        'subtle-pulse': 'pulse 2s ease-in-out infinite',
        'bounce-gentle': 'bounce 1s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-quick': 'bounce 0.5s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'wink': 'wink 0.5s ease-in-out',
        'blink': 'blink 4s ease-in-out infinite',
        'colorBlink': 'colorBlink 2s ease-in-out infinite',
        'subtle-size-change': 'subtleSize 4s ease-in-out infinite',
        'color-shift': 'color-shift 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(3deg)' },
          '50%': { transform: 'translateY(-10px) rotate(3deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        wink: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(0.05)' },
        },
        blink: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '95%': { transform: 'scaleY(1)' },
          '97.5%': { transform: 'scaleY(0.05)' },
        },
        colorBlink: {
          '0%, 100%': { backgroundColor: 'rgb(239, 68, 68)' },
          '50%': { backgroundColor: 'rgb(248, 113, 113)' },
        },
        subtleSize: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.98)' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'color-shift': {
          '0%, 100%': { backgroundColor: '#ef4444' },
          '50%': { backgroundColor: '#3b82f6' },
        },
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /(bg|text)-(blue|green|purple)-(400|500|600)/,
    },
  ],
};