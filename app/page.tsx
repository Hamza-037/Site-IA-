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
      "Une plateforme orientee performance pour accelerer la prospection, la qualification et la conversion avec l'IA.",
  },
  {
    name: "ShadowFit",
    category: "HealthTech",
    description:
      "Une experience fitness intelligente qui combine personnalisation, automatisation et suivi utilisateur.",
  },
  {
    name: "SUPCONTENT",
    category: "EdTech",
    description:
      "Un moteur de production de contenu pense pour les etudiants, les formateurs et les ecosystemes pedagogiques modernes.",
  },
];

const skills = {
  IA: [
    "LLM Ops",
    "Prompt Engineering",
    "Automatisation IA",
    "Agents IA",
    "Product Thinking",
  ],
  Data: [
    "Python",
    "Pandas",
    "Power BI",
    "SQL",
    "Visualisation",
  ],
  Dev: [
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "APIs",
    "Vercel",
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
        <motion.header
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="sticky top-4 z-30 mb-10 rounded-full border border-white/10 bg-slate-950/70 px-5 py-4 shadow-glow backdrop-blur-xl"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(74,231,255,0.9)]" />
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-300">
                portfolio.h-hamdache.fr
              </p>
            </div>
            <nav className="flex flex-wrap gap-3 text-sm text-slate-300">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-3 py-1 transition hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </motion.header>

        <section className="relative flex min-h-[84vh] items-center py-14 md:py-20">
          <div className="grid gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <span className="inline-flex rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-1 text-sm font-medium text-blue-100">
                Alternant Chef de Projet IA • SUPINFO Tours • Keolis
              </span>
              <h1
                className={`${headingFont.className} mt-8 text-5xl font-bold leading-none tracking-tight text-white sm:text-6xl md:text-7xl`}
              >
                Hamza Hamdache
              </h1>
              <p className="mt-5 text-xl font-semibold text-cyan-300 md:text-2xl">
                Alternant Chef de Projet IA
              </p>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
                Je concois des produits IA qui transforment des idees ambitieuses
                en experiences utiles, mesurables et pretes a etre deployees.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#chat-ia"
                  className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-300 px-7 py-4 text-sm font-semibold text-slate-950 transition duration-300 hover:scale-[1.02] hover:shadow-[0_12px_45px_rgba(74,231,255,0.24)]"
                >
                  Parler a mon IA
                  <span className="transition group-hover:translate-x-1">→</span>
                </a>
                <a
                  href="#projets"
                  className="rounded-full border border-white/10 px-7 py-4 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/5"
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
                  <span>Focus</span>
                  <span>2026</span>
                </div>
                <div className="mt-8 space-y-6">
                  {[
                    "Pilotage de projets IA en environnement reel",
                    "Construction de SaaS utiles, lisibles et actionnables",
                    "Alliance entre vision produit, data et execution",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/8 bg-white/[0.03] p-5"
                    >
                      <div className="mb-3 h-1.5 w-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-300" />
                      <p className="text-base leading-7 text-slate-200">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="space-y-28 md:space-y-36">
          <section id="apropos" className="scroll-mt-28">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <SectionTitle
                eyebrow="A propos"
                title="Un profil hybride entre strategie, produit et execution."
                description="Etudiant a SUPINFO Tours, alternant chez Keolis et builder de SaaS IA, je travaille a l'intersection du terrain, de la technologie et de la creation de valeur."
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
                  { label: "Formation", value: "SUPINFO Tours" },
                  { label: "Alternance", value: "Keolis" },
                  { label: "Approche", value: "Builder de SaaS IA" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-glow"
                  >
                    <p className="text-sm uppercase tracking-[0.22em] text-slate-400">
                      {item.label}
                    </p>
                    <p className="mt-4 text-xl font-semibold text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          <section id="projets" className="scroll-mt-28">
            <SectionTitle
              eyebrow="Projets"
              title="Des produits IA penses pour des usages concrets."
              description="Chaque projet explore une combinaison differente entre experience utilisateur, automatisation et impact metier."
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
                    Positionnement produit, execution rapide, design orientee usage.
                  </p>
                </motion.article>
              ))}
            </div>
          </section>

          <section id="competences" className="scroll-mt-28">
            <SectionTitle
              eyebrow="Competences"
              title="Un stack structure autour de l'IA, de la data et du produit."
              description="Je combine vision, experimentation et implementation pour construire vite sans perdre la lisibilite du produit."
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
                      <span
                        key={skill}
                        className="rounded-full border border-blue-400/15 bg-blue-400/10 px-4 py-2 text-sm font-medium text-slate-100"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section id="chat-ia" className="scroll-mt-28">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <SectionTitle
                eyebrow="Chat IA"
                title="Une interface conversationnelle pour presenter mon univers."
                description="Le widget est branche sur la route API du portfolio et repond avec des suggestions rapides ou des questions libres."
              />
              <ChatWidget />
            </div>
          </section>

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
                    Ouvert aux discussions autour de l'IA, du produit et des SaaS.
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                    Pour une collaboration, un echange ou une opportunite, le plus
                    simple est de me contacter directement.
                  </p>
                </div>
                <div className="space-y-4">
                  <Link
                    href="mailto:contact@h-hamdache.fr"
                    className="block rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-5 text-lg font-semibold text-white transition hover:border-cyan-300/30 hover:bg-white/[0.06]"
                  >
                    contact@h-hamdache.fr
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/hamza-hamdache/"
                    target="_blank"
                    className="block rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-5 text-lg font-semibold text-white transition hover:border-cyan-300/30 hover:bg-white/[0.06]"
                  >
                    linkedin.com/in/hamza-hamdache
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
