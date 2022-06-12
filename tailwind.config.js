module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                cyan: 'hsl(180, 66%, 49%)',
                'light-cyan': 'hsl(179, 56%, 75%)',
                'dark-violet': 'hsl(257, 27%, 26%)',
                'light-gray': '#f0f1f6',
                gray: 'hsl(257, 7%, 63%)',
                'dark-black': 'hsl(260, 8%, 14%)',
                'dark-blue': 'hsl(255, 11%, 22%)',
                'very-dark-violet': 'hsl(260, 8%, 14%)',
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
