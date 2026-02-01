/**
 * Theme utility for detecting and managing system theme preferences
 */

// Theme storage key
const THEME_STORAGE_KEY = "theme";

// Theme types
export type Theme = "light" | "dark" | "system";

/**
 * Initialize theme detection and apply appropriate theme
 * This should be called as early as possible in the application
 */
export function initializeTheme(): void {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
        document.documentElement.classList.add("dark");
    } else if (savedTheme === "light") {
        document.documentElement.classList.remove("dark");
    }

    // Add transition-ready class after a short delay to prevent initial transition
    setTimeout(() => {
        document.documentElement.classList.add("theme-transition-ready");
    }, 10);

    // Listen for system theme changes
    window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => {
            // Only update if user hasn't set a manual preference
            if (!localStorage.getItem(THEME_STORAGE_KEY)) {
                if (e.matches) {
                    document.documentElement.classList.add("dark");
                } else {
                    document.documentElement.classList.remove("dark");
                }
            }
        });
}

/**
 * Get the current theme
 * @returns The current theme (light, dark, or system)
 */
export function getCurrentTheme(): Theme {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
    }
    return "system";
}

/**
 * Get the effective theme (resolves 'system' to actual light/dark)
 * @returns The effective theme (light or dark)
 */
export function getEffectiveTheme(): "light" | "dark" {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;

    if (savedTheme === "light") {
        return "light";
    }

    if (savedTheme === "dark") {
        return "dark";
    }

    // System preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
}

/**
 * Set the theme
 * @param theme The theme to set (light, dark, or system)
 */
export function setTheme(theme: Theme): void {
    const html = document.documentElement;

    // Ensure transitions are enabled
    if (!html.classList.contains("theme-transition-ready")) {
        html.classList.add("theme-transition-ready");
    }

    if (theme === "system") {
        localStorage.removeItem(THEME_STORAGE_KEY);
        const systemPrefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)",
        ).matches;
        if (systemPrefersDark) {
            html.classList.add("dark");
        } else {
            html.classList.remove("dark");
        }
    } else {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
        if (theme === "dark") {
            html.classList.add("dark");
        } else {
            html.classList.remove("dark");
        }
    }
}

/**
 * Toggle between light and dark themes
 * If current theme is 'system', switches to opposite of system preference
 */
export function toggleTheme(): void {
    const currentTheme = getCurrentTheme();
    const effectiveTheme = getEffectiveTheme();

    if (currentTheme === "system") {
        // If using system, switch to opposite of current system preference
        setTheme(effectiveTheme === "dark" ? "light" : "dark");
    } else {
        // If using manual theme, toggle between light and dark
        setTheme(currentTheme === "dark" ? "light" : "dark");
    }
}

/**
 * Check if dark mode is currently active
 * @returns True if dark mode is active
 */
export function isDarkMode(): boolean {
    return document.documentElement.classList.contains("dark");
}

/**
 * Get system theme preference
 * @returns True if system prefers dark mode
 */
export function systemPrefersDark(): boolean {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

// Initialize theme when module is loaded
if (typeof window !== "undefined") {
    initializeTheme();
}
