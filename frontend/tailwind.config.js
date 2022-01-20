const colors = require('tailwindcss/colors')

module.exports = {
    //mode: 'jit',
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                transparent: 'transparent',
                current: 'currentColor',
                'sky-blue-crayola': {
                    light: '#8df3ff',
                    DEFAULT: '#1BE7FF'
                },
                'royal-blue-dark': {
                    base: '#DAE4FB',
                    lightest: '#EDF2FD',
                    lighter: '#5885EE',
                    light: '#1652DF',
                    DEFAULT: '#0A2463',
                },
                'golden-yellow': {
                    base: '#FFFBD6',
                    lightest: '#fffce6',
                    lighter: '#FFF170',
                    light: '#FFEF5C',
                    DEFAULT: '#FFE500',
                    dark: '#FFD000'
                },
                blue: {
                    lightest: 'rgba(57, 158, 230, .06)',
                    light: '#60b1eb',
                    DEFAULT: '#399EE6',
                    dark: '#2d7eb8',
                },
                green: {
                    lightest: '#C9EBE0',
                    light: '#81D2B7',
                    DEFAULT: '#4CBF99',
                    dark: '#3C987A',
                },
                gray: {
                    darkest: '#8A9199',
                    dark: '#9FA6AC',
                    DEFAULT: '#E8E9Eb',
                    light: '#F0F1F2',
                    lightest: '#F3F4F5',
                }
            }
        },
        colors: {
            white: '#fff',
            blue: {
                DEFAULT: '#336AEB'
            },
            red: {
                '50': '#FFEBEE',
                '100': '#FFCDD2',
                '200': '#EF9A9A',
                '300': '#E57373',
                '400': '#EF5350',
                '500': '#F44336',
                // Duplicate of 500
                DEFAULT: '#F44336',
                '600': '#E53935',
                '700': '#D32F2F',
                '800': '#C62828',
                '900': '#B71C1C',
                'A100': '#FF8A80',
                'A200': '#FF5252',
                'A400': '#FF1744',
                'A700': '#D50000'
            }
        }
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
