"use client";

import { useChat } from "@ai-sdk/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

const QUICK_QUESTIONS = [
  "Pourquoi Hamza au DataLab Crédit Agricole ?",
  "Son expérience en prompt engineering ?",
  "Comment peut-il aider à l'adoption de l'IA ?",
  "Quels sont ses projets IA persos ?",
] as const;

// Icône pour l'IA (style étincelle/Gemini)
const AIIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-cyan-300" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C12 16.4772 7.52285 12 2 12C7.52285 12 12 7.52285 12 2C12 7.52285 16.4772 12 22 12C16.4772 12 12 16.4772 12 22Z" fill="currentColor"/>
  </svg>
);

// Icône pour l'utilisateur
const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-slate-300">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

// Flèche d'envoi (style ChatGPT)
const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
);

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 py-2">
      {[0, 1, 2].map((dot) => (
        <motion.span
          key={dot}
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: dot * 0.15 }}
          className="h-2 w-2 rounded-full bg-cyan-400"
        />
      ))}
    </div>
  );
}

const LOADING_MESSAGES = [
  "L'IA fouille dans les innombrables qualités de Hamza...",
  "L'IA rédige une réponse (presque) aussi bonne que lui...",
  "Chargement des compétences algorithmiques...",
  "Préparation d'un argumentaire pour le DataLab CA...",
  "Recherche du prompt parfait. Patientez...",
  "L'IA essaie d'être à la hauteur de la mission...",
];

function LoadingMessage() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-1 items-start">
      <TypingDots />
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.3 }}
          className="text-xs font-medium text-cyan-400/80 italic ml-2 mt-1"
        >
          {LOADING_MESSAGES[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export default function ChatWidget() {
  const { messages, setMessages, input, handleInputChange, handleSubmit, isLoading, append } = useChat({ api: "/api/chat" }) as any;
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  function sendQuickQuestion(question: string) {
    void append({ role: "user", content: question });
  }

  const hasMessages = messages.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="overflow-hidden rounded-2xl md:rounded-[2rem] border border-white/10 bg-slate-950/80 shadow-glow backdrop-blur-xl flex flex-col h-[75vh] min-h-[500px] max-h-[800px] md:h-[600px]">
        
        {/* Header minimaliste */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/10 border border-cyan-400/20">
              <AIIcon />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-200">Assistant IA</p>
              <p className="text-xs text-cyan-400/80">Propulsé par Gemini / GPT</p>
            </div>
          </div>
          {hasMessages && (
            <button 
              onClick={() => setMessages([])} 
              className="text-xs text-slate-400 hover:text-red-400 hover:bg-red-400/10 px-3 py-1.5 rounded-lg border border-transparent hover:border-red-400/20 transition-all flex items-center gap-1.5"
              title="Effacer la conversation"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
              Effacer
            </button>
          )}
        </div>

        {/* Messages Container */}
        <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-6 md:px-8 space-y-6 scroll-smooth">
          
          {/* Message d'accueil conditionnel */}
          {!hasMessages && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full items-center justify-center space-y-8">
              <div className="text-center space-y-2">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400/10 border border-cyan-400/20 mb-4">
                  <AIIcon />
                </div>
                <h3 className="text-xl font-semibold text-slate-200">Comment puis-je vous aider ?</h3>
                <p className="text-sm text-slate-400">Posez une question ou choisissez une suggestion ci-dessous.</p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/5 px-3 py-1.5 cursor-help" title="Tapez le mot 'Evergreen' dans le chat mystère !">
                  <span className="text-sm">🤫</span>
                  <p className="text-xs text-green-400/80 italic">
                    Indice : L'IA a un petit secret concernant vos campus...
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Fil de discussion */}
          <AnimatePresence initial={false}>
            {messages.map((message: any) => {
              const isAssistant = message.role === "assistant";
              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-4 w-full"
                >
                  {/* Avatar */}
                  <div className="flex-shrink-0 mt-1">
                    {isAssistant ? (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/10 border border-cyan-400/20 shadow-[0_0_10px_rgba(74,231,255,0.2)]">
                        <AIIcon />
                      </div>
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 border border-white/10">
                        <UserIcon />
                      </div>
                    )}
                  </div>

                  {/* Contenu du message */}
                  <div className="flex-1 space-y-2 overflow-hidden">
                    <p className="text-sm font-medium text-slate-400">
                      {isAssistant ? "Assistant Portfolio" : "Vous"}
                    </p>
                    <div className={`text-sm leading-relaxed prose prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-slate-900/50 prose-pre:border prose-pre:border-white/10 ${isAssistant ? 'text-slate-300' : 'text-slate-200'}`}>
                      {isAssistant ? (
                        <ReactMarkdown>{(message as any).content}</ReactMarkdown>
                      ) : (
                        (message as any).content
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Indicateur de frappe */}
            {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 w-full">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/10 border border-cyan-400/20">
                    <AIIcon />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-400 mb-1">Assistant Portfolio</p>
                  <LoadingMessage />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Area (Style ChatGPT) */}
        <div className="p-4 bg-slate-950/50 border-t border-white/5">
          {/* Questions Rapides */}
          <div className="flex flex-wrap justify-center gap-2 pb-3 mb-1 w-full max-w-3xl mx-auto">
            {QUICK_QUESTIONS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => sendQuickQuestion(q)}
                disabled={isLoading}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-slate-300 transition hover:bg-white/10 hover:border-cyan-400/30 hover:text-cyan-300 disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="relative max-w-3xl mx-auto">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Envoyez un message à l'assistant..."
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] pl-5 pr-14 py-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400/40 focus:bg-white/[0.06] shadow-inner"
            />
            <button
              type="submit"
              disabled={isLoading || !input?.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400 text-slate-950 transition hover:bg-cyan-300 disabled:bg-white/10 disabled:text-slate-500 disabled:cursor-not-allowed"
            >
              <SendIcon />
            </button>
          </form>
          <p className="text-center text-[10px] text-slate-500 mt-3">
            L'IA peut faire des erreurs. Vérifiez toujours les informations importantes.
          </p>
        </div>

      </div>
    </motion.div>
  );
}