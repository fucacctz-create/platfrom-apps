// Theme Configuration for Translation Station
// This file allows customization of colors, fonts, and other visual elements

export const themeConfig = {
  // Brand Identity
  brand: {
    name: "Translation Station",
    tagline: "Show it. Talk about it. Get a spec.",
    description: "Translation Station helps you describe your app idea, and we translate it into the perfect language for AI code generators.",
  },

  // Color Palette
  colors: {
    primary: "#2b8cee",
    primaryHover: "#257bcc",
    primaryLight: "#e0f0ff",
    background: {
      light: "#f6f7f8",
      dark: "#101922",
    },
    surface: {
      light: "#ffffff",
      dark: "#1e293b",
    },
    text: {
      primary: "#111418",
      secondary: "#637588",
      muted: "#9ca3af",
      light: "#ffffff",
    },
    border: {
      light: "#e5e7eb",
      dark: "#374151",
    },
    success: "#10b981",
    error: "#ef4444",
    warning: "#f59e0b",
  },

  // Typography
  fonts: {
    display: "'Inter', sans-serif",
    mono: "'Fira Code', 'Consolas', monospace",
  },

  // Border Radius
  borderRadius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.5rem",
    full: "9999px",
  },

  // Shadows
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    primary: "0 4px 14px 0 rgba(43, 140, 238, 0.2)",
  },

  // Screen Labels (for step indicators)
  screens: {
    welcome: { step: 0, label: "Welcome" },
    upload: { step: 1, label: "Upload & Describe" },
    clarification: { step: 2, label: "Clarification" },
    review: { step: 3, label: "Review & Confirm" },
    export: { step: 4, label: "Export" },
  },

  // API Configuration
  api: {
    translateEndpoint: "/api/translate",
  },
};

export type ThemeConfig = typeof themeConfig;
export default themeConfig;
