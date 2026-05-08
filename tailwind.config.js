/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        mist: "#f8fafc",
        slate: {
          DEFAULT: "#475569",
          200: "#e2e8f0",
          300: "#cbd5e1",
          900: "#0f172a"
        },
        sand: "#f1f5f9",
        ember: "#f97316",
        pine: "#0f766e"
      },
      boxShadow: {
        panel: "0 16px 40px -18px rgba(15, 23, 42, 0.24)"
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top left, rgba(249, 115, 22, 0.14), transparent 30%), radial-gradient(circle at right, rgba(15, 118, 110, 0.14), transparent 24%)"
      }
    }
  },
  plugins: []
};
