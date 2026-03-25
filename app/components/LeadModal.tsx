"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LeadModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    website_hp: "", // honeypot anti-bot
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState("");
  const [success, setSuccess] = useState(false);

  if (!open) return null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:          form.name,
          email:         form.email,
          message:       form.message || null,
          plan_interest: "custom",
          source_page:   typeof window !== "undefined" ? window.location.href : null,
          cta_origin:    "modal_header",
          website_hp:    form.website_hp || null,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || `Error ${res.status}`);
      }

      setSuccess(true);

      // Abrir WhatsApp con datos pre-rellenos
      const msg = encodeURIComponent(
        `Hola, soy ${form.name}. Quiero presupuesto.\nEmail: ${form.email}\nMensaje: ${form.message || "-"}`
      );
      window.open(`https://wa.me/34722603447?text=${msg}`, "_blank");

      setTimeout(onClose, 1200);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error enviando. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/[0.08] bg-[#080808] shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_40px_120px_rgba(0,0,0,0.8)]"
            initial={{ y: 24, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 12, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          >
            {/* Violet glow top */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(109,40,217,0.12),transparent_70%)]" />

            <div className="relative p-6 md:p-7">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-[11px] font-medium text-violet-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
                    Pide presupuesto
                  </span>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight text-white">
                    Cuéntanos tu proyecto
                  </h3>
                  <p className="mt-1.5 text-sm text-white/40">
                    Te respondemos en menos de 24h con una propuesta.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-full border border-white/[0.08] bg-white/[0.04] p-2 text-white/40 hover:text-white/70 transition"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* Honeypot oculto */}
              <input
                type="text"
                name="website_hp"
                value={form.website_hp}
                onChange={(e) => setForm((p) => ({ ...p, website_hp: e.target.value }))}
                autoComplete="off"
                tabIndex={-1}
                style={{ display: "none" }}
              />

              {/* Form */}
              <form onSubmit={submit} className="mt-6 space-y-3">
                <ModalField
                  label="Nombre"
                  placeholder="Tu nombre"
                  value={form.name}
                  onChange={(v) => setForm((p) => ({ ...p, name: v }))}
                  required
                />
                <ModalField
                  label="Email"
                  type="email"
                  placeholder="tu@email.com"
                  value={form.email}
                  onChange={(v) => setForm((p) => ({ ...p, email: v }))}
                  required
                />
                <label className="grid gap-1.5">
                  <span className="text-xs text-white/40">Mensaje <span className="text-white/20">(opcional)</span></span>
                  <textarea
                    placeholder="Cuéntanos tu producto, objetivo o lo que necesitas..."
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    rows={3}
                    className="w-full resize-none rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none transition focus:border-violet-500/30 focus:bg-white/[0.05]"
                  />
                </label>

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-red-400"
                  >
                    {error}
                  </motion.p>
                )}

                {success && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-emerald-400"
                  >
                    ¡Recibido! Abriendo WhatsApp...
                  </motion.p>
                )}

                <div className="flex gap-2 pt-1">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 rounded-full bg-white py-3 text-sm font-semibold text-black transition hover:bg-white/90 disabled:opacity-50"
                  >
                    {loading ? "Enviando..." : "Enviar"}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-3 text-sm text-white/50 hover:bg-white/[0.06] transition"
                  >
                    Cancelar
                  </button>
                </div>
              </form>

              <p className="mt-4 text-center text-[11px] text-white/25">
                Al enviar aceptas nuestra política de privacidad. Sin spam.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ModalField({
  label, placeholder, value, onChange, required, type = "text",
}: {
  label: string; placeholder: string; value: string;
  onChange: (v: string) => void; required?: boolean; type?: string;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs text-white/40">
        {label} {required && <span className="text-violet-400">*</span>}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 text-sm text-white placeholder:text-white/20 outline-none transition focus:border-violet-500/30 focus:bg-white/[0.05]"
      />
    </label>
  );
}
