/**
 * ==============================================================================
 * EUROPEBRIDGE DASHBOARD THEME CONFIGURATION (TypeScript Helper)
 * ==============================================================================
 * This file documents and mirrors the theme variables defined in:
 * `frontend/app/dashboard-theme.css`.
 * 
 * To update colors and fonts in CSS/Tailwind directly:
 * Edit `frontend/app/dashboard-theme.css`.
 * ==============================================================================
 */

export const dashboardTheme = {
  // Typography
  fonts: {
    display: "var(--font-geist), 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    sans: "var(--font-nunito), ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },

  // Color Palette (Calibrated for low eye strain / warm ergonomic feel)
  colors: {
    // Brand Accents
    primaryRed: "#D8434F",          // Softened warm crimson (replaces harsh #E63946)
    primaryRedHover: "#C53743",
    accentGold: "#E29D52",          // Warm honey amber (softer than neon gold)
    deepCharcoal: "#20242C",        // Deep warm slate-charcoal (gentle on eyes vs stark black)
    deepCharcoalHover: "#15181E",

    // Canvas & Surfaces
    background: "#F5F4F0",          // Calming warm linen canvas (replaces harsh cold #F8FAFC)
    cardBackground: "#FFFFFF",      // Crisp white card surface
    cardWarm: "#FAF9F6",            // Soft warm card surface
    cardSubtle: "#F1EFEA",          // Subtle card background

    // Borders & Dividers
    border: "#E4E2DC",              // Gentle warm border (replaces cold gray)
    borderSubtle: "#ECEAE4",

    // Typography & Content
    textPrimary: "#1E2229",         // Primary dark text (high readability, low glare)
    textSecondary: "#58606B",       // Supporting subtitle text
    textMuted: "#868E96",           // Subtle caption text
  },
} as const;

export type DashboardTheme = typeof dashboardTheme;
