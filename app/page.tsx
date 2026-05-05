"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useMotionValue, useMotionTemplate } from "framer-motion";
import {
  Camera, Clock, RefreshCw, TrendingUp, Check, X, ArrowRight,
  Mail, ChevronRight,
  Package, BookOpen, Play, Layers, Zap, BarChart3,
} from "lucide-react";

// ── Constants ─────────────────────────────────────────────────────────────────
const BRAND = "Agencia Tech";
const CALENDLY = "https://calendly.com/agenciatech-ia/30min";
const EMAIL = "massimo@agenciatech.es";
const easeOut = [0.16, 1, 0.3, 1] as const;

// ── Animation variants ────────────────────────────────────────────────────────
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.55, ease: easeOut } },
};

// ── Utilities ─────────────────────────────────────────────────────────────────
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ── Global cursor spotlight (Gemini-style) ────────────────────────────────────
function GlobalSpotlight() {
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  useEffect(() => {
    const fn = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", fn, { passive: true });
    return () => window.removeEventListener("mousemove", fn);
  }, [x, y]);
  const bg = useMotionTemplate`radial-gradient(700px circle at ${x}px ${y}px, rgba(123,63,228,0.07), transparent 65%)`;
  return <motion.div className="pointer-events-none fixed inset-0 z-20" style={{ background: bg }} />;
}

function useGeminiTracker() {
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      document.querySelectorAll<HTMLElement>(".gemini-card").forEach((card) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--gx", `${e.clientX - r.left}px`);
        card.style.setProperty("--gy", `${e.clientY - r.top}px`);
      });
    };
    window.addEventListener("mousemove", fn, { passive: true });
    return () => window.removeEventListener("mousemove", fn);
  }, []);
}

// ── Shared components ─────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="section-label">{children}</div>;
}

function SectionTitle({ label, title, subtitle }: { label?: string; title: string; subtitle?: string }) {
  return (
    <motion.div variants={fadeUp} className="max-w-2xl">
      {label && <SectionLabel>{label}</SectionLabel>}
      <h2 className="text-3xl md:text-[2.6rem] font-semibold tracking-[-0.025em] text-gradient leading-tight">{title}</h2>
      {subtitle && <p className="mt-3 text-white/45 text-sm md:text-base leading-relaxed max-w-xl">{subtitle}</p>}
    </motion.div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs text-purple-200 backdrop-blur">
      <span className="h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)] animate-pulse" />
      {children}
    </span>
  );
}

function Divider() {
  return (
    <div className="mx-auto max-w-6xl px-5">
      <div className="h-px w-full bg-white/[0.07]" />
    </div>
  );
}

// ── 1. NAVBAR ─────────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-black/75 backdrop-blur-2xl backdrop-saturate-150">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <button onClick={() => scrollToId("hero")} className="flex items-center gap-3">
          <img src="/logo.png" alt={BRAND} className="h-8 w-8 rounded-xl object-cover" />
          <span className="font-semibold tracking-tight">{BRAND}</span>
        </button>

        <nav className="hidden md:flex items-center gap-8 text-sm text-white/65">
          <button onClick={() => scrollToId("problema")} className="hover:text-white transition">El problema</button>
          <button onClick={() => scrollToId("solucion")} className="hover:text-white transition">Solución</button>
          <button onClick={() => scrollToId("como-funciona")} className="hover:text-white transition">Cómo funciona</button>
          <button onClick={() => scrollToId("resultados")} className="hover:text-white transition">Resultados</button>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollToId("resultados")}
            className="hidden sm:inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10 transition"
          >
            Ver ejemplos
          </button>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90 transition"
          >
            Agenda tu llamada
          </a>
        </div>
      </div>
    </header>
  );
}

// ── 2. HERO ───────────────────────────────────────────────────────────────────
function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section id="hero" className="relative mx-auto max-w-6xl px-5 pt-20 pb-24 md:pt-28 md:pb-32">
      <motion.div
        variants={container}
        initial={reduce ? "show" : "hidden"}
        animate="show"
        className="grid items-center gap-14 lg:grid-cols-2"
      >
        {/* Left — copy */}
        <div>
          <motion.div variants={fadeUp}>
            <Pill>Moda DTC · Entrega en 48 horas</Pill>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-7 text-[2.8rem] md:text-[3.8rem] lg:text-[4.2rem] font-semibold tracking-[-0.03em] leading-[1.06]"
          >
            <span className="text-gradient">Tu marca de moda merece contenido que venda.</span>
            <br />
            <span className="text-white/35">Sin sesiones de fotos.<br />Sin esperar semanas.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-base md:text-lg text-white/50 leading-relaxed max-w-lg"
          >
            Producimos fotos de modelo, lookbooks y vídeos hiperrealistas con IA para tu ecommerce.
            Indistinguibles de una producción real. Entrega en 48 horas.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">
            <a
              href={CALENDLY}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black hover:bg-white/90 transition"
            >
              Agenda tu llamada estratégica <ArrowRight className="h-4 w-4" />
            </a>
            <button
              onClick={() => scrollToId("resultados")}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-white/80 hover:bg-white/[0.08] hover:text-white transition"
            >
              <Play className="h-3.5 w-3.5" /> Ver demo gratuita
            </button>
          </motion.div>

          <div className="mt-10 premium-divider" />

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-6 text-xs text-white/40">
            <span className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-purple-400" /> Entrega en 48 horas</span>
            <span className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-purple-400" /> Sin permanencia</span>
            <span className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-purple-400" /> Listo para Meta Ads</span>
            <span className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-purple-400" /> Variantes incluidas</span>
          </motion.div>
        </div>

        {/* Right — visual grid */}
        <motion.div variants={fadeUp} className="relative">
          <div className="grid grid-cols-2 gap-3">
            {/* Portrait videos — natural 9:16 ratio, no crop */}
            <div className="gemini-card rounded-2xl border border-white/10 bg-black overflow-hidden aspect-[9/16] relative backdrop-blur-xl">
              <video
                src="/story.mp4"
                autoPlay muted loop playsInline
                className="w-full h-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className="text-[10px] text-white/70 font-medium">Lifestyle · Reel</span>
              </div>
            </div>
            <div className="gemini-card rounded-2xl border border-white/10 bg-black overflow-hidden aspect-[9/16] relative backdrop-blur-xl">
              <video
                src="/objecion.mp4"
                autoPlay muted loop playsInline
                className="w-full h-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className="text-[10px] text-white/70 font-medium">Meta Ads · 9:16</span>
              </div>
            </div>
          </div>
          {/* Badge */}
          <div className="absolute -bottom-4 -right-4 rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl px-4 py-3 text-xs">
            <div className="text-white/40">Generado con IA</div>
            <div className="font-semibold text-white mt-0.5">100% hiperrealista</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ── 3. PROBLEMA ───────────────────────────────────────────────────────────────
function ProblemaSection() {
  const pains = [
    {
      icon: <Camera className="h-5 w-5" />,
      title: "Cada sesión de fotos te cuesta 2.000–4.000€",
      desc: "Entre la modelo, el fotógrafo, el estudio y el post-producción, el precio se dispara antes de publicar una sola imagen.",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Esperas 2–3 semanas por cada entrega",
      desc: "Para cuando tienes el contenido listo, la temporada ya ha pasado o tu competencia publicó antes.",
    },
    {
      icon: <RefreshCw className="h-5 w-5" />,
      title: "Tus creatividades de ads caducan cada 14 días",
      desc: "Meta penaliza el contenido repetido. Necesitas frescura constante. Sin ella, tu coste por resultado sube.",
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Si no renuevas contenido, tu competencia te come",
      desc: "Las marcas que publican más y mejor ganan visibilidad. Con producción tradicional, no puedes seguirles el ritmo.",
    },
  ];

  return (
    <motion.section
      id="problema"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="mx-auto max-w-6xl px-5 py-16 md:py-24"
    >
      <SectionTitle
        label="El problema"
        title="El problema de producir contenido de moda en 2025"
        subtitle="Si vendes moda online, ya lo sabes. Producir contenido de calidad de forma constante es caro, lento e insostenible."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pains.map((p, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25, ease: easeOut }}
            className="gemini-card rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl flex flex-col gap-4"
          >
            <div className="h-10 w-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
              <span className="text-red-400">{p.icon}</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-white leading-snug">{p.title}</div>
              <p className="mt-2 text-xs text-white/50 leading-relaxed">{p.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={fadeUp}
        className="mt-8 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 text-center"
      >
        <p className="text-white/45 text-sm">
          Resultado: <span className="text-white/85 font-semibold">tu marca publica menos, gasta más y ve cómo tu competencia te adelanta.</span>
        </p>
      </motion.div>
    </motion.section>
  );
}

// ── 4. SOLUCIÓN ───────────────────────────────────────────────────────────────
function SolucionSection() {
  const deliverables = [
    { icon: <Package className="h-4 w-4" />, text: "Fotos de modelo (on-model) indistinguibles de una sesión real" },
    { icon: <Layers className="h-4 w-4" />, text: "Lifestyle shots con ambientación creíble y narrativa de marca" },
    { icon: <BookOpen className="h-4 w-4" />, text: "Lookbooks completos por colección" },
    { icon: <Play className="h-4 w-4" />, text: "Vídeos cortos (9–20s) para Reels, TikTok y Meta Ads" },
    { icon: <RefreshCw className="h-4 w-4" />, text: "Variantes de color y fondo sin reshoot" },
    { icon: <Zap className="h-4 w-4" />, text: "Entrega en 48 horas desde aprobación del brief" },
  ];

  // Video grid items for solution section
  const gridItems = [
    { src: "/story.mp4", label: "On-model · SS25", badge: "Foto" },
    { src: "/objecion.mp4", label: "Meta Ads · 9:16", badge: "Vídeo" },
    { src: "/demo2.mp4", label: "Lifestyle · Editorial", badge: "Reel" },
  ];

  return (
    <motion.section
      id="solucion"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="mx-auto max-w-6xl px-5 py-16 md:py-24"
    >
      <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
        {/* Left */}
        <div>
          <SectionTitle
            label="La solución"
            title="Producción Visual IA: mismo resultado, sin el circo"
            subtitle="Reemplazamos la sesión de fotos entera. Modelos, estudio, fotógrafo y post-producción incluidos."
          />

          <motion.ul variants={container} className="mt-8 space-y-3">
            {deliverables.map((d, i) => (
              <motion.li key={i} variants={fadeUp} className="flex items-start gap-3">
                <span className="mt-0.5 h-7 w-7 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                  <span className="text-purple-400">{d.icon}</span>
                </span>
                <span className="text-sm text-white/75 leading-relaxed pt-1">{d.text}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp} className="mt-8">
            <a
              href={CALENDLY}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90 transition"
            >
              Quiero una demo de mi marca <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>

        {/* Right — video grid */}
        <motion.div variants={fadeUp} className="grid grid-cols-3 gap-2">
          {gridItems.map((item, i) => (
            <div
              key={i}
              className="gemini-card rounded-2xl border border-white/10 bg-black backdrop-blur-xl overflow-hidden relative"
              style={{ aspectRatio: "9/16" }}
            >
              <video
                src={item.src}
                autoPlay muted loop playsInline
                className="w-full h-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute top-2 right-2">
                <span className="rounded-full border border-white/15 bg-black/50 px-2 py-0.5 text-[9px] text-white/60 backdrop-blur font-mono">
                  {item.badge}
                </span>
              </div>
              <div className="absolute bottom-2 left-2 right-2">
                <span className="text-[9px] font-medium text-white/65 text-center block leading-tight">{item.label}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

// ── 5. COMPARATIVA ────────────────────────────────────────────────────────────
function ComparativaSection() {
  const rows = [
    { concept: "Coste mensual", tradicional: "2.000–4.000€", agencia: "desde 1.500€/mes" },
    { concept: "Incluye vídeo", tradicional: "No", agencia: "Sí" },
    { concept: "Tiempo de entrega", tradicional: "2–3 semanas", agencia: "48 horas" },
    { concept: "Modelos", tradicional: "Contratar aparte", agencia: "Incluido" },
    { concept: "Variantes", tradicional: "Reshoot", agencia: "Incluido" },
    { concept: "Permanencia", tradicional: "Contratos largos", agencia: "Sin permanencia" },
  ];

  return (
    <motion.section
      id="comparativa"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="mx-auto max-w-6xl px-5 py-16 md:py-24"
    >
      <SectionTitle
        label="Comparativa"
        title="Producción tradicional vs. Agencia Tech"
        subtitle="Los números hablan solos. Mismo contenido, sin el proceso que lo hace inviable."
      />

      <motion.div variants={fadeUp} className="mt-12 overflow-hidden rounded-3xl border border-white/10 backdrop-blur-xl">
        {/* Header */}
        <div className="grid grid-cols-3 bg-white/[0.04] border-b border-white/10">
          <div className="px-6 py-4 text-xs font-semibold text-white/40 uppercase tracking-wider"></div>
          <div className="px-6 py-4 text-xs font-semibold text-white/40 uppercase tracking-wider border-l border-white/10 text-center">Tradicional</div>
          <div className="px-6 py-4 text-xs font-semibold text-purple-400 uppercase tracking-wider border-l border-purple-500/20 text-center bg-purple-500/5">Agencia Tech</div>
        </div>

        {rows.map((row, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className={cn(
              "grid grid-cols-3",
              i < rows.length - 1 ? "border-b border-white/[0.07]" : ""
            )}
          >
            <div className="px-6 py-4 text-sm text-white/60">{row.concept}</div>
            <div className="px-6 py-4 border-l border-white/[0.07] text-center">
              <span className={cn(
                "inline-flex items-center gap-1.5 text-sm",
                row.tradicional === "No" || row.tradicional === "Reshoot" || row.tradicional === "Contratar aparte" || row.tradicional === "Contratos largos"
                  ? "text-red-400/80" : "text-white/45"
              )}>
                {(row.tradicional === "No" || row.tradicional === "Reshoot" || row.tradicional === "Contratar aparte" || row.tradicional === "Contratos largos") && (
                  <X className="h-3.5 w-3.5" />
                )}
                {row.tradicional}
              </span>
            </div>
            <div className="px-6 py-4 border-l border-purple-500/15 bg-purple-500/[0.03] text-center">
              <span className="inline-flex items-center gap-1.5 text-sm text-purple-300 font-medium">
                <Check className="h-3.5 w-3.5" /> {row.agencia}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={fadeUp} className="mt-8 flex justify-center">
        <a
          href={CALENDLY}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90 transition"
        >
          Agenda una llamada sin compromiso <ArrowRight className="h-4 w-4" />
        </a>
      </motion.div>
    </motion.section>
  );
}

// ── 6. CÓMO FUNCIONA ─────────────────────────────────────────────────────────
function ComoFuncionaSection() {
  const steps = [
    {
      number: "01",
      title: "Llamada estratégica",
      desc: "Analizamos tu marca, tu catálogo y tus objetivos. En 30 minutos definimos exactamente qué contenido necesitas y para qué canal.",
    },
    {
      number: "02",
      title: "Setup inicial",
      desc: "Auditoría de tu marca, brief visual, plan de contenido para 90 días y primera entrega acelerada lista para publicar.",
    },
    {
      number: "03",
      title: "Producción continua",
      desc: "Entregas quincenales de vídeos e imágenes listas para publicar. Tú apruebas, nosotros ejecutamos. Sin fricciones.",
    },
    {
      number: "04",
      title: "Escala sin límites",
      desc: "Más productos, más variantes, más campañas. Sin costes adicionales de producción. Tu presupuesto crece en resultados, no en rodajes.",
    },
  ];

  return (
    <motion.section
      id="como-funciona"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="mx-auto max-w-6xl px-5 py-16 md:py-24"
    >
      <SectionTitle
        label="El proceso"
        title="Cómo funciona"
        subtitle="Sin onboarding interminable. Sin semanas de espera. De la primera llamada al primer contenido en menos de una semana."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="gemini-card relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
          >
            <div className="text-4xl font-semibold text-white/[0.07] tracking-tight mb-5 select-none">{step.number}</div>
            <div className="text-sm font-semibold text-white mb-2">{step.title}</div>
            <p className="text-xs text-white/50 leading-relaxed">{step.desc}</p>
            {i < steps.length - 1 && (
              <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                <ChevronRight className="h-4 w-4 text-white/20" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// ── 7. RESULTADOS ─────────────────────────────────────────────────────────────
function ResultadosSection() {
  const metrics = [
    { value: "40%", label: "Menos en costes de producción" },
    { value: "10x", label: "Más rápido que una sesión tradicional" },
    { value: "+34%", label: "CTR en Meta Ads con contenido IA" },
  ];

  const cases = [
    {
      brand: "Marca de ropa DTC",
      sector: "Ropa · Ecommerce",
      quote: "Pasamos de publicar 4 piezas al mes a 20. El coste por adquisición bajó un 31% en 60 días.",
      metric: "−31% CPA en 60 días",
    },
    {
      brand: "Marca de accesorios",
      sector: "Accesorios · Moda",
      quote: "Lanzamos una colección completa en 3 días. Antes necesitábamos 3 semanas solo para coordinar la sesión.",
      metric: "Colección completa en 72h",
    },
    {
      brand: "Ecommerce de moda sostenible",
      sector: "Moda · Sostenibilidad",
      quote: "El contenido IA es indistinguible del real. Nuestros clientes no notan la diferencia y nuestro ROAS mejoró un 40%.",
      metric: "+40% ROAS",
    },
  ];

  return (
    <motion.section
      id="resultados"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="mx-auto max-w-6xl px-5 py-16 md:py-24"
    >
      <SectionTitle
        label="Resultados"
        title="Marcas que ya producen con IA"
        subtitle="Números reales de marcas de moda que sustituyeron la producción tradicional."
      />

      {/* Metrics */}
      <motion.div variants={fadeUp} className="mt-12 grid gap-4 sm:grid-cols-3">
        {metrics.map((m, i) => (
          <div
            key={i}
            className="gemini-card rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center backdrop-blur-xl"
          >
            <div className="text-4xl font-semibold text-gradient tracking-tight">{m.value}</div>
            <div className="mt-2 text-xs text-white/45 leading-snug">{m.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Case studies */}
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {cases.map((c, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="gemini-card rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl flex flex-col gap-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-white">{c.brand}</div>
                <div className="text-xs text-white/35 mt-0.5">{c.sector}</div>
              </div>
              <span className="shrink-0 rounded-full border border-purple-500/20 bg-purple-500/10 px-2.5 py-1 text-[10px] font-semibold text-purple-300">
                {c.metric}
              </span>
            </div>
            <p className="text-xs text-white/55 leading-relaxed italic flex-1">"{c.quote}"</p>
          </motion.div>
        ))}
      </div>

      {/* Demo videos */}
      <div className="mt-10">
        <motion.div variants={fadeUp} className="mb-6">
          <SectionLabel>Ejemplos reales</SectionLabel>
          <p className="text-sm text-white/40">Piezas generadas al 100% con IA. Sin cámara. Sin estudio.</p>
        </motion.div>
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            { title: "On-model · Producto", src: "/demo2.mp4" },
            { title: "Lifestyle · Reel", src: "/story.mp4" },
            { title: "Meta Ads · 9:16", src: "/objecion.mp4" },
          ].map((d, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="gemini-card rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden"
            >
              <div className="aspect-[9/16] relative">
                <video
                  src={d.src}
                  autoPlay muted loop playsInline
                  className="w-full h-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-xs text-white/70 font-medium">{d.title}</span>
                  <span className="rounded-full border border-white/10 bg-black/40 px-2 py-0.5 text-[10px] text-white/60 backdrop-blur">IA</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

// ── 8. CTA FINAL ──────────────────────────────────────────────────────────────
function CtaFinalSection() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="mx-auto max-w-6xl px-5 py-16 md:py-24"
    >
      <motion.div
        variants={fadeUp}
        className="gemini-card relative overflow-hidden rounded-3xl border border-purple-500/20 bg-white/[0.02] p-10 md:p-16 backdrop-blur-xl text-center"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_0%,rgba(123,63,228,0.18),transparent_65%)]" />
        <div className="relative">
          <SectionLabel>Siguiente paso</SectionLabel>

          <h2 className="text-3xl md:text-[2.8rem] font-semibold tracking-[-0.025em] text-gradient leading-tight max-w-2xl mx-auto">
            ¿Listo para dejar de depender de producciones físicas?
          </h2>
          <p className="mt-4 text-white/45 text-base leading-relaxed max-w-lg mx-auto">
            Agenda una llamada de 15 minutos. Sin compromiso. Te mostramos una demo real con tu producto.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={CALENDLY}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black hover:bg-white/90 transition"
            >
              Agenda tu llamada <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition"
            >
              <Mail className="h-4 w-4" /> {EMAIL}
            </a>
          </div>

          <p className="mt-6 text-xs text-white/25">Sin permanencia · Sin compromiso · Respuesta en menos de 24h</p>
        </div>
      </motion.div>
    </motion.section>
  );
}

// ── 9. FOOTER ─────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-black/60 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <button onClick={() => scrollToId("hero")} className="flex items-center gap-3">
            <img src="/logo.png" alt={BRAND} className="h-8 w-8 rounded-xl object-cover" />
            <span className="font-semibold text-white/80">{BRAND}</span>
          </button>

          <div className="flex items-center gap-6 text-sm text-white/40">
            <a href={`mailto:${EMAIL}`} className="hover:text-white/70 transition flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" /> {EMAIL}
            </a>
            <a href="https://instagram.com/agenciatech.ia" target="_blank" rel="noreferrer" className="hover:text-white/70 transition">
              Instagram
            </a>
            <a href="https://linkedin.com/company/agenciatech" target="_blank" rel="noreferrer" className="hover:text-white/70 transition">
              LinkedIn
            </a>
          </div>
        </div>

        <div className="mt-8 h-px w-full bg-white/[0.06]" />
        <div className="mt-6 text-xs text-white/25 text-center">
          © 2026 {BRAND}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

// ── Aurora background ──────────────────────────────────────────────────────────
function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      <div className="orb-1 absolute -top-60 left-1/2 -translate-x-1/2 h-[900px] w-[900px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(123,63,228,0.14) 0%, rgba(100,40,180,0.06) 50%, transparent 70%)" }} />
      <div className="orb-2 absolute top-1/4 -right-60 h-[700px] w-[700px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(123,63,228,0.10) 0%, transparent 70%)" }} />
      <div className="orb-3 absolute -bottom-60 -left-40 h-[750px] w-[750px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.09) 0%, transparent 70%)" }} />
      <div className="orb-4 absolute top-2/3 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(192,132,252,0.07) 0%, transparent 70%)" }} />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.8)_100%)]" />
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function Page() {
  useGeminiTracker();

  return (
    <div className="relative min-h-screen bg-black text-white">
      <GlobalSpotlight />
      <AuroraBackground />

      <div className="relative" style={{ zIndex: 10 }}>
        <Navbar />

        <main>
          <HeroSection />
          <Divider />
          <ProblemaSection />
          <Divider />
          <SolucionSection />
          <Divider />
          <ComparativaSection />
          <Divider />
          <ComoFuncionaSection />
          <Divider />
          <ResultadosSection />
          <CtaFinalSection />
        </main>

        <Footer />
      </div>
    </div>
  );
}
