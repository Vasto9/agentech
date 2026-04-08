"use client";

import React, { useEffect, useRef, useState } from "react";
import LeadModal from "./components/LeadModal";
import { motion, useReducedMotion, useMotionValue, useMotionTemplate } from "framer-motion";

/* ── Gemini mouse tracker ───────────────────────────────────
   Sets CSS vars --gx / --gy on every .gemini-card so the
   ::before spotlight follows the cursor per-card.           */
/* ── Gemini global spotlight — sigue el ratón en toda la página ── */
function GeminiGlobalSpotlight() {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  const bg = useMotionTemplate`radial-gradient(700px circle at ${mouseX}px ${mouseY}px, rgba(168,85,247,0.07), rgba(139,92,246,0.04), transparent 65%)`;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-20"
      style={{ background: bg }}
    />
  );
}

function useGeminiTracker() {
  useEffect(() => {
    function onMove(e: MouseEvent) {
      const cards = document.querySelectorAll<HTMLElement>(".gemini-card");
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--gx", `${e.clientX - rect.left}px`);
        card.style.setProperty("--gy", `${e.clientY - rect.top}px`);
      });
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
}
import {
  Check,
  Sparkles,
  Zap,
  BadgeCheck,
  Timer,
  BarChart3,
  MessageCircle,
  ShieldCheck,
  Play,
  ArrowRight,
  X,
  ChevronDown,
  Mail,
} from "lucide-react";

const BRAND = "AgenciaTech";

const AFFILIATE_EMAIL = "agenciatech.ia@gmail.com";
const AFFILIATE_SUBJECT = encodeURIComponent(`Quiero ser afiliado de ${BRAND}`);
const AFFILIATE_BODY = encodeURIComponent(
  `Hola ${BRAND},\n\nQuiero trabajar con vosotros como afiliado.\n\nNombre:\nPaís/Ciudad:\nRed social / Web:\nExperiencia (opcional):\n\nGracias.`
);
const AFFILIATE_MAILTO = `mailto:${AFFILIATE_EMAIL}?subject=${AFFILIATE_SUBJECT}&body=${AFFILIATE_BODY}`;

const easeOut = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

const appleIn = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: easeOut },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOut } },
};

type PricePlan = {
  name: string;
  badge?: string;
  tag: string;
  videos: string;
  desc: string;
  features: string[];
  highlighted?: boolean;
};

const plans: PricePlan[] = [
  {
    name: "Prueba",
    tag: "Ideal para empezar",
    videos: "10 vídeos",
    desc: "Valida el formato UGC con tu producto sin comprometerte a largo plazo.",
    features: ["10 vídeos UGC/mes (9–15s)", "1 avatar", "2 rondas de ajustes", "Entrega 72h"],
  },
  {
    name: "Escalado",
    badge: "El más elegido",
    tag: "Para crecer con paid social",
    videos: "30 vídeos",
    desc: "El volumen justo para testear hooks, iterar creatividades y escalar lo que funciona.",
    features: [
      "30 vídeos/mes (9–20s)",
      "2 avatares",
      "Hooks + variaciones (A/B)",
      "Prioridad de entrega",
      "Soporte por WhatsApp",
    ],
    highlighted: true,
  },
  {
    name: "Marca seria",
    tag: "Para ir a fondo",
    videos: "80 vídeos",
    desc: "Estrategia creativa completa para marcas que viven del paid social.",
    features: [
      "80 vídeos/mes (9–30s)",
      "3 avatares",
      "Estrategia creativa mensual",
      "Sistema de iteración semanal",
      "Revisión de copys y ángulos",
    ],
  },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs text-purple-200 backdrop-blur">
      <span className="h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.8)] animate-pulse" />
      {children}
    </span>
  );
}

function SectionTitle({ title, subtitle, label }: { title: string; subtitle?: string; label?: string }) {
  return (
    <motion.div variants={fadeUp} className="max-w-2xl">
      {label && <div className="section-label">{label}</div>}
      <h2 className="text-3xl md:text-[2.6rem] font-semibold tracking-[-0.025em] text-gradient leading-tight">{title}</h2>
      {subtitle ? <p className="mt-3 text-white/45 text-sm md:text-base leading-relaxed">{subtitle}</p> : null}
    </motion.div>
  );
}

function PricingCard({ plan }: { plan: PricePlan }) {
  const isHot = !!plan.highlighted;

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: isHot ? -6 : -4 }}
      transition={{ duration: 0.25, ease: easeOut }}
      className={cn(
        "gemini-card relative rounded-3xl border backdrop-blur-xl",
        "overflow-hidden",
        isHot
          ? "border-purple-500/30 bg-white/[0.05] shadow-[0_0_80px_-20px_rgba(168,85,247,0.4),0_0_0_1px_rgba(168,85,247,0.18)]"
          : "border-white/[0.08] bg-white/[0.02] shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-70",
          isHot ? "bg-[radial-gradient(70%_60%_at_50%_0%,rgba(168,85,247,0.20),transparent_65%)]" : ""
        )}
      />
      <div className="relative p-7">
        {plan.badge ? (
          <div className="mb-4 inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-black">
            {plan.badge}
          </div>
        ) : (
          <div className="mb-4 h-[28px]" />
        )}

        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
            <p className="mt-1 text-xs text-white/50 uppercase tracking-widest">{plan.tag}</p>
          </div>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
            {plan.videos}
          </span>
        </div>

        <p className="mt-4 text-sm text-white/60 leading-relaxed">{plan.desc}</p>

        <ul className="mt-6 space-y-3">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm text-white/75">
              <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/5 border border-white/10">
                <Check className="h-4 w-4 text-white/80" />
              </span>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-center text-xs text-white/45">Presupuesto personalizado · Sin compromiso</p>
      </div>
    </motion.div>
  );
}

function useOnClickOutside(
  refs: Array<React.RefObject<Element | null>>,
  handler: () => void,
  when = true
) {
  useEffect(() => {
    if (!when) return;

    const onDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      const clickedInside = refs.some((r) => r.current && r.current.contains(target));
      if (!clickedInside) handler();
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);

    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [refs, handler, when]);
}

function CaseBeforeAfter() {
  return (
    <motion.section
      id="caso"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="mx-auto max-w-6xl px-5 py-16 md:py-20"
    >
      <div className="flex items-start justify-between gap-6">
        <SectionTitle
          label="Resultados"
          title="Caso real"
          subtitle={'De un anuncio ignorado a uno que no se puede soltar. Esto es lo que cambia.'}
        />
        <div className="hidden md:flex">
          <button
            onClick={() => scrollToId("hooks")}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10 transition"
          >
            Ver hooks
          </button>
        </div>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <motion.div
          variants={fadeUp}
          className="gemini-card rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <div className="font-semibold text-white/90">Antes</div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
              Anuncio &ldquo;catálogo&rdquo;
            </span>
          </div>

          <div className="p-6">
            <div className="rounded-2xl border border-white/10 bg-black/30 overflow-hidden">
              <div className="relative aspect-[16/9] w-full">
                <img src="/cerave.jpg" alt="Antes" className="absolute inset-0 h-full w-full object-cover" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,.65),transparent_60%)]" />
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              {[
                "\u201cProducto + precio\u201d sin historia ni objeción.",
                "0 prueba, 0 credibilidad, 0 motivo para quedarse.",
                "CTA flojo: \u201cvisita la web\u201d.",
              ].map((t) => (
                <div key={t} className="flex items-start gap-3 text-sm text-white/70 mt-3 first:mt-0">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/5 border border-white/10">
                    <X className="h-4 w-4 text-white/70" />
                  </span>
                  <div>{t}</div>
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                { k: "Retención", v: "Baja" },
                { k: "CTR", v: "Plano" },
                { k: "CPA", v: "Caro" },
              ].map((m) => (
                <div key={m.k} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="text-xs text-white/55">{m.k}</div>
                  <div className="mt-1 font-semibold text-white/85">{m.v}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="gemini-card rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <div className="font-semibold text-white/90">Después</div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
              UGC + Hook + Objeción
            </span>
          </div>

          <div className="p-6">
            <div className="rounded-2xl border border-white/10 bg-black/30 overflow-hidden">
              <div className="relative aspect-[16/9] w-full">
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  src="/caso.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,.65),transparent_60%)]" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-white/80 backdrop-blur">
                    <Play className="h-3.5 w-3.5" /> ejemplo
                  </span>
                  <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-white/80 backdrop-blur">
                    15–20s
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <div className="text-sm font-semibold text-white/85">Ejemplo de estructura (15–20s)</div>
              <div className="mt-4 space-y-3">
                {[
                  { t: "0-2s", tag: "Hook", v: "\u201cSi te dura el maquillaje 2 horas, esto te interesa.\u201d" },
                  { t: "2-8s", tag: "Prueba", v: "Aplicación rápida + resultado visible (sin filtros raros)." },
                  { t: "8-14s", tag: "Objeción", v: "\u201cNo, no engrasa. Y si tienes piel sensible, mejor todavía.\u201d" },
                  { t: "14-20s", tag: "CTA", v: "\u201cComenta 'DEMO' y te lo preparo en tu producto.\u201d" },
                ].map((row) => (
                  <div
                    key={row.t}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4 flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="text-xs text-white/55">{row.t}</div>
                      <div className="mt-1 text-sm text-white/80">{row.v}</div>
                    </div>
                    <div className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                      {row.tag}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => scrollToId("hooks")}
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90 transition"
              >
                Ver hooks <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <button
                onClick={() => scrollToId("contacto")}
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/10 transition"
              >
                Quiero esto para mi producto
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function HooksSection() {
  const hooks = [
    {
      title: "Hook directo",
      desc: "Frase corta + promesa clara. Ideal para productos de impulso.",
      example: "\u201cSi tu piel se te pela con el frío, esto te salva.\u201d",
      video: "/demo2.mp4",
      poster: "/poster.png",
      cta: "Comenta \u201cDIRECTO\u201d",
    },
    {
      title: "Hook story",
      desc: "Historia de 1 línea. Funciona para confianza y retención.",
      example: "\u201cMe lo recomendó mi dermatóloga y ahora no lo suelto.\u201d",
      video: "/story.mp4",
      poster: "/poster.png",
      cta: "Comenta \u201cSTORY\u201d",
    },
    {
      title: "Hook objeción",
      desc: "Ataca el 'pero…' antes de que lo piensen. Conversión pura.",
      example: "\u201cNo engrasa. Y si tienes piel sensible, mejor.\u201d",
      video: "/objecion.mp4",
      poster: "/poster.png",
      cta: "Comenta \u201cOBJECIÓN\u201d",
    },
  ];

  return (
    <motion.section
      id="hooks"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="mx-auto max-w-6xl px-5 pb-20"
    >
      <SectionTitle label="Formatos" title="Hooks" subtitle="Tres ángulos. Cada uno diseñado para un momento distinto del funnel." />

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {hooks.map((h) => (
          <motion.div
            key={h.title}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25, ease: easeOut }}
            className="gemini-card rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden"
          >
            <div className="p-6">
              <div className="text-lg font-semibold text-white">{h.title}</div>
              <p className="mt-2 text-sm text-white/65">{h.desc}</p>

              <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-4 text-sm text-white/75">
                <span className="text-white/55">Ejemplo:</span> {h.example}
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 overflow-hidden">
                <div className="relative aspect-[9/16] w-full">
                  <video
                    className="absolute inset-0 h-full w-full object-cover"
                    src={h.video}
                    poster={h.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,.65),transparent_60%)]" />
                </div>
              </div>

              <button
                onClick={() => scrollToId("contacto")}
                className="mt-5 w-full inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90 transition"
              >
                {h.cta}
              </button>

              <p className="mt-3 text-center text-xs text-white/45">Te preparo 3 variaciones por hook.</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function DemosSection() {
  const demos = [
    { title: "Demo rápido (directo)", src: "/demo2.mp4", poster: "/poster.png" },
    { title: "Demo story", src: "/story.mp4", poster: "/poster.png" },
    { title: "Demo objeción", src: "/objecion.mp4", poster: "/poster.png" },
  ];

  return (
    <motion.section
      id="demos"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="mx-auto max-w-6xl px-5 pb-20"
    >
      <SectionTitle label="Ejemplos" title="Demos" subtitle="Piezas reales, listas para publicar. Juzga tú mismo." />

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {demos.map((d) => (
          <motion.div
            key={d.title}
            variants={fadeUp}
            className="gemini-card rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden"
          >
            <div className="p-6">
              <div className="text-sm font-semibold text-white/85">{d.title}</div>
              <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 overflow-hidden">
                <div className="relative aspect-[9/16] w-full">
                  <video
                    className="absolute inset-0 h-full w-full object-cover"
                    src={d.src}
                    poster={d.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,.55),transparent_55%)]" />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-white/55">
                <span className="inline-flex items-center gap-2">
                  <Timer className="h-4 w-4" /> 9–20s
                </span>
                <span className="inline-flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4" /> UGC realista
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default function Page() {
  const reduce = useReducedMotion();
  const [openModal, setOpenModal] = useState(false);
  useGeminiTracker();
  const WHATSAPP_TEXT = encodeURIComponent(`Hola ${BRAND}, quiero una demo para mi producto.`);
  const WHATSAPP_LINK = `https://wa.me/34722603447?text=${WHATSAPP_TEXT}`;

  const [affOpen, setAffOpen] = useState(false);
  const affBtnRef = useRef<HTMLButtonElement | null>(null);
  const affMenuRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside([affBtnRef, affMenuRef], () => setAffOpen(false), affOpen);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAffOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <GeminiGlobalSpotlight />

      {/* ── Aurora background — slow, premium ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Orb 1 — electric purple top center (color logo) */}
        <div
          className="orb-1 absolute -top-60 left-1/2 -translate-x-1/2 h-[900px] w-[900px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(168,85,247,0.14) 0%, rgba(124,58,237,0.06) 50%, transparent 70%)" }}
        />
        {/* Orb 2 — deep purple right */}
        <div
          className="orb-2 absolute top-1/4 -right-60 h-[700px] w-[700px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.11) 0%, transparent 70%)" }}
        />
        {/* Orb 3 — violet bottom left */}
        <div
          className="orb-3 absolute -bottom-60 -left-40 h-[750px] w-[750px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(168,85,247,0.10) 0%, transparent 70%)" }}
        />
        {/* Orb 4 — neon purple glow center-low */}
        <div
          className="orb-4 absolute top-2/3 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(192,132,252,0.08) 0%, transparent 70%)" }}
        />
        {/* Vignette — keeps edges dark and premium */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,transparent_40%,rgba(0,0,0,0.7)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.85)_100%)]" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-black/70 backdrop-blur-2xl backdrop-saturate-150">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <button onClick={() => scrollToId("top")} className="flex items-center gap-3">
            <img src="/logo-agen.jpeg" alt="AgenciaTech" className="h-9 w-9 rounded-xl object-cover" />
            <div className="font-semibold tracking-tight">{BRAND}</div>
          </button>

          <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
            <button onClick={() => scrollToId("servicios")} className="hover:text-white transition">
              Servicios
            </button>
            <button onClick={() => scrollToId("precios")} className="hover:text-white transition">
              Planes
            </button>
            <button onClick={() => scrollToId("caso")} className="hover:text-white transition">
              Caso
            </button>
            <button onClick={() => scrollToId("contacto")} className="hover:text-white transition">
              Contacto
            </button>

            <div className="relative">
              <button
                ref={affBtnRef}
                type="button"
                onClick={() => setAffOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={affOpen}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/10 transition"
              >
                Afiliados
                <ChevronDown className={cn("h-4 w-4 transition", affOpen ? "rotate-180" : "")} />
              </button>

              {affOpen ? (
                <div
                  ref={affMenuRef}
                  role="menu"
                  className="absolute right-0 mt-2 w-72 overflow-hidden rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,.6)]"
                >
                  <div className="p-3">
                    <div className="px-2 py-2">
                      <div className="text-sm font-semibold text-white">Programa de Afiliados</div>
                      <div className="mt-1 text-xs text-white/60">
                        Si quieres trabajar con nosotros como afiliado, envíanos un email.
                      </div>
                    </div>

                    <a
                      role="menuitem"
                      href={AFFILIATE_MAILTO}
                      className="mt-2 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-white/85 hover:bg-white/10 transition"
                    >
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 border border-white/10">
                        <Mail className="h-4 w-4 text-white/80" />
                      </span>
                      <div className="min-w-0">
                        <div className="font-semibold">Enviar solicitud</div>
                        <div className="text-xs text-white/60 truncate">{AFFILIATE_EMAIL}</div>
                      </div>
                    </a>

                    <div className="mt-2 px-2 pb-1 text-[11px] leading-relaxed text-white/55">
                      Asunto: &ldquo;Quiero ser afiliado de {BRAND}&rdquo;. Incluye tu nombre, país y enlaces.
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToId("demos")}
              className="hidden sm:inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10 transition"
            >
              Ver demos
            </button>
            <button
              onClick={() => setOpenModal(true)}
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90 transition"
            >
              Pide presupuesto
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <main id="top" className="relative">
        <section className="mx-auto max-w-6xl px-5 pt-14 md:pt-20">
          <motion.div
            variants={container}
            initial={reduce ? "show" : "hidden"}
            animate="show"
            className="grid items-center gap-12 md:grid-cols-2"
          >
            <motion.div variants={appleIn} className="max-w-xl">
              <Pill>Avatares IA UGC para e-commerce</Pill>

              <h1 className="mt-7 text-[3.2rem] md:text-[4rem] font-semibold tracking-[-0.03em] leading-[1.04]">
                <span className="text-gradient">Anuncios que parecen humanos.</span>
                <br />
                <span className="text-white/40">Y venden como si lo fueran.</span>
              </h1>

              <p className="mt-7 text-base md:text-lg text-white/50 leading-relaxed max-w-md">
                Creamos avatares IA realistas y piezas UGC listas para TikTok y Reels.
                Sin rodajes, sin excusas.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <button
                  onClick={() => scrollToId("precios")}
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90 transition-all duration-200"
                >
                  Ver precios
                </button>
                <button
                  onClick={() => scrollToId("demos")}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-medium text-white/80 hover:bg-white/[0.08] hover:text-white transition-all duration-200"
                >
                  Ver demos
                </button>
              </div>

              <div className="mt-10 premium-divider" />

              <div className="mt-8 flex flex-wrap gap-8 text-xs text-white/40">
                <div className="flex items-center gap-2">
                  <Timer className="h-3.5 w-3.5 text-purple-400" /> Entrega rápida
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-3.5 w-3.5 text-purple-400" /> Enfoque conversión
                </div>
                <div className="flex items-center gap-2">
                  <BadgeCheck className="h-3.5 w-3.5 text-purple-400" /> Variaciones A/B
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="relative">
              <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-3 shadow-[0_30px_90px_rgba(0,0,0,.55)]">
                <div className="relative overflow-hidden rounded-2xl">
                  <video
                    className="h-[520px] w-full object-cover md:h-[560px]"
                    src="/demo2.mp4"
                    poster="/poster.png"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,.55),transparent_55%)]" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                    <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-white/80 backdrop-blur">
                      &ldquo;hook&rdquo; + demo
                    </span>
                    <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-white/80 backdrop-blur">
                      12s
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="mt-16 h-px w-full bg-white/10" />
        </section>

        {/* SERVICIOS */}
        <section id="servicios" className="mx-auto max-w-6xl px-5 py-16 md:py-20">
          <motion.div
            variants={container}
            initial={reduce ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-10"
          >
            <SectionTitle
              label="Qué hacemos"
              title="Servicios"
              subtitle="Te damos anuncios listos para publicar. Tú eliges el producto, nosotros el sistema."
            />

            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  icon: <Zap className="h-5 w-5" />,
                  title: "UGC por hooks (directo / story / objeción)",
                  desc: "Piezas cortas optimizadas por intención. Menos postureo, más CTR.",
                },
                {
                  icon: <ShieldCheck className="h-5 w-5" />,
                  title: "Avatar realista + consistencia de marca",
                  desc: "Misma cara, mismo tono, misma identidad. Parece humano. Y punto.",
                },
                {
                  icon: <MessageCircle className="h-5 w-5" />,
                  title: "Iteración semanal + A/B",
                  desc: "Probamos ángulos, ajustamos copys, y escalamos lo que funciona.",
                },
              ].map((s) => (
                <motion.div
                  key={s.title}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25, ease: easeOut }}
                  className="gemini-card rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-purple-500/10 border border-purple-500/20">
                      <span className="text-purple-400">{s.icon}</span>
                    </div>
                    <div className="text-base font-semibold text-white">{s.title}</div>
                  </div>
                  <p className="mt-3 text-sm text-white/65">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <CaseBeforeAfter />
        <HooksSection />
        <DemosSection />

        {/* PRECIOS */}
        <section id="precios" className="mx-auto max-w-6xl px-5 pb-20">
          <motion.div
            variants={container}
            initial={reduce ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-10"
          >
            <SectionTitle label="Planes" title="¿Qué necesitas?" subtitle="Cada marca es diferente. Te hacemos una propuesta a medida, sin sorpresas." />

            <div className="grid gap-5 lg:grid-cols-3 lg:items-stretch">
              {plans.map((p) => (
                <div key={p.name} className={cn("lg:translate-y-0", p.highlighted ? "lg:-translate-y-6" : "")}>
                  <PricingCard plan={p} />
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-4 pt-4">
              <button
                onClick={() => scrollToId("contacto")}
                className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-black hover:bg-white/90 transition shadow-[0_0_30px_rgba(255,255,255,0.12)]"
              >
                Pide tu presupuesto personalizado
              </button>
              <p className="text-xs text-white/40">Sin compromiso. Te respondemos en menos de 24h.</p>
            </div>

            <div className="mt-2 h-px w-full bg-white/10" />
          </motion.div>
        </section>

        {/* CONTACTO */}
        <section id="contacto" className="mx-auto max-w-6xl px-5 pb-24">
          <motion.div
            variants={container}
            initial={reduce ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-8 md:grid-cols-2 md:items-center"
          >
            <motion.div variants={fadeUp}>
              <div className="section-label">Hablemos</div>
              <h3 className="text-3xl md:text-[2.5rem] font-semibold tracking-[-0.025em] text-gradient leading-tight">¿Quieres que lo hagamos por ti?</h3>
              <p className="mt-4 text-white/45 text-sm leading-relaxed">
                Dinos tu producto, tu público y tu objetivo. Te devolvemos un pack listo para publicar. Si no convierte,
                se itera. Si convierte, se escala.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90 transition"
                >
                  Pide presupuesto
                </a>
                <button
                  onClick={() => scrollToId("demos")}
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/10 transition"
                >
                  Ver ejemplos
                </button>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="gemini-card rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
              <div className="text-sm font-semibold text-white">Checklist para empezar</div>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                {[
                  "1 producto (o colección) + beneficio principal",
                  "Público objetivo y objeciones típicas",
                  "Estilo de marca (serio, agresivo, humor, lujo)",
                  "3 hooks preferidos: directo / story / objeción",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/5 border border-white/10">
                      <Check className="h-4 w-4 text-white/80" />
                    </span>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4 text-xs text-white/60">
                <span className="font-semibold text-white/80">Tip:</span> usa 2–3 variaciones por hook. No necesitas &ldquo;un anuncio perfecto&rdquo;.
                Necesitas un sistema.
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/[0.06] bg-black/60 backdrop-blur-xl">
          <div className="mx-auto max-w-6xl px-5 py-10 text-sm text-white/55 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <button onClick={() => scrollToId("top")} className="flex items-center gap-3">
              <img src="/logo-agen.jpeg" alt="AgenciaTech" className="h-9 w-9 rounded-xl object-cover" />
              <div>&copy; {new Date().getFullYear()} {BRAND}. Hecho para vender.</div>
            </button>
            <div className="flex gap-6 text-white/55">
              <button onClick={() => scrollToId("servicios")} className="hover:text-white transition">Servicios</button>
              <button onClick={() => scrollToId("precios")} className="hover:text-white transition">Planes</button>
              <button onClick={() => scrollToId("caso")} className="hover:text-white transition">Caso</button>
              <button onClick={() => scrollToId("contacto")} className="hover:text-white transition">Contacto</button>
            </div>
          </div>
        </footer>
      </main>

      <LeadModal open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
}
