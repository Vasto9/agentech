import { Client } from "@notionhq/client";
import { NextRequest, NextResponse } from "next/server";

const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID!;

// Simple in-memory rate limiter (por IP, max 5 req / 10 min)
const rateMap = new Map<string, { count: number; reset: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const window = 10 * 60 * 1000; // 10 minutos
  const entry = rateMap.get(ip);

  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + window });
    return true;
  }
  if (entry.count >= 5) return false;
  entry.count++;
  return true;
}

function getNotion() {
  if (!process.env.NOTION_TOKEN) throw new Error("NOTION_TOKEN no configurado");
  return new Client({ auth: process.env.NOTION_TOKEN });
}

function mapPlan(plan?: string): string {
  if (!plan) return "Custom";
  const p = plan.toLowerCase();
  if (p.includes("starter")) return "Starter";
  if (p.includes("growth"))  return "Growth";
  if (p.includes("scale"))   return "Scale";
  return "Custom";
}

export async function POST(req: NextRequest) {
  try {
    // ── Rate limiting ──────────────────────────────────────
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Demasiadas solicitudes. Inténtalo en unos minutos." },
        { status: 429 }
      );
    }

    // ── Parsear body ───────────────────────────────────────
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Body inválido." }, { status: 400 });
    }

    const { name, email, message, plan_interest, source_page, website_hp } = body;

    // ── Honeypot anti-bot ──────────────────────────────────
    if (website_hp) {
      // Bot detectado — respondemos 200 para no revelar el filtro
      return NextResponse.json({ ok: true });
    }

    // ── Validación básica ──────────────────────────────────
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Nombre requerido." }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email inválido." }, { status: 400 });
    }

    const cleanName    = name.trim().slice(0, 120);
    const cleanEmail   = email.trim().toLowerCase().slice(0, 200);
    const cleanMessage = (message ?? "").toString().trim().slice(0, 1000);
    const cleanPlan    = mapPlan(plan_interest);
    const cleanSource  = (source_page ?? "").toString().slice(0, 300);

    // ── Guardar en Notion ──────────────────────────────────
    const notion = getNotion();

    await notion.pages.create({
      parent: { database_id: NOTION_DATABASE_ID },
      properties: {
        Nombre: {
          title: [{ text: { content: cleanName } }],
        },
        Email: {
          email: cleanEmail,
        },
        Mensaje: {
          rich_text: cleanMessage
            ? [{ text: { content: cleanMessage } }]
            : [],
        },
        Plan: {
          select: { name: cleanPlan },
        },
        Estado: {
          select: { name: "Nuevo" },
        },
        Fuente: {
          rich_text: cleanSource
            ? [{ text: { content: cleanSource } }]
            : [],
        },
      },
    });

    // ── Respuesta ──────────────────────────────────────────
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("[leads/route]", err);
    return NextResponse.json(
      { error: "Error interno. Inténtalo de nuevo." },
      { status: 500 }
    );
  }
}
