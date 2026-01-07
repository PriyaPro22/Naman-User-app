/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // EXACT IMAGE COLORS
        'yellow-primary': '#FACC15',
        'yellow-dark': '#EAB308',
        'gray-bg': '#F9FAFB',
        'gray-card': '#F3F4F6',
        'text-dark': '#111827',
        'text-gray': '#6B7280',
        'text-light': '#9CA3AF',
        'white': '#FFFFFF',
        'black': '#000000',
        'blue-icon': '#2563EB',
        'dark-card': '#1F2937',
        'success-green': '#16A34A',
        'error-red': '#DC2626',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'hard': '0 8px 24px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}