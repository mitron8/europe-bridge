"use client";

import React, { useEffect, useRef } from "react";

/**
 * Full-bleed WebGL background: slow, domain-warped "silk" in ink, deep red and
 * champagne gold. Plain WebGL (no library). Pauses when off-screen, renders a
 * single still frame for reduced-motion users, and falls back to a CSS
 * gradient when WebGL is unavailable.
 */

type RGB = [number, number, number];

interface ShaderCanvasProps {
  className?: string;
  /** base / mid / highlight / sheen colours (0..1) */
  colors?: [RGB, RGB, RGB, RGB];
  /** where the light pools, in clip-ish coords (x right, y up) */
  focus?: [number, number];
  speed?: number;
  intensity?: number;
  /** light (paper) theme */
  light?: boolean;
}

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uFocus;
uniform float uIntensity;
uniform vec3 uC0;
uniform vec3 uC1;
uniform vec3 uC2;
uniform vec3 uC3;
uniform float uLight;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
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
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float t = uTime * 0.045;
  vec2 m = (uMouse - 0.5) * 0.22;

  vec2 q = vec2(fbm(p * 1.3 + t + m), fbm(p * 1.3 - t + vec2(5.2, 1.3)));
  vec2 r = vec2(
    fbm(p * 1.7 + 2.2 * q + vec2(1.7, 9.2) + t * 1.4),
    fbm(p * 1.7 + 2.2 * q + vec2(8.3, 2.8) - t)
  );
  float f = fbm(p * 1.15 + 2.5 * r);

  vec3 col = uC0;
  col = mix(col, uC1, smoothstep(0.32, 0.78, f) * 0.95);
  col = mix(col, uC2, smoothstep(0.58, 0.98, f * (0.6 + length(r))) * 0.85);
  // thin silk sheen along the folds
  float fold = abs(sin((f + r.x * 0.6) * 18.0 + t * 6.0));
  col += uC3 * pow(1.0 - fold, 14.0) * smoothstep(0.45, 0.85, f) * 0.18;

  float d = length(p - uFocus);
  float fall = smoothstep(1.35, 0.0, d);
  float vig = smoothstep(1.55, 0.35, length(p * vec2(0.85, 1.1)));
  if (uLight > 0.5) {
    // light theme: colour blooms around the focus and dissolves into paper
    float bloom = smoothstep(1.7, 0.05, d) * smoothstep(1.8, 0.4, length(p * vec2(0.85, 1.1)));
    col = mix(uC0, col, bloom);
  } else {
    // dark theme: light pools around the focus, the rest falls into ink
    col *= mix(0.18, 1.0, fall);
    col *= vig;
  }

  col = mix(uC0, col, uIntensity);

  // film grain
  col += (hash(gl_FragCoord.xy + fract(uTime) * 100.0) - 0.5) * mix(0.03, 0.018, uLight);

  gl_FragColor = vec4(col, 1.0);
}
`;

const DEFAULT_COLORS: [RGB, RGB, RGB, RGB] = [
  [0.035, 0.035, 0.04], // ink
  [0.52, 0.06, 0.09], // deep German red
  [0.79, 0.6, 0.32], // champagne gold
  [1.0, 0.93, 0.82], // warm sheen
];

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.warn("[ShaderCanvas]", gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

export default function ShaderCanvas({
  className = "",
  colors = DEFAULT_COLORS,
  focus = [0.55, 0.25],
  speed = 1,
  intensity = 1,
  light = false,
}: ShaderCanvasProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // keep props stable for the render loop without re-initialising GL
  const propsRef = useRef({ colors, focus, speed, intensity, light });
  propsRef.current = { colors, focus, speed, intensity, light };

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "high-performance" });
    if (!gl) {
      wrap.dataset.fallback = "true";
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) {
      wrap.dataset.fallback = "true";
      return;
    }
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      wrap.dataset.fallback = "true";
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = {
      res: gl.getUniformLocation(prog, "uRes"),
      time: gl.getUniformLocation(prog, "uTime"),
      mouse: gl.getUniformLocation(prog, "uMouse"),
      focus: gl.getUniformLocation(prog, "uFocus"),
      intensity: gl.getUniformLocation(prog, "uIntensity"),
      c0: gl.getUniformLocation(prog, "uC0"),
      c1: gl.getUniformLocation(prog, "uC1"),
      c2: gl.getUniformLocation(prog, "uC2"),
      c3: gl.getUniformLocation(prog, "uC3"),
      light: gl.getUniformLocation(prog, "uLight"),
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Render at reduced resolution — the image is soft, so this costs nothing visually
    const scale = Math.min(window.devicePixelRatio || 1, 1.5) * 0.6;

    const resize = () => {
      const w = Math.max(1, Math.floor(wrap.clientWidth * scale));
      const h = Math.max(1, Math.floor(wrap.clientHeight * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw(8);
    });
    ro.observe(wrap);

    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = 1 - (e.clientY - r.top) / r.height;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const draw = (time: number) => {
      const p = propsRef.current;
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      gl.uniform2f(u.res, canvas.width, canvas.height);
      gl.uniform1f(u.time, time);
      gl.uniform2f(u.mouse, mouse.x, mouse.y);
      gl.uniform2f(u.focus, p.focus[0], p.focus[1]);
      gl.uniform1f(u.intensity, p.intensity);
      gl.uniform3fv(u.c0, p.colors[0]);
      gl.uniform3fv(u.c1, p.colors[1]);
      gl.uniform3fv(u.c2, p.colors[2]);
      gl.uniform3fv(u.c3, p.colors[3]);
      gl.uniform1f(u.light, p.light ? 1 : 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    let raf = 0;
    let visible = true;
    let last = performance.now();
    let elapsed = 6;

    const loop = (now: number) => {
      elapsed += ((now - last) / 1000) * propsRef.current.speed;
      last = now;
      draw(elapsed);
      raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (reduce) return;
        if (visible && !raf) {
          last = performance.now();
          raf = requestAnimationFrame(loop);
        } else if (!visible && raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0 }
    );
    io.observe(wrap);

    if (reduce) draw(8);
    else raf = requestAnimationFrame(loop);

    wrap.dataset.ready = "true";

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{
        // CSS fallback / first paint before WebGL kicks in
        background: light
          ? "radial-gradient(70% 60% at 78% 35%, rgba(230,57,70,0.16) 0%, rgba(244,241,234,0) 60%), radial-gradient(50% 45% at 88% 18%, rgba(201,163,91,0.28) 0%, rgba(244,241,234,0) 70%), #f4f1ea"
          : "radial-gradient(80% 70% at 75% 30%, rgba(133,15,23,0.55) 0%, rgba(9,9,10,0) 60%), radial-gradient(50% 40% at 85% 20%, rgba(201,163,91,0.25) 0%, rgba(9,9,10,0) 70%), #09090a",
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" style={{ imageRendering: "auto" }} />
    </div>
  );
}
