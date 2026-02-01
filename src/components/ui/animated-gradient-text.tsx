import React, {
    type CSSProperties,
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

const hexToRgb = (hex: string): [number, number, number] => {
    const value = hex.replace("#", "");
    const r = parseInt(value.substring(0, 2), 16);
    const g = parseInt(value.substring(2, 4), 16);
    const b = parseInt(value.substring(4, 6), 16);
    return [r / 255, g / 255, b / 255];
};

const buildPaletteUniform = (palette: string[]) => {
    const slots = 8;
    const data = new Float32Array(slots * 3);
    const normalized =
        palette.length > 0 ? palette : DEFAULT_COLORS.slice(0, 1);
    for (let i = 0; i < slots; i += 1) {
        const color = normalized[Math.min(i, normalized.length - 1)];
        const [r, g, b] = hexToRgb(color);
        data[i * 3] = r;
        data[i * 3 + 1] = g;
        data[i * 3 + 2] = b;
    }
    return data;
};

const vertexShaderSource = `
attribute vec2 a_position;
attribute vec2 a_uv;
varying vec2 v_uv;

void main() {
    v_uv = a_uv;
    gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fragmentShaderSource = `
precision highp float;

varying vec2 v_uv;

uniform sampler2D u_mask;
uniform float u_time;
uniform float u_speed;
uniform float u_noiseStrength;
uniform vec2 u_maskSize;
uniform vec2 u_maskOffset;

uniform int u_colorCount;
uniform vec3 u_colors[8];

vec3 colorAtIndex(int idx) {
    vec3 color = u_colors[0];
    for (int i = 0; i < 8; i++) {
        if (i == idx) {
            color = u_colors[i];
        }
    }
    return color;
}

vec3 gradientColor(float t) {
    if (u_colorCount <= 1) {
        return u_colors[0];
    }
    float scaled = t * float(u_colorCount - 1);
    int idx = int(floor(scaled));
    float frac = fract(scaled);
    int nextIdx = idx + 1;
    if (nextIdx >= u_colorCount) {
        nextIdx = u_colorCount - 1;
    }
    vec3 c0 = colorAtIndex(idx);
    vec3 c1 = colorAtIndex(nextIdx);
    return mix(c0, c1, frac);
}

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.55;
    for (int i = 0; i < 4; i++) {
        value += amplitude * noise(p);
        p *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

void main() {
    vec2 uv = v_uv;
    float time = u_time * u_speed;

    vec2 flow = vec2(
        fbm(uv * 2.0 + time * 0.15),
        fbm(uv * 2.0 - time * 0.12)
    );
    vec2 warped = uv + (flow - 0.5) * 0.35;

    float baseField = fbm(warped * 3.2 + time * 0.1);
    float detailField = fbm(warped * 5.6 - time * 0.08);
    float band = mix(baseField, detailField, 0.35);
    band = smoothstep(0.12, 0.88, band);

    vec3 base = gradientColor(band);

    float accent = fbm(warped * 8.0 + time * 0.2);
    vec3 accentColor = gradientColor(fract(band + (accent - 0.5) * 0.18));
    base = mix(base, accentColor, 0.18);

    base += u_noiseStrength * 0.025;
    base = clamp(base, 0.0, 1.0);

    vec2 maskUv = (uv * u_maskSize + u_maskOffset) / (u_maskSize + u_maskOffset * 2.0);
    float alpha = texture2D(u_mask, vec2(maskUv.x, 1.0 - maskUv.y)).a;
    vec3 color = base * alpha;
    gl_FragColor = vec4(color, alpha);
}
`;

const createShader = (
    gl: WebGLRenderingContext,
    type: number,
    source: string,
) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
    }
    return shader;
};

const createProgram = (
    gl: WebGLRenderingContext,
    vertexSource: string,
    fragmentSource: string,
) => {
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
    if (!vertexShader || !fragmentShader) return null;

    const program = gl.createProgram();
    if (!program) return null;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        gl.deleteProgram(program);
        return null;
    }

    return program;
};

const AnimatedGradientText: React.FC<AnimatedGradientTextProps> = ({
    text,
    className = "",
    colors,
    speed = 5,
    blur = 22,
    particleCount = 36,
    fontSize = "inherit",
    fontFamily = "inherit",
    fontWeight = "inherit",
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const textSizerRef = useRef<HTMLSpanElement>(null);
    const maskCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationRef = useRef<number | undefined>(undefined);
    const timeRef = useRef(0);
    const lastFrameRef = useRef<number | null>(null);
    const [canvasPad, setCanvasPad] = useState(0);
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

        const gl = canvas.getContext("webgl", {
            alpha: true,
            antialias: true,
            premultipliedAlpha: true,
        });
        if (!gl) return;

        const program = createProgram(
            gl,
            vertexShaderSource,
            fragmentShaderSource,
        );
        if (!program) return;

        const positionLocation = gl.getAttribLocation(program, "a_position");
        const uvLocation = gl.getAttribLocation(program, "a_uv");
        const timeLocation = gl.getUniformLocation(program, "u_time");
        const speedLocation = gl.getUniformLocation(program, "u_speed");
        const noiseLocation = gl.getUniformLocation(program, "u_noiseStrength");
        const maskSizeLocation = gl.getUniformLocation(program, "u_maskSize");
        const maskOffsetLocation = gl.getUniformLocation(
            program,
            "u_maskOffset",
        );

        const maskLocation = gl.getUniformLocation(program, "u_mask");
        const colorCountLocation = gl.getUniformLocation(
            program,
            "u_colorCount",
        );
        const colorsLocation = gl.getUniformLocation(program, "u_colors[0]");

        if (
            !timeLocation ||
            !speedLocation ||
            !noiseLocation ||
            !maskSizeLocation ||
            !maskOffsetLocation ||
            !maskLocation ||
            !colorCountLocation ||
            !colorsLocation
        ) {
            return;
        }

        const dpr =
            typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

        const pad = Math.max(2, Math.ceil(blur * 2));
        const expandedWidth = dimensions.width + pad * 2;
        const expandedHeight = dimensions.height + pad * 2;

        canvas.width = Math.round(expandedWidth * dpr);
        canvas.height = Math.round(expandedHeight * dpr);
        canvas.style.width = `${expandedWidth}px`;
        canvas.style.height = `${expandedHeight}px`;
        gl.viewport(0, 0, canvas.width, canvas.height);

        const maskWidth = expandedWidth;
        const maskHeight = expandedHeight;

        setCanvasPad(pad);

        const maskCanvas =
            maskCanvasRef.current ?? document.createElement("canvas");
        maskCanvasRef.current = maskCanvas;
        maskCanvas.width = Math.round(maskWidth * dpr);
        maskCanvas.height = Math.round(maskHeight * dpr);

        const maskCtx = maskCanvas.getContext("2d");
        if (!maskCtx) return;

        const drawMask = () => {
            maskCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
            maskCtx.clearRect(0, 0, maskWidth, maskHeight);
            maskCtx.font = dimensions.font;
            maskCtx.textAlign = "center";
            maskCtx.textBaseline = "middle";
            maskCtx.fillStyle = "white";
            maskCtx.shadowColor = "rgba(255,255,255,0.9)";
            maskCtx.shadowBlur = blur;
            maskCtx.fillText(
                text,
                dimensions.width / 2 + pad,
                dimensions.height / 2 + pad,
            );
        };

        drawMask();

        timeRef.current = 0;
        lastFrameRef.current = null;

        const vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([
                -1, -1, 0, 0, 1, -1, 1, 0, -1, 1, 0, 1, 1, 1, 1, 1,
            ]),
            gl.STATIC_DRAW,
        );

        const stride = 4 * Float32Array.BYTES_PER_ELEMENT;
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, stride, 0);
        gl.enableVertexAttribArray(uvLocation);
        gl.vertexAttribPointer(
            uvLocation,
            2,
            gl.FLOAT,
            false,
            stride,
            2 * Float32Array.BYTES_PER_ELEMENT,
        );

        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            maskCanvas,
        );

        const paletteUniform = buildPaletteUniform(palette);
        const noiseStrength = clamp(particleCount / 60, 0.1, 1);

        gl.useProgram(program);
        gl.uniform1i(maskLocation, 0);
        gl.uniform2f(maskSizeLocation, expandedWidth, expandedHeight);
        gl.uniform2f(maskOffsetLocation, 0, 0);
        gl.uniform1i(colorCountLocation, clamp(palette.length, 1, 8));
        gl.uniform3fv(colorsLocation, paletteUniform);
        gl.uniform1f(speedLocation, Math.max(speed, 0.1) * 0.6);
        gl.uniform1f(noiseLocation, noiseStrength);

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

        const render = (time: number) => {
            const last = lastFrameRef.current ?? time;
            const delta = Math.min(Math.max(time - last, 0), 100);
            lastFrameRef.current = time;
            timeRef.current += delta * 0.001;

            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.useProgram(program);
            gl.uniform1f(timeLocation, timeRef.current);
            gl.uniform1f(speedLocation, Math.max(speed, 0.1) * 1.25);

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture);

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

            animationRef.current = requestAnimationFrame(render);
        };

        animationRef.current = requestAnimationFrame(render);

        return () => {
            if (animationRef.current)
                cancelAnimationFrame(animationRef.current);
            gl.deleteTexture(texture);
            gl.deleteBuffer(vertexBuffer);
            gl.deleteProgram(program);
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
                    top: -canvasPad,
                    left: -canvasPad,
                    right: -canvasPad,
                    bottom: -canvasPad,
                    width: `calc(100% + ${canvasPad * 2}px)`,
                    height: `calc(100% + ${canvasPad * 2}px)`,
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
