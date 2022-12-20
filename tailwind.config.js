/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    screens: {
      tiny: "360px",
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1366px",
      "2xl": "1440px",
      "3xl": "1920px",
    },
    fontSize: {
      sm: ["20px", "35px"],
      "sm-1": ["20px", "28px"],
      base: ["16px", "24px"],
      "base-1": ["19px", "28px"],
      md: ["28px", "40px"],
      "md-1": ["20px", "40px"],
      "md-2": ["20px", "35px"],
      "md-3": ["18px", "30px"],
      "md-4": ["20px", "30px"],
      lg: ["44px", "50px"],
      "lg-1": ["24px", "27px"],
      "lg-2": ["30px", "45px"],
      "lg-3": ["40px", "60px"],
      "lg-4": ["52px", "70px"],
      xl: ["70px", "85px"],
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      main: "#090909",
      body: "#171717",
      light: "#252526",
    }),
    borderColor: (theme) => ({
      ...theme("colors"),
      main: "#41a58d",
      create: "#515151",
      body: "#1B1B1B",
    }),

    borderRadius: {
      none: "0",
      sm: "0.125rem",
      DEFAULT: "0.25rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "0.75rem",
      "2xl": "1rem",
      "3xl": "1.5rem",
      "4xl": "30px",
      full: "9999px",
    },

    maxHeight: {
      0: "0",
      "1/4": "25vh",
      "1/2": "50vh",
      "3/4": "75vh",
      "4/5": "80vh",
      full: "100vh",
    },
    extend: {
      minHeight: {
        0: "0",
        "1/4": "25vh",
        "1/2": "50vh",
        "3/5": "60vh",
        "3/4": "75vh",
        "4/5": "80vh",
        full: "100vh",
      },
      spacing: {
        136: "34rem",
        200: "50rem",
      },
      colors: {
        app: {
          yellow: {
            light: "#f8dc8e",
            dark: "#916500",
          },
          cyan: {
            DEFAULT: "#0d91a9",
          },
          blue: {
            DEFAULT: "#89E1FF",
            500: "#0095C8",
          },
          green: {
            DEFAULT: "#2EBD85",
          },
          dark: {
            400: "#8F8F8F",
          },
          main: {
            100: "#41a58d",
          },

          red: {
            DEFAULT: "#CE1415",
          },
        },
        interaction: "#00a78d",
      },
      lineHeight: {
        11: "3rem",
        12: "3.2rem",
      },
      maxWidth: {
        1920: "1920px",
      },
      borderWidth: {
        1: "1px",
      },
      padding: {
        "1px": "1px",
        "2px": "2px",
      },
      fontFamily: {
        sorabold: ["SoraBold"],
        soralight: ["SoraLight"],
        soraregular: ["SoraRegular"],
        sorasemibold: ["SoraSemibold"],
        sorathin: ["SoraThin"],
      },
    },
  },
  variants: {
    extend: {
      background: ["card", "link", "body", "progress", "search"],
      color: ["white", "edit"],
    },
  },
  plugins: [],
};
