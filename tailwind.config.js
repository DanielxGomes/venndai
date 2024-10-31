/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'vennd': {
          primary: '#1EBEB6',
          secondary: '#CCFF00',
          dark: '#2A2A2A',
          light: '#F5F9FF'
        }
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'slide-up': 'slideUp 0.5s ease-out'
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        slideUp: {
          '0%': {
            transform: 'translateY(20px)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1'
          }
        }
      },
      backgroundImage: {
        'ai-pattern': "url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=2400&q=80')"
      }
    }
  },
  plugins: [],
};