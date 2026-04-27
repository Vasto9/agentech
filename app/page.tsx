"use client";

import React, { useEffect, useRef, useState } from "react";
import LeadModal from "./components/LeadModal";
import { motion, useReducedMotion, useMotionValue, useMotionTemplate } from "framer-motion";

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
  Zap,
  BadgeCheck,
  BarChart3,
  ShieldCheck,
  ArrowRight,
  X,
  Heart,
  Building2,
  GraduationCap,
  Gem,
  Play,
} from "lucide-react";

const BRAND = "AgenciaTech";
const WHATSAPP_NUMBER = "34722603447";

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
  price: string;
  unit: string;
  desc: string;
  features: string[];
  stackValue: string;
  highlighted?: boolean;
};

const plans: PricePlan[] = [
  {
    name: "Starter",
    tag: "Para empezar",
    price: "490€",
    unit: "/ mes",
    desc: "Para negocios que quieren probar el formato antes de comprometerse.",
    features: [
      "4 vídeos hiperrealistas / mes",
      "8 imágenes fotorrealistas / mes",
      "Formatos para Instagram y Meta Ads",
      "2 rondas de revisión incluidas",
      "Entrega en 5 días hábiles",
    ],
    stackValue: "~2.400€ en producción tradicional",
  },
  {
    name: "Growth",
    badge: "El más elegido",
    tag: "Para escalar",
    price: "990€",
    unit: "/ mes",
    desc: "Contenido constante para negocios que quieren aparecer top cada semana.",
    features: [
      "10 vídeos hiperrealistas / mes",
      "20 imágenes fotorrealistas / mes",
      "Variaciones A/B para anuncios",
      "Formatos feed, stories y reels",
      "Soporte directo por WhatsApp",
      "Entrega en 3 días hábiles",
    ],
    stackValue: "~6.000€ en producción tradicional",
    highlighted: true,
  },
  {
    name: "Premium",
    tag: "Volumen total",
    price: "1.900€",
    unit: "/ mes",
    desc: "Para marcas que van en serio y necesitan contenido sin límite.",
    features: [
      "20 vídeos hiperrealistas / mes",
      "40 imágenes fotorrealistas / mes",
      "Estrategia de contenido mensual",
      "Contacto directo con el equipo",
      "Reunión mensual de resultados",
      "Entrega en 48h",
    ],
    stackValue: "+15.000€ en producción tradicional",
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
  const WHATSAPP_TEXT = encodeURIComponent(`Hola ${BRAND}, me interesa el plan ${plan.name}.`);
  const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}`;

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: isHot ? -6 : -4 }}
      transition={{ duration: 0.25, ease: easeOut }}
      className={cn(
        "gemini-card relative rounded-3xl border backdrop-blur-xl flex flex-col",
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
      <div className="relative p-7 flex flex-col flex-1">
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
          <div className="text-right shrink-0">
            <div className="text-2xl font-semibold text-white">{plan.price}</div>
            <div className="text-xs text-white/50">{plan.unit}</div>
          </div>
        </div>

        <p className="mt-4 text-sm text-white/60 leading-relaxed">{plan.desc}</p>

        {/* Offer stack — valor tachado */}
        <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/35">
          <span className="line-through">{plan.stackValue}</span>
        </div>

        <ul className="mt-5 space-y-3 flex-1">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm text-white/75">
              <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/5 border border-white/10 shrink-0">
                <Check className="h-4 w-4 text-white/80" />
              </span>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className={cn(
            "mt-7 w-full rounded-full px-5 py-3 text-sm font-semibold transition text-center block",
            isHot
              ? "bg-white text-black hover:bg-white/90"
              : "bg-white/10 text-white hover:bg-white/15 border border-white/10"
          )}
        >
          Quiero este plan
        </a>

        <p className="mt-4 text-center text-xs text-white/45">Sin permanencia · Cancela cuando quieras</p>
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

// ─── PROBLEM STACKING ────────────────────────────────────────────────────────
function ProblemSection() {
  const problems = [
    "Pagas 600–1.500€ por una sola foto o render profesional.",
    "Esperas 3–4 semanas para tener el contenido listo.",
    "Dependes de fotógrafos, modelos y estudios que no siempre están disponibles.",
    "Cuando por fin tienes el contenido, tu competencia ya publicó primero.",
    "No puedes escalar porque cada pieza nueva te cuesta una fortuna.",
    "Tu contenido actual no refleja el nivel real de tu negocio.",
  ];

  return (
    <motion.section
      id="problema"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="mx-auto max-w-6xl px-5 py-16 md:py-20"
    >
      <SectionTitle
        label="El problema"
        title="¿Te suena esto?"
        subtitle="El 90% de negocios que nos contactan comparten los mismos problemas antes de trabajar con nosotros."
      />

      <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {problems.map((p, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="gemini-card flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl"
          >
            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20">
              <X className="h-4 w-4 text-red-400" />
            </span>
            <p className="text-sm text-white/70">{p}</p>
          </motion.div>
        ))}
      </div>

      <motion.div variants={fadeUp} className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-center">
        <p className="text-white/55 text-sm">
          Resultado: <span className="text-white/90 font-semibold">tu negocio aparece peor de lo que es</span> y pierdes clientes frente a competidores con mejor contenido.
        </p>
      </motion.div>
    </motion.section>
  );
}

// ─── PARA QUIÉN ───────────────────────────────────────────────────────────────
function UseCasesSection() {
  const cases = [
    {
      icon: <Heart className="h-5 w-5" />,
      title: "Clínicas y estética",
      desc: "Tratamientos, ambientes y resultados visualmente perfectos para Meta Ads. Sin modelos, sin sesiones, sin depender de pacientes reales.",
      tag: "Medicina estética · Cirugía · Dermatología",
    },
    {
      icon: <Building2 className="h-5 w-5" />,
      title: "Inmobiliarias y promotoras",
      desc: "Renders fotorrealistas de propiedades sobre plano y vídeos cinemáticos. Cierra ventas antes de construir.",
      tag: "Promotoras · Agencias · Obra nueva",
    },
    {
      icon: <GraduationCap className="h-5 w-5" />,
      title: "Formación de alto ticket",
      desc: "Vídeos de autoridad y creatives para Meta Ads que justifican precios de 2.000€ en adelante. Más conversión, menos coste por lead.",
      tag: "Academias · Coaches · Consultoras",
    },
    {
      icon: <Gem className="h-5 w-5" />,
      title: "Marcas y productos",
      desc: "Joyería, moda, cosméticos, automoción. Contenido al nivel de marcas internacionales sin presupuesto de producción internacional.",
      tag: "Lujo · Lifestyle · Ecommerce premium",
    },
  ];

  return (
    <motion.section
      id="servicios"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="mx-auto max-w-6xl px-5 py-16 md:py-20"
    >
      <SectionTitle
        label="Para quién"
        title="Para cualquier negocio que quiera parecer top"
        subtitle="Da igual tu sector. Si tu cliente decide en base a lo que ve, nosotros te ayudamos a ganar esa batalla."
      />

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cases.map((s) => (
          <motion.div
            key={s.title}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25, ease: easeOut }}
            className="gemini-card rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
          >
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-purple-500/10 border border-purple-500/20 mb-4">
              <span className="text-purple-400">{s.icon}</span>
            </div>
            <div className="text-base font-semibold text-white">{s.title}</div>
            <p className="mt-2 text-sm text-white/65">{s.desc}</p>
            <div className="mt-3 text-xs text-white/30">{s.tag}</div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// ─── ANTES / DESPUÉS ─────────────────────────────────────────────────────────
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
      <SectionTitle
        label="La diferencia"
        title="Antes y después"
        subtitle="De un contenido que se ignora a uno que convierte. Esto es lo que cambia cuando trabajas con nosotros."
      />

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <motion.div
          variants={fadeUp}
          className="gemini-card rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <div className="font-semibold text-white/90">Sin AgenciaTech</div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
              Producción tradicional
            </span>
          </div>
          <div className="p-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              {[
                "Renders 3D: 600–1.500€ por imagen, 3 semanas de espera.",
                "Rodaje en físico: imposible si el producto o espacio aún no existe.",
                "Sin contenido → sin anuncios → leads perdidos cada día.",
                "Competidores con mejor contenido se llevan tus clientes.",
              ].map((t) => (
                <div key={t} className="flex items-start gap-3 text-sm text-white/70 mt-3 first:mt-0">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/5 border border-white/10 shrink-0">
                    <X className="h-4 w-4 text-white/70" />
                  </span>
                  <div>{t}</div>
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                { k: "Tiempo", v: "3–4 semanas" },
                { k: "Coste", v: "+1.500€/pieza" },
                { k: "Resultado", v: "Mediocre" },
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
            <div className="font-semibold text-white/90">Con AgenciaTech</div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
              IA generativa
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
                    <Play className="h-3.5 w-3.5" /> generado con IA
                  </span>
                  <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-white/80 backdrop-blur">
                    3–5 días
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                { k: "Tiempo", v: "3–5 días" },
                { k: "Coste", v: "Desde 49€/pieza" },
                { k: "Resultado", v: "Premium" },
              ].map((m) => (
                <div key={m.k} className="rounded-2xl border border-purple-500/10 bg-purple-500/[0.03] p-4">
                  <div className="text-xs text-white/55">{m.k}</div>
                  <div className="mt-1 font-semibold text-purple-400">{m.v}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => scrollToId("contacto")}
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90 transition"
              >
                Solicitar muestra gratis <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

// ─── OFFER STACKING ──────────────────────────────────────────────────────────
function OfferStackSection() {
  const items = [
    { label: "Vídeos hiperrealistas generados con IA", value: "800€ / vídeo con agencia tradicional" },
    { label: "Imágenes fotorrealistas listas para publicar", value: "400€ / sesión tradicional" },
    { label: "Variaciones A/B para Meta Ads", value: "200€ / variación" },
    { label: "Formatos múltiples (feed, stories, reels)", value: "Incluido" },
    { label: "Revisiones hasta que quede perfecto", value: "Incluido" },
    { label: "Entrega en 3–5 días hábiles", value: "No en 3–4 semanas" },
  ];

  return (
    <motion.section
      id="oferta"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="mx-auto max-w-6xl px-5 py-16 md:py-20"
    >
      <SectionTitle
        label="La oferta"
        title="Todo lo que incluye. Sin letra pequeña."
        subtitle="Esto es lo que recibes con cada plan — y lo que te costaría si lo hicieras de forma tradicional."
      />

      <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
        {items.map((item, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className={cn(
              "flex items-center justify-between gap-4 px-6 py-4 text-sm",
              i < items.length - 1 ? "border-b border-white/10" : ""
            )}
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500/10 border border-purple-500/20">
                <Check className="h-3.5 w-3.5 text-purple-400" />
              </span>
              <span className="text-white/80">{item.label}</span>
            </div>
            <span className="shrink-0 text-xs text-white/35 text-right">{item.value}</span>
          </motion.div>
        ))}
      </div>

      <motion.div variants={fadeUp} className="mt-6 flex justify-center">
        <button
          onClick={() => scrollToId("precios")}
          className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90 transition"
        >
          Ver precios <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </motion.div>
    </motion.section>
  );
}

// ─── DEMOS ────────────────────────────────────────────────────────────────────
function DemosSection() {
  const demos = [
    { title: "Producto — close up hiperrealista", src: "/demo2.mp4" },
    { title: "Lifestyle — escena aspiracional", src: "/story.mp4" },
    { title: "Autoridad — presentación de marca", src: "/objecion.mp4" },
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
      <SectionTitle
        label="Ejemplos reales"
        title="Así queda el contenido"
        subtitle="Piezas generadas al 100% con IA. Sin cámara, sin estudio, sin esperas."
      />

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {demos.map((d) => (
          <motion.div
            key={d.title}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25, ease: easeOut }}
            className="gemini-card rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden"
          >
            <div className="p-6">
              <div className="text-sm font-semibold text-white/85">{d.title}</div>
              <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 overflow-hidden">
                <div className="relative aspect-[9/16] w-full">
                  <video
                    className="absolute inset-0 h-full w-full object-cover"
                    src={d.src}
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
                  <Zap className="h-4 w-4 text-purple-400" /> Generado con IA
                </span>
                <span className="inline-flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-purple-400" /> Fotorrealista
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// ─── GARANTÍA ─────────────────────────────────────────────────────────────────
function GuaranteeSection() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="mx-auto max-w-6xl px-5 py-10"
    >
      <motion.div
        variants={fadeUp}
        className="gemini-card relative overflow-hidden rounded-3xl border border-purple-500/20 bg-white/[0.03] p-8 md:p-12 backdrop-blur-xl text-center"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(168,85,247,0.15),transparent_60%)]" />
        <div className="relative">
          <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-purple-500/10 border border-purple-500/20">
            <ShieldCheck className="h-7 w-7 text-purple-400" />
          </div>
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-gradient">
            Si no te convence, lo rehacemos.
          </h3>
          <p className="mt-3 text-white/55 max-w-xl mx-auto text-sm leading-relaxed">
            Si el contenido entregado no cumple tus expectativas, lo rehacemos sin coste adicional y sin preguntas. Trabajamos hasta que quedes satisfecho o te devolvemos el dinero.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-xs text-purple-200">
            <ShieldCheck className="h-3.5 w-3.5" />
            Garantía de satisfacción en cada entrega
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}

export default function Page() {
  const reduce = useReducedMotion();
  const [openModal, setOpenModal] = useState(false);
  useGeminiTracker();

  const WHATSAPP_TEXT = encodeURIComponent(`Hola ${BRAND}, quiero ver una demo de contenido IA para mi negocio.`);
  const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}`;

  const affBtnRef = useRef<HTMLButtonElement | null>(null);
  const affMenuRef = useRef<HTMLDivElement | null>(null);
  const [affOpen, setAffOpen] = useState(false);
  useOnClickOutside([affBtnRef, affMenuRef], () => setAffOpen(false), affOpen);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setAffOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <GeminiGlobalSpotlight />

      {/* Aurora background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="orb-1 absolute -top-60 left-1/2 -translate-x-1/2 h-[900px] w-[900px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(168,85,247,0.14) 0%, rgba(124,58,237,0.06) 50%, transparent 70%)" }}
        />
        <div
          className="orb-2 absolute top-1/4 -right-60 h-[700px] w-[700px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.11) 0%, transparent 70%)" }}
        />
        <div
          className="orb-3 absolute -bottom-60 -left-40 h-[750px] w-[750px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(168,85,247,0.10) 0%, transparent 70%)" }}
        />
        <div
          className="orb-4 absolute top-2/3 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(192,132,252,0.08) 0%, transparent 70%)" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,transparent_40%,rgba(0,0,0,0.7)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.85)_100%)]" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-black/70 backdrop-blur-2xl backdrop-saturate-150">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <button onClick={() => scrollToId("top")} className="flex items-center gap-3">
            <img src="/logo.png" alt="AgenciaTech" className="h-9 w-9 rounded-xl object-cover" />
            <div className="font-semibold tracking-tight">{BRAND}</div>
          </button>

          <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
            <button onClick={() => scrollToId("servicios")} className="hover:text-white transition">Para quién</button>
            <button onClick={() => scrollToId("oferta")} className="hover:text-white transition">Qué incluye</button>
            <button onClick={() => scrollToId("precios")} className="hover:text-white transition">Precios</button>
            <button onClick={() => scrollToId("contacto")} className="hover:text-white transition">Contacto</button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToId("demos")}
              className="hidden sm:inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10 transition"
            >
              Ver demos
            </button>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90 transition"
            >
              Ver demo gratis
            </a>
          </div>
        </div>
      </header>

      {/* ORB INTRO — pantalla completa, solo el orbe */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <video
          className="w-[620px] h-[620px] object-cover opacity-90"
          src="/logo.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Fade bottom */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-b from-transparent to-black" />
      </section>

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
              <Pill>Contenido con IA · Entrega en 3–5 días</Pill>

              <h1 className="mt-7 text-[3.2rem] md:text-[4rem] font-semibold tracking-[-0.03em] leading-[1.04]">
                <span className="text-gradient">Tu negocio con imagen de marca premium.</span>
                <br />
                <span className="text-white/40">Sin rodajes. Sin esperas. Sin pagar una fortuna.</span>
              </h1>

              <p className="mt-7 text-base md:text-lg text-white/50 leading-relaxed max-w-md">
                Producimos vídeos e imágenes hiperrealistas con IA para cualquier negocio que quiera parecer top sin pagar una producción tradicional. Tus clientes no sabrán que no fue un rodaje real.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90 transition"
                >
                  Ver demo gratis
                </a>
                <button
                  onClick={() => scrollToId("demos")}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-medium text-white/80 hover:bg-white/[0.08] hover:text-white transition"
                >
                  Ver ejemplos
                </button>
              </div>

              <div className="mt-10 premium-divider" />

              <div className="mt-8 flex flex-wrap gap-8 text-xs text-white/40">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="h-3.5 w-3.5 text-purple-400" /> Entrega en 3–5 días
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-3.5 w-3.5 text-purple-400" /> Listo para Meta Ads
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-3.5 w-3.5 text-purple-400" /> Sin sesiones de fotos
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="relative">
              <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-3 shadow-[0_30px_90px_rgba(0,0,0,.55)]">
                <div className="relative overflow-hidden rounded-2xl">
                  <video
                    className="h-[520px] w-full object-cover md:h-[560px]"
                    src="/demo2.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,.55),transparent_55%)]" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                    <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-white/80 backdrop-blur">
                      generado con IA
                    </span>
                    <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-white/80 backdrop-blur">
                      fotorrealista
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="mt-16 h-px w-full bg-white/10" />
        </section>

        {/* PROBLEMA */}
        <ProblemSection />

        <div className="mx-auto max-w-6xl px-5">
          <div className="h-px w-full bg-white/10" />
        </div>

        {/* PARA QUIÉN */}
        <UseCasesSection />

        <div className="mx-auto max-w-6xl px-5">
          <div className="h-px w-full bg-white/10" />
        </div>

        {/* ANTES / DESPUÉS */}
        <CaseBeforeAfter />

        <div className="mx-auto max-w-6xl px-5">
          <div className="h-px w-full bg-white/10" />
        </div>

        {/* OFERTA COMPLETA */}
        <OfferStackSection />

        <div className="mx-auto max-w-6xl px-5">
          <div className="h-px w-full bg-white/10" />
        </div>

        {/* DEMOS */}
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
            <SectionTitle
              label="Planes"
              title="Precios"
              subtitle="Paga por lo que produces. Sin permanencia, sin sorpresas, sin letra pequeña."
            />

            <div className="grid gap-5 lg:grid-cols-3 lg:items-stretch">
              {plans.map((p) => (
                <div key={p.name} className={cn("lg:translate-y-0", p.highlighted ? "lg:-translate-y-6" : "")}>
                  <PricingCard plan={p} />
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-4 pt-4">
              <p className="text-xs text-white/40">¿Necesitas un proyecto puntual?{" "}
                <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="text-white/70 underline underline-offset-2 hover:text-white transition">
                  Pídenos presupuesto a medida.
                </a>
              </p>
            </div>

            <div className="mt-2 h-px w-full bg-white/10" />
          </motion.div>
        </section>

        {/* GARANTÍA */}
        <GuaranteeSection />

        <div className="mx-auto max-w-6xl px-5 py-4">
          <div className="h-px w-full bg-white/10" />
        </div>

        {/* CONTACTO */}
        <section id="contacto" className="mx-auto max-w-6xl px-5 pb-24 pt-10">
          <motion.div
            variants={container}
            initial={reduce ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-8 md:grid-cols-2 md:items-center"
          >
            <motion.div variants={fadeUp}>
              <div className="section-label">Hablemos</div>
              <h3 className="text-3xl md:text-[2.5rem] font-semibold tracking-[-0.025em] text-gradient leading-tight">
                ¿Quieres ver cómo quedaría tu negocio?
              </h3>
              <p className="mt-4 text-white/45 text-sm leading-relaxed">
                Mándanos referencias de tu negocio o producto y te preparamos una muestra gratis. Sin compromiso. Te respondemos en menos de 24h.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90 transition"
                >
                  Solicitar muestra gratis
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
              <div className="text-sm font-semibold text-white">Qué necesitamos para empezar</div>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                {[
                  "Referencias visuales de tu negocio o producto",
                  "El estilo o estética que quieres transmitir",
                  "Dónde vas a usar el contenido (Meta Ads, Instagram, web...)",
                  "Cuántas piezas necesitas al mes",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/5 border border-white/10 shrink-0">
                      <Check className="h-4 w-4 text-white/80" />
                    </span>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4 text-xs text-white/60">
                <span className="font-semibold text-white/80">Tiempo de respuesta:</span> menos de 24h con presupuesto exacto y, si quieres, una muestra real de tu negocio.
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/[0.06] bg-black/60 backdrop-blur-xl">
          <div className="mx-auto max-w-6xl px-5 py-10 text-sm text-white/55 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <button onClick={() => scrollToId("top")} className="flex items-center gap-3">
              <img src="/logo.png" alt="AgenciaTech" className="h-9 w-9 rounded-xl object-cover" />
              <div>&copy; {new Date().getFullYear()} {BRAND}. Contenido visual con IA.</div>
            </button>
            <div className="flex gap-6 text-white/55">
              <button onClick={() => scrollToId("servicios")} className="hover:text-white transition">Para quién</button>
              <button onClick={() => scrollToId("oferta")} className="hover:text-white transition">Qué incluye</button>
              <button onClick={() => scrollToId("precios")} className="hover:text-white transition">Precios</button>
              <button onClick={() => scrollToId("contacto")} className="hover:text-white transition">Contacto</button>
            </div>
          </div>
        </footer>
      </main>

      <LeadModal open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
}
