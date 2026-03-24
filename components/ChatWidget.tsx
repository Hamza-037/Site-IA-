"use client";

import { useChat } from "@ai-sdk/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

const QUICK_QUESTIONS = [
  "Pourquoi Hamza pour le DataLab ?",
  "Son expérience en prompt engineering ?",
  "Comment aide-t-il à l'adoption IA ?",
  "Quels projets IA a-t-il réalisés ?",
] as const;

const AIIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5 text-cyan-300" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C12 16.4772 7.52285 12 2 12C7.52285 12 12 7.52285 12 2C12 7.52285 16.4772 12 22 12C16.4772 12 12 16.4772 12 22Z" fill="currentColor"/>
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 text-slate-400">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
);

function TypingDots() {
  return (
    <div className="flex items-center gap-1 py-1.5">
      {[0, 1, 2].map((dot) => (
        <motion.span
          key={dot}
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: dot * 0.15 }}
          className="h-1.5 w-1.5 rounded-full bg-cyan-400/80"
        />
      ))}
    </div>
  );
}

const LOADING_MESSAGES = [
  "Analyse du parcours en cours…",
  "Consultation du portfolio…",
  "Préparation de la réponse…",
  "Synthèse des informations…",
];

function LoadingMessage() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-1.5 items-start">
      <TypingDots />
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25 }}
          className="text-[11px] font-medium text-cyan-400/60 italic ml-0.5"
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="overflow-hidden rounded-2xl md:rounded-[1.75rem] border border-white/[0.06] bg-[#060e1c]/90 shadow-glow-lg backdrop-blur-2xl flex flex-col h-[72vh] min-h-[480px] max-h-[720px] md:h-[580px]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-400/[0.08] border border-cyan-400/15">
              <AIIcon />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-slate-200">Assistant Portfolio</p>
              <p className="text-[10px] text-slate-500">Gemini Flash Lite · OpenRouter</p>
            </div>
          </div>
          {hasMessages && (
            <button 
              onClick={() => setMessages([])} 
              className="text-[11px] text-slate-500 hover:text-red-400 hover:bg-red-400/[0.06] px-2.5 py-1.5 rounded-lg border border-transparent hover:border-red-400/15 transition-all flex items-center gap-1.5"
              title="Effacer la conversation"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              Effacer
            </button>
          )}
        </div>

        {/* Messages */}
        <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-5 md:px-6 space-y-5 scroll-smooth">
          
          {/* Welcome state */}
          {!hasMessages && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="flex flex-col h-full items-center justify-center space-y-6">
              <div className="text-center space-y-2.5">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-cyan-400/[0.08] border border-cyan-400/15 mb-3">
                  <AIIcon />
                </div>
                <h3 className="text-lg font-semibold text-slate-200">Comment puis-je vous aider ?</h3>
                <p className="text-[13px] text-slate-500 max-w-xs mx-auto">
                  Posez une question sur le parcours de Hamza ou choisissez une suggestion.
                </p>
              </div>
            </motion.div>
          )}

          {/* Thread */}
          <AnimatePresence initial={false}>
            {messages.map((message: any) => {
              const isAssistant = message.role === "assistant";
              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-3 w-full"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {isAssistant ? (
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-400/[0.08] border border-cyan-400/15">
                        <AIIcon />
                      </div>
                    ) : (
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-800/80 border border-white/[0.06]">
                        <UserIcon />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-1 overflow-hidden min-w-0">
                    <p className="text-[11px] font-semibold text-slate-500">
                      {isAssistant ? "Assistant" : "Vous"}
                    </p>
                    <div className={`text-[13px] leading-relaxed prose-chat prose prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-slate-900/50 prose-pre:border prose-pre:border-white/[0.06] prose-pre:rounded-xl ${isAssistant ? 'text-slate-300' : 'text-slate-200'}`}>
                      {isAssistant ? (
                        <ReactMarkdown>{(message as any).content}</ReactMarkdown>
                      ) : (
                        <p>{(message as any).content}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Loading indicator */}
            {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 w-full">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-400/[0.08] border border-cyan-400/15">
                    <AIIcon />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-semibold text-slate-500 mb-1">Assistant</p>
                  <LoadingMessage />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input */}
        <div className="p-3.5 md:p-4 border-t border-white/[0.04]">
          {/* Quick questions */}
          <div className="flex flex-wrap justify-center gap-1.5 pb-2.5 mb-1">
            {QUICK_QUESTIONS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => sendQuickQuestion(q)}
                disabled={isLoading}
                className="rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-[10px] font-medium text-slate-400 transition-all duration-200 hover:bg-white/[0.06] hover:border-cyan-400/20 hover:text-cyan-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {q}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="relative">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Posez une question sur Hamza…"
              className="w-full rounded-xl border border-white/[0.06] bg-white/[0.02] pl-4 pr-12 py-3.5 text-[13px] text-slate-200 outline-none transition-all duration-200 placeholder:text-slate-600 focus:border-cyan-400/30 focus:bg-white/[0.04] focus:ring-1 focus:ring-cyan-400/10"
            />
            <button
              type="submit"
              disabled={isLoading || !input?.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400 text-slate-950 transition-all duration-200 hover:bg-cyan-300 hover:shadow-[0_0_16px_rgba(74,231,255,0.25)] disabled:bg-white/[0.06] disabled:text-slate-600 disabled:cursor-not-allowed disabled:shadow-none"
            >
              <SendIcon />
            </button>
          </form>
          <p className="text-center text-[9px] text-slate-600 mt-2.5">
            L'IA peut faire des erreurs. Vérifiez toujours les informations importantes.
          </p>
        </div>

      </div>
    </motion.div>
  );
}
