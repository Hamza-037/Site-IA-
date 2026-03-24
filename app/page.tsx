"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import ChatWidget from "@/components/ChatWidget";

const headingFont = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const projects = [
  {
    name: "Tarvio",
    category: "SaaS IA — Production",
    description:
      "Plateforme de devis et facturation assistée par IA pour artisans. Génération automatique par LLM, transcription vocale Whisper, paiement Stripe intégré. Déployé en production sur Vercel avec Supabase.",
    stack: ["Next.js", "Claude API", "Whisper", "Stripe", "Supabase"],
    highlight: true,
  },
  {
    name: "StudyRAG-Assistant",
    category: "LLM & RAG",
    description:
      "Agent conversationnel personnel développé pour interagir avec des documentations techniques complexes en temps réel. Division par 3 du temps de recherche grâce à l'architecture RAG.",
    stack: ["Python", "LangChain", "ChromaDB", "GPT-4o"],
    highlight: false,
  },
  {
    name: "Auto-Prompt Optimizer",
    category: "Prompt Engineering",
    description:
      "Outil Python testant et optimisant automatiquement les prompts envoyés à GPT-4o. Maximisation de la précision des réponses LLM et réduction des coûts d'API de 40 %.",
    stack: ["Python", "OpenAI API", "Évaluation auto."],
    highlight: false,
  },
  {
    name: "Data-Pilot Dashboard",
    category: "Data & BI",
    description:
      "Suite de tableaux de bord interactifs permettant de croiser de vastes quantités de données pour monitorer en temps réel des indicateurs clés et des KPIs d'adoption.",
    stack: ["Power BI", "DAX", "Python", "SQL"],
    highlight: false,
  },
];

const skills = {
  "Intelligence Artificielle": [
    "Prompt Engineering",
    "LLM Ops",
    "Agents IA autonomes",
    "RAG",
    "Acculturation IA",
    "Bibliothèque de prompts",
  ],
  "Gestion de Projet": [
    "Agile / Scrum",
    "Asana",
    "Pilotage KPIs",
    "Conduite du changement",
    "Adoption outils",
    "Microsoft 365",
  ],
  "Data & Développement": [
    "Power BI / DAX",
    "Apache Spark",
    "SQL",
    "Python",
    "Next.js / React",
    "Supabase",
  ],
};

const parcours = [
  {
    period: "2024 — Présent",
    role: "Alternant Data Analyst & Chef de Projet",
    company: "Keolis Tours — Fil Bleu",
    description:
      "Création de dashboards Power BI, pilotage de projets data en méthode Agile, accompagnement des équipes métier sur l'adoption d'outils digitaux.",
  },
  {
    period: "2023 — Présent",
    role: "Étudiant Ingénieur — Spé. IA & Data Science",
    company: "SUPINFO Tours",
    description:
      "Formation en ingénierie informatique avec spécialisation IA & Data. Chef de projet sur SupContent (réseau social gaming, équipe de 4).",
  },
  {
    period: "Projets personnels",
    role: "Développeur & Entrepreneur IA",
    company: "Auto-entrepreneur",
    description:
      "Conception et déploiement de SaaS IA en production (Tarvio), agents autonomes, optimisation de prompts et dashboards sur mesure.",
  },
];

const navItems = [
  { href: "#apropos", label: "À propos" },
  { href: "#parcours", label: "Parcours" },
  { href: "#projets", label: "Projets" },
  { href: "#competences", label: "Compétences" },
  { href: "#chat-ia", label: "Chat IA" },
  { href: "#contact", label: "Contact" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeUp}
      transition={{ duration: 0.5 }}
      className="max-w-2xl"
    >
      <span className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-300">
        {eyebrow}
      </span>
      <h2
        className={`${headingFont.className} mt-1 text-3xl font-bold tracking-tight text-white md:text-4xl`}
      >
        {title}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-slate-400 md:text-lg">
        {description}
      </p>
    </motion.div>
  );
}

export default function Home() {
  return (
    <main
      className={`${bodyFont.className} relative overflow-hidden text-slate-100`}
    >
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-5 md:px-10 lg:px-12">

        {/* ── NAV ── */}
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="sticky top-3 z-30 mb-8 md:mb-12 rounded-2xl md:rounded-full border border-white/[0.06] bg-[#060e1c]/80 px-5 py-3.5 shadow-glow backdrop-blur-2xl"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 shrink-0 rounded-full bg-emerald-400 animate-pulse-dot" />
              <p className={`${headingFont.className} text-sm font-semibold tracking-wide text-slate-200`}>
                Hamza Hamdache
              </p>
            </div>
            <nav className="flex flex-wrap gap-1 md:gap-1.5 text-sm text-slate-400">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 hover:bg-white/[0.06] hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </motion.header>

        {/* ── HERO ── */}
        <section className="relative flex min-h-[82vh] items-center py-12 md:py-16">
          {/* Background orb */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/[0.07] blur-[120px] pointer-events-none" />

          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-4 py-1.5 text-[12px] font-semibold text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Candidature — DataLab Groupe Crédit Agricole S.A.
                </span>
              </div>
              <h1
                className={`${headingFont.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight text-white`}
              >
                Hamza
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                  Hamdache
                </span>
              </h1>
              <p className={`${headingFont.className} mt-5 text-lg md:text-xl font-semibold text-slate-300`}>
                Assistant Chef de Projet IA — Cellule Accompagnement IA
              </p>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400">
                Passionné d'IA, je développe des SaaS en production et pilote
                des projets data en méthode Agile. Ma mission : contribuer
                à l'adoption de l'intelligence artificielle au sein du Groupe
                Crédit Agricole.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href="#chat-ia"
                  className="group inline-flex justify-center items-center gap-2.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-7 py-3.5 text-sm font-semibold text-slate-950 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(74,231,255,0.2)] hover:scale-[1.02]"
                >
                  Parler à mon assistant IA
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </a>
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full flex justify-center border border-white/10 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-slate-200 transition-all duration-300 hover:bg-white/[0.06] hover:border-cyan-400/30"
                >
                  Télécharger mon CV
                </a>
                <a
                  href="#projets"
                  className="rounded-full flex justify-center border border-white/10 px-7 py-3.5 text-sm font-semibold text-slate-300 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.03]"
                >
                  Voir mes projets
                </a>
              </div>
            </motion.div>

            {/* Objectives card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="relative animate-float"
            >
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-300/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.06] bg-[#0a1628]/80 p-7 shadow-glow-lg backdrop-blur">
                <div className="flex items-center justify-between mb-7">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                    Objectifs 2026
                  </span>
                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-300">
                    Crédit Agricole
                  </span>
                </div>
                <div className="space-y-4">
                  {[
                    { icon: "📢", text: "Diffuser les bonnes pratiques IA au sein des équipes du Groupe" },
                    { icon: "📚", text: "Construire et animer une bibliothèque de prompts actionnables" },
                    { icon: "📊", text: "Piloter l'adoption des outils IA via des KPIs concrets" },
                  ].map((item) => (
                    <div
                      key={item.text}
                      className="flex items-start gap-4 rounded-2xl border border-white/[0.04] bg-white/[0.02] p-4 transition-colors duration-300 hover:bg-white/[0.04]"
                    >
                      <span className="mt-0.5 text-lg">{item.icon}</span>
                      <p className="text-sm leading-relaxed text-slate-300">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="space-y-28 md:space-y-36">

          {/* ── À PROPOS ── */}
          <section id="apropos" className="scroll-mt-28">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <SectionTitle
                eyebrow="À propos"
                title="Technique, pédagogue et orienté adoption."
                description="Étudiant en 3ᵉ année à SUPINFO Tours, alternant Data & IA chez Keolis, je combine maîtrise technique de l'IA et capacité à la rendre accessible à des équipes non techniques."
              />
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={stagger}
                className="grid gap-4 md:grid-cols-3"
              >
                {[
                  { icon: "🎓", label: "Formation", value: "SUPINFO Tours — Ingénierie & Master IA" },
                  { icon: "🤝", label: "Accompagnement", value: "Pédagogie & Adoption IA" },
                  { icon: "📍", label: "Mobilité", value: "Campus Evergreen / SQY Park" },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    variants={fadeUp}
                    transition={{ duration: 0.45 }}
                    className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-colors duration-300 hover:bg-white/[0.04] hover:border-white/10"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                      {item.label}
                    </p>
                    <p className="mt-2 text-[15px] font-semibold leading-snug text-white">
                      {item.value}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* ── PARCOURS ── */}
          <section id="parcours" className="scroll-mt-28">
            <SectionTitle
              eyebrow="Parcours"
              title="De la théorie au terrain, en passant par la production."
              description="Un parcours construit autour de la gestion de projet, la data et l'IA — avec une constante : rendre la technologie accessible."
            />
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={stagger}
              className="mt-10 space-y-4"
            >
              {parcours.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  transition={{ duration: 0.45 }}
                  className="group flex flex-col md:flex-row gap-4 md:gap-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-7 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/10"
                >
                  <div className="md:w-48 shrink-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-400/70">
                      {item.period}
                    </p>
                  </div>
                  <div className="flex-1">
                    <h3 className={`${headingFont.className} text-lg font-bold text-white`}>
                      {item.role}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-slate-400">{item.company}</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* ── PROJETS ── */}
          <section id="projets" className="scroll-mt-28">
            <SectionTitle
              eyebrow="Projets"
              title="Des produits IA déployés, pas des prototypes."
              description="Chaque projet intègre des LLMs en production, avec une attention constante à l'expérience utilisateur, la scalabilité et la valeur métier."
            />
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={stagger}
              className="mt-10 grid gap-5 lg:grid-cols-2"
            >
              {projects.map((project) => (
                <motion.article
                  key={project.name}
                  variants={fadeUp}
                  transition={{ duration: 0.45 }}
                  className={`group rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-0.5 ${
                    project.highlight
                      ? "border-cyan-400/15 bg-gradient-to-br from-cyan-500/[0.04] to-blue-500/[0.04] hover:border-cyan-400/25"
                      : "border-white/[0.06] bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="inline-flex rounded-full border border-cyan-300/15 bg-cyan-300/[0.06] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
                        {project.category}
                      </span>
                      <h3
                        className={`${headingFont.className} mt-4 text-xl font-bold text-white`}
                      >
                        {project.name}
                      </h3>
                    </div>
                    {project.highlight && (
                      <span className="mt-1 shrink-0 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-300">
                        Live
                      </span>
                    )}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-400">
                    {project.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-white/[0.04] border border-white/[0.06] px-2.5 py-1 text-[11px] font-medium text-slate-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </section>

          {/* ── COMPÉTENCES ── */}
          <section id="competences" className="scroll-mt-28">
            <SectionTitle
              eyebrow="Compétences"
              title="IA, pilotage de projet et transformation digitale."
              description="Un profil structuré autour de trois axes complémentaires : maîtrise technique de l'IA, gestion de projet Agile et accompagnement au changement."
            />
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={stagger}
              className="mt-10 grid gap-5 lg:grid-cols-3"
            >
              {Object.entries(skills).map(([category, items]) => (
                <motion.div
                  key={category}
                  variants={fadeUp}
                  transition={{ duration: 0.45 }}
                  className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7"
                >
                  <h3 className={`${headingFont.className} text-base font-bold text-white`}>
                    {category}
                  </h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.03 }}
                        className="cursor-default rounded-full border border-blue-400/10 bg-blue-400/[0.06] px-3.5 py-1.5 text-[12px] font-medium text-slate-300 transition-colors duration-200 hover:border-cyan-400/25 hover:bg-cyan-400/10 hover:text-cyan-200"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* ── CHAT IA ── */}
          <section id="chat-ia" className="scroll-mt-28">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <SectionTitle
                eyebrow="Chat IA"
                title="Un assistant qui connaît mon parcours."
                description="Posez-lui vos questions sur mon profil, mes projets ou ma motivation pour rejoindre le DataLab Groupe. Il répond en temps réel."
              />
              <ChatWidget />
            </div>
          </section>

          {/* ── CONTACT ── */}
          <section id="contact" className="scroll-mt-28">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="rounded-[1.75rem] border border-white/[0.06] bg-gradient-to-br from-blue-500/[0.05] via-[#0a1628]/80 to-cyan-400/[0.05] p-8 md:p-10 shadow-glow-lg"
            >
              <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-300">
                Contact
              </span>
              <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
                <div>
                  <h2
                    className={`${headingFont.className} text-3xl font-bold tracking-tight text-white md:text-4xl`}
                  >
                    Intéressé par mon profil ?
                  </h2>
                  <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-400">
                    Je suis disponible pour un échange, une visio ou un entretien
                    sur le campus Evergreen ou SQY Park. N'hésitez pas.
                  </p>
                </div>
                <div className="space-y-3">
                  <Link
                    href="mailto:hamza.hamd@icloud.com"
                    className="group flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-5 transition-all duration-300 hover:border-cyan-400/20 hover:bg-white/[0.04]"
                  >
                    <span className="text-lg">✉️</span>
                    <span className="text-base font-semibold text-white group-hover:text-cyan-200 transition-colors">
                      hamza.hamd@icloud.com
                    </span>
                  </Link>
                  <Link
                    href="https://fr.linkedin.com/in/hamza-hamdache"
                    target="_blank"
                    className="group flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-5 transition-all duration-300 hover:border-cyan-400/20 hover:bg-white/[0.04]"
                  >
                    <span className="text-lg">💼</span>
                    <span className="text-base font-semibold text-white group-hover:text-cyan-200 transition-colors">
                      linkedin.com/in/hamza-hamdache
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </section>

        </div>

        {/* Footer */}
        <footer className="mt-24 border-t border-white/[0.04] pt-8 pb-4 text-center">
          <p className="text-xs text-slate-500">
            © 2026 Hamza Hamdache — Conçu avec Next.js, Tailwind CSS et une IA Gemini intégrée.
          </p>
        </footer>
      </div>
    </main>
  );
}
