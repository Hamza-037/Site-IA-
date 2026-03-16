"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import ChatWidget from "@/components/ChatWidget";

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
});

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const projects = [
  {
    name: "Tarvio",
    category: "SaaS IA",
    description:
      "Plateforme de devis et facturation assistee par IA pour artisans. Generation automatique par LLM, transcription vocale Whisper, paiement Stripe integre. Deployed en production sur Vercel.",
  },
  {
    name: "StudyRAG-Assistant",
    category: "LLM & RAG",
    description:
      "Agent conversationnel personnel developpe pour interagir avec des documentations techniques complexes en temps reel. Division par 3 du temps de recherche d'information grace a l'architecture RAG.",
  },
  {
    name: "Auto-Prompt Optimizer",
    category: "Prompt Engineering",
    description:
      "Outil Python testant et optimisant automatiquement les prompts envoyes a GPT-4o. Objectif de maximisation de la precision des reponses LLM et reduction des couts d'API de 40%.",
  },
  {
    name: "Data-Pilot Dashboard",
    category: "Data & BI",
    description:
      "Suite de tableaux de bord interactifs (PowerBI / DAX / Python) permettant de croiser de vastes quantites de donnees pour monitorer en temps reel des indicateurs cles et des KPIs d'adoption.",
  },
];

const skills = {
  IA: [
    "Prompt Engineering",
    "LLM Ops",
    "Agents IA",
    "RAG",
    "Acculturation IA",
    "Bibliotheque de prompts",
  ],
  "Gestion de Projet": [
    "Agile / Scrum",
    "Asana",
    "Pilotage KPIs",
    "Conduite du changement",
    "Adoption outils",
    "Microsoft 365",
  ],
  "Data & Dev": [
    "Power BI / DAX",
    "Apache Spark",
    "SQL",
    "Python",
    "Next.js",
    "Supabase",
  ],
};

const navItems = [
  { href: "#apropos", label: "A propos" },
  { href: "#projets", label: "Projets" },
  { href: "#competences", label: "Competences" },
  { href: "#chat-ia", label: "Chat IA" },
  { href: "#contact", label: "Contact" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
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
      transition={{ duration: 0.55 }}
      className="max-w-2xl"
    >
      <span className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
        {eyebrow}
      </span>
      <h2
        className={`${headingFont.className} text-3xl font-bold tracking-tight text-white md:text-4xl`}
      >
        {title}
      </h2>
      <p className="mt-4 text-base leading-8 text-slate-300 md:text-lg">
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
      <div className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(circle_at_top,rgba(74,231,255,0.18),transparent_35%)]" />
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-6 md:px-10 lg:px-12">

        {/* NAV */}
        <motion.header
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="sticky top-4 z-30 mb-6 md:mb-10 rounded-2xl md:rounded-full border border-white/10 bg-slate-950/70 px-5 py-4 shadow-glow backdrop-blur-xl"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(74,231,255,0.9)]" />
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-300">
                h-hamdache.fr
              </p>
            </div>
            <nav className="flex flex-wrap gap-2 md:gap-3 text-sm text-slate-300">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-3 py-1 transition hover:bg-white/5 hover:text-white text-xs md:text-sm"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </motion.header>

        {/* HERO */}
        <section className="relative flex min-h-[84vh] items-center py-14 md:py-20">
          <div className="grid gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <span className="inline-flex rounded-full border border-green-500/20 bg-green-500/10 px-4 py-1 text-sm font-medium text-green-300">
                DataLab Groupe Crédit Agricole S.A : Candidature Spontanée
              </span>
              <h1
                className={`${headingFont.className} mt-8 text-4xl sm:text-5xl md:text-7xl font-bold leading-tight tracking-tight text-white`}
              >
                Hamza Hamdache
              </h1>
              <p className="mt-5 text-lg md:text-2xl font-semibold text-green-400">
                Alternant Chef de Projet IA — Cellule Accompagnement IA
              </p>
              <p className="mt-6 md:mt-8 max-w-2xl text-base md:text-xl leading-relaxed text-slate-300">
                Passionne d'IA, je developpe des SaaS en production et pilote
                des projets data en methode Agile. Je candidate pour contribuer
                a l'adoption de l'IA au sein du Groupe Credit Agricole.
              </p>
              <div className="mt-10 flex flex-col md:flex-row md:flex-wrap items-stretch md:items-center gap-4">
                <a
                  href="#chat-ia"
                  className="group inline-flex justify-center items-center gap-3 rounded-full bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-300 px-7 py-4 text-sm font-semibold text-slate-950 transition duration-300 hover:scale-[1.02] hover:shadow-[0_12px_45px_rgba(74,231,255,0.24)] w-full md:w-auto text-center"
                >
                  Parler à mon IA
                  <span className="transition group-hover:translate-x-1">→</span>
                </a>
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full flex justify-center border border-cyan-400/40 bg-cyan-400/10 px-7 py-4 text-sm font-semibold text-cyan-300 transition duration-300 hover:bg-cyan-400/20 hover:shadow-[0_0_15px_rgba(74,231,255,0.3)] w-full md:w-auto text-center"
                >
                  Télécharger mon CV
                </a>
                <a
                  href="#projets"
                  className="rounded-full flex justify-center border border-white/10 px-7 py-4 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/5 w-full md:w-auto text-center"
                >
                  Voir mes projets
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative"
            >
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-r from-blue-500/20 to-cyan-300/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow backdrop-blur">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
                  <span>Objectifs 2026</span>
                  <span className="text-green-400 font-bold">Crédit Agricole</span>
                </div>
                <div className="mt-8 space-y-6">
                  {[
                    "Diffuser les bonnes pratiques IA au sein des equipes Groupe",
                    "Construire et animer une bibliotheque de prompts actionnable",
                    "Piloter l'adoption des outils IA via des KPIs concrets",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/8 bg-white/[0.03] p-5"
                    >
                      <div className="mb-3 h-1.5 w-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-300" />
                      <p className="text-base leading-7 text-slate-200">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="space-y-28 md:space-y-36">

          {/* A PROPOS */}
          <section id="apropos" className="scroll-mt-28">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <SectionTitle
                eyebrow="A propos"
                title="Technique, pedagogique et oriente adoption."
                description="Etudiant en 3eme annee a SUPINFO Tours, alternant Data & IA chez Keolis, je combine maitrise technique de l'IA et capacite a la rendre accessible a des equipes non techniques."
              />
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="grid gap-4 md:grid-cols-3"
              >
                {[
                  { label: "Formation", value: "SUPINFO Tours — Ingénierie & Master IA" },
                  { label: "Accompagnement", value: "Expertise en Pédagogie & Adoption IA" },
                  { label: "Mobilité", value: "Campus Evergreen / SQY Park (Sept. 2026)" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-glow"
                  >
                    <p className="text-sm uppercase tracking-[0.22em] text-slate-400">
                      {item.label}
                    </p>
                    <p className="mt-4 text-lg font-semibold text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* PROJETS */}
          <section id="projets" className="scroll-mt-28">
            <SectionTitle
              eyebrow="Projets"
              title="Des produits IA deployes, pas des prototypes."
              description="Chaque projet integre des LLMs en production, avec une attention constante a l'experience utilisateur, a la scalabilite et a la valeur metier."
            />
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {projects.map((project, index) => (
                <motion.article
                  key={project.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={fadeUp}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-7 shadow-glow transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.06]"
                >
                  <span className="inline-flex rounded-full border border-cyan-300/15 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
                    {project.category}
                  </span>
                  <h3
                    className={`${headingFont.className} mt-6 text-2xl font-bold text-white`}
                  >
                    {project.name}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-slate-300">
                    {project.description}
                  </p>
                  <div className="mt-8 h-px w-full bg-gradient-to-r from-blue-500/40 to-transparent" />
                  <p className="mt-5 text-sm font-medium text-slate-400">
                    Conception, integration LLM, deploiement production.
                  </p>
                </motion.article>
              ))}
            </div>
          </section>

          {/* COMPETENCES */}
          <section id="competences" className="scroll-mt-28">
            <SectionTitle
              eyebrow="Competences"
              title="IA, pilotage de projet et transformation digitale."
              description="Un profil structure autour de trois axes complementaires : maitrise technique de l'IA, gestion de projet Agile et accompagnement au changement."
            />
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {Object.entries(skills).map(([category, items], index) => (
                <motion.div
                  key={category}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={fadeUp}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="rounded-[1.75rem] border border-white/10 bg-slate-950/65 p-7 shadow-glow"
                >
                  <h3 className="text-lg font-semibold uppercase tracking-[0.24em] text-cyan-200">
                    {category}
                  </h3>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {items.map((skill) => (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="cursor-default rounded-full border border-blue-400/15 bg-blue-400/10 px-4 py-2 text-sm font-medium text-slate-100 transition-colors duration-300 hover:border-cyan-400/40 hover:bg-cyan-400/20 hover:text-cyan-100"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CHAT IA */}
          <section id="chat-ia" className="scroll-mt-28">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <SectionTitle
                eyebrow="Chat IA"
                title="Une IA qui me connait. Posez-lui vos questions."
                description="Ce widget est branche sur OpenRouter et repond en temps reel a vos questions sur mon parcours, mes projets et ma motivation pour le DataLab Groupe Credit Agricole."
              />
              <ChatWidget />
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" className="scroll-mt-28">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUp}
              transition={{ duration: 0.55 }}
              className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-blue-500/10 via-slate-950/80 to-cyan-300/10 p-8 shadow-glow md:p-10"
            >
              <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
                Contact
              </span>
              <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
                <div>
                  <h2
                    className={`${headingFont.className} text-3xl font-bold tracking-tight text-white md:text-4xl`}
                  >
                    Interessé par mon profil pour le DataLab Groupe ?
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                    Je suis disponible pour un echange, une visio ou un entretien.
                    N'hesitez pas a me contacter directement.
                  </p>
                </div>
                <div className="space-y-4">
                  <Link
                    href="mailto:hamza.hamd@icloud.com"
                    className="block rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-5 text-lg font-semibold text-white transition hover:border-cyan-300/30 hover:bg-white/[0.06]"
                  >
                    hamza.hamd@icloud.com
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/hamzahamdache/"
                    target="_blank"
                    className="block rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-5 text-lg font-semibold text-white transition hover:border-cyan-300/30 hover:bg-white/[0.06]"
                  >
                    linkedin.com/in/hamzahamdache
                  </Link>
                </div>
              </div>
            </motion.div>
          </section>

        </div>
      </div>
    </main>
  );
}