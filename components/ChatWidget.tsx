"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useEffect, useRef, useState } from "react";

type ChatWidgetProps = {
  mode?: "section" | "bubble";
  className?: string;
};

type Message = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

const QUICK_QUESTIONS = [
  "Quelles sont tes experiences ?",
  "Parle-moi de tes projets IA",
  "Pourquoi te recruter ?",
  "Quelle est ta stack technique ?",
] as const;

const INITIAL_MESSAGE: Message = {
  id: "assistant-welcome",
  role: "assistant",
  content:
    "Bonjour, je suis l'assistant IA de Hamza. Posez-moi une question sur son parcours, ses projets ou sa stack, et je vous repondrai de facon concise.",
};

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5">
      {[0, 1, 2].map((dot) => (
        <motion.span
          key={dot}
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
          transition={{
            duration: 0.9,
            repeat: Number.POSITIVE_INFINITY,
            delay: dot * 0.15,
          }}
          className="h-2 w-2 rounded-full bg-cyan-300"
        />
      ))}
    </div>
  );
}

export default function ChatWidget({
  mode = "section",
  className = "",
}: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = listRef.current;

    if (!container) {
      return;
    }

    container.scrollTop = container.scrollHeight;
  }, [messages, isLoading]);

  async function sendMessage(rawMessage: string) {
    const message = rawMessage.trim();

    if (!message || isLoading) {
      return;
    }

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: message,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const payload = (await response.json()) as {
        reply?: string;
        error?: string;
      };
      const reply = payload.reply?.trim();

      if (!response.ok || !reply) {
        throw new Error(
          payload.error ??
            "La reponse de l'assistant est indisponible pour le moment.",
        );
      }

      setMessages((current) => [
        ...current,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: reply,
        },
      ]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue lors de l'appel a l'assistant.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  const containerClassName =
    mode === "bubble"
      ? "fixed bottom-6 right-6 z-40 w-[calc(100vw-2rem)] max-w-md"
      : "w-full";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={mode === "section" ? { opacity: 1, y: 0 } : undefined}
      animate={mode === "bubble" ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      className={`${containerClassName} ${className}`.trim()}
    >
      <div className="overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-slate-950/85 shadow-glow backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">
              Assistant Portfolio
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Reponses rapides sur Hamza Hamdache
            </p>
          </div>
          <div className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(74,231,255,0.95)]" />
        </div>

        <div className="border-b border-white/10 px-4 py-4">
          <div className="flex flex-wrap gap-2">
            {QUICK_QUESTIONS.map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => void sendMessage(question)}
                disabled={isLoading}
                className="rounded-full border border-blue-400/15 bg-blue-500/10 px-4 py-2 text-left text-sm font-medium text-slate-100 transition hover:border-cyan-300/30 hover:bg-cyan-300/10 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={listRef}
          className="max-h-[26rem] space-y-4 overflow-y-auto px-4 py-5 md:px-6"
        >
          <AnimatePresence initial={false}>
            {messages.map((message) => {
              const isAssistant = message.role === "assistant";

              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                  className={`flex ${
                    isAssistant ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-5 py-4 text-sm leading-7 ${
                      isAssistant
                        ? "rounded-tl-sm border border-white/8 bg-white/[0.05] text-slate-200"
                        : "rounded-tr-sm bg-gradient-to-r from-blue-500 to-cyan-300 text-slate-950"
                    }`}
                  >
                    {message.content}
                  </div>
                </motion.div>
              );
            })}

            {isLoading ? (
              <motion.div
                key="typing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex justify-start"
              >
                <div className="rounded-2xl rounded-tl-sm border border-white/8 bg-white/[0.05] px-5 py-4">
                  <TypingDots />
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="border-t border-white/10 p-4">
          {error ? (
            <p className="mb-3 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
              {error}
            </p>
          ) : null}

          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Posez une question sur Hamza..."
              className="h-12 flex-1 rounded-full border border-white/10 bg-white/[0.03] px-5 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/35 focus:bg-white/[0.05]"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-300 px-5 text-sm font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
