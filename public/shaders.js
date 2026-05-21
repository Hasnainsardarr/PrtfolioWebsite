/**
 * ShaderLabs - Modular Shader Library
 * 
 * A collection of WebGL shaders for visual effects
 * Each shader is self-contained with its own controls and presets
 * 
 * @requires Three.js (r134+)
 */

// ============================================
// SHARED NOISE FUNCTIONS (GLSL)
// ============================================

const NOISE_FUNCTIONS = `
    vec4 permute(vec4 x) {
        return mod(((x * 34.0) + 1.0) * x, 289.0);
    }
    
    vec4 taylorInvSqrt(vec4 r) {
        return 1.79284291400159 - 0.85373472095314 * r;
    }
    
    vec3 fade(vec3 t) {
        return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
    }
    
    float cnoise(vec3 P) {
        vec3 Pi0 = floor(P);
        vec3 Pi1 = Pi0 + vec3(1.0);
        Pi0 = mod(Pi0, 289.0);
        Pi1 = mod(Pi1, 289.0);
        vec3 Pf0 = fract(P);
        vec3 Pf1 = Pf0 - vec3(1.0);
        
        vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
        vec4 iy = vec4(Pi0.yy, Pi1.yy);
        vec4 iz0 = Pi0.zzzz;
        vec4 iz1 = Pi1.zzzz;
        
        vec4 ixy = permute(permute(ix) + iy);
        vec4 ixy0 = permute(ixy + iz0);
        vec4 ixy1 = permute(ixy + iz1);
        
        vec4 gx0 = ixy0 / 7.0;
        vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
        gx0 = fract(gx0);
        vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
        vec4 sz0 = step(gz0, vec4(0.0));
        gx0 -= sz0 * (step(0.0, gx0) - 0.5);
        gy0 -= sz0 * (step(0.0, gy0) - 0.5);
        
        vec4 gx1 = ixy1 / 7.0;
        vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
        gx1 = fract(gx1);
        vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
        vec4 sz1 = step(gz1, vec4(0.0));
        gx1 -= sz1 * (step(0.0, gx1) - 0.5);
        gy1 -= sz1 * (step(0.0, gy1) - 0.5);
        
        vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);
        vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);
        vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);
        vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);
        vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);
        vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);
        vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);
        vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);
        
        vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
        g000 *= norm0.x; g010 *= norm0.y; g100 *= norm0.z; g110 *= norm0.w;
        vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
        g001 *= norm1.x; g011 *= norm1.y; g101 *= norm1.z; g111 *= norm1.w;
        
        float n000 = dot(g000, Pf0);
        float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
        float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
        float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
        float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
        float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
        float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
        float n111 = dot(g111, Pf1);
        
        vec3 fade_xyz = fade(Pf0);
        vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
        vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
        float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
        return 2.2 * n_xyz;
    }
`;

// ============================================
// SHADER DEFINITIONS
// ============================================

const SHADERS = {
    // Aurora Wave Effect
    auroraWave: {
        name: 'Aurora Wave',
        description: 'Organic flowing waves with Perlin noise displacement',
        vertex: `
            uniform float uTime;
            uniform float uSpeed;
            uniform float uAmplitude;
            uniform float uDensity;
            varying vec2 vUv;
            
            ${NOISE_FUNCTIONS}
            
            void main() {
                vUv = uv;
                float displacement = uAmplitude * cnoise(position * uDensity + uTime * uSpeed);
                vec3 newPosition = position + normal * displacement;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
            }
        `,
        fragment: `
            precision highp float;
            varying vec2 vUv;
            uniform vec3 uColor1;
            uniform vec3 uColor2;
            uniform vec3 uColor3;
            uniform vec3 uColor4;
            uniform float uGrainIntensity;
            
            float random(vec2 st) {
                return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
            }
            
            void main() {
                vec2 uv = vUv;
                vec3 color;
                if (uv.y < 0.33) {
                    color = mix(uColor1, uColor2, uv.y / 0.33);
                } else if (uv.y < 0.66) {
                    color = mix(uColor2, uColor3, (uv.y - 0.33) / 0.33);
                } else {
                    color = mix(uColor3, uColor4, (uv.y - 0.66) / 0.34);
                }
                float grain = random(gl_FragCoord.xy) * uGrainIntensity;
                color += grain;
                float leftFade = smoothstep(0.0, 0.15, uv.x);
                float rightFade = smoothstep(1.0, 0.85, uv.x);
                float alpha = smoothstep(0.0, 0.3, uv.y) * smoothstep(1.0, 0.7, uv.y) * leftFade * rightFade;
                gl_FragColor = vec4(color, alpha);
            }
        `,
        uniforms: {
            uSpeed: { value: 0.02, min: 0, max: 0.1, step: 0.005, label: 'Speed' },
            uAmplitude: { value: 1.1, min: 0, max: 3, step: 0.1, label: 'Amplitude' },
            uDensity: { value: 0.25, min: 0.1, max: 1, step: 0.05, label: 'Density' },
            uColor1: { value: [0.02, 0.02, 0.08], type: 'color', label: 'Color 1' },
            uColor2: { value: [0.05, 0.15, 0.35], type: 'color', label: 'Color 2' },
            uColor3: { value: [0.15, 0.35, 0.7], type: 'color', label: 'Color 3' },
            uColor4: { value: [0.3, 0.5, 0.9], type: 'color', label: 'Color 4' },
            uGrainIntensity: { value: 0.006, min: 0, max: 0.05, step: 0.002, label: 'Grain' }
        },
        presets: {
            ocean: { uColor1: [0.02, 0.02, 0.08], uColor2: [0.05, 0.15, 0.35], uColor3: [0.15, 0.35, 0.7], uColor4: [0.3, 0.5, 0.9] },
            sunset: { uColor1: [0.1, 0.02, 0.05], uColor2: [0.4, 0.1, 0.15], uColor3: [0.8, 0.3, 0.2], uColor4: [1.0, 0.6, 0.3] },
            forest: { uColor1: [0.02, 0.05, 0.02], uColor2: [0.05, 0.15, 0.08], uColor3: [0.1, 0.35, 0.15], uColor4: [0.2, 0.5, 0.25] },
            purple: { uColor1: [0.05, 0.02, 0.1], uColor2: [0.15, 0.05, 0.25], uColor3: [0.35, 0.15, 0.5], uColor4: [0.6, 0.3, 0.8] }
        }
    },

    // Plasma Effect
    plasma: {
        name: 'Plasma',
        description: 'Classic plasma effect with swirling colors',
        vertex: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragment: `
            precision highp float;
            varying vec2 vUv;
            uniform float uTime;
            uniform float uScale;
            uniform float uSpeed;
            uniform vec3 uColor1;
            uniform vec3 uColor2;
            uniform vec3 uColor3;
            
            void main() {
                vec2 uv = vUv * uScale;
                float t = uTime * uSpeed;
                
                float v1 = sin(uv.x * 10.0 + t);
                float v2 = sin(10.0 * (uv.x * sin(t / 2.0) + uv.y * cos(t / 3.0)) + t);
                float v3 = sin(sqrt(100.0 * ((uv.x - 0.5) * (uv.x - 0.5) + (uv.y - 0.5) * (uv.y - 0.5)) + 1.0) + t);
                float v = (v1 + v2 + v3) / 3.0;
                
                vec3 color = mix(uColor1, uColor2, sin(v * 3.14159) * 0.5 + 0.5);
                color = mix(color, uColor3, cos(v * 3.14159 * 2.0) * 0.5 + 0.5);
                
                gl_FragColor = vec4(color, 1.0);
            }
        `,
        uniforms: {
            uScale: { value: 1.0, min: 0.5, max: 3, step: 0.1, label: 'Scale' },
            uSpeed: { value: 1.0, min: 0.1, max: 3, step: 0.1, label: 'Speed' },
            uColor1: { value: [0.5, 0.0, 0.5], type: 'color', label: 'Color 1' },
            uColor2: { value: [0.0, 0.5, 1.0], type: 'color', label: 'Color 2' },
            uColor3: { value: [1.0, 0.5, 0.0], type: 'color', label: 'Color 3' }
        },
        presets: {
            neon: { uColor1: [1.0, 0.0, 0.8], uColor2: [0.0, 1.0, 1.0], uColor3: [1.0, 1.0, 0.0] },
            fire: { uColor1: [0.5, 0.0, 0.0], uColor2: [1.0, 0.3, 0.0], uColor3: [1.0, 0.8, 0.0] },
            ice: { uColor1: [0.0, 0.2, 0.4], uColor2: [0.2, 0.5, 0.8], uColor3: [0.8, 0.9, 1.0] }
        }
    },

    // Gradient Flow
    gradientFlow: {
        name: 'Gradient Flow',
        description: 'Smooth animated color gradients',
        vertex: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragment: `
            precision highp float;
            varying vec2 vUv;
            uniform float uTime;
            uniform float uSpeed;
            uniform float uAngle;
            uniform vec3 uColor1;
            uniform vec3 uColor2;
            uniform vec3 uColor3;
            
            void main() {
                float angle = uAngle * 3.14159 / 180.0;
                vec2 dir = vec2(cos(angle), sin(angle));
                float t = dot(vUv - 0.5, dir) + 0.5;
                t = fract(t + uTime * uSpeed * 0.1);
                
                vec3 color;
                if (t < 0.5) {
                    color = mix(uColor1, uColor2, t * 2.0);
                } else {
                    color = mix(uColor2, uColor3, (t - 0.5) * 2.0);
                }
                
                gl_FragColor = vec4(color, 1.0);
            }
        `,
        uniforms: {
            uSpeed: { value: 0.5, min: 0, max: 2, step: 0.1, label: 'Speed' },
            uAngle: { value: 45, min: 0, max: 360, step: 15, label: 'Angle' },
            uColor1: { value: [0.1, 0.1, 0.3], type: 'color', label: 'Color 1' },
            uColor2: { value: [0.3, 0.1, 0.5], type: 'color', label: 'Color 2' },
            uColor3: { value: [0.5, 0.2, 0.3], type: 'color', label: 'Color 3' }
        },
        presets: {
            twilight: { uColor1: [0.1, 0.1, 0.3], uColor2: [0.3, 0.1, 0.5], uColor3: [0.5, 0.2, 0.3], uAngle: 135 },
            sunrise: { uColor1: [0.1, 0.1, 0.2], uColor2: [0.6, 0.2, 0.3], uColor3: [1.0, 0.6, 0.3], uAngle: 0 },
            mint: { uColor1: [0.1, 0.3, 0.3], uColor2: [0.2, 0.5, 0.4], uColor3: [0.4, 0.7, 0.5], uAngle: 90 }
        }
    },

    // Noise Field
    noiseField: {
        name: 'Noise Field',
        description: 'Perlin noise visualization with color mapping',
        vertex: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragment: `
            precision highp float;
            varying vec2 vUv;
            uniform float uTime;
            uniform float uScale;
            uniform float uSpeed;
            uniform float uContrast;
            uniform vec3 uColor1;
            uniform vec3 uColor2;
            
            float hash(vec2 p) {
                return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
            }
            
            float noise(vec2 p) {
                vec2 i = floor(p);
                vec2 f = fract(p);
                f = f * f * (3.0 - 2.0 * f);
                return mix(
                    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
                    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
                    f.y
                );
            }
            
            float fbm(vec2 p) {
                float v = 0.0;
                float a = 0.5;
                for (int i = 0; i < 5; i++) {
                    v += a * noise(p);
                    p *= 2.0;
                    a *= 0.5;
                }
                return v;
            }
            
            void main() {
                vec2 uv = vUv * uScale;
                float n = fbm(uv + uTime * uSpeed * 0.2);
                n = pow(n, uContrast);
                vec3 color = mix(uColor1, uColor2, n);
                gl_FragColor = vec4(color, 1.0);
            }
        `,
        uniforms: {
            uScale: { value: 3.0, min: 1, max: 10, step: 0.5, label: 'Scale' },
            uSpeed: { value: 0.5, min: 0, max: 2, step: 0.1, label: 'Speed' },
            uContrast: { value: 1.0, min: 0.5, max: 3, step: 0.1, label: 'Contrast' },
            uColor1: { value: [0.05, 0.05, 0.1], type: 'color', label: 'Color 1' },
            uColor2: { value: [0.4, 0.6, 0.9], type: 'color', label: 'Color 2' }
        },
        presets: {
            clouds: { uColor1: [0.3, 0.4, 0.5], uColor2: [0.9, 0.95, 1.0], uContrast: 1.2 },
            lava: { uColor1: [0.1, 0.0, 0.0], uColor2: [1.0, 0.4, 0.0], uContrast: 1.5 },
            digital: { uColor1: [0.0, 0.05, 0.1], uColor2: [0.0, 0.8, 0.6], uContrast: 2.0 }
        }
    },

    // Perspective Grid
    grid: {
        name: 'Perspective Grid',
        description: 'Infinite 3D grid with fog/horizon effect',
        vertex: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragment: `
            precision highp float;
            varying vec2 vUv;
            uniform float uTime;
            uniform float uSpeed;
            uniform float uDivisions;
            uniform vec3 uColor;
            uniform vec3 uBg;
            
            void main() {
                vec2 p = vUv * 2.0 - 1.0;
                
                if (p.y > 0.0) {
                    gl_FragColor = vec4(uBg, 1.0); 
                    return;
                }
                
                float z = 1.0 / abs(p.y);
                float x = p.x * z;
                float time = uTime * uSpeed;
                
                float gridX = step(0.95 + (abs(p.y) * 0.04), fract(x * uDivisions));
                float gridZ = step(0.95 + (abs(p.y) * 0.04), fract(z * uDivisions + time));
                float grid = max(gridX, gridZ);
                
                float fog = smoothstep(0.0, 0.5, abs(p.y));
                vec3 col = mix(uBg, uColor, grid * fog);
                
                gl_FragColor = vec4(col, 1.0);
            }
        `,
        uniforms: {
            uSpeed: { value: 0.5, min: 0, max: 2, step: 0.1, label: 'Speed' },
            uDivisions: { value: 1.0, min: 0.5, max: 3.0, step: 0.1, label: 'Density' },
            uColor: { value: [0.0, 1.0, 0.8], type: 'color', label: 'Grid Color' },
            uBg: { value: [0.05, 0.05, 0.1], type: 'color', label: 'Background' }
        },
        presets: {
            cyber: { uColor: [0.0, 1.0, 0.8], uBg: [0.05, 0.05, 0.1], uSpeed: 0.5 },
            retro: { uColor: [1.0, 0.0, 0.8], uBg: [0.1, 0.0, 0.2], uSpeed: 0.8 },
            clean: { uColor: [0.8, 0.8, 0.8], uBg: [0.95, 0.95, 0.95], uSpeed: 0.2 }
        }
    },

    // Mesh Gradient
    meshGradient: {
        name: 'Mesh Gradient',
        description: 'Soft, moving gradient blobs for modern backgrounds',
        vertex: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragment: `
            precision highp float;
            varying vec2 vUv;
            uniform float uTime;
            uniform float uSpeed;
            uniform vec3 uColor1;
            uniform vec3 uColor2;
            uniform vec3 uColor3;
            uniform vec3 uColor4;
            
            // Simplex 2D noise
            vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
            float snoise(vec2 v){
                const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
                vec2 i  = floor(v + dot(v, C.yy) );
                vec2 x0 = v -   i + dot(i, C.xx);
                vec2 i1;
                i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
                vec4 x12 = x0.xyxy + C.xxzz;
                x12.xy -= i1;
                i = mod(i, 289.0);
                vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                    + i.x + vec3(0.0, i1.x, 1.0 ));
                vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
                m = m*m ;
                m = m*m ;
                vec3 x = 2.0 * fract(p * C.www) - 1.0;
                vec3 h = abs(x) - 0.5;
                vec3 ox = floor(x + 0.5);
                vec3 a0 = x - ox;
                m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
                vec3 g;
                g.x  = a0.x  * x0.x  + h.x  * x0.y;
                g.yz = a0.yz * x12.xz + h.yz * x12.yw;
                return 130.0 * dot(m, g);
            }

            void main() {
                vec2 uv = vUv;
                float t = uTime * uSpeed;
                
                // Move points
                vec2 p1 = vec2(0.3 + 0.2*sin(t), 0.3 + 0.2*cos(t*0.5));
                vec2 p2 = vec2(0.7 + 0.2*sin(t*0.8), 0.7 + 0.2*cos(t));
                vec2 p3 = vec2(0.2 + 0.2*cos(t*1.2), 0.8 + 0.2*sin(t*0.6));
                vec2 p4 = vec2(0.8 + 0.2*cos(t*0.7), 0.3 + 0.2*sin(t*0.9));
                
                // Distances
                float d1 = length(uv - p1);
                float d2 = length(uv - p2);
                float d3 = length(uv - p3);
                float d4 = length(uv - p4);
                
                // Mixing weights based on distance (metaballs style)
                float w1 = 1.0 / (d1 * d1 + 0.1);
                float w2 = 1.0 / (d2 * d2 + 0.1);
                float w3 = 1.0 / (d3 * d3 + 0.1);
                float w4 = 1.0 / (d4 * d4 + 0.1);
                
                vec3 col = (w1*uColor1 + w2*uColor2 + w3*uColor3 + w4*uColor4) / (w1+w2+w3+w4);
                
                // Add noise/dither to prevent banding
                float noise = snoise(uv * 800.0);
                col += noise * 0.03;
                
                gl_FragColor = vec4(col, 1.0);
            }
        `,
        uniforms: {
            uSpeed: { value: 0.2, min: 0.0, max: 1.0, step: 0.05, label: 'Speed' },
            uColor1: { value: [0.98, 0.73, 0.01], type: 'color', label: 'Color 1' },
            uColor2: { value: [1.0, 0.4, 0.4], type: 'color', label: 'Color 2' },
            uColor3: { value: [0.4, 0.6, 1.0], type: 'color', label: 'Color 3' },
            uColor4: { value: [0.2, 0.8, 0.6], type: 'color', label: 'Color 4' }
        },
        presets: {
            warm: { uColor1: [1.0, 0.8, 0.4], uColor2: [1.0, 0.4, 0.4], uColor3: [0.8, 0.2, 0.5], uColor4: [0.9, 0.6, 0.3], uSpeed: 0.2 },
            cool: { uColor1: [0.4, 1.0, 0.9], uColor2: [0.2, 0.5, 1.0], uColor3: [0.1, 0.2, 0.6], uColor4: [0.5, 0.0, 0.5], uSpeed: 0.15 },
            pastel: { uColor1: [1.0, 0.9, 0.9], uColor2: [0.9, 1.0, 0.9], uColor3: [0.9, 0.9, 1.0], uColor4: [1.0, 1.0, 0.8], uSpeed: 0.1 }
        }
    }
};

// ============================================
// SHADER ENGINE
// ============================================

class ShaderLabs {
    constructor(containerId, shaderName = 'auroraWave') {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container #${containerId} not found`);
            return;
        }

        this.currentShader = shaderName;
        this.shaderDef = SHADERS[shaderName];
        this.currentValues = {};
        this._animFrameId = null;

        this.initThree();
        this.loadShader(shaderName);
        this.animate();
        this.setupResize();
    }

    initThree() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
        this.camera.position.z = 1;

        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
        this.container.appendChild(this.renderer.domElement);
    }

    loadShader(shaderName) {
        // Clear existing mesh
        if (this.mesh) {
            this.scene.remove(this.mesh);
            this.geometry.dispose();
            this.material.dispose();
        }

        this.currentShader = shaderName;
        this.shaderDef = SHADERS[shaderName];

        // Build uniforms
        const uniforms = { uTime: { value: 0 } };
        this.currentValues = {};

        for (const [key, def] of Object.entries(this.shaderDef.uniforms)) {
            if (def.type === 'color') {
                uniforms[key] = { value: new THREE.Vector3(...def.value) };
                this.currentValues[key] = [...def.value];
            } else {
                uniforms[key] = { value: def.value };
                this.currentValues[key] = def.value;
            }
        }

        this.material = new THREE.ShaderMaterial({
            vertexShader: this.shaderDef.vertex,
            fragmentShader: this.shaderDef.fragment,
            uniforms: uniforms,
            transparent: true,
            side: THREE.DoubleSide
        });

        // Use subdivided plane for vertex shaders with displacement
        const segments = shaderName === 'auroraWave' ? 64 : 1;
        this.geometry = new THREE.PlaneGeometry(2, 2, segments, segments);
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);
    }

    animate() {
        this.material.uniforms.uTime.value = performance.now() * 0.001;
        this.renderer.render(this.scene, this.camera);
        this._animFrameId = requestAnimationFrame(() => this.animate());
    }

    setupResize() {
        this._resizeHandler = () => {
            this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
        };
        window.addEventListener('resize', this._resizeHandler);
    }

    setUniform(name, value) {
        if (this.material && this.material.uniforms[name]) {
            if (Array.isArray(value)) {
                this.material.uniforms[name].value.set(...value);
                this.currentValues[name] = [...value];
            } else {
                this.material.uniforms[name].value = value;
                this.currentValues[name] = value;
            }
        }
    }

    applyPreset(presetName) {
        const preset = this.shaderDef.presets[presetName];
        if (preset) {
            for (const [key, value] of Object.entries(preset)) {
                this.setUniform(key, value);
            }
        }
    }

    getConfig() {
        return { ...this.currentValues };
    }

    getShaderList() {
        return Object.entries(SHADERS).map(([key, def]) => ({
            id: key,
            name: def.name,
            description: def.description
        }));
    }

    getControls() {
        return Object.entries(this.shaderDef.uniforms).map(([key, def]) => ({
            id: key,
            ...def,
            currentValue: this.currentValues[key]
        }));
    }

    getPresets() {
        return Object.keys(this.shaderDef.presets || {});
    }

    dispose() {
        if (this._animFrameId) cancelAnimationFrame(this._animFrameId);
        if (this._resizeHandler) window.removeEventListener('resize', this._resizeHandler);
        if (this.geometry) this.geometry.dispose();
        if (this.material) this.material.dispose();
        if (this.renderer) this.renderer.dispose();
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ShaderLabs, SHADERS };
}
