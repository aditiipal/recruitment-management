/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#C65D3B',
          'orange-light': '#D4795C',
          'orange-dark': '#A84D2F',
          'light-blue': '#DCEFF5',
          'gallery-blue': '#5E8FA3',
          'gallery-blue-light': '#7BA8B8',
          navy: '#17324D',
          'navy-light': '#1E4060',
          cream: '#FFF9F3',
          'cream-dark': '#F5EDE4',
        },
        status: {
          applied: '#5E8FA3',
          review: '#DCEFF5',
          shortlisted: '#C65D3B',
          interview: '#7C5CFC',
          hired: '#22A06B',
          rejected: '#DC524B',
          offer: '#E8A838',
        },
        border: '#E6E9EC',
        'text-secondary': '#6B7280',
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        accent: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      borderRadius: {
        card: '14px',
        'card-lg': '18px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(23,50,77,0.06), 0 1px 2px rgba(23,50,77,0.04)',
        'card-hover': '0 10px 25px rgba(23,50,77,0.08), 0 4px 10px rgba(23,50,77,0.04)',
        sidebar: '2px 0 8px rgba(23,50,77,0.08)',
        dropdown: '0 10px 40px rgba(23,50,77,0.12)',
        modal: '0 20px 60px rgba(23,50,77,0.16)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s infinite',
        'count-up': 'countUp 1s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideInRight: { '0%': { opacity: '0', transform: 'translateX(20px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        scaleIn: { '0%': { opacity: '0', transform: 'scale(0.95)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        pulseSoft: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.7' } },
        countUp: { '0%': { opacity: '0', transform: 'translateY(10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
