"use client";
import { useEffect, useRef } from "react";

/* ─── Colour palette: cyan-blue primary + neon accents ─────────────────────── */
const PALETTE = [
  [0.0, 0.85, 1.0],   // #00d9ff  cyan-blue (primary)
  [0.2, 0.55, 1.0],   // #33  neon blue
  [0.6, 0.3,  1.0],   // violet accent
  [0.0, 1.0,  0.75],  // teal highlight
  [0.0, 0.7,  1.0],   // deep cyan
];

/* ─── CTA detection — show native cursor / skip fluid on these ──────────────── */
function isCTA(el: Element | null): boolean {
  if (!el) return false;
  const t = el.closest("a, button") as HTMLElement | null;
  if (!t) return false;
  const txt = (t.textContent ?? "").toLowerCase();
  const href = (t as HTMLAnchorElement).href ?? "";
  return (
    txt.includes("download") ||
    txt.includes("connect") ||
    txt.includes("say hello") ||
    txt.includes("let's connect") ||
    href.includes("resume.pdf") ||
    href.startsWith("mailto:")
  );
}

/* ─── GLSL: shared vertex shader ─────────────────────────────────────────────── */
const VS = `
precision highp float;
attribute vec2 aP;
varying vec2 vUv, vL, vR, vT, vB;
uniform vec2 tx;
void main() {
  vUv = aP * 0.5 + 0.5;
  vL = vUv - vec2(tx.x, 0.0); vR = vUv + vec2(tx.x, 0.0);
  vT = vUv + vec2(0.0, tx.y); vB = vUv - vec2(0.0, tx.y);
  gl_Position = vec4(aP, 0.0, 1.0);
}`;

/* ─── GLSL: fragment shaders ─────────────────────────────────────────────────── */
const FS_CLEAR = `
precision mediump float; precision mediump sampler2D;
varying highp vec2 vUv; uniform sampler2D u; uniform float v;
void main(){ gl_FragColor = v * texture2D(u, vUv); }`;

const FS_SPLAT = `
precision highp float; precision highp sampler2D;
varying vec2 vUv;
uniform sampler2D uT; uniform float ar; uniform vec3 col; uniform vec2 pt; uniform float r;
void main(){
  vec2 p = vUv - pt; p.x *= ar;
  vec3 sp = exp(-dot(p,p) / r) * col;
  gl_FragColor = vec4(texture2D(uT, vUv).xyz + sp, 1.0);
}`;

const FS_ADVECT = `
precision highp float; precision highp sampler2D;
varying vec2 vUv;
uniform sampler2D uV, uS; uniform vec2 tx, dTx; uniform float dt, diss;
vec4 bl(sampler2D s, vec2 uv, vec2 t) {
  vec2 st = uv / t - 0.5; vec2 f = fract(st); vec2 i = floor(st);
  vec4 a = texture2D(s,(i+vec2(0.5,0.5))*t); vec4 b = texture2D(s,(i+vec2(1.5,0.5))*t);
  vec4 c = texture2D(s,(i+vec2(0.5,1.5))*t); vec4 d = texture2D(s,(i+vec2(1.5,1.5))*t);
  return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
}
void main(){
  vec2 coord = vUv - dt * bl(uV, vUv, tx).xy * tx;
  gl_FragColor = bl(uS, coord, dTx) / (1.0 + diss * dt);
}`;

const FS_DIV = `
precision mediump float; precision mediump sampler2D;
varying highp vec2 vUv, vL, vR, vT, vB; uniform sampler2D uV;
void main(){
  float L=texture2D(uV,vL).x, R=texture2D(uV,vR).x, T=texture2D(uV,vT).y, B=texture2D(uV,vB).y;
  vec2 C=texture2D(uV,vUv).xy;
  if(vL.x<0.0)L=-C.x; if(vR.x>1.0)R=-C.x; if(vT.y>1.0)T=-C.y; if(vB.y<0.0)B=-C.y;
  gl_FragColor=vec4(0.5*(R-L+T-B),0.0,0.0,1.0);
}`;

const FS_CURL = `
precision mediump float; precision mediump sampler2D;
varying highp vec2 vUv, vL, vR, vT, vB; uniform sampler2D uV;
void main(){
  float L=texture2D(uV,vL).y, R=texture2D(uV,vR).y, T=texture2D(uV,vT).x, B=texture2D(uV,vB).x;
  gl_FragColor=vec4(0.5*(R-L-T+B),0.0,0.0,1.0);
}`;

const FS_VORT = `
precision highp float; precision highp sampler2D;
varying vec2 vUv, vL, vR, vT, vB; uniform sampler2D uV, uC; uniform float curl, dt;
void main(){
  float L=texture2D(uC,vL).x, R=texture2D(uC,vR).x, T=texture2D(uC,vT).x, B=texture2D(uC,vB).x;
  float C=texture2D(uC,vUv).x;
  vec2 f=0.5*vec2(abs(T)-abs(B),abs(R)-abs(L));
  f/=length(f)+0.0001; f*=curl*C; f.y*=-1.0;
  gl_FragColor=vec4(texture2D(uV,vUv).xy+f*dt,0.0,1.0);
}`;

const FS_PRESS = `
precision mediump float; precision mediump sampler2D;
varying highp vec2 vUv, vL, vR, vT, vB; uniform sampler2D uP, uD;
void main(){
  float L=texture2D(uP,vL).x, R=texture2D(uP,vR).x, T=texture2D(uP,vT).x, B=texture2D(uP,vB).x;
  float d=texture2D(uD,vUv).x;
  gl_FragColor=vec4((L+R+T+B-d)*0.25,0.0,0.0,1.0);
}`;

const FS_GRAD = `
precision mediump float; precision mediump sampler2D;
varying highp vec2 vUv, vL, vR, vT, vB; uniform sampler2D uP, uV;
void main(){
  float L=texture2D(uP,vL).x, R=texture2D(uP,vR).x, T=texture2D(uP,vT).x, B=texture2D(uP,vB).x;
  vec2 v=texture2D(uV,vUv).xy-vec2(R-L,T-B);
  gl_FragColor=vec4(v,0.0,1.0);
}`;

const FS_DISPLAY = `
precision highp float; precision highp sampler2D;
varying vec2 vUv; uniform sampler2D u;
void main(){
  vec3 c = texture2D(u, vUv).rgb;
  /* boost contrast — makes the neon glow pop against the dark bg */
  c = c * 1.15;
  float a = max(c.r, max(c.g, c.b));
  gl_FragColor = vec4(c, a * 0.9);
}`;

/* ─── Main component ─────────────────────────────────────────────────────────── */
export default function WebGLFluidCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === "undefined") return;

    /* ── canvas size ── */
    const onResize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    onResize();
    window.addEventListener("resize", onResize);

    /* ── WebGL context ── */
    const attrs: WebGLContextAttributes = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false };
    const gl = (canvas.getContext("webgl", attrs) ?? canvas.getContext("experimental-webgl", attrs)) as WebGLRenderingContext | null;
    if (!gl) { window.removeEventListener("resize", onResize); return; }

    /* ── texture type detection ── */
    let FLOAT_TYPE: number;
    let LINEAR: number;

    const hfExt = gl.getExtension("OES_texture_half_float");
    if (hfExt) {
      FLOAT_TYPE = hfExt.HALF_FLOAT_OES;
      const hfLin = gl.getExtension("OES_texture_half_float_linear");
      LINEAR = hfLin ? gl.LINEAR : gl.NEAREST;
    } else {
      const fExt = gl.getExtension("OES_texture_float");
      if (!fExt) { window.removeEventListener("resize", onResize); return; }
      FLOAT_TYPE = gl.FLOAT;
      const fLin = gl.getExtension("OES_texture_float_linear");
      LINEAR = fLin ? gl.LINEAR : gl.NEAREST;
    }

    /* ── shader helpers ── */
    type Prog = { bind(): void; u: Record<string, WebGLUniformLocation | null> };

    function mkShader(type: number, src: string): WebGLShader {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    }

    function mkProg(fsSrc: string): Prog {
      const p = gl!.createProgram()!;
      gl!.attachShader(p, mkShader(gl!.VERTEX_SHADER, VS));
      gl!.attachShader(p, mkShader(gl!.FRAGMENT_SHADER, fsSrc));
      gl!.bindAttribLocation(p, 0, "aP");
      gl!.linkProgram(p);
      const u: Record<string, WebGLUniformLocation | null> = {};
      const n = gl!.getProgramParameter(p, gl!.ACTIVE_UNIFORMS) as number;
      for (let i = 0; i < n; i++) {
        const info = gl!.getActiveUniform(p, i)!;
        u[info.name] = gl!.getUniformLocation(p, info.name);
      }
      return { bind: () => gl!.useProgram(p), u };
    }

    /* ── quad geometry ── */
    const vb = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, vb);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,-1,1,1,1,1,-1]), gl.STATIC_DRAW);
    const ib = gl.createBuffer()!;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0,1,2,0,2,3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    /* ── FBO helpers ── */
    type FBO = {
      tex: WebGLTexture; fbo: WebGLFramebuffer;
      w: number; h: number; tx: number; ty: number;
      attach(id: number): number;
    };

    function mkFBO(w: number, h: number, filter: number): FBO {
      gl!.activeTexture(gl!.TEXTURE0);
      const tex = gl!.createTexture()!;
      gl!.bindTexture(gl!.TEXTURE_2D, tex);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, filter);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, filter);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
      gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, w, h, 0, gl!.RGBA, FLOAT_TYPE, null);
      const fbo = gl!.createFramebuffer()!;
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbo);
      gl!.framebufferTexture2D(gl!.FRAMEBUFFER, gl!.COLOR_ATTACHMENT0, gl!.TEXTURE_2D, tex, 0);
      gl!.viewport(0, 0, w, h);
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      return {
        tex, fbo, w, h, tx: 1/w, ty: 1/h,
        attach(id: number) {
          gl!.activeTexture(gl!.TEXTURE0 + id);
          gl!.bindTexture(gl!.TEXTURE_2D, tex);
          return id;
        },
      };
    }

    function mkDFBO(w: number, h: number, filter: number) {
      let r = mkFBO(w, h, filter);
      let wr = mkFBO(w, h, filter);
      return {
        w, h, tx: r.tx, ty: r.ty,
        get read() { return r; },
        get write() { return wr; },
        swap() { [r, wr] = [wr, r]; },
      };
    }

    function blit(dst: FBO | null) {
      if (dst) {
        gl!.viewport(0, 0, dst.w, dst.h);
        gl!.bindFramebuffer(gl!.FRAMEBUFFER, dst.fbo);
      } else {
        gl!.viewport(0, 0, canvas!.width, canvas!.height);
        gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
      }
      gl!.drawElements(gl!.TRIANGLES, 6, gl!.UNSIGNED_SHORT, 0);
    }

    /* ── compile programs ── */
    const clearP = mkProg(FS_CLEAR);
    const splatP = mkProg(FS_SPLAT);
    const advP   = mkProg(FS_ADVECT);
    const divP   = mkProg(FS_DIV);
    const curlP  = mkProg(FS_CURL);
    const vortP  = mkProg(FS_VORT);
    const pressP = mkProg(FS_PRESS);
    const gradP  = mkProg(FS_GRAD);
    const dispP  = mkProg(FS_DISPLAY);

    /* ── simulation buffers ── */
    const SIM = 128, DYE = 512;
    const vel  = mkDFBO(SIM, SIM, LINEAR);
    const dye  = mkDFBO(DYE, DYE, LINEAR);
    const pres = mkDFBO(SIM, SIM, gl.NEAREST);
    const divB = mkFBO(SIM, SIM, gl.NEAREST);
    const curB = mkFBO(SIM, SIM, gl.NEAREST);

    /* ── simulation step ── */
    const CURL_V = 4, P_ITER = 20, PRES_V = 0.1, VEL_D = 1.8, DEN_D = 3.0;

    function simStep(dt: number) {
      const g = gl!;
      g.disable(g.BLEND);

      // Curl
      curlP.bind();
      g.uniform2f(curlP.u.tx!, vel.read.tx, vel.read.ty);
      g.uniform1i(curlP.u.uV!, vel.read.attach(0));
      blit(curB);

      // Vorticity confinement
      vortP.bind();
      g.uniform2f(vortP.u.tx!, vel.read.tx, vel.read.ty);
      g.uniform1i(vortP.u.uV!, vel.read.attach(0));
      g.uniform1i(vortP.u.uC!, curB.attach(1));
      g.uniform1f(vortP.u.curl!, CURL_V);
      g.uniform1f(vortP.u.dt!,   dt);
      blit(vel.write); vel.swap();

      // Divergence
      divP.bind();
      g.uniform2f(divP.u.tx!, vel.read.tx, vel.read.ty);
      g.uniform1i(divP.u.uV!, vel.read.attach(0));
      blit(divB);

      // Clear pressure
      clearP.bind();
      g.uniform1i(clearP.u.u!, pres.read.attach(0));
      g.uniform1f(clearP.u.v!, PRES_V);
      blit(pres.write); pres.swap();

      // Jacobi pressure solve
      pressP.bind();
      for (let i = 0; i < P_ITER; i++) {
        g.uniform2f(pressP.u.tx!, pres.read.tx, pres.read.ty);
        g.uniform1i(pressP.u.uP!, pres.read.attach(0));
        g.uniform1i(pressP.u.uD!, divB.attach(1));
        blit(pres.write); pres.swap();
      }

      // Gradient subtract
      gradP.bind();
      g.uniform2f(gradP.u.tx!, vel.read.tx, vel.read.ty);
      g.uniform1i(gradP.u.uP!, pres.read.attach(0));
      g.uniform1i(gradP.u.uV!, vel.read.attach(1));
      blit(vel.write); vel.swap();

      // Advect velocity
      advP.bind();
      g.uniform2f(advP.u.tx!,  vel.read.tx, vel.read.ty);
      g.uniform2f(advP.u.dTx!, vel.read.tx, vel.read.ty);
      g.uniform1i(advP.u.uV!,  vel.read.attach(0));
      g.uniform1i(advP.u.uS!,  vel.read.attach(0));
      g.uniform1f(advP.u.dt!,   dt);
      g.uniform1f(advP.u.diss!, VEL_D);
      blit(vel.write); vel.swap();

      // Advect dye
      advP.bind();
      g.uniform2f(advP.u.tx!,  vel.read.tx, vel.read.ty);
      g.uniform2f(advP.u.dTx!, dye.read.tx, dye.read.ty);
      g.uniform1i(advP.u.uV!,  vel.read.attach(0));
      g.uniform1i(advP.u.uS!,  dye.read.attach(1));
      g.uniform1f(advP.u.dt!,   dt);
      g.uniform1f(advP.u.diss!, DEN_D);
      blit(dye.write); dye.swap();
    }

    /* ── splat ── */
    const RADIUS = 0.2, FORCE = 7000;

    function splat(x: number, y: number, dx: number, dy: number, col: number[]) {
      const g = gl!;
      const ar = canvas!.width / canvas!.height;
      splatP.bind();

      // velocity splat
      g.uniform1i(splatP.u.uT!, vel.read.attach(0));
      g.uniform1f(splatP.u.ar!, ar);
      g.uniform2f(splatP.u.pt!, x, y);
      g.uniform3f(splatP.u.col!, dx, dy, 0.0);
      g.uniform1f(splatP.u.r!, RADIUS / 100);
      blit(vel.write); vel.swap();

      // dye splat
      g.uniform1i(splatP.u.uT!, dye.read.attach(0));
      g.uniform3f(splatP.u.col!, col[0], col[1], col[2]);
      blit(dye.write); dye.swap();
    }

    /* ── render ── */
    function render() {
      const g = gl!;
      g.enable(g.BLEND);
      g.blendFunc(g.SRC_ALPHA, g.ONE); // additive blending → neon glow
      g.viewport(0, 0, canvas!.width, canvas!.height);
      g.bindFramebuffer(g.FRAMEBUFFER, null);
      g.clearColor(0, 0, 0, 0);
      g.clear(g.COLOR_BUFFER_BIT);
      dispP.bind();
      g.uniform2f(dispP.u.tx!, 1 / canvas!.width, 1 / canvas!.height);
      g.uniform1i(dispP.u.u!, dye.read.attach(0));
      g.drawElements(g.TRIANGLES, 6, g.UNSIGNED_SHORT, 0);
    }

    /* ── animation loop ── */
    let rafId = 0;
    let lastT = performance.now();
    function frame() {
      const now = performance.now();
      const dt  = Math.min((now - lastT) / 1000, 0.016667);
      lastT = now;
      simStep(dt);
      render();
      rafId = requestAnimationFrame(frame);
    }
    rafId = requestAnimationFrame(frame);

    /* ── pointer tracking ── */
    let lx = -1, ly = -1, palIdx = 0;

    function toUV(e: MouseEvent): [number, number] {
      return [e.clientX / canvas!.width, 1.0 - e.clientY / canvas!.height];
    }

    function onMove(e: MouseEvent) {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (isCTA(el)) { lx = -1; ly = -1; return; }

      const [x, y] = toUV(e);
      if (lx < 0) { lx = x; ly = y; return; }

      const dx = (x - lx) * FORCE;
      const dy = (y - ly) * FORCE;
      if (Math.abs(dx) > 0.001 || Math.abs(dy) > 0.001) {
        splat(x, y, dx, dy, PALETTE[palIdx % PALETTE.length]);
        // cycle colour every few moves for rainbow trail
        if (Math.random() < 0.08) palIdx++;
      }
      lx = x; ly = y;
    }

    function onClick(e: MouseEvent) {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (isCTA(el)) return;

      const [x, y] = toUV(e);
      const col = PALETTE[palIdx % PALETTE.length];
      // 8-directional burst for satisfying click splash
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        splat(x, y, Math.cos(a) * FORCE * 0.7, Math.sin(a) * FORCE * 0.7, col);
      }
      // Extra centre burst for the cyan primary colour
      splat(x, y, 0, FORCE * 0.3, [0.0, 0.85, 1.0]);
      palIdx++;
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize",    onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click",     onClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9990,
        mixBlendMode: "screen",   // additive overlay — neon glow on dark bg
      }}
    />
  );
}
