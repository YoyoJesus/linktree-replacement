<script lang="ts">
  let canvas: HTMLCanvasElement
  let failed = $state(false)

  const colors = {
    a: [116 / 255, 124 / 255, 146 / 255],
    b: [105 / 255, 185 / 255, 172 / 255],
    bg: [16 / 255, 20 / 255, 28 / 255],
  }

  const fragment = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_hover;
uniform vec3 u_a;
uniform vec3 u_b;
uniform vec3 u_bg;

vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(hash(i), f), dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
    mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)), dot(hash(i + vec2(1.0)), f - vec2(1.0)), u.x),
    u.y);
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

float bayer2(vec2 a) { a = floor(a); return fract(dot(a, vec2(0.5, a.y * 0.75))); }
float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }
float bayer8(vec2 a) { return bayer4(0.5 * a) * 0.25 + bayer2(a); }

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
  vec2 m = (u_mouse - 0.5 * u_res) / u_res.y;
  float d = length(p - m);
  float t = u_time * 0.045;

  p += (p - m) * 0.35 * exp(-d * d * 5.0) * u_hover;

  vec2 q = vec2(fbm(p * 1.3 + t), fbm(p * 1.3 + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p * 1.3 + 2.2 * q + vec2(1.7, 9.2) + t * 1.4), fbm(p * 1.3 + 2.2 * q + vec2(8.3, 2.8) - t));
  float f = fbm(p * 1.3 + 2.6 * r);

  float v = clamp(f * 1.25 + 0.48, 0.0, 1.0);
  v *= smoothstep(1.45, 0.15, length((uv - vec2(0.85, 0.8)) * vec2(1.1, 1.4)));
  v += 0.28 * exp(-d * d * 9.0) * u_hover;

  float levels = 6.0;
  float stepped = floor(v * levels + bayer8(gl_FragCoord.xy)) / levels;

  vec3 col = u_bg;
  col = mix(col, u_a * 0.55, smoothstep(0.15, 0.55, stepped));
  col = mix(col, u_a, smoothstep(0.5, 0.85, stepped));
  col = mix(col, u_b, smoothstep(0.8, 1.0, stepped) * clamp(r.x * 2.0 + 0.6, 0.0, 1.0));
  gl_FragColor = vec4(col, 1.0);
}`

  $effect(() => {
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' })
    if (!gl) {
      failed = true
      return
    }

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type) as WebGLShader
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      return shader
    }

    const program = gl.createProgram() as WebGLProgram
    gl.attachShader(program, compile(gl.VERTEX_SHADER, 'attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }'))
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment))
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      failed = true
      return
    }
    gl.useProgram(program)

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const position = gl.getAttribLocation(program, 'p')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    const uniform = (name: string) => gl.getUniformLocation(program, name)
    const uRes = uniform('u_res')
    const uTime = uniform('u_time')
    const uMouse = uniform('u_mouse')
    gl.uniform1f(uniform('u_hover'), 0)
    gl.uniform3fv(uniform('u_a'), colors.a)
    gl.uniform3fv(uniform('u_b'), colors.b)
    gl.uniform3fv(uniform('u_bg'), colors.bg)

    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    const scale = 5
    const start = performance.now() - 40000 * Math.random()
    let width = 1
    let height = 1
    let visible = true
    let frame = 0
    let last = 0

    const draw = (now: number) => {
      gl.uniform2f(uRes, width, height)
      gl.uniform1f(uTime, reduced ? 12 : ((now - start) / 1000) * 0.2)
      gl.uniform2f(uMouse, 0.7 * width, 0.4 * height)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const resize = () => {
      width = Math.max(1, Math.round(canvas.clientWidth / scale))
      height = Math.max(1, Math.round(canvas.clientHeight / scale))
      canvas.width = width
      canvas.height = height
      gl.viewport(0, 0, width, height)
      if (reduced || !frame) draw(performance.now())
    }

    const loop = (now: number) => {
      frame = 0
      if (!visible || document.hidden) return
      if (now - last >= 50) {
        draw(now)
        last = now
      }
      frame = requestAnimationFrame(loop)
    }

    const wake = () => {
      if (!reduced && !frame && visible && !document.hidden) frame = requestAnimationFrame(loop)
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      wake()
    })
    intersectionObserver.observe(canvas)
    document.addEventListener('visibilitychange', wake)
    resize()
    wake()

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      document.removeEventListener('visibilitychange', wake)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  })
</script>

<canvas bind:this={canvas} class="field" class:hidden={failed} aria-hidden="true"></canvas>
<div class="fallback" aria-hidden="true"></div>

<style>
  .field,
  .fallback {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .field {
    z-index: 1;
    image-rendering: pixelated;
  }

  .field.hidden {
    display: none;
  }

  .fallback {
    background:
      radial-gradient(60% 70% at 85% 20%, rgb(var(--rgb-volt) / 0.35), transparent 70%),
      radial-gradient(30% 40% at 70% 35%, rgb(var(--rgb-ember) / 0.15), transparent 70%),
      var(--color-ink);
  }
</style>
