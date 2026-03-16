import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_MODELS = [
  "mistralai/mistral-7b-instruct",
  "meta-llama/llama-3-8b-instruct",
] as const;

const SYSTEM_PROMPT = `Tu es l'assistant IA personnel de Hamza Hamdache, etudiant en ingenierie informatique a SUPINFO Tours et alternant Data/IA chez Keolis Tours. Ton role est de presenter Hamza de facon enthousiaste et professionnelle a des recruteurs.

Ce que tu sais sur Hamza :
- Passionne d'IA : developpe des SaaS avec GPT-4o, Gemini Flash, Claude API au quotidien
- Alternant chez Keolis Tours : dashboards BI, gestion de projets Agile, analyse de donnees Big Data
- Projets : Tarvio (SaaS facturation IA pour artisans), ShadowFit (app fitness IA), SUPCONTENT (reseau social gaming, lead dev)
- Stack : Next.js, React Native, Supabase, Python, SQL, Spark
- Recherche une alternance Chef de Projet IA ou Data Engineer pour 2026-2027, des que possible
- S'oriente vers un Master IA & Data en 2026

Reponds toujours en francais, de facon concise (3-4 phrases max), chaleureuse et professionnelle. Si on te demande des infos que tu n'as pas, dis-le honnetement.`;

type OpenRouterSuccess = {
  choices?: Array<{
    message?: {
      content?: string | Array<{ type?: string; text?: string }>;
    };
  }>;
};

function extractReply(payload: OpenRouterSuccess): string {
  const content = payload.choices?.[0]?.message?.content;

  if (typeof content === "string") {
    return content.trim();
  }

  if (Array.isArray(content)) {
    return content
      .map((part) => (part.type === "text" ? part.text ?? "" : ""))
      .join("")
      .trim();
  }

  return "";
}

function parseErrorMessage(raw: string): string {
  try {
    const parsed = JSON.parse(raw) as {
      error?: { message?: string };
      message?: string;
    };

    return parsed.error?.message ?? parsed.message ?? raw;
  } catch {
    return raw;
  }
}

async function callOpenRouter(message: string, stream: boolean) {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return {
      response: null,
      error: "La variable d'environnement OPENROUTER_API_KEY est absente.",
      status: 500,
    };
  }

  let lastError = "Impossible de contacter OpenRouter.";
  let lastStatus = 502;

  for (const model of OPENROUTER_MODELS) {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://portfolio.h-hamdache.fr",
        "X-Title": "portfolio.h-hamdache.fr",
      },
      body: JSON.stringify({
        model,
        stream,
        temperature: 0.6,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: message },
        ],
      }),
      cache: "no-store",
    });

    if (response.ok) {
      return { response, error: null, status: response.status };
    }

    const errorText = await response.text();
    lastError = parseErrorMessage(errorText);
    lastStatus = response.status;

    if (response.status === 401 || response.status === 403) {
      break;
    }
  }

  return { response: null, error: lastError, status: lastStatus };
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Le corps de la requete doit etre un JSON valide." },
      { status: 400 },
    );
  }

  const message = typeof (body as { message?: unknown })?.message === "string"
    ? (body as { message: string }).message.trim()
    : "";

  if (!message) {
    return NextResponse.json(
      { error: 'Le champ "message" est requis.' },
      { status: 400 },
    );
  }

  if (message.length > 4000) {
    return NextResponse.json(
      { error: "Le message est trop long (4000 caracteres max)." },
      { status: 400 },
    );
  }

  const wantsStream = request.headers.get("accept")?.includes("text/event-stream");
  const { response, error, status } = await callOpenRouter(message, Boolean(wantsStream));

  if (!response) {
    return NextResponse.json(
      { error: error ?? "Erreur OpenRouter." },
      { status },
    );
  }

  const contentType = response.headers.get("content-type") ?? "";

  if (wantsStream && response.body && contentType.includes("text/event-stream")) {
    return new Response(response.body, {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  }

  const payload = (await response.json()) as OpenRouterSuccess;
  const reply = extractReply(payload);

  if (!reply) {
    return NextResponse.json(
      { error: "Aucune reponse exploitable n'a ete retournee par le modele." },
      { status: 502 },
    );
  }

  return NextResponse.json({ reply });
}
