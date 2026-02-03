import { Link } from "react-router-dom";

import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Achievements from "../components/Achievements";
import Experience from "../components/Experience";
import Certifications from "../components/Certifications";

export default function Home() {
  return (
    <div className="min-h-screen bg-surface-950 text-surface-100">
      {/* Futuristic background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-100 [background-image:linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] [background-size:48px_48px]" />
        {/* Glow orbs */}
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-accent-500/10 blur-[120px]" />
        <div className="absolute -right-40 top-1/2 h-80 w-80 rounded-full bg-glow-violet/10 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-accent-400/5 blur-[80px]" />
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-surface-800/50 bg-surface-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 text-sm font-bold text-surface-950 shadow-glow-sm">
              GS
            </span>
            <span className="text-sm font-bold tracking-tight text-surface-100">
              Ganesh Sonawane
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-surface-400 md:flex">
            <a href="#skills" className="transition hover:text-accent-400">Skills</a>
            <a href="#projects" className="transition hover:text-accent-400">Projects</a>
            <a href="#experience" className="transition hover:text-accent-400">Experience</a>
            <a href="#contact" className="transition hover:text-accent-400">Contact</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/profile" title="Profile">
              <img
                src="https://via.placeholder.com/48"
                alt="Profile"
                className="h-9 w-9 rounded-full border-2 border-surface-700 object-cover transition hover:border-accent-400 hover:shadow-glow-sm"
              />
            </Link>
            <Link
              to="/admin/login"
              className="rounded-lg border border-surface-700 bg-surface-800/50 px-4 py-2 text-xs font-semibold text-surface-300 transition hover:border-accent-500/50 hover:text-accent-400"
            >
              Admin
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-6xl px-6 pb-24">
        {/* Hero Section - First Impression */}
        <Hero />

        {/* Quick Overview + Education - Side by side */}
        <section className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Quick Overview Card */}
          <div className="card">
            <p className="section-title">Quick Overview</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-surface-100">
              About Me
            </h2>
            <div className="mt-6 space-y-3">
              <InfoCard icon="📍" label="Location" value="Pune, India" />
              <InfoCard icon="📧" label="Email" value="ganeshsonawane.dev@gmail.com" />
              <InfoCard icon="💼" label="Focus" value="Full-Stack Development" />
            </div>
          </div>

          {/* Education - Static */}
          <div className="card">
            <p className="section-title">Background</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-surface-100">
              Education
            </h2>
            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-4 rounded-xl border border-surface-700/50 bg-surface-800/50 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/20 text-xl">
                  🎓
                </div>
                <div>
                  <p className="font-semibold text-surface-100">B.E. / B.Tech – Engineering</p>
                  <p className="mt-1 text-sm text-surface-400">Dummy University</p>
                  <p className="mt-1 text-xs text-surface-500">2022 – 2026</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-xl border border-surface-700/50 bg-surface-800/50 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-glow-violet/20 text-xl">
                  🏫
                </div>
                <div>
                  <p className="font-semibold text-surface-100">Higher Secondary (12th)</p>
                  <p className="mt-1 text-sm text-surface-400">Dummy Junior College</p>
                  <p className="mt-1 text-xs text-surface-500">2020 – 2022</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills - Full Width */}
        <section id="skills" className="mt-12">
          <Skills />
        </section>

        {/* Projects - Proof of practical skills */}
        <section id="projects" className="mt-12">
          <Projects />
        </section>

        {/* Certifications - Full Width */}
        <section className="mt-12">
          <Certifications />
        </section>

        {/* Experience - Work history */}
        <section id="experience" className="mt-12">
          <Experience />
        </section>

        {/* Achievements - Additional credentials */}
        <section className="mt-12">
          <Achievements />
        </section>

        {/* Contact - Clear CTA */}
        <section id="contact" className="mt-20">
          <div className="relative overflow-hidden rounded-2xl border border-accent-500/20 bg-gradient-to-br from-surface-900 via-surface-900 to-accent-950/50 p-10 shadow-glow-sm">
            {/* Decorative elements */}
            <div className="absolute right-0 top-0 h-px w-1/2 bg-gradient-to-l from-accent-400 to-transparent" />
            <div className="absolute bottom-0 left-0 h-px w-1/3 bg-gradient-to-r from-glow-violet to-transparent" />
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-accent-500/10 blur-3xl" />
            
            <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-400">
                  Let's Connect
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-surface-100">
                  Ready to bring value to your team
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-surface-400">
                  Looking for internship opportunities where I can contribute my skills in 
                  full-stack development, AI, and clean code practices. Let's discuss how I 
                  can add value to your organization.
                </p>
                <a
                  href="mailto:ganeshsonawane.dev@gmail.com"
                  className="btn-primary mt-8"
                >
                  Get in Touch
                  <span>→</span>
                </a>
              </div>
              <div className="hidden space-y-3 lg:block">
                <div className="rounded-xl border border-accent-500/20 bg-surface-800/50 p-4 backdrop-blur-sm">
                  <p className="text-xs text-surface-500">Response Time</p>
                  <p className="mt-1 text-lg font-bold text-accent-400">Within 24 hours</p>
                </div>
                <div className="rounded-xl border border-accent-500/20 bg-surface-800/50 p-4 backdrop-blur-sm">
                  <p className="text-xs text-surface-500">Availability</p>
                  <p className="mt-1 text-lg font-bold text-accent-400">Immediate</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-surface-800/50 bg-surface-950 py-8">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-surface-500">
          <p>© 2026 Ganesh Sonawane. <span className="text-accent-500">Crafted with precision.</span></p>
        </div>
      </footer>
    </div>
  );
}

/* ---------- Local Components ---------- */

function InfoCard({ icon, label, value, isResume, isStatus }) {
  if (isResume) {
    return (
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 rounded-xl border border-surface-700/50 bg-surface-800/50 p-4 transition hover:border-accent-500/30 hover:bg-surface-800"
      >
        <span className="text-2xl">{icon}</span>
        <div className="flex-1">
          <p className="text-xs font-medium text-surface-400">{label}</p>
          <p className="mt-0.5 text-sm font-semibold text-accent-400">{value}</p>
        </div>
        <span className="text-accent-400">→</span>
      </a>
    );
  }

  if (isStatus) {
    return (
      <div className="flex items-center gap-4 rounded-xl border border-accent-500/30 bg-accent-500/10 p-4">
        <span className="text-2xl">{icon}</span>
        <div className="flex-1">
          <p className="text-xs font-medium text-surface-400">{label}</p>
          <p className="mt-0.5 text-sm font-semibold text-accent-400">{value}</p>
        </div>
        <span className="h-2 w-2 animate-pulse rounded-full bg-accent-400 shadow-glow-sm" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 rounded-xl border border-surface-700/50 bg-surface-800/50 p-4 transition hover:border-accent-500/30">
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="text-xs font-medium text-surface-400">{label}</p>
        <p className="mt-0.5 text-sm font-semibold text-surface-100">{value}</p>
      </div>
    </div>
  );
}


