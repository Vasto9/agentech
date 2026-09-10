"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, MotionConfig, useMotionValue, useMotionTemplate } from "framer-motion";
import {
  Camera, Clock, RefreshCw, TrendingUp, Check, X, ArrowRight,
  Mail, ChevronRight, ChevronDown,
  Package, BookOpen, Play, Layers, Zap, ShieldCheck,
} from "lucide-react";

// ── Constants ─────────────────────────────────────────────────────────────────
const BRAND = "Agencia Tech";
const CALENDLY = "https://calendly.com/agenciatech-ia/30min";
const EMAIL = "massimo@agenciatech.es";
const IG = "https://instagram.com/agenciatech__";
const LINKEDIN = "https://www.linkedin.com/in/massimo-vasta-437a99336/";
const DOSSIER = "https://agenciatech-demos.vercel.app";
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

// ── Utilities ─────────────────────────────────────────────────────────────────
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ── Global cursor spotlight ───────────────────────────────────────────────────
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

/** CTA principal. Un solo objetivo en toda la web: agendar la llamada. */
function CtaPrincipal({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <a
      href={CALENDLY}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black hover:bg-white/90 transition",
        className
      )}
    >
      {children ?? "Quiero ver qué anuncios me faltan"} <ArrowRight className="h-4 w-4" />
    </a>
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
          <button onClick={() => scrollToId("solucion")} className="hover:text-white transition">Qué hacemos</button>
          <button onClick={() => scrollToId("como-funciona")} className="hover:text-white transition">Cómo funciona</button>
          <button onClick={() => scrollToId("faq")} className="hover:text-white transition">Preguntas</button>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollToId("ejemplos")}
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

// ── 2. HERO + VSL ─────────────────────────────────────────────────────────────
function VslPlayer() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function play() {
    const v = ref.current;
    if (!v) return;
    v.muted = false;
    v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }

  return (
    <div className="relative">
      {/* Ojo: sin .gemini-card — esa clase fuerza position:relative en sus hijos
          (globals.css) y rompe el inset-0 del botón de play. */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black shadow-[0_0_60px_-15px_rgba(123,63,228,0.35)] aspect-video">
        <video
          ref={ref}
          src="/vsl.mp4"
          poster="/vsl-poster.jpg"
          playsInline
          controls={playing}
          onEnded={() => setPlaying(false)}
          className="h-full w-full object-cover"
        />

        {!playing && (
          <button
            onClick={play}
            aria-label="Reproducir el vídeo"
            className="group absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-t from-black/85 via-black/40 to-black/25 transition hover:from-black/80"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-black shadow-[0_0_40px_rgba(168,85,247,0.35)] transition group-hover:scale-105">
              <Play className="h-6 w-6 translate-x-0.5 fill-black" />
            </span>
            <span className="text-sm font-medium text-white/90">
              Ver el vídeo · 3 min
            </span>
            <span className="max-w-xs px-6 text-center text-xs leading-relaxed text-white/50">
              Te enseño por qué tu mejor anuncio se acaba muriendo y qué se hace en su lugar.
            </span>
          </button>
        )}
      </div>

      <div className="absolute -bottom-4 -right-4 hidden rounded-2xl border border-white/10 bg-black/85 px-4 py-3 text-xs backdrop-blur-xl sm:block">
        <div className="text-white/40">Todo lo que ves</div>
        <div className="mt-0.5 font-semibold text-white">está hecho con IA</div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section id="hero" className="relative mx-auto max-w-6xl px-5 pt-16 pb-20 md:pt-24 md:pb-28">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-3xl text-center"
      >
        <motion.div variants={fadeUp}>
          <Pill>Para negocios que ya invierten en Meta Ads</Pill>
        </motion.div>

        {/* TITULAR — la promesa, hablándole de tú */}
        <motion.h1
          variants={fadeUp}
          className="mt-7 text-[2.6rem] md:text-[3.6rem] font-semibold tracking-[-0.03em] leading-[1.06]"
        >
          <span className="text-gradient">Tu anuncio no dejó de funcionar.</span>
          <br />
          <span className="text-white/35">Se quemó.</span>
        </motion.h1>

        {/* SUBTÍTULO — quita la objeción y deja intriga */}
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-xl text-base md:text-lg leading-relaxed text-white/50"
        >
          No hace falta subir el presupuesto ni cambiar de público. Solo tener
          más que enseñar. Te lo explico en el vídeo.
        </motion.p>
      </motion.div>

      {/* VSL — el objetivo de esta página */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="mx-auto mt-12 max-w-3xl"
      >
        <VslPlayer />
      </motion.div>

      {/* CTA debajo del vídeo */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="mt-10 flex flex-col items-center gap-5"
      >
        <CtaPrincipal className="px-8 py-4">
          Quiero ver qué anuncios me faltan
        </CtaPrincipal>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-white/40">
          <span className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-purple-400" /> 15 minutos, sin compromiso</span>
          <span className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-purple-400" /> Llegamos con tu cuenta revisada</span>
          <span className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-purple-400" /> Garantía por escrito</span>
        </div>
      </motion.div>
    </section>
  );
}

// ── 3. PROBLEMA (agitación) ───────────────────────────────────────────────────
function ProblemaSection() {
  const pains = [
    {
      icon: <RefreshCw className="h-5 w-5" />,
      title: "Llevas meses rotando los mismos seis anuncios",
      desc: "Tu cliente ya se los sabe. Sube el coste por mil impresiones, baja el porcentaje de clics y cada venta te sale más cara.",
    },
    {
      icon: <Camera className="h-5 w-5" />,
      title: "Producir uno nuevo cuesta una sesión de fotos",
      desc: "Estudio, modelo, fotógrafo y post. Cuatro cifras y dos semanas para tener, con suerte, seis piezas.",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Cuando por fin lo tienes, la ventana ya pasó",
      desc: "El calendario lo marca la agenda del estudio, no tu campaña. Publicas cuando puedes, no cuando toca.",
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Y si el que funciona se muere, no tienes recambio",
      desc: "Toda tu inversión depende de una sola pieza que un día deja de rendir sin avisar.",
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
        title="Meta ya no se gana en la segmentación. Se gana en lo que enseñas."
        subtitle="El algoritmo encuentra solo a quien te compra. Lo único que sigue estando en tus manos es qué le pones delante. Y ahí es donde casi todas las marcas se quedan cortas."
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
            <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
              <span className="text-purple-300">{p.icon}</span>
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
          Eso es fatiga creativa. Y{" "}
          <span className="text-white/85 font-semibold">no se arregla cambiando el público.</span>
        </p>
      </motion.div>
    </motion.section>
  );
}

// ── 4. SOLUCIÓN — el qué, nunca el cómo ───────────────────────────────────────
function SolucionSection() {
  const deliverables = [
    { icon: <Layers className="h-4 w-4" />, text: "Cuarenta anuncios al mes, no seis" },
    { icon: <Package className="h-4 w-4" />, text: "Doce ángulos distintos, de público frío a recuperación de carritos" },
    { icon: <Play className="h-4 w-4" />, text: "Vídeo y foto listos para publicar, en vertical y cuadrado" },
    { icon: <RefreshCw className="h-4 w-4" />, text: "Variantes de cada pieza sin volver a producir nada" },
    { icon: <Zap className="h-4 w-4" />, text: "Tres días desde que aprobamos el plan" },
    { icon: <Camera className="h-4 w-4" />, text: "Sin sesión de fotos, sin estudio y sin modelos" },
    { icon: <BookOpen className="h-4 w-4" />, text: "Producto físico, servicios, apps e infoproductos" },
  ];

  const gridItems = [
    { src: "/story.mp4", label: "Lifestyle", badge: "Frío" },
    { src: "/objecion.mp4", label: "Objeción", badge: "Carrito" },
    { src: "/demo2.mp4", label: "Producto", badge: "Templado" },
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
        <div>
          <SectionTitle
            label="Qué hacemos"
            title="Te damos más oportunidades de acertar"
            subtitle="Nadie sabe de antemano cuál va a ganar. Con seis piezas tienes seis intentos. Con cuarenta tienes cuarenta. Eso es lo que compras."
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
            <CtaPrincipal>Enséñame cómo quedaría con mi producto</CtaPrincipal>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="grid grid-cols-3 gap-2">
          {gridItems.map((item, i) => (
            <div
              key={i}
              className="gemini-card rounded-2xl border border-white/10 bg-black backdrop-blur-xl overflow-hidden relative"
              style={{ aspectRatio: "9/16" }}
            >
              <video src={item.src} autoPlay muted loop playsInline className="w-full h-full object-cover" />
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
    { concept: "Anuncios nuevos al mes", tradicional: "6, con suerte", agencia: "40" },
    { concept: "Tiempo hasta tenerlos", tradicional: "2–3 semanas", agencia: "3 días" },
    { concept: "Ángulos distintos", tradicional: "1 o 2", agencia: "Los 12" },
    { concept: "Modelos y estudio", tradicional: "Los pagas aparte", agencia: "No hacen falta" },
    { concept: "Probar una variante", tradicional: "Volver a rodar", agencia: "Incluido" },
    { concept: "Compromiso", tradicional: "12 meses o más", agencia: "3 meses" },
  ];
  const malas = ["6, con suerte", "1 o 2", "Los pagas aparte", "Volver a rodar", "12 meses o más"];

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
        title="Lo de siempre, al lado de esto"
        subtitle="Mismo objetivo. La diferencia está en cuántas veces puedes intentarlo."
      />

      <motion.div variants={fadeUp} className="mt-12 overflow-x-auto rounded-3xl border border-white/10 backdrop-blur-xl">
        <div className="min-w-[560px]">
          <div className="grid grid-cols-3 bg-white/[0.04] border-b border-white/10">
            <div className="px-6 py-4 text-xs font-semibold text-white/40 uppercase tracking-wider"></div>
            <div className="px-6 py-4 text-xs font-semibold text-white/40 uppercase tracking-wider border-l border-white/10 text-center">Sesión de fotos</div>
            <div className="px-6 py-4 text-xs font-semibold text-purple-400 uppercase tracking-wider border-l border-purple-500/20 text-center bg-purple-500/5">Agencia Tech</div>
          </div>

          {rows.map((row, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className={cn("grid grid-cols-3", i < rows.length - 1 ? "border-b border-white/[0.07]" : "")}
            >
              <div className="px-6 py-4 text-sm text-white/60">{row.concept}</div>
              <div className="px-6 py-4 border-l border-white/[0.07] text-center">
                <span className={cn("inline-flex items-center gap-1.5 text-sm", malas.includes(row.tradicional) ? "text-white/35" : "text-white/45")}>
                  {malas.includes(row.tradicional) && <X className="h-3.5 w-3.5" />}
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
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="mt-8 flex justify-center">
        <CtaPrincipal>Agenda 15 min y decídelo viéndolo</CtaPrincipal>
      </motion.div>
    </motion.section>
  );
}

// ── 6. CÓMO FUNCIONA ─────────────────────────────────────────────────────────
function ComoFuncionaSection() {
  const steps = [
    {
      number: "01",
      title: "Estudiamos tu cuenta antes de hablar contigo",
      desc: "Revisamos qué estás publicando y con qué ángulos lo estás haciendo. Llegas a los quince minutos y ya sabemos qué te falta, así no gastamos la llamada en ponernos al día.",
    },
    {
      number: "02",
      title: "Te entregamos el plan del mes",
      desc: "Qué ángulos atacamos, en qué orden y por qué esos. Lo apruebas una vez y ya no te pedimos nada más.",
    },
    {
      number: "03",
      title: "Producimos",
      desc: "Cuarenta piezas en tres días. Tú las pones a competir en tu cuenta; nosotros no tocamos tus campañas.",
    },
    {
      number: "04",
      title: "Leemos y multiplicamos",
      desc: "Lo que gana se convierte en diez variantes el mes siguiente. Lo que no, se retira sin discusión.",
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
        title="Una sola aprobación tuya al mes, y es al principio"
        subtitle="Sin validar pieza por pieza. Sin cadenas de correos. De la primera llamada al primer lote en menos de una semana."
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

// ── 7. GARANTÍA + EJEMPLOS ────────────────────────────────────────────────────
function GarantiaSection() {
  const hechos = [
    { value: "40", label: "anuncios nuevos cada mes" },
    { value: "72h", label: "desde que apruebas el plan" },
    { value: "12", label: "ángulos cubiertos, no uno" },
  ];

  return (
    <motion.section
      id="ejemplos"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="mx-auto max-w-6xl px-5 py-16 md:py-24"
    >
      <SectionTitle
        label="Nuestra garantía"
        title="Superamos a tu mejor anuncio en tus primeros 30 días de campaña"
        subtitle="El plazo empieza cuando la primera tanda está corriendo, no cuando firmas. Y si no lo conseguimos, decides tú: seguimos produciendo sin cobrarte hasta lograrlo, o lo dejas y no debes los meses que quedan. No te prometemos ventas, que eso depende también de tu precio y de tu web. Te prometemos lo único que controlamos: que tu anuncio se vea más y se pulse más."
      />

      <motion.div variants={fadeUp} className="mt-12 grid gap-4 sm:grid-cols-3">
        {hechos.map((m, i) => (
          <div key={i} className="gemini-card rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center backdrop-blur-xl">
            <div className="text-4xl font-semibold text-gradient tracking-tight">{m.value}</div>
            <div className="mt-2 text-xs text-white/45 leading-snug">{m.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Escasez, sin mostrar necesidad */}
      <motion.div
        variants={fadeUp}
        className="mt-6 flex flex-col items-center gap-2 rounded-2xl border border-purple-500/25 bg-purple-500/[0.05] p-6 text-center"
      >
        <ShieldCheck className="h-5 w-5 text-purple-300" />
        <p className="text-white font-semibold">Entran dos marcas al mes. Una ya está cubierta.</p>
        <p className="text-white/45 text-sm">Preferimos hacerlo bien con pocas que regular con muchas.</p>
      </motion.div>

      {/* Ejemplos */}
      <div className="mt-12">
        <motion.div variants={fadeUp} className="mb-6">
          <SectionLabel>Ejemplos reales</SectionLabel>
          <p className="text-sm text-white/40">Piezas hechas al cien por cien con IA. Sin cámara, sin estudio.</p>
          <a
            href={DOSSIER}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white/85 hover:bg-white/[0.09] hover:text-white transition"
          >
            Ver el dossier completo <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </motion.div>
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            { title: "El que vende el después", src: "/demo2.mp4" },
            { title: "El que frena el pulgar", src: "/story.mp4" },
            { title: "El que mata la duda", src: "/objecion.mp4" },
          ].map((d, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="gemini-card rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden"
            >
              <div className="aspect-[9/16] relative">
                <video src={d.src} autoPlay muted loop playsInline className="w-full h-full object-cover" />
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

// ── 8. FAQ ────────────────────────────────────────────────────────────────────
function FaqSection() {
  const faqs = [
    {
      q: "¿Vais a gestionar mis campañas?",
      a: "No, y es a propósito. No tocamos presupuestos, públicos ni pujas: de eso sigue encargándose quien ya lo lleva. Nosotros solo te damos el material que poner a competir, así que no chocamos con nadie.",
    },
    {
      q: "¿Se nota que está hecho con inteligencia artificial?",
      a: "Júzgalo tú: todo lo que hay en esta página está hecho así, y en el dossier tienes muchos más por tipo de negocio. En la llamada te enseñamos los del sector que te interese y lo decides mirándolos, no leyéndolo aquí.",
      link: DOSSIER,
      linkText: "Abrir el dossier de ejemplos",
    },
    {
      q: "¿Solo trabajáis con producto físico?",
      a: "No. Producto físico, servicios, apps e infoproductos. Lo que cambia es el ángulo, no el método: una app se enseña funcionando, un servicio se enseña por el resultado que deja y un producto se enseña en la mano. La lógica de producir cuarenta piezas y ver cuál gana es la misma.",
    },
    {
      q: "Lo mío es muy concreto, ¿funciona igual?",
      a: "Cuanto más concreto, mejor sale. Trabajamos a partir de lo que vendes de verdad y de sus datos reales, así que cuanto menos margen hay para inventar, más creíble queda.",
    },
    {
      q: "¿Cuánto cuesta?",
      a: "Depende del volumen, y por eso lo hablamos en la llamada con tu caso delante. Lo que sí te digo ya: no trabajamos por pieza suelta y el compromiso mínimo son tres meses, porque en uno no da tiempo a que ningún test diga nada. Ahora bien, el riesgo no lo corres tú: si en los primeros treinta días de campaña no superamos tu mejor anuncio, puedes dejarlo ahí sin deber los meses restantes.",
    },
    {
      q: "¿Y si no me gusta lo que sale?",
      a: "Apruebas el plan antes de que produzcamos nada, así que sabes qué viene. Y si en tus primeros treinta días de campaña ninguna pieza supera a tu mejor anuncio, decides tú: seguimos produciendo sin cobrarte hasta que una lo haga, o lo dejas ahí y no debes los meses que quedan.",
    },
    {
      q: "¿Qué necesitáis de mí para empezar?",
      a: "Tu producto, fotos reales, acceso de lectura a tu cuenta y las dudas que más te preguntan antes de comprar. Se rellena una vez, en un rato, y no volvemos a molestarte con ello.",
    },
  ];

  const [abierta, setAbierta] = useState<number | null>(0);

  return (
    <motion.section
      id="faq"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className="mx-auto max-w-3xl px-5 py-16 md:py-24"
    >
      <SectionTitle label="Preguntas" title="Lo que nos preguntan antes de decidirse" />

      <div className="mt-10 divide-y divide-white/[0.07] rounded-3xl border border-white/10 backdrop-blur-xl">
        {faqs.map((f, i) => {
          const open = abierta === i;
          return (
            <motion.div key={i} variants={fadeUp}>
              <button
                onClick={() => setAbierta(open ? null : i)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-white/[0.02]"
              >
                <span className="text-sm font-medium text-white">{f.q}</span>
                <ChevronDown
                  className={cn("h-4 w-4 shrink-0 text-white/40 transition-transform duration-300", open && "rotate-180")}
                />
              </button>
              <div className={cn("grid transition-all duration-300", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                <div className="overflow-hidden">
                  <p className="px-6 pb-5 text-sm leading-relaxed text-white/50">{f.a}</p>
                  {"link" in f && (
                    <a
                      href={(f as { link: string }).link}
                      target="_blank"
                      rel="noreferrer"
                      className="mx-6 mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-purple-300 hover:text-purple-200 transition"
                    >
                      {(f as { linkText: string }).linkText} <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}

// ── 9. CTA FINAL ──────────────────────────────────────────────────────────────
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
            Tráete tu mejor anuncio a la llamada.
          </h2>
          <p className="mt-4 text-white/45 text-base leading-relaxed max-w-lg mx-auto">
            Quince minutos. Llegamos con tu cuenta ya revisada y te decimos qué
            ángulos te faltan y cuáles pondríamos a competir primero. Si no te
            encaja, aquí lo dejamos sin problema.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <CtaPrincipal className="px-8 py-4">Agenda tu llamada</CtaPrincipal>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition"
            >
              <Mail className="h-4 w-4" /> {EMAIL}
            </a>
          </div>

          <p className="mt-6 text-xs text-white/25">La llamada no te compromete a nada · Te respondo yo en menos de 24h</p>
        </div>
      </motion.div>
    </motion.section>
  );
}

// ── 10. FOOTER ────────────────────────────────────────────────────────────────
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
            <a href={IG} target="_blank" rel="noreferrer" className="hover:text-white/70 transition">
              Instagram
            </a>
            <a href={LINKEDIN} target="_blank" rel="noreferrer" className="hover:text-white/70 transition">
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
    <MotionConfig reducedMotion="user">
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
          <GarantiaSection />
          <Divider />
          <FaqSection />
          <CtaFinalSection />
        </main>

        <Footer />
      </div>
    </div>
    </MotionConfig>
  );
}
