"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COOKIE_KEY = "agenciatech_cookie_consent";

type Consent = "all" | "essential" | null;

export function useCookieConsent(): Consent {
  const [consent, setConsent] = useState<Consent>(null);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY) as Consent | null;
    if (stored) setConsent(stored);
  }, []);

  return consent;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_KEY);
    if (!stored) {
      // Pequeño delay para no bloquear el LCP
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  function accept(type: "all" | "essential") {
    localStorage.setItem(COOKIE_KEY, type);
    setCookie(COOKIE_KEY, type, 365);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-4 left-4 right-4 z-[999] md:left-auto md:right-6 md:bottom-6 md:max-w-md"
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0a]/90 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.04)]">
            {/* Subtle violet glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(109,40,217,0.08),transparent_70%)]" />

            <div className="relative p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">Cookies</p>
                  <p className="mt-1 text-xs text-white/45 leading-relaxed">
                    Usamos cookies esenciales para que la web funcione y, si aceptas, cookies analíticas para mejorar la experiencia.
                  </p>
                </div>
                <button
                  onClick={() => accept("essential")}
                  className="shrink-0 rounded-full p-1.5 text-white/30 hover:text-white/60 transition"
                  aria-label="Rechazar"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* Details toggle */}
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 space-y-2 overflow-hidden"
                >
                  {[
                    { name: "Esenciales", desc: "Necesarias para el funcionamiento básico. Siempre activas.", active: true },
                    { name: "Analíticas", desc: "Nos ayudan a entender cómo se usa la web (sin datos personales).", active: false },
                    { name: "Marketing", desc: "Para medir el rendimiento de campañas publicitarias.", active: false },
                  ].map((c) => (
                    <div key={c.name} className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
                      <div className="mt-0.5 flex-1">
                        <div className="text-xs font-medium text-white/80">{c.name}</div>
                        <div className="text-[11px] text-white/40 mt-0.5">{c.desc}</div>
                      </div>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${c.active ? "bg-violet-500/20 text-violet-300" : "bg-white/5 text-white/30"}`}>
                        {c.active ? "Siempre" : "Opcional"}
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}

              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={() => accept("all")}
                  className="flex-1 rounded-full bg-white py-2 text-xs font-semibold text-black hover:bg-white/90 transition"
                >
                  Aceptar todo
                </button>
                <button
                  onClick={() => accept("essential")}
                  className="flex-1 rounded-full border border-white/[0.08] bg-white/[0.04] py-2 text-xs font-medium text-white/60 hover:bg-white/[0.08] transition"
                >
                  Solo esenciales
                </button>
                <button
                  onClick={() => setShowDetails((v) => !v)}
                  className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-xs text-white/40 hover:text-white/60 transition"
                >
                  {showDetails ? "Menos" : "Más"}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
