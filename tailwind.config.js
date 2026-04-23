/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        primary: {
          DEFAULT: "#7C5DFA", // Main Purple
          hover: "#9277FF",   // Light Purple Hover
        },
        // Destructive Actions
        danger: {
          DEFAULT: "#EC5757", // Red
          hover: "#FF9797",   // Light Red Hover
        },
        // Dark Mode & Layout Elements
        dark: {
          DEFAULT: "#141625", // Main App Background (Dark)
          surface: "#1E2139", // Cards, Sidebar, Form Elements
          border: "#252945",  // Borders, Dividers
        },
        // Light Mode & Layout Elements
        light: {
          DEFAULT: "#F8F8FB", // Main App Background (Light)
          surface: "#FFFFFF", // Standard White
        },
        // Typography Colors
        ink: {
          dark: "#0C0E16",    // Main Headings (Light Mode)
          light: "#FFFFFF",   // Main Headings (Dark Mode)
          gray: "#888EB0",    // Secondary Text
          purple: "#7E88C3",  // Muted Purple Text
          blueish: "#DFE3FA", // Very Light Muted Text
        },
        // Status Colors (Matching the UI badges)
        status: {
          paid: "#33D69F",    // Green
          pending: "#FF8F00", // Orange
          draft: {
            light: "#373B53", // Dark Gray
            dark: "#DFE3FA",  // Light Gray
          }
        }
      },
      fontFamily: {
        // Setting League Spartan as the default sans font
        sans: ['"League Spartan"', "sans-serif"],
      },
    },
  },
  plugins: [],
}