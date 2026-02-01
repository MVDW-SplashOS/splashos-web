import React, {
    CSSProperties,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react";

interface AnimatedGradientTextProps {
    text: string;
    className?: string;
    colors?: string[];
    speed?: number;
    blur?: number;
    particleCount?: number;
    fontSize?: string;
    fontFamily?: string;
    fontWeight?: string | number;
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
    baseColor: string;
    life: number;
    maxLife: number;
    pulseSeed: number;
}

interface Dimensions {
    width: number;
    height: number;
    font: string;
}

const DEFAULT_COLORS = ["#7DD3FC", "#60A5FA", "#A78BFA", "#F472B6", "#FCD34D"];

const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

const useIsomorphicLayoutEffect =
    typeof window === "undefined" ? useEffect : useLayoutEffect;

const createParticles = (
    count: number,
    palette: string[],
    width: number,
    height: number,
): Particle[] => {
    return Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: 30 + Math.random() * 45,
        color: palette[Math.floor(Math.random() * palette.length)],
        baseColor: palette[Math.floor(Math.random() * palette.length)],
        life: 0,
        maxLife: 600 + Math.random() * 600,
        pulseSeed: Math.random() * Math.PI * 2,
    }));
};

const mixColors = (color1: string, color2: string, ratio: number): string => {
    const hex = (color: string) => color.replace("#", "");
    const h1 = hex(color1);
    const h2 = hex(color2);

    const r1 = parseInt(h1.substring(0, 2), 16);
    const g1 = parseInt(h1.substring(2, 4), 16);
    const b1 = parseInt(h1.substring(4, 6), 16);

    const r2 = parseInt(h2.substring(0, 2), 16);
    const g2 = parseInt(h2.substring(2, 4), 16);
    const b2 = parseInt(h2.substring(4, 6), 16);

    const r = Math.round(r1 * (1 - ratio) + r2 * ratio);
    const g = Math.round(g1 * (1 - ratio) + g2 * ratio);
    const b = Math.round(b1 * (1 - ratio) + b2 * ratio);

    return `#${r.toString(16).padStart(2, "0")}${g
        .toString(16)
        .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
};

const AnimatedGradientText: React.FC<AnimatedGradientTextProps> = ({
    text,
    className = "",
    colors,
    speed = 0.8,
    blur = 22,
    particleCount = 36,
    fontSize = "inherit",
    fontFamily = "inherit",
    fontWeight = "inherit",
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const textSizerRef = useRef<HTMLSpanElement>(null);
    const animationRef = useRef<number>();
    const particlesRef = useRef<Particle[]>([]);
    const [dimensions, setDimensions] = useState<Dimensions>({
        width: 0,
        height: 0,
        font: "",
    });

    const palette = useMemo(
        () => (colors && colors.length > 0 ? colors : DEFAULT_COLORS),
        [colors?.join(",") ?? "default"],
    );

    const srOnlyStyles: CSSProperties = {
        position: "absolute",
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: "hidden",
        clip: "rect(0 0 0 0)",
        border: 0,
        whiteSpace: "nowrap",
    };

    useIsomorphicLayoutEffect(() => {
        const target = textSizerRef.current;
        if (!target) return;

        const updateDimensions = (rect?: DOMRectReadOnly) => {
            const bounds = rect ?? target.getBoundingClientRect();
            const computed =
                typeof window !== "undefined"
                    ? window.getComputedStyle(target)
                    : null;

            const measuredWidth = Math.max(bounds.width, 1);
            const measuredHeight = Math.max(
                bounds.height ||
                    (computed?.lineHeight && computed.lineHeight !== "normal"
                        ? parseFloat(computed.lineHeight)
                        : computed?.fontSize
                          ? parseFloat(computed.fontSize)
                          : 1),
                1,
            );
            const fontString =
                computed?.font && computed.font !== ""
                    ? computed.font
                    : `${fontWeight ?? "600"} ${fontSize ?? "2rem"} ${
                          fontFamily ?? "sans-serif"
                      }`;

            setDimensions((prev) => {
                if (
                    Math.abs(prev.width - measuredWidth) < 0.5 &&
                    Math.abs(prev.height - measuredHeight) < 0.5 &&
                    prev.font === fontString
                ) {
                    return prev;
                }
                return {
                    width: measuredWidth,
                    height: measuredHeight,
                    font: fontString,
                };
            });
        };

        updateDimensions();

        if (typeof ResizeObserver !== "undefined") {
            const observer = new ResizeObserver((entries) => {
                const entry = entries.find((e) => e.target === target);
                if (entry) updateDimensions(entry.contentRect);
            });
            observer.observe(target);
            return () => observer.disconnect();
        }

        const handleResize = () => updateDimensions();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [fontFamily, fontSize, fontWeight, text]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !dimensions.width || !dimensions.height) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr =
            typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
        canvas.width = Math.round(dimensions.width * dpr);
        canvas.height = Math.round(dimensions.height * dpr);
        canvas.style.width = `${dimensions.width}px`;
        canvas.style.height = `${dimensions.height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const count = clamp(Math.round(particleCount), 8, 80);
        particlesRef.current = createParticles(
            count,
            palette,
            dimensions.width,
            dimensions.height,
        );

        const drawText = (mode: "fill" | "stroke") => {
            ctx.font = dimensions.font;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            const x = dimensions.width / 2;
            const y = dimensions.height / 2;
            if (mode === "fill") {
                ctx.fillText(text, x, y);
            } else {
                ctx.strokeText(text, x, y);
            }
        };

        const animate = (timestamp: number) => {
            if (!ctx) return;

            const width = dimensions.width;
            const height = dimensions.height;
            const baseSpeed = Math.max(speed, 0.2);
            const travel = width * 1.5;
            const shift =
                ((timestamp * 0.00012 * baseSpeed) % 1) * travel - travel / 2;

            ctx.clearRect(0, 0, width, height);

            const gradient = ctx.createLinearGradient(
                shift,
                0,
                shift + travel,
                height,
            );
            if (palette.length === 1) {
                gradient.addColorStop(0, palette[0]);
                gradient.addColorStop(1, palette[0]);
            } else {
                const lastIndex = palette.length - 1;
                palette.forEach((color, index) => {
                    gradient.addColorStop(index / lastIndex, color);
                });
            }
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            ctx.save();
            ctx.globalCompositeOperation = "destination-in";
            drawText("fill");
            ctx.restore();

            ctx.save();
            ctx.globalCompositeOperation = "source-atop";
            ctx.lineWidth = Math.max(width, height) * 0.012;
            ctx.strokeStyle = "rgba(255,255,255,0.18)";
            drawText("stroke");
            ctx.restore();

            ctx.save();
            ctx.globalCompositeOperation = "source-atop";
            ctx.filter = `blur(${blur}px) saturate(135%)`;

            particlesRef.current.forEach((particle, _, particles) => {
                particle.life += 1;
                if (particle.life > particle.maxLife) {
                    particle.life = 0;
                    particle.baseColor =
                        palette[Math.floor(Math.random() * palette.length)];
                }

                particle.x += particle.vx * baseSpeed * 1.1;
                particle.y += particle.vy * baseSpeed * 1.1;

                if (particle.x < 0 || particle.x > width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > height) particle.vy *= -1;

                particle.x = clamp(particle.x, 0, width);
                particle.y = clamp(particle.y, 0, height);

                let mixedColor = particle.baseColor;
                particles.forEach((other) => {
                    if (other === particle) return;
                    const dx = particle.x - other.x;
                    const dy = particle.y - other.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const range = Math.max(particle.radius, 90);
                    if (dist < range) {
                        const influence = 1 - dist / range;
                        mixedColor = mixColors(
                            mixedColor,
                            other.baseColor,
                            influence * 0.35,
                        );
                    }
                });
                particle.color = mixedColor;

                const pulse =
                    0.9 +
                    Math.sin(timestamp * 0.0012 + particle.pulseSeed) * 0.25;
                const radius = particle.radius * pulse;

                const paint = ctx.createRadialGradient(
                    particle.x,
                    particle.y,
                    radius * 0.2,
                    particle.x,
                    particle.y,
                    radius,
                );
                paint.addColorStop(0, `${particle.color}ff`);
                paint.addColorStop(0.45, `${particle.color}d0`);
                paint.addColorStop(1, `${particle.color}00`);

                ctx.globalAlpha = 0.25 + pulse * 0.35;
                ctx.fillStyle = paint;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
                ctx.fill();
            });

            ctx.restore();

            ctx.save();
            ctx.globalCompositeOperation = "source-atop";
            ctx.globalAlpha = 0.18;
            ctx.shadowColor = "rgba(255,255,255,0.9)";
            ctx.shadowBlur = Math.max(width, height) * 0.08;
            drawText("fill");
            ctx.restore();

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [
        blur,
        dimensions.font,
        dimensions.height,
        dimensions.width,
        palette,
        particleCount,
        speed,
        text,
    ]);

    return (
        <span
            className={`relative inline-block ${className}`.trim()}
            style={{ fontSize, fontFamily, fontWeight }}
            role="text"
            aria-label={text}
        >
            <canvas
                ref={canvasRef}
                aria-hidden="true"
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                }}
            />
            <span
                ref={textSizerRef}
                aria-hidden="true"
                style={{
                    display: "inline-block",
                    visibility: "hidden",
                    userSelect: "none",
                    pointerEvents: "none",
                    opacity: 0,
                    whiteSpace: "nowrap",
                }}
            >
                {text}
            </span>
            <span style={srOnlyStyles}>{text}</span>
        </span>
    );
};

export default AnimatedGradientText;
