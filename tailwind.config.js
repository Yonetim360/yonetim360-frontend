/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", // app klasöründeki tüm JS/JSX/TS/TSX dosyaları
    "./pages/**/*.{js,jsx,ts,tsx}", // pages klasöründeki tüm JS/JSX/TS/TSX dosyaları (eğer kullanıyorsanız)
    "./components/**/*.{js,jsx,ts,tsx}", // components klasöründeki tüm JS/JSX/TS/TSX dosyaları
    "./src/**/*.{js,jsx,ts,tsx}", // Eğer src klasörünüz varsa bu satırı ekleyin
  ],
  theme: {
    extend: {
      colors: {
        // Shadcn/ui'nin varsayılan renk değişkenlerini kendi paletimizle eşleştiriyoruz
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Özel renk isimleri (doğrudan Tailwind sınıflarında kullanılabilir)
        "primary-green": "#4CAF50",
        cream: "#FAF9F6",
        "dark-gray": "#333533",
        "light-green": "#D0E8D0",
        orange: "#F77F00",
        red: "#EF233C",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")], // Eğer shadcn/ui kullanıyorsanız bu eklentiye ihtiyacınız var
};
