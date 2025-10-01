import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: "1rem",
                md: "2rem",
                lg: "4rem",
            },
        },
        extend: {
            fontFamily: {
                sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
                display: ["var(--font-space-grotesk)", "var(--font-manrope)", "sans-serif"],
            },
            colors: {
                brand: {
                    50: "#f0f6ff",
                    100: "#e2edff",
                    200: "#bfd9ff",
                    300: "#92beff",
                    400: "#5f9bff",
                    500: "#3a79ff",
                    600: "#245ee6",
                    700: "#1749b4",
                    800: "#163f8d",
                    900: "#133774",
                    950: "#091c3c",
                },
                accent: {
                    100: "#dffdf4",
                    200: "#affbe0",
                    300: "#72f4ca",
                    400: "#45e8b6",
                    500: "#18d79f",
                    600: "#0fb686",
                    700: "#0b9570",
                },
            },
            backgroundImage: {
                "soft-spot": "radial-gradient(circle at top right, rgba(95, 155, 255, 0.22), transparent 55%), radial-gradient(circle at bottom left, rgba(69, 232, 182, 0.18), transparent 50%)",
            },
            boxShadow: {
                glass: "0 20px 45px -30px rgba(63, 94, 251, 0.6)",
                card: "0 16px 50px -30px rgba(13, 27, 60, 0.75)",
            },
        },
        screens: {
            sm: "375px",
            md: "768px",
            lg: "1200px",
        },
    },
    plugins: [],
};
export default config;
