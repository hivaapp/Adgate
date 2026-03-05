/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            },
            colors: {
                bg: '#F5F5F5',
                surface: '#FFFFFF',
                surfaceAlt: '#F3F1EC',
                border: '#E6E2D9',
                text: '#21201C',
                textMid: '#6B6860',
                textLight: '#AAA49C',
                brand: {
                    DEFAULT: '#E8312A',
                    hover: '#C22620',
                    tint: '#FCEAE9'
                },
                eco: {
                    DEFAULT: '#1E9E5E',
                    hover: '#18824D',
                    tint: '#E8F5EF'
                }
            },
            boxShadow: {
                DEFAULT: '0 1px 3px rgba(0,0,0,0.06)',
                red: '0 4px 14px rgba(232,49,42,0.3)',
            },
            borderRadius: {
                'button': '12px',
                'card': '18px',
                'badge': '10px',
                'pill': '50px'
            }
        },
    },
    plugins: [],
}
