"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";

// ─── Inline GLSL shaders (meshGradient from ShaderLabs) ──────────────────────
const VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uSpeed;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec3 uColor4;

  // Simplex 2D noise (for dithering)
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * uSpeed;

    // Animated blob positions (metaballs style)
    vec2 p1 = vec2(0.3 + 0.2*sin(t),       0.3 + 0.2*cos(t*0.5));
    vec2 p2 = vec2(0.7 + 0.2*sin(t*0.8),   0.7 + 0.2*cos(t));
    vec2 p3 = vec2(0.2 + 0.2*cos(t*1.2),   0.8 + 0.2*sin(t*0.6));
    vec2 p4 = vec2(0.8 + 0.2*cos(t*0.7),   0.3 + 0.2*sin(t*0.9));

    float d1 = length(uv - p1);
    float d2 = length(uv - p2);
    float d3 = length(uv - p3);
    float d4 = length(uv - p4);

    float w1 = 1.0 / (d1*d1 + 0.1);
    float w2 = 1.0 / (d2*d2 + 0.1);
    float w3 = 1.0 / (d3*d3 + 0.1);
    float w4 = 1.0 / (d4*d4 + 0.1);

    vec3 col = (w1*uColor1 + w2*uColor2 + w3*uColor3 + w4*uColor4) / (w1+w2+w3+w4);

    // Subtle dither to avoid colour banding
    float noise = snoise(uv * 800.0);
    col += noise * 0.03;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const rendererRef = useRef<any>(null);
  const [threeReady, setThreeReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!threeReady || !containerRef.current) return;

    const container = containerRef.current;
    let scene: any, camera: any, renderer: any, material: any;

    try {
      const THREE = (window as any).THREE;
      if (!THREE) throw new Error("THREE not found on window");

      // Scene + orthographic camera (fills the plane exactly)
      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
      camera.position.z = 1;

      // Renderer
      renderer = new THREE.WebGLRenderer({ alpha: false, antialias: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      // Clear any old canvases (hot-reload safety)
      container.querySelectorAll("canvas").forEach((c) => c.remove());
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Shader material with your colours
      material = new THREE.ShaderMaterial({
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        uniforms: {
          uTime:   { value: 0 },
          uSpeed:  { value: 0.35 },                                                       // slightly toned-down so blobs feel smooth
          uColor1: { value: new THREE.Vector3(0.345, 0.353, 0.353) },  // grey-ish
          uColor2: { value: new THREE.Vector3(0.0,   0.0,   0.0  ) },  // black
          uColor3: { value: new THREE.Vector3(0.565, 0.573, 0.573) },  // lighter grey
          uColor4: { value: new THREE.Vector3(0.0,   0.0,   0.0  ) },  // black
        },
      });

      const geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Animation loop
      const tick = () => {
        material.uniforms.uTime.value = performance.now() * 0.001;
        renderer.render(scene, camera);
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);

      // Resize handler
      const onResize = () => {
        if (!container) return;
        renderer.setSize(container.offsetWidth, container.offsetHeight);
      };
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        container.querySelectorAll("canvas").forEach((c) => c.remove());
      };
    } catch (err) {
      console.error("Shader init failed:", err);
      setFailed(true);
    }
  }, [threeReady]);

  return (
    <>
      {/* Three.js — load once, mark ready in onLoad */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        strategy="afterInteractive"
        onLoad={() => setThreeReady(true)}
        onError={() => setFailed(true)}
      />

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Shader canvas layer */}
        <div
          ref={containerRef}
          className="absolute inset-0 z-0"
          style={{ backgroundColor: "#000000" }} // fallback while loading or on failure
        />

        {/* Hero content */}
        <div className="container px-4 mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 text-white">
              Hello, I am
              <br />
              Husnain Sardar
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              <strong>AI Engineer</strong> &amp;{" "}
              <strong>Full-Stack Developer</strong> with years of experience in
              Intelligent Agents and Production Scale Apps.
            </p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className="text-sm text-gray-400"
          >
            Scroll Down
          </motion.div>
        </div>
      </section>
    </>
  );
}
