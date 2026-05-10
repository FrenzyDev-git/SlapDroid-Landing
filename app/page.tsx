"use client";

import { useEffect, useRef, useState, memo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// ─── Floating Lips ─────────────────────────────────────────────────────────
interface Lip {
  x: number; y: number;
  vx: number; vy: number;
  depth: number; imageIndex: number;
}

const FloatingLips = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const mouse = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const isAndroid = /Android/i.test(navigator.userAgent);
    const lipCount = isAndroid ? 6 : 10;

    const handleMouseMove = (e: MouseEvent) => { mouse.current.x = e.clientX; mouse.current.y = e.clientY; };
    const handleTouchMove = (e: TouchEvent) => { const t = e.touches[0]; mouse.current.x = t.clientX; mouse.current.y = t.clientY; };
    const handleTouchEnd = () => { mouse.current.x = -999; mouse.current.y = -999; };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    const imagePool = Array.from({ length: lipCount }, (_, i) => (i % 7) + 1);
    for (let i = imagePool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [imagePool[i], imagePool[j]] = [imagePool[j], imagePool[i]];
    }

    const lips: Lip[] = Array.from({ length: lipCount }, (_, i) => {
      const layer = Math.random();
      const depth = layer < 0.33 ? 0.5 : layer < 0.66 ? 0.85 : 1.2;
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.12 * depth,
        vy: (Math.random() - 0.5) * 0.12 * depth,
        depth, imageIndex: imagePool[i],
      };
    });

    if (containerRef.current) {
      Array.from(containerRef.current.children).forEach((child) => {
        const el = child as HTMLElement;
        el.style.willChange = "transform";
        el.style.backfaceVisibility = "hidden";
      });
    }

    let frameSkip = 0;
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      if (isAndroid) { frameSkip++; if (frameSkip % 2 !== 0) return; }

      const time = Date.now() * 0.001;
      const windAngle = time * (Math.PI * 2 / 120);
      const windX = Math.cos(windAngle) * 0.002;
      const windY = Math.sin(windAngle) * 0.002;

      lips.forEach((lip, i) => {
        lip.vx += windX * lip.depth;
        lip.vy += windY * lip.depth;
        lip.vx += (Math.random() - 0.5) * 0.005;
        lip.vy += (Math.random() - 0.5) * 0.005;

        const dx = lip.x - mouse.current.x;
        const dy = lip.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180 && dist > 0) { lip.vx += dx * 0.0006; lip.vy += dy * 0.0006; }

        lip.vx *= 0.985; lip.vy *= 0.985;
        lip.x += lip.vx * 16; lip.y += lip.vy * 16;

        if (lip.x > window.innerWidth + 120) lip.x = -120;
        if (lip.x < -120) lip.x = window.innerWidth + 120;
        if (lip.y > window.innerHeight + 120) lip.y = -120;
        if (lip.y < -120) lip.y = window.innerHeight + 120;

        if (containerRef.current) {
          const el = containerRef.current.children[i] as HTMLElement;
          if (!el) return;
          const wobbleX = Math.sin(time * 0.8 + i * 1.3) * (5 * lip.depth);
          const wobbleY = Math.cos(time * 0.6 + i * 1.7) * (5 * lip.depth);
          const rotation = Math.sin(time * 0.7 + i * 1.2) * 15;
          el.style.transform = `translate(${lip.x + wobbleX}px, ${lip.y + wobbleY}px) scale(${lip.depth}) rotate(${rotation}deg)`;
          el.style.opacity = `${0.15 + lip.depth * 0.25}`;
        }
      });
    };

    animate();
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const staticShuffle = [1, 5, 3, 7, 2, 6, 4, 1, 5, 3];
  
  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {staticShuffle.map((imgId, i) => (
        <div key={i} className="absolute" style={{ width: "80px", height: "80px", willChange: "transform", top: -200 }}>
          <Image src={`/lips/${imgId}.png`} alt="" width={80} height={80} className="object-contain w-full h-full" />
        </div>
      ))}
    </div>
  );
});
FloatingLips.displayName = "FloatingLips";

// ─── Impact Text Component ────────────────────────────────────────────────────
const ImpactText = ({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => (
  <span className={`font-black uppercase tracking-tighter leading-none ${className}`}
    style={{ fontFamily: "'Impact', 'Arial Black', sans-serif", ...style }}>
    {children}
  </span>
);

// ─── Slap Counter Demo ────────────────────────────────────────────────────────
const SlapDemo = () => {
  const [count, setCount] = useState(0);
  const [burst, setBurst] = useState(false);
  const [intensity, setIntensity] = useState<"soft" | "medium" | "hard" | null>(null);

  const handleSlap = () => {
    const rand = Math.random();
    const level = rand < 0.4 ? "soft" : rand < 0.75 ? "medium" : "hard";
    setCount(p => p + 1);
    setIntensity(level as any);
    setBurst(true);
    setTimeout(() => { setBurst(false); setIntensity(null); }, 400);
  };

  const colors = { soft: "#ff6b6b", medium: "#ff3333", hard: "#cc0000" };
  const labels = { soft: "SOFT SLAP", medium: "MEDIUM SLAP", hard: "HARD SLAP 🔥" };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative flex flex-col items-center justify-center cursor-pointer select-none"
        style={{
          width: 200, height: 200,
          borderRadius: "50%",
          border: `3px solid ${burst && intensity ? colors[intensity] : "#222"}`,
          background: burst && intensity ? `radial-gradient(circle, ${colors[intensity]}22 0%, #0a0a0a 70%)` : "#0a0a0a",
          transition: "all 0.15s ease",
          transform: burst ? "scale(0.94)" : "scale(1)",
          boxShadow: burst && intensity ? `0 0 60px ${colors[intensity]}66` : "0 0 20px #cc000022",
        }}
        onClick={handleSlap}
      >
        <span className="text-5xl font-black text-white" style={{ fontFamily: "Impact, sans-serif" }}>{count}</span>
        <span className="text-xs text-zinc-500 tracking-widest mt-1">SLAPS</span>
        {burst && intensity && (
          <span className="absolute -top-8 text-sm font-black tracking-wider animate-bounce"
            style={{ color: colors[intensity], fontFamily: "Impact, sans-serif" }}>
            {labels[intensity]}
          </span>
        )}
      </div>
      <p className="text-zinc-600 text-xs tracking-widest">TAP TO DEMO</p>
    </div>
  );
};

// ─── Main Landing Page ────────────────────────────────────────────────────────
export default function SlapDroidLanding() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const APK_URL = "https://github.com/FrenzyDev-git/SlapDroid-Apk/releases/latest";

  return (
    <main className="relative min-h-screen bg-[#080808] text-white overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat", backgroundSize: "128px" }} />

      {mounted && <FloatingLips />}

      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse, #cc000015 0%, transparent 70%)" }} />

      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center gap-8">
        <Badge variant="outline" className="border-red-900 text-red-500 bg-red-950/30 text-xs tracking-widest px-4 py-1 rounded-full">
          ANDROID · FREE · NO SIGNUP
        </Badge>

        <div className="flex flex-col items-center gap-2">
          <ImpactText className="text-[clamp(72px,18vw,180px)] text-white">
            SLAP
          </ImpactText>
          <ImpactText className="text-[clamp(72px,18vw,180px)]" style={{ color: "#cc0000" }}>
            DROID
          </ImpactText>
        </div>

        <p className="text-zinc-400 text-lg md:text-xl max-w-md leading-relaxed" style={{ fontFamily: "Georgia, serif" }}>
          Slap the back of your phone.<br />
          <span className="text-white font-semibold">It reacts.</span> That&apos;s it.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Button
            asChild
            size="lg"
            className="bg-red-600 hover:bg-red-500 text-white font-black tracking-widest text-sm px-8 py-6 rounded-none border-0 transition-all duration-150 hover:scale-105 active:scale-95"
            style={{ fontFamily: "Impact, sans-serif", letterSpacing: "0.15em" }}
          >
            <a href={APK_URL} target="_blank" rel="noopener noreferrer">
              ↓ DOWNLOAD APK
            </a>
          </Button>

          <Button
            variant="ghost"
            size="lg"
            asChild
            className="text-zinc-500 hover:text-white text-xs tracking-widest"
          >
            <a href="https://github.com/FrenzyDev-git" target="_blank" rel="noopener noreferrer">
              VIEW SOURCE →
            </a>
          </Button>
        </div>

        <p className="text-zinc-700 text-xs tracking-widest">
          FREE · NO ADS · NO DATA COLLECTED · NO BS
        </p>
      </section>

      <Separator className="bg-zinc-900 relative z-10" />

      <section className="relative z-10 flex flex-col items-center justify-center py-24 px-6 gap-12">
        <div className="text-center">
          <ImpactText className="text-4xl md:text-6xl text-white">TRY IT</ImpactText>
          <p className="text-zinc-600 text-sm tracking-widest mt-2">TAP THE CIRCLE. IMAGINE IT&apos;S YOUR PHONE.</p>
        </div>
        <SlapDemo />
      </section>

      <Separator className="bg-zinc-900 relative z-10" />

      <section className="relative z-10 py-24 px-6 max-w-4xl mx-auto">
        <ImpactText className="text-4xl md:text-6xl text-white block text-center mb-16">HOW IT WORKS</ImpactText>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-zinc-900">
          {[
            { step: "01", title: "OPEN APP", desc: "Launch SlapDroid on your Android phone. No signup. No account. Just open." },
            { step: "02", title: "SLAP BACK", desc: "Slap the back of your phone. The accelerometer detects the impact instantly." },
            { step: "03", title: "IT REACTS", desc: "3 intensity levels. Soft, medium, or hard. Each hits different. Try not to laugh." },
          ].map((item, i) => (
            <div key={i} className="p-8 border-b md:border-b-0 md:border-r border-zinc-900 last:border-0">
              <p className="text-red-800 text-xs tracking-widest mb-4" style={{ fontFamily: "Impact, sans-serif" }}>{item.step}</p>
              <ImpactText className="text-2xl text-white block mb-3">{item.title}</ImpactText>
              <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Separator className="bg-zinc-900 relative z-10" />

      <section className="relative z-10 py-24 px-6 max-w-3xl mx-auto text-center">
        <ImpactText className="text-4xl md:text-5xl text-white block mb-4">WHAT DOES IT DO?</ImpactText>
        <p className="text-zinc-500 text-sm tracking-widest mb-12">AND WHAT DOES IT NOT DO</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="border border-zinc-900 p-6">
            <p className="text-red-500 text-xs tracking-widest mb-4 font-black">IT DOES</p>
            {["Detects slaps via accelerometer", "Plays audio reactions", "Counts your slaps", "Works offline, always"].map((item, i) => (
              <p key={i} className="text-zinc-300 text-sm py-2 border-b border-zinc-900 last:border-0 flex items-center gap-2">
                <span className="text-red-500">✓</span> {item}
              </p>
            ))}
          </div>
          <div className="border border-zinc-900 p-6">
            <p className="text-zinc-600 text-xs tracking-widest mb-4 font-black">IT DOES NOT</p>
            {["Collect any data", "Require internet", "Need an account", "Cost anything, ever"].map((item, i) => (
              <p key={i} className="text-zinc-500 text-sm py-2 border-b border-zinc-900 last:border-0 flex items-center gap-2">
                <span className="text-zinc-700">✗</span> {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      <Separator className="bg-zinc-900 relative z-10" />

      <section className="relative z-10 py-24 px-6 flex flex-col items-center gap-8 text-center">
        <ImpactText className="text-[clamp(48px,12vw,120px)] text-white leading-none">
          DOWNLOAD.<br /><span style={{ color: "#cc0000" }}>SLAP.</span><br />REPEAT.
        </ImpactText>
        <Button
          asChild
          size="lg"
          className="bg-red-600 hover:bg-red-500 text-white font-black tracking-widest text-sm px-10 py-7 rounded-none border-0 transition-all duration-150 hover:scale-105 active:scale-95 mt-4"
          style={{ fontFamily: "Impact, sans-serif", letterSpacing: "0.15em" }}
        >
          <a href={APK_URL} target="_blank" rel="noopener noreferrer">
            ↓ GET SLAPDROID FREE
          </a>
        </Button>
        <p className="text-zinc-700 text-xs">Android only · Direct APK · No Play Store required</p>
      </section>

      <footer className="relative z-10 border-t border-zinc-900 py-8 px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <ImpactText className="text-lg text-zinc-700">SLAPDROID</ImpactText>
        <p className="text-zinc-700 text-xs tracking-widest">BUILT BY <a href="https://github.com/FrenzyDev-git" className="text-zinc-500 hover:text-white transition-colors">FRENZYDEV</a></p>
        <div className="flex gap-6">
          <a href="https://github.com/FrenzyDev-git" className="text-zinc-700 hover:text-white text-xs tracking-widest transition-colors">GITHUB</a>
          <a href={APK_URL} className="text-red-800 hover:text-red-500 text-xs tracking-widest transition-colors">DOWNLOAD</a>
        </div>
      </footer>
    </main>
  );
}