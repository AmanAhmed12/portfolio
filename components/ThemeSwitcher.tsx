"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

interface ThemeColors {
  [key: string]: string;
}

interface Theme {
  name: string;
  colors: ThemeColors;
}

const themes: Theme[] = [
  {
    name: "Modern Blue",
    colors: {
      "--bg-deep": "#0b132b",
      "--bg-card": "rgba(28, 37, 65, 0.4)",
      "--bg-card-hover": "rgba(28, 37, 65, 0.8)",
      "--accent-primary": "#00b4d8",
      "--accent-secondary": "#90e0ef",
      "--accent-glow": "rgba(0, 180, 216, 0.25)",
      "--text-primary": "#ffffff",
      "--text-secondary": "#a5a5a5",
      "--border-glass": "rgba(255, 255, 255, 0.08)",
      "--border-hover": "rgba(0, 180, 216, 0.3)",
      "--nav-bg": "rgba(11, 19, 43, 0.85)",
      "--shadow-nav": "0 10px 40px rgba(0, 0, 0, 0.5)",
      "--shadow-card-hover": "0 20px 40px rgba(0, 180, 216, 0.15)",
      "--btn-indigo-text": "#0b132b",
      "--btn-indigo-text-hover": "#0b132b",
      "--btn-glass-bg": "rgba(255, 255, 255, 0.05)",
      "--btn-glass-bg-hover": "rgba(255, 255, 255, 0.12)",
      "--skill-tag-bg": "rgba(0, 180, 216, 0.15)",
      "--form-bg": "rgba(28, 37, 65, 0.5)",
      "--form-text": "#ffffff",
      "--chat-fab-text": "#0b132b",
      "--chat-fab-shadow": "0 10px 30px rgba(0, 180, 216, 0.3)",
      "--chat-fab-shadow-hover": "0 15px 40px rgba(0, 180, 216, 0.5)",
      "--chat-label-bg": "rgba(11, 19, 43, 0.95)",
      "--chat-label-text": "#ffffff",
      "--chat-window-bg": "rgba(11, 19, 43, 0.95)",
      "--chat-window-shadow": "0 30px 60px rgba(0, 0, 0, 0.6)",
      "--chat-header-bg": "rgba(28, 37, 65, 0.3)",
      "--message-ai-bg:rgba": "rgba(28, 37, 65, 0.3)",
      "--message-user-text": "#0b132b",
      "--chat-input-area-bg": "rgba(11, 19, 43, 0.8)",
      "--chat-input-bg": "rgba(255, 255, 255, 0.06)",
      "--chat-input-text": "#ffffff"
    }
  },
  {
    name: "Emerald Green",
    colors: {
      "--bg-deep": "#052e16",
      "--bg-card": "rgba(20, 83, 45, 0.3)",
      "--bg-card-hover": "rgba(20, 83, 45, 0.7)",
      "--accent-primary": "#10b981",
      "--accent-secondary": "#34d399",
      "--accent-glow": "rgba(16, 185, 129, 0.25)",
      "--text-primary": "#ecfdf5",
      "--text-secondary": "#a7f3d0",
      "--border-glass": "rgba(16, 185, 129, 0.15)",
      "--border-hover:rgba": "rgba(52, 211, 153, 0.4)",
      "--nav-bg": "rgba(5, 46, 22, 0.9)",
      "--shadow-nav": "0 10px 40px rgba(0, 0, 0, 0.6)",
      "--shadow-card-hover": "0 20px 40px rgba(16, 185, 129, 0.2)",
      "--btn-indigo-text": "#052e16",
      "--btn-indigo-text-hover": "#052e16",
      "--btn-glass-bg": "rgba(16, 185, 129, 0.08)",
      "--btn-glass-bg-hover": "rgba(16, 185, 129, 0.18)",
      "--skill-tag-bg": "rgba(16, 185, 129, 0.15)",
      "--form-bg": "rgba(20, 83, 45, 0.4)",
      "--form-text": "#ecfdf5",
      "--chat-fab-text": "#052e16",
      "--chat-fab-shadow": "0 10px 30px rgba(16, 185, 129, 0.3)",
      "--chat-fab-shadow-hover": "0 15px 40px rgba(16, 185, 129, 0.5)",
      "--chat-label-bg": "rgba(5, 46, 22, 0.95)",
      "--chat-label-text": "#ecfdf5",
      "--chat-window-bg": "rgba(5, 46, 22, 0.95)",
      "--chat-window-shadow": "0 30px 60px rgba(0, 0, 0, 0.6)",
      "--chat-header-bg": "rgba(20, 83, 45, 0.3)",
      "--message-ai-bg": "rgba(20, 83, 45, 0.3)",
      "--message-user-text": "#052e16",
      "--chat-input-area-bg": "rgba(5, 46, 22, 0.8)",
      "--chat-input-bg": "rgba(255, 255, 255, 0.06)",
      "--chat-input-text": "#ecfdf5"
    }
  },
  {
    name: "Royal Purple",
    colors: {
      "--bg-deep": "#120024",
      "--bg-card": "rgba(59, 0, 102, 0.35)",
      "--bg-card-hover": "rgba(59, 0, 102, 0.75)",
      "--accent-primary": "#d946ef",
      "--accent-secondary": "#a855f7",
      "--accent-glow": "rgba(217, 70, 239, 0.3)",
      "--text-primary": "#fdf4ff",
      "--text-secondary": "#e879f9",
      "--border-glass": "rgba(217, 70, 239, 0.15)",
      "--border-hover": "rgba(217, 70, 239, 0.4)",
      "--nav-bg": "rgba(18, 0, 36, 0.9)",
      "--shadow-nav": "0 10px 40px rgba(0, 0, 0, 0.6)",
      "--shadow-card-hover": "0 20px 40px rgba(217, 70, 239, 0.2)",
      "--btn-indigo-text": "#120024",
      "--btn-indigo-text-hover": "#120024",
      "--btn-glass-bg": "rgba(217, 70, 239, 0.08)",
      "--btn-glass-bg-hover": "rgba(217, 70, 239, 0.18)",
      "--skill-tag-bg": "rgba(217, 70, 239, 0.15)",
      "--form-bg": "rgba(59, 0, 102, 0.4)",
      "--form-text": "#fdf4ff",
      "--chat-fab-text": "#120024",
      "--chat-fab-shadow": "0 10px 30px rgba(217, 70, 239, 0.3)",
      "--chat-fab-shadow-hover": "0 15px 40px rgba(217, 70, 239, 0.5)",
      "--chat-label-bg": "rgba(18, 0, 36, 0.95)",
      "--chat-label-text": "#fdf4ff",
      "--chat-window-bg": "rgba(18, 0, 36, 0.95)",
      "--chat-window-shadow": "0 30px 60px rgba(0, 0, 0, 0.6)",
      "--chat-header-bg": "rgba(59, 0, 102, 0.3)",
      "--message-ai-bg": "rgba(59, 0, 102, 0.3)",
      "--message-user-text": "#120024",
      "--chat-input-area-bg": "rgba(18, 0, 36, 0.8)",
      "--chat-input-bg": "rgba(255, 255, 255, 0.06)",
      "--chat-input-text": "#fdf4ff"
    }
  },
  {
    name: "Sunset Orange",
    colors: {
      "--bg-deep": "#240f00",
      "--bg-card": "rgba(99, 36, 0, 0.35)",
      "--bg-card-hover": "rgba(99, 36, 0, 0.75)",
      "--accent-primary": "#f97316",
      "--accent-secondary": "#facc15",
      "--accent-glow": "rgba(249, 115, 22, 0.3)",
      "--text-primary": "#fff7ed",
      "--text-secondary": "#fed7aa",
      "--border-glass": "rgba(249, 115, 22, 0.15)",
      "--border-hover": "rgba(249, 115, 22, 0.4)",
      "--nav-bg": "rgba(36, 15, 0, 0.9)",
      "--shadow-nav": "0 10px 40px rgba(0, 0, 0, 0.6)",
      "--shadow-card-hover": "0 20px 40px rgba(249, 115, 22, 0.2)",
      "--btn-indigo-text": "#240f00",
      "--btn-indigo-text-hover": "#240f00",
      "--btn-glass-bg": "rgba(249, 115, 22, 0.08)",
      "--btn-glass-bg-hover": "rgba(249, 115, 22, 0.18)",
      "--skill-tag-bg": "rgba(249, 115, 22, 0.15)",
      "--form-bg": "rgba(99, 36, 0, 0.4)",
      "--form-text": "#fff7ed",
      "--chat-fab-text": "#240f00",
      "--chat-fab-shadow": "0 10px 30px rgba(249, 115, 22, 0.3)",
      "--chat-fab-shadow-hover": "0 15px 40px rgba(249, 115, 22, 0.5)",
      "--chat-label-bg": "rgba(36, 15, 0, 0.95)",
      "--chat-label-text": "#fff7ed",
      "--chat-window-bg": "rgba(36, 15, 0, 0.95)",
      "--chat-window-shadow": "0 30px 60px rgba(0, 0, 0, 0.6)",
      "--chat-header-bg": "rgba(99, 36, 0, 0.3)",
      "--message-ai-bg": "rgba(99, 36, 0, 0.3)",
      "--message-user-text": "#240f00",
      "--chat-input-area-bg": "rgba(36, 15, 0, 0.8)",
      "--chat-input-bg": "rgba(255, 255, 255, 0.06)",
      "--chat-input-text": "#fff7ed"
    }
  },
  {
    name: "Crimson Red",
    colors: {
      "--bg-deep": "#1f0308",
      "--bg-card": "rgba(107, 5, 22, 0.35)",
      "--bg-card-hover": "rgba(107, 5, 22, 0.75)",
      "--accent-primary": "#ef4444",
      "--accent-secondary": "#f43f5e",
      "--accent-glow": "rgba(239, 68, 68, 0.3)",
      "--text-primary": "#fef2f2",
      "--text-secondary": "#fecaca",
      "--border-glass": "rgba(239, 68, 68, 0.15)",
      "--border-hover": "rgba(239, 68, 68, 0.4)",
      "--nav-bg": "rgba(31, 3, 8, 0.9)",
      "--shadow-nav": "0 10px 40px rgba(0, 0, 0, 0.6)",
      "--shadow-card-hover": "0 20px 40px rgba(239, 68, 68, 0.2)",
      "--btn-indigo-text": "#1f0308",
      "--btn-indigo-text-hover": "#1f0308",
      "--btn-glass-bg": "rgba(239, 68, 68, 0.08)",
      "--btn-glass-bg-hover": "rgba(239, 68, 68, 0.18)",
      "--skill-tag-bg": "rgba(239, 68, 68, 0.15)",
      "--form-bg": "rgba(107, 5, 22, 0.4)",
      "--form-text": "#fef2f2",
      "--chat-fab-text": "#1f0308",
      "--chat-fab-shadow": "0 10px 30px rgba(239, 68, 68, 0.3)",
      "--chat-fab-shadow-hover": "0 15px 40px rgba(239, 68, 68, 0.5)",
      "--chat-label-bg": "rgba(31, 3, 8, 0.95)",
      "--chat-label-text": "#fef2f2",
      "--chat-window-bg": "rgba(31, 3, 8, 0.95)",
      "--chat-window-shadow": "0 30px 60px rgba(0, 0, 0, 0.6)",
      "--chat-header-bg": "rgba(107, 5, 22, 0.3)",
      "--message-ai-bg": "rgba(107, 5, 22, 0.3)",
      "--message-user-text": "#1f0308",
      "--chat-input-area-bg": "rgba(31, 3, 8, 0.8)",
      "--chat-input-bg": "rgba(255, 255, 255, 0.06)",
      "--chat-input-text": "#fef2f2"
    }
  },
  {
    name: "Ocean Teal",
    colors: {
      "--bg-deep": "#002025",
      "--bg-card": "rgba(0, 74, 87, 0.35)",
      "--bg-card-hover": "rgba(0, 74, 87, 0.75)",
      "--accent-primary": "#06b6d4",
      "--accent-secondary": "#14b8a6",
      "--accent-glow": "rgba(6, 182, 212, 0.3)",
      "--text-primary": "#ecfeff",
      "--text-secondary": "#cffafe",
      "--border-glass": "rgba(6, 182, 212, 0.15)",
      "--border-hover": "rgba(6, 182, 212, 0.4)",
      "--nav-bg": "rgba(0, 32, 37, 0.9)",
      "--shadow-nav": "0 10px 40px rgba(0, 0, 0, 0.6)",
      "--shadow-card-hover": "0 20px 40px rgba(6, 182, 212, 0.2)",
      "--btn-indigo-text": "#002025",
      "--btn-indigo-text-hover": "#002025",
      "--btn-glass-bg": "rgba(6, 182, 212, 0.08)",
      "--btn-glass-bg-hover": "rgba(6, 182, 212, 0.18)",
      "--skill-tag-bg": "rgba(6, 182, 212, 0.15)",
      "--form-bg": "rgba(0, 74, 87, 0.4)",
      "--form-text": "#ecfeff",
      "--chat-fab-text": "#002025",
      "--chat-fab-shadow": "0 10px 30px rgba(6, 182, 212, 0.3)",
      "--chat-fab-shadow-hover": "0 15px 40px rgba(6, 182, 212, 0.5)",
      "--chat-label-bg": "rgba(0, 32, 37, 0.95)",
      "--chat-label-text": "#ecfeff",
      "--chat-window-bg": "rgba(0, 32, 37, 0.95)",
      "--chat-window-shadow": "0 30px 60px rgba(0, 0, 0, 0.6)",
      "--chat-header-bg": "rgba(0, 74, 87, 0.3)",
      "--message-ai-bg": "rgba(0, 74, 87, 0.3)",
      "--message-user-text": "#002025",
      "--chat-input-area-bg": "rgba(0, 32, 37, 0.8)",
      "--chat-input-bg": "rgba(255, 255, 255, 0.06)",
      "--chat-input-text": "#ecfeff"
    }
  },
  {
    name: "Midnight Dark",
    colors: {
      "--bg-deep": "#030712",
      "--bg-card": "rgba(17, 24, 39, 0.4)",
      "--bg-card-hover": "rgba(17, 24, 39, 0.85)",
      "--accent-primary": "#6366f1",
      "--accent-secondary": "#a855f7",
      "--accent-glow": "rgba(99, 102, 241, 0.25)",
      "--text-primary": "#f9fafb",
      "--text-secondary": "#9ca3af",
      "--border-glass": "rgba(255, 255, 255, 0.08)",
      "--border-hover": "rgba(255, 255, 255, 0.2)",
      "--nav-bg": "rgba(3, 7, 18, 0.85)",
      "--shadow-nav": "0 10px 40px rgba(0, 0, 0, 0.7)",
      "--shadow-card-hover": "0 20px 40px rgba(99, 102, 241, 0.15)",
      "--btn-indigo-text": "#ffffff",
      "--btn-indigo-text-hover": "#ffffff",
      "--btn-glass-bg": "rgba(255, 255, 255, 0.05)",
      "--btn-glass-bg-hover": "rgba(255, 255, 255, 0.1)",
      "--skill-tag-bg": "rgba(99, 102, 241, 0.1)",
      "--form-bg": "rgba(17, 24, 39, 0.5)",
      "--form-text": "#f9fafb",
      "--chat-fab-text": "#ffffff",
      "--chat-fab-shadow": "0 10px 30px rgba(99, 102, 241, 0.4)",
      "--chat-fab-shadow-hover": "0 15px 40px rgba(99, 102, 241, 0.6)",
      "--chat-label-bg": "rgba(3, 7, 18, 0.95)",
      "--chat-label-text": "#ffffff",
      "--chat-window-bg": "rgba(10, 18, 36, 0.95)",
      "--chat-window-shadow": "0 30px 60px rgba(0, 0, 0, 0.6)",
      "--chat-header-bg": "rgba(255, 255, 255, 0.03)",
      "--message-ai-bg": "rgba(255, 255, 255, 0.05)",
      "--message-user-text": "#ffffff",
      "--chat-input-area-bg": "rgba(17, 24, 39, 0.6)",
      "--chat-input-bg": "rgba(255, 255, 255, 0.06)",
      "--chat-input-text": "#f9fafb"
    }
  },
  {
    name: "Luxury Black & Gold",
    colors: {
      "--bg-deep": "#080808",
      "--bg-card": "rgba(26, 26, 26, 0.5)",
      "--bg-card-hover": "rgba(38, 38, 38, 0.9)",
      "--accent-primary": "#d4af37",
      "--accent-secondary": "#f3e5ab",
      "--accent-glow": "rgba(212, 175, 55, 0.25)",
      "--text-primary": "#f5f5f5",
      "--text-secondary": "#c5a880",
      "--border-glass": "rgba(212, 175, 55, 0.15)",
      "--border-hover": "rgba(212, 175, 55, 0.4)",
      "--nav-bg": "rgba(8, 8, 8, 0.9)",
      "--shadow-nav": "0 10px 40px rgba(0, 0, 0, 0.8)",
      "--shadow-card-hover": "0 20px 40px rgba(212, 175, 55, 0.15)",
      "--btn-indigo-text": "#080808",
      "--btn-indigo-text-hover": "#080808",
      "--btn-glass-bg": "rgba(212, 175, 55, 0.08)",
      "--btn-glass-bg-hover": "rgba(212, 175, 55, 0.18)",
      "--skill-tag-bg": "rgba(212, 175, 55, 0.12)",
      "--form-bg": "rgba(26, 26, 26, 0.6)",
      "--form-text": "#f5f5f5",
      "--chat-fab-text": "#080808",
      "--chat-fab-shadow": "0 10px 30px rgba(212, 175, 55, 0.3)",
      "--chat-fab-shadow-hover": "0 15px 40px rgba(212, 175, 55, 0.5)",
      "--chat-label-bg": "rgba(8, 8, 8, 0.95)",
      "--chat-label-text": "#f5f5f5",
      "--chat-window-bg": "rgba(8, 8, 8, 0.95)",
      "--chat-window-shadow": "0 30px 60px rgba(0, 0, 0, 0.8)",
      "--chat-header-bg": "rgba(26, 26, 26, 0.4)",
      "--message-ai-bg": "rgba(26, 26, 26, 0.4)",
      "--message-user-text": "#080808",
      "--chat-input-area-bg": "rgba(8, 8, 8, 0.85)",
      "--chat-input-bg": "rgba(255, 255, 255, 0.06)",
      "--chat-input-text": "#f5f5f5"
    }
  },
  {
    name: "Apple-inspired Light",
    colors: {
      "--bg-deep": "#f5f5f7",
      "--bg-card": "rgba(255, 255, 255, 0.6)",
      "--bg-card-hover": "rgba(255, 255, 255, 0.95)",
      "--accent-primary": "#0071e3",
      "--accent-secondary": "#1d1d1f",
      "--accent-glow": "rgba(0, 113, 227, 0.2)",
      "--text-primary": "#1d1d1f",
      "--text-secondary": "#86868b",
      "--border-glass": "rgba(0, 0, 0, 0.08)",
      "--border-hover": "rgba(0, 0, 0, 0.15)",
      "--nav-bg": "rgba(245, 245, 247, 0.85)",
      "--shadow-nav": "0 10px 40px rgba(0, 0, 0, 0.06)",
      "--shadow-card-hover": "0 20px 40px rgba(0, 0, 0, 0.08)",
      "--btn-indigo-text": "#ffffff",
      "--btn-indigo-text-hover": "#ffffff",
      "--btn-glass-bg": "rgba(0, 0, 0, 0.03)",
      "--btn-glass-bg-hover": "rgba(0, 0, 0, 0.08)",
      "--skill-tag-bg": "rgba(0, 113, 227, 0.08)",
      "--form-bg": "rgba(255, 255, 255, 0.8)",
      "--form-text": "#1d1d1f",
      "--chat-fab-text": "#ffffff",
      "--chat-fab-shadow": "0 10px 30px rgba(0, 113, 227, 0.25)",
      "--chat-fab-shadow-hover": "0 15px 40px rgba(0, 113, 227, 0.4)",
      "--chat-label-bg": "rgba(255, 255, 255, 0.95)",
      "--chat-label-text": "#1d1d1f",
      "--chat-window-bg": "rgba(255, 255, 255, 0.98)",
      "--chat-window-shadow": "0 30px 60px rgba(0, 0, 0, 0.12)",
      "--chat-header-bg": "rgba(0, 0, 0, 0.02)",
      "--message-ai-bg": "rgba(0, 0, 0, 0.04)",
      "--message-user-text": "#ffffff",
      "--chat-input-area-bg": "rgba(255, 255, 255, 0.9)",
      "--chat-input-bg": "rgba(0, 0, 0, 0.03)",
      "--chat-input-text": "#1d1d1f"
    }
  },
  {
    name: "Glassmorphism",
    colors: {
      "--bg-deep": "#0c0a24",
      "--bg-card": "rgba(255, 255, 255, 0.03)",
      "--bg-card-hover": "rgba(255, 255, 255, 0.08)",
      "--accent-primary": "#f43f5e",
      "--accent-secondary": "#3b82f6",
      "--accent-glow": "rgba(244, 63, 94, 0.3)",
      "--text-primary": "#ffffff",
      "--text-secondary": "#cbd5e1",
      "--border-glass": "rgba(255, 255, 255, 0.05)",
      "--border-hover": "rgba(255, 255, 255, 0.15)",
      "--nav-bg": "rgba(12, 10, 36, 0.7)",
      "--shadow-nav": "0 10px 40px rgba(0, 0, 0, 0.4)",
      "--shadow-card-hover": "0 20px 40px rgba(255, 255, 255, 0.05)",
      "--btn-indigo-text": "#ffffff",
      "--btn-indigo-text-hover": "#ffffff",
      "--btn-glass-bg": "rgba(255, 255, 255, 0.02)",
      "--btn-glass-bg-hover": "rgba(255, 255, 255, 0.06)",
      "--skill-tag-bg": "rgba(255, 255, 255, 0.05)",
      "--form-bg": "rgba(255, 255, 255, 0.02)",
      "--form-text": "#ffffff",
      "--chat-fab-text": "#ffffff",
      "--chat-fab-shadow": "0 10px 30px rgba(244, 63, 94, 0.2)",
      "--chat-fab-shadow-hover": "0 15px 40px rgba(244, 63, 94, 0.4)",
      "--chat-label-bg": "rgba(12, 10, 36, 0.9)",
      "--chat-label-text": "#ffffff",
      "--chat-window-bg": "rgba(255, 255, 255, 0.04)",
      "--chat-window-shadow": "0 30px 60px rgba(0, 0, 0, 0.5)",
      "--chat-header-bg": "rgba(255, 255, 255, 0.02)",
      "--message-ai-bg": "rgba(255, 255, 255, 0.03)",
      "--message-user-text": "#ffffff",
      "--chat-input-area-bg": "rgba(12, 10, 36, 0.8)",
      "--chat-input-bg": "rgba(255, 255, 255, 0.04)",
      "--chat-input-text": "#ffffff"
    }
  },
  {
    name: "Soft Pastel",
    colors: {
      "--bg-deep": "#f7f9fa",
      "--bg-card": "rgba(255, 255, 255, 0.7)",
      "--bg-card-hover": "rgba(255, 255, 255, 0.95)",
      "--accent-primary": "#ffb7b2",
      "--accent-secondary": "#ffc6ff",
      "--accent-glow": "rgba(255, 183, 178, 0.3)",
      "--text-primary": "#2d3748",
      "--text-secondary": "#718096",
      "--border-glass": "rgba(255, 183, 178, 0.2)",
      "--border-hover": "rgba(255, 183, 178, 0.5)",
      "--nav-bg": "rgba(247, 249, 250, 0.85)",
      "--shadow-nav": "0 10px 40px rgba(0, 0, 0, 0.04)",
      "--shadow-card-hover": "0 20px 40px rgba(255, 183, 178, 0.1)",
      "--btn-indigo-text": "#2d3748",
      "--btn-indigo-text-hover": "#2d3748",
      "--btn-glass-bg": "rgba(0, 0, 0, 0.02)",
      "--btn-glass-bg-hover": "rgba(0, 0, 0, 0.06)",
      "--skill-tag-bg": "rgba(255, 183, 178, 0.15)",
      "--form-bg": "rgba(255, 255, 255, 0.9)",
      "--form-text": "#2d3748",
      "--chat-fab-text": "#2d3748",
      "--chat-fab-shadow": "0 10px 30px rgba(255, 183, 178, 0.25)",
      "--chat-fab-shadow-hover": "0 15px 40px rgba(255, 183, 178, 0.4)",
      "--chat-label-bg": "rgba(255, 255, 255, 0.95)",
      "--chat-label-text": "#2d3748",
      "--chat-window-bg": "rgba(255, 255, 255, 0.98)",
      "--chat-window-shadow": "0 30px 60px rgba(0, 0, 0, 0.06)",
      "--chat-header-bg": "rgba(0, 0, 0, 0.02)",
      "--message-ai-bg": "rgba(0, 0, 0, 0.03)",
      "--message-user-text": "#2d3748",
      "--chat-input-area-bg": "rgba(255, 255, 255, 0.9)",
      "--chat-input-bg": "rgba(0, 0, 0, 0.02)",
      "--chat-input-text": "#2d3748"
    }
  },
  {
    name: "Lavender",
    colors: {
      "--bg-deep": "#1a162b",
      "--bg-card": "rgba(42, 34, 69, 0.4)",
      "--bg-card-hover": "rgba(42, 34, 69, 0.8)",
      "--accent-primary": "#b39ddb",
      "--accent-secondary": "#d1c4e9",
      "--accent-glow": "rgba(179, 157, 219, 0.3)",
      "--text-primary": "#f3e5f5",
      "--text-secondary": "#b39ddb",
      "--border-glass": "rgba(179, 157, 219, 0.15)",
      "--border-hover": "rgba(179, 157, 219, 0.35)",
      "--nav-bg": "rgba(26, 22, 43, 0.85)",
      "--shadow-nav": "0 10px 40px rgba(0, 0, 0, 0.6)",
      "--shadow-card-hover": "0 20px 40px rgba(179, 157, 219, 0.2)",
      "--btn-indigo-text": "#1a162b",
      "--btn-indigo-text-hover": "#1a162b",
      "--btn-glass-bg": "rgba(179, 157, 219, 0.08)",
      "--btn-glass-bg-hover": "rgba(179, 157, 219, 0.18)",
      "--skill-tag-bg": "rgba(179, 157, 219, 0.15)",
      "--form-bg": "rgba(42, 34, 69, 0.5)",
      "--form-text": "#f3e5f5",
      "--chat-fab-text": "#1a162b",
      "--chat-fab-shadow": "0 10px 30px rgba(179, 157, 219, 0.3)",
      "--chat-fab-shadow-hover": "0 15px 40px rgba(179, 157, 219, 0.5)",
      "--chat-label-bg": "rgba(26, 22, 43, 0.95)",
      "--chat-label-text": "#f3e5f5",
      "--chat-window-bg": "rgba(26, 22, 43, 0.95)",
      "--chat-window-shadow": "0 30px 60px rgba(0, 0, 0, 0.6)",
      "--chat-header-bg": "rgba(42, 34, 69, 0.3)",
      "--message-ai-bg": "rgba(42, 34, 69, 0.3)",
      "--message-user-text": "#1a162b",
      "--chat-input-area-bg": "rgba(26, 22, 43, 0.8)",
      "--chat-input-bg": "rgba(255, 255, 255, 0.06)",
      "--chat-input-text": "#f3e5f5"
    }
  },
  {
    name: "Forest Green",
    colors: {
      "--bg-deep": "#0a1c15",
      "--bg-card": "rgba(15, 46, 36, 0.4)",
      "--bg-card-hover": "rgba(15, 46, 36, 0.85)",
      "--accent-primary": "#2e7d32",
      "--accent-secondary": "#81c784",
      "--accent-glow": "rgba(46, 125, 50, 0.3)",
      "--text-primary": "#e8f5e9",
      "--text-secondary": "#a5d6a7",
      "--border-glass": "rgba(46, 125, 50, 0.2)",
      "--border-hover": "rgba(129, 199, 132, 0.4)",
      "--nav-bg": "rgba(10, 28, 21, 0.9)",
      "--shadow-nav": "0 10px 40px rgba(0, 0, 0, 0.6)",
      "--shadow-card-hover": "0 20px 40px rgba(46, 125, 50, 0.2)",
      "--btn-indigo-text": "#ffffff",
      "--btn-indigo-text-hover": "#ffffff",
      "--btn-glass-bg": "rgba(76, 175, 80, 0.08)",
      "--btn-glass-bg-hover": "rgba(76, 175, 80, 0.18)",
      "--skill-tag-bg": "rgba(76, 175, 80, 0.15)",
      "--form-bg": "rgba(15, 46, 36, 0.5)",
      "--form-text": "#e8f5e9",
      "--chat-fab-text": "#ffffff",
      "--chat-fab-shadow": "0 10px 30px rgba(46, 125, 50, 0.3)",
      "--chat-fab-shadow-hover": "0 15px 40px rgba(46, 125, 50, 0.5)",
      "--chat-label-bg": "rgba(10, 28, 21, 0.95)",
      "--chat-label-text": "#e8f5e9",
      "--chat-window-bg": "rgba(10, 28, 21, 0.95)",
      "--chat-window-shadow": "0 30px 60px rgba(0, 0, 0, 0.6)",
      "--chat-header-bg": "rgba(15, 46, 36, 0.3)",
      "--message-ai-bg": "rgba(15, 46, 36, 0.3)",
      "--message-user-text": "#ffffff",
      "--chat-input-area-bg": "rgba(10, 28, 21, 0.8)",
      "--chat-input-bg": "rgba(255, 255, 255, 0.06)",
      "--chat-input-text": "#e8f5e9"
    }
  },
  {
    name: "Cyber Neon",
    colors: {
      "--bg-deep": "#030008",
      "--bg-card": "rgba(20, 0, 35, 0.5)",
      "--bg-card-hover": "rgba(45, 0, 75, 0.85)",
      "--accent-primary": "#00ffcc",
      "--accent-secondary": "#ff007f",
      "--accent-glow": "rgba(0, 255, 204, 0.35)",
      "--text-primary": "#ffffff",
      "--text-secondary": "#ff007f",
      "--border-glass": "rgba(0, 255, 204, 0.15)",
      "--border-hover": "rgba(255, 0, 127, 0.4)",
      "--nav-bg": "rgba(3, 0, 8, 0.9)",
      "--shadow-nav": "0 10px 40px rgba(0, 0, 0, 0.9)",
      "--shadow-card-hover": "0 20px 40px rgba(0, 255, 204, 0.25)",
      "--btn-indigo-text": "#030008",
      "--btn-indigo-text-hover": "#030008",
      "--btn-glass-bg": "rgba(255, 0, 127, 0.1)",
      "--btn-glass-bg-hover": "rgba(255, 0, 127, 0.22)",
      "--skill-tag-bg": "rgba(0, 255, 204, 0.15)",
      "--form-bg": "rgba(20, 0, 35, 0.6)",
      "--form-text": "#ffffff",
      "--chat-fab-text": "#030008",
      "--chat-fab-shadow": "0 10px 30px rgba(0, 255, 204, 0.4)",
      "--chat-fab-shadow-hover": "0 15px 40px rgba(0, 255, 204, 0.6)",
      "--chat-label-bg": "rgba(3, 0, 8, 0.95)",
      "--chat-label-text": "#ffffff",
      "--chat-window-bg": "rgba(3, 0, 8, 0.95)",
      "--chat-window-shadow": "0 30px 60px rgba(0, 0, 0, 0.9)",
      "--chat-header-bg": "rgba(20, 0, 35, 0.4)",
      "--message-ai-bg": "rgba(20, 0, 35, 0.4)",
      "--message-user-text": "#030008",
      "--chat-input-area-bg": "rgba(3, 0, 8, 0.85)",
      "--chat-input-bg": "rgba(255, 255, 255, 0.06)",
      "--chat-input-text": "#ffffff"
    }
  },
  {
    name: "Minimal Monochrome",
    colors: {
      "--bg-deep": "#ffffff",
      "--bg-card": "rgba(0, 0, 0, 0.02)",
      "--bg-card-hover": "rgba(0, 0, 0, 0.05)",
      "--accent-primary": "#000000",
      "--accent-secondary": "#666666",
      "--accent-glow": "rgba(0, 0, 0, 0.1)",
      "--text-primary": "#000000",
      "--text-secondary": "#666666",
      "--border-glass": "rgba(0, 0, 0, 0.08)",
      "--border-hover": "rgba(0, 0, 0, 0.2)",
      "--nav-bg": "rgba(255, 255, 255, 0.9)",
      "--shadow-nav": "0 10px 40px rgba(0, 0, 0, 0.05)",
      "--shadow-card-hover": "0 20px 40px rgba(0, 0, 0, 0.06)",
      "--btn-indigo-text": "#ffffff",
      "--btn-indigo-text-hover": "#ffffff",
      "--btn-glass-bg": "rgba(0, 0, 0, 0.03)",
      "--btn-glass-bg-hover": "rgba(0, 0, 0, 0.08)",
      "--skill-tag-bg": "rgba(0, 0, 0, 0.04)",
      "--form-bg": "rgba(0, 0, 0, 0.02)",
      "--form-text": "#000000",
      "--chat-fab-text": "#ffffff",
      "--chat-fab-shadow": "0 10px 30px rgba(0, 0, 0, 0.1)",
      "--chat-fab-shadow-hover": "0 15px 40px rgba(0, 0, 0, 0.2)",
      "--chat-label-bg": "rgba(255, 255, 255, 0.95)",
      "--chat-label-text": "#000000",
      "--chat-window-bg": "rgba(255, 255, 255, 0.98)",
      "--chat-window-shadow": "0 30px 60px rgba(0, 0, 0, 0.08)",
      "--chat-header-bg": "rgba(0, 0, 0, 0.02)",
      "--message-ai-bg": "rgba(0, 0, 0, 0.03)",
      "--message-user-text": "#ffffff",
      "--chat-input-area-bg": "rgba(255, 255, 255, 0.9)",
      "--chat-input-bg": "rgba(0, 0, 0, 0.03)",
      "--chat-input-text": "#000000"
    }
  },
  {
    name: "Premium SaaS",
    colors: {
      "--bg-deep": "#0a0b10",
      "--bg-card": "rgba(16, 17, 28, 0.4)",
      "--bg-card-hover": "rgba(22, 24, 40, 0.8)",
      "--accent-primary": "#4f46e5",
      "--accent-secondary": "#06b6d4",
      "--accent-glow": "rgba(79, 70, 229, 0.25)",
      "--text-primary": "#f8fafc",
      "--text-secondary": "#94a3b8",
      "--border-glass": "rgba(255, 255, 255, 0.06)",
      "--border-hover": "rgba(79, 70, 229, 0.3)",
      "--nav-bg": "rgba(10, 11, 16, 0.9)",
      "--shadow-nav": "0 10px 40px rgba(0, 0, 0, 0.6)",
      "--shadow-card-hover": "0 20px 40px rgba(79, 70, 229, 0.15)",
      "--btn-indigo-text": "#ffffff",
      "--btn-indigo-text-hover": "#ffffff",
      "--btn-glass-bg": "rgba(255, 255, 255, 0.04)",
      "--btn-glass-bg-hover": "rgba(255, 255, 255, 0.08)",
      "--skill-tag-bg": "rgba(79, 70, 229, 0.12)",
      "--form-bg": "rgba(16, 17, 28, 0.5)",
      "--form-text": "#f8fafc",
      "--chat-fab-text": "#ffffff",
      "--chat-fab-shadow": "0 10px 30px rgba(79, 70, 229, 0.3)",
      "--chat-fab-shadow-hover": "0 15px 40px rgba(79, 70, 229, 0.5)",
      "--chat-label-bg": "rgba(10, 11, 16, 0.95)",
      "--chat-label-text": "#f8fafc",
      "--chat-window-bg": "rgba(10, 11, 16, 0.95)",
      "--chat-window-shadow": "0 30px 60px rgba(0, 0, 0, 0.6)",
      "--chat-header-bg": "rgba(16, 17, 28, 0.3)",
      "--message-ai-bg": "rgba(16, 17, 28, 0.3)",
      "--message-user-text": "#ffffff",
      "--chat-input-area-bg": "rgba(10, 11, 16, 0.8)",
      "--chat-input-bg": "rgba(255, 255, 255, 0.06)",
      "--chat-input-text": "#f8fafc"
    }
  },
  {
    name: "Elegant Corporate",
    colors: {
      "--bg-deep": "#0f172a",
      "--bg-card": "rgba(30, 41, 59, 0.4)",
      "--bg-card-hover": "rgba(30, 41, 59, 0.85)",
      "--accent-primary": "#3b82f6",
      "--accent-secondary": "#1e40af",
      "--accent-glow": "rgba(59, 82, 246, 0.2)",
      "--text-primary": "#f8fafc",
      "--text-secondary": "#94a3b8",
      "--border-glass": "rgba(255, 255, 255, 0.08)",
      "--border-hover": "rgba(59, 82, 246, 0.3)",
      "--nav-bg": "rgba(15, 23, 42, 0.9)",
      "--shadow-nav": "0 10px 40px rgba(0, 0, 0, 0.6)",
      "--shadow-card-hover": "0 20px 40px rgba(59, 82, 246, 0.15)",
      "--btn-indigo-text": "#ffffff",
      "--btn-indigo-text-hover": "#ffffff",
      "--btn-glass-bg": "rgba(255, 255, 255, 0.05)",
      "--btn-glass-bg-hover": "rgba(255, 255, 255, 0.1)",
      "--skill-tag-bg": "rgba(59, 82, 246, 0.12)",
      "--form-bg": "rgba(30, 41, 59, 0.5)",
      "--form-text": "#f8fafc",
      "--chat-fab-text": "#ffffff",
      "--chat-fab-shadow": "0 10px 30px rgba(59, 82, 246, 0.3)",
      "--chat-fab-shadow-hover": "0 15px 40px rgba(59, 82, 246, 0.5)",
      "--chat-label-bg": "rgba(15, 23, 42, 0.95)",
      "--chat-label-text": "#f8fafc",
      "--chat-window-bg": "rgba(15, 23, 42, 0.95)",
      "--chat-window-shadow": "0 30px 60px rgba(0, 0, 0, 0.6)",
      "--chat-header-bg": "rgba(30, 41, 59, 0.3)",
      "--message-ai-bg": "rgba(30, 41, 59, 0.3)",
      "--message-user-text": "#ffffff",
      "--chat-input-area-bg": "rgba(15, 23, 42, 0.8)",
      "--chat-input-bg": "rgba(255, 255, 255, 0.06)",
      "--chat-input-text": "#f8fafc"
    }
  },
  {
    name: "Fintech Blue",
    colors: {
      "--bg-deep": "#020813",
      "--bg-card": "rgba(10, 25, 47, 0.4)",
      "--bg-card-hover": "rgba(10, 25, 47, 0.85)",
      "--accent-primary": "#00f0ff",
      "--accent-secondary": "#0072ff",
      "--accent-glow": "rgba(0, 240, 255, 0.3)",
      "--text-primary": "#e2f1ff",
      "--text-secondary": "#8ab2d9",
      "--border-glass": "rgba(0, 240, 255, 0.12)",
      "--border-hover": "rgba(0, 240, 255, 0.35)",
      "--nav-bg": "rgba(2, 8, 19, 0.9)",
      "--shadow-nav": "0 10px 40px rgba(0, 0, 0, 0.7)",
      "--shadow-card-hover": "0 20px 40px rgba(0, 240, 255, 0.2)",
      "--btn-indigo-text": "#020813",
      "--btn-indigo-text-hover": "#020813",
      "--btn-glass-bg": "rgba(0, 240, 255, 0.08)",
      "--btn-glass-bg-hover": "rgba(0, 240, 255, 0.18)",
      "--skill-tag-bg": "rgba(0, 240, 255, 0.12)",
      "--form-bg": "rgba(10, 25, 47, 0.5)",
      "--form-text": "#e2f1ff",
      "--chat-fab-text": "#020813",
      "--chat-fab-shadow": "0 10px 30px rgba(0, 240, 255, 0.3)",
      "--chat-fab-shadow-hover": "0 15px 40px rgba(0, 240, 255, 0.5)",
      "--chat-label-bg": "rgba(2, 8, 19, 0.95)",
      "--chat-label-text": "#e2f1ff",
      "--chat-window-bg": "rgba(2, 8, 19, 0.95)",
      "--chat-window-shadow": "0 30px 60px rgba(0, 0, 0, 0.7)",
      "--chat-header-bg": "rgba(10, 25, 47, 0.3)",
      "--message-ai-bg": "rgba(10, 25, 47, 0.3)",
      "--message-user-text": "#020813",
      "--chat-input-area-bg": "rgba(2, 8, 19, 0.8)",
      "--chat-input-bg": "rgba(255, 255, 255, 0.06)",
      "--chat-input-text": "#e2f1ff"
    }
  },
  {
    name: "Warm Beige",
    colors: {
      "--bg-deep": "#fcfbf7",
      "--bg-card": "rgba(240, 237, 229, 0.6)",
      "--bg-card-hover": "rgba(240, 237, 229, 0.95)",
      "--accent-primary": "#c7a75c",
      "--accent-secondary": "#5c5033",
      "--accent-glow": "rgba(199, 167, 92, 0.25)",
      "--text-primary": "#3a3528",
      "--text-secondary": "#7c725c",
      "--border-glass": "rgba(199, 167, 92, 0.15)",
      "--border-hover": "rgba(199, 167, 92, 0.35)",
      "--nav-bg": "rgba(252, 251, 247, 0.85)",
      "--shadow-nav": "0 10px 40px rgba(0, 0, 0, 0.05)",
      "--shadow-card-hover": "0 20px 40px rgba(199, 167, 92, 0.1)",
      "--btn-indigo-text": "#ffffff",
      "--btn-indigo-text-hover": "#ffffff",
      "--btn-glass-bg": "rgba(92, 80, 51, 0.05)",
      "--btn-glass-bg-hover": "rgba(92, 80, 51, 0.1)",
      "--skill-tag-bg": "rgba(199, 167, 92, 0.15)",
      "--form-bg": "rgba(240, 237, 229, 0.8)",
      "--form-text": "#3a3528",
      "--chat-fab-text": "#ffffff",
      "--chat-fab-shadow": "0 10px 30px rgba(199, 167, 92, 0.25)",
      "--chat-fab-shadow-hover": "0 15px 40px rgba(199, 167, 92, 0.4)",
      "--chat-label-bg": "rgba(252, 251, 247, 0.95)",
      "--chat-label-text": "#3a3528",
      "--chat-window-bg": "rgba(252, 251, 247, 0.98)",
      "--chat-window-shadow": "0 30px 60px rgba(0, 0, 0, 0.08)",
      "--chat-header-bg": "rgba(0, 0, 0, 0.02)",
      "--message-ai-bg": "rgba(0, 0, 0, 0.03)",
      "--message-user-text": "#ffffff",
      "--chat-input-area-bg": "rgba(252, 251, 247, 0.9)",
      "--chat-input-bg": "rgba(0, 0, 0, 0.02)",
      "--chat-input-text": "#3a3528"
    }
  },
  {
    name: "Aurora Gradient",
    colors: {
      "--bg-deep": "#080614",
      "--bg-card": "rgba(30, 20, 50, 0.4)",
      "--bg-card-hover": "rgba(30, 20, 50, 0.8)",
      "--accent-primary": "#00f5d4",
      "--accent-secondary": "#7b2cbf",
      "--accent-glow": "rgba(0, 245, 212, 0.3)",
      "--text-primary": "#f3e8ff",
      "--text-secondary": "#c084fc",
      "--border-glass": "rgba(0, 245, 212, 0.15)",
      "--border-hover": "rgba(192, 132, 252, 0.4)",
      "--nav-bg": "rgba(8, 6, 20, 0.9)",
      "--shadow-nav": "0 10px 40px rgba(0, 0, 0, 0.7)",
      "--shadow-card-hover": "0 20px 40px rgba(0, 245, 212, 0.2)",
      "--btn-indigo-text": "#080614",
      "--btn-indigo-text-hover": "#080614",
      "--btn-glass-bg": "rgba(123, 44, 191, 0.12)",
      "--btn-glass-bg-hover": "rgba(123, 44, 191, 0.22)",
      "--skill-tag-bg": "rgba(0, 245, 212, 0.15)",
      "--form-bg": "rgba(30, 20, 50, 0.5)",
      "--form-text": "#f3e8ff",
      "--chat-fab-text": "#080614",
      "--chat-fab-shadow": "0 10px 30px rgba(0, 245, 212, 0.3)",
      "--chat-fab-shadow-hover": "0 15px 40px rgba(0, 245, 212, 0.5)",
      "--chat-label-bg": "rgba(8, 6, 20, 0.95)",
      "--chat-label-text": "#f3e8ff",
      "--chat-window-bg": "rgba(8, 6, 20, 0.95)",
      "--chat-window-shadow": "0 30px 60px rgba(0, 0, 0, 0.7)",
      "--chat-header-bg": "rgba(30, 20, 50, 0.3)",
      "--message-ai-bg": "rgba(30, 20, 50, 0.3)",
      "--message-user-text": "#080614",
      "--chat-input-area-bg": "rgba(8, 6, 20, 0.8)",
      "--chat-input-bg": "rgba(255, 255, 255, 0.06)",
      "--chat-input-text": "#f3e8ff"
    }
  }
];

export default function ThemeSwitcher() {
  const pathname = usePathname();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("selected-theme");
    let initialIdx = 0;
    if (savedTheme) {
      const idx = themes.findIndex((t) => t.name === savedTheme);
      if (idx !== -1) {
        initialIdx = idx;
      }
    }
    setCurrentIdx(initialIdx);

    // Apply initial theme
    const theme = themes[initialIdx];
    Object.entries(theme.colors).forEach(([prop, val]) => {
      document.documentElement.style.setProperty(prop, val);
    });
  }, []);

  const handleThemeChange = (idx: number) => {
    setCurrentIdx(idx);
    const theme = themes[idx];
    Object.entries(theme.colors).forEach(([prop, val]) => {
      document.documentElement.style.setProperty(prop, val);
    });
    localStorage.setItem("selected-theme", theme.name);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted || pathname?.startsWith("/admin")) {
    return null;
  }

  const currentTheme = themes[currentIdx] || themes[0];

  return (
    <div className="theme-switcher-container" ref={dropdownRef}>
      <button
        className="theme-switcher-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select Theme"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 256 256"
          style={{ marginRight: "8px", color: "var(--accent-primary)" }}
        >
          <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM72,112a16,16,0,1,1,16,16A16,16,0,0,1,72,112Zm40-40a16,16,0,1,1,16,16A16,16,0,0,1,112,72Zm56,16a16,16,0,1,1,16-16A16,16,0,0,1,168,88Zm16,56a16,16,0,1,1,16-16A16,16,0,0,1,184,144Z"></path>
        </svg>
        <span className="theme-switcher-name">{currentTheme.name}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          fill="currentColor"
          viewBox="0 0 256 256"
          className={`chevron-icon ${isOpen ? "open" : ""}`}
          style={{ marginLeft: "8px", transition: "transform 0.2s ease" }}
        >
          <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80a8,8,0,0,1,11.32-11.32L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
        </svg>
      </button>

      {isOpen && (
        <div className="theme-dropdown">
          <div className="theme-dropdown-header">Select Theme</div>
          <div className="theme-list">
            {themes.map((theme, idx) => (
              <button
                key={theme.name}
                className={`theme-item ${idx === currentIdx ? "active" : ""}`}
                onClick={() => handleThemeChange(idx)}
              >
                <span
                  className="theme-color-preview"
                  style={{
                    background: `linear-gradient(135deg, ${theme.colors["--accent-primary"]}, ${theme.colors["--bg-deep"]})`,
                  }}
                />
                <span className="theme-item-name">{theme.name}</span>
                {idx === currentIdx && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                    className="check-icon"
                  >
                    <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L100,192.69,218.34,74.34a8,8,0,0,1,11.32,11.32Z"></path>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .theme-switcher-container {
          position: fixed;
          top: 28px;
          right: 32px;
          z-index: 9999;
        }

        .theme-switcher-btn {
          display: flex;
          align-items: center;
          background: var(--nav-bg);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--border-glass);
          color: var(--text-primary);
          padding: 10px 18px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.8rem;
          letter-spacing: 0.5px;
          box-shadow: var(--shadow-nav);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .theme-switcher-btn:hover {
          border-color: var(--border-hover);
          transform: translateY(-1px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), var(--accent-glow);
        }

        .chevron-icon.open {
          transform: rotate(180deg);
        }

        .theme-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 10px;
          width: 240px;
          background: var(--chat-window-bg);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1px solid var(--border-glass);
          border-radius: 16px;
          box-shadow: var(--chat-window-shadow);
          overflow: hidden;
          animation: slideDown 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .theme-dropdown-header {
          padding: 12px 16px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-secondary);
          border-bottom: 1px solid var(--border-glass);
          background: var(--chat-header-bg);
        }

        .theme-list {
          max-height: 320px;
          overflow-y: auto;
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .theme-list::-webkit-scrollbar {
          width: 4px;
        }
        .theme-list::-webkit-scrollbar-thumb {
          background: var(--border-glass);
          border-radius: 4px;
        }
        .theme-list::-webkit-scrollbar-thumb:hover {
          background: var(--accent-primary);
        }

        .theme-item {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 8px 12px;
          border: none;
          background: transparent;
          color: var(--text-secondary);
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 500;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .theme-item:hover {
          background: var(--btn-glass-bg-hover);
          color: var(--text-primary);
        }

        .theme-item.active {
          color: var(--text-primary);
          background: var(--btn-glass-bg-hover);
        }

        .theme-color-preview {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin-right: 10px;
          flex-shrink: 0;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .theme-item-name {
          flex: 1;
        }

        .check-icon {
          color: var(--accent-primary);
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .theme-switcher-container {
            top: unset;
            bottom: 28px;
            left: 28px;
            right: unset;
          }
          
          .theme-dropdown {
            top: unset;
            bottom: 100%;
            left: 0;
            right: unset;
            margin-top: 0;
            margin-bottom: 10px;
          }
        }
      ` }} />
    </div>
  );
}
