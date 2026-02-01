import React from "react";
import { cn } from "@/lib/utils";

interface PulseProps {
    className?: string;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    color?: string; // Tailwind color class like "bg-blue-500", "bg-primary", etc.
    pulseFrom?: string; // Tailwind color class for starting color
    pulseTo?: string; // Tailwind color class for ending color
    showLabel?: boolean;
    label?: string;
}

// Map of Tailwind color classes to CSS custom property values
const tailwindColorMap: Record<string, string> = {
    // Primary colors
    "bg-primary": "hsl(var(--primary))",
    "bg-primary-foreground": "hsl(var(--primary-foreground))",

    // Background colors
    "bg-background": "hsl(var(--background))",
    "bg-foreground": "hsl(var(--foreground))",
    "bg-card": "hsl(var(--card))",
    "bg-card-foreground": "hsl(var(--card-foreground))",
    "bg-muted": "hsl(var(--muted))",
    "bg-muted-foreground": "hsl(var(--muted-foreground))",
    "bg-accent": "hsl(var(--accent))",
    "bg-accent-foreground": "hsl(var(--accent-foreground))",

    // Standard Tailwind colors (500 variants)
    "bg-gray-500": "#6b7280",
    "bg-blue-500": "#3b82f6",
    "bg-green-500": "#10b981",
    "bg-emerald-500": "#10b981",
    "bg-red-500": "#ef4444",
    "bg-yellow-500": "#f59e0b",
    "bg-purple-500": "#8b5cf6",
    "bg-pink-500": "#ec4899",
    "bg-indigo-500": "#6366f1",
    "bg-teal-500": "#14b8a6",
    "bg-orange-500": "#f97316",

    // Lighter variants (400)
    "bg-gray-400": "#9ca3af",
    "bg-blue-400": "#60a5fa",
    "bg-green-400": "#34d399",
    "bg-emerald-400": "#34d399",
    "bg-red-400": "#f87171",
    "bg-purple-400": "#a78bfa",

    // Darker variants (600)
    "bg-gray-600": "#4b5563",
    "bg-blue-600": "#2563eb",
    "bg-green-600": "#059669",
    "bg-emerald-600": "#059669",
    "bg-red-600": "#dc2626",
    "bg-purple-600": "#7c3aed",
};

// Helper function to get CSS value from Tailwind class
const getColorValue = (tailwindClass: string): string => {
    // If it's already a hex color or CSS function, return as-is
    if (
        tailwindClass.startsWith("#") ||
        tailwindClass.startsWith("rgb") ||
        tailwindClass.startsWith("hsl") ||
        tailwindClass.startsWith("var(")
    ) {
        return tailwindClass;
    }

    // Look up in our map
    return tailwindColorMap[tailwindClass] || tailwindColorMap["bg-primary"];
};

const Pulse: React.FC<PulseProps> = ({
    className = "",
    size = "md",
    color = "bg-primary",
    pulseFrom,
    pulseTo,
    showLabel = false,
    label = "Pulsing indicator",
}) => {
    const sizeClasses = {
        xs: "h-1.5 w-1.5",
        sm: "h-2 w-2",
        md: "h-3 w-3",
        lg: "h-4 w-4",
        xl: "h-5 w-5",
    };

    // Generate unique ID for custom animation
    const animationId = React.useId();

    // Check if we have custom pulse colors
    const hasCustomPulse = pulseFrom && pulseTo;

    return (
        <div className="inline-flex items-center">
            {/* Inject custom animation styles if pulseFrom and pulseTo are provided */}
            {hasCustomPulse && (
                <style>
                    {`
                    @keyframes pulse-custom-${animationId} {
                        0%, 100% {
                            background-color: ${getColorValue(pulseFrom)};
                        }
                        50% {
                            background-color: ${getColorValue(pulseTo)};
                        }
                    }
                    .animate-pulse-custom-${animationId} {
                        animation: pulse-custom-${animationId} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                    }
                    `}
                </style>
            )}

            <span
                className={cn(
                    sizeClasses[size],
                    "rounded-full",
                    // Use custom animation class if pulseFrom/pulseTo provided, otherwise use regular color
                    hasCustomPulse
                        ? `animate-pulse-custom-${animationId}`
                        : `${color} animate-pulse`,
                    className,
                )}
                style={
                    hasCustomPulse
                        ? {
                              // Set initial background color
                              backgroundColor: getColorValue(pulseFrom),
                          }
                        : undefined
                }
                aria-label={label}
            />

            {showLabel && label && (
                <span className="ml-2 text-xs text-muted-foreground">
                    {label}
                </span>
            )}
        </div>
    );
};

export { Pulse };
