import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Achievements from "../components/Achievements";
import Experience from "../components/Experience";
import Certifications from "../components/Certifications";
import api from "../api/axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Home() {
  const [assets, setAssets] = useState(null);

  useEffect(() => {
    api.get("/profile-assets/")
      .then(res => setAssets(res.data))
      .catch(() => {});
  }, []);
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
            <a href="#skills" className="transition hover:text-accent-400">
              Skills
            </a>
            <a href="#projects" className="transition hover:text-accent-400">
              Projects
            </a>
            <a href="#experience" className="transition hover:text-accent-400">
              Experience
            </a>
            <a href="#contact" className="transition hover:text-accent-400">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-4">
            {/* Social Media Links */}
            <div className="hidden items-center gap-3 sm:flex">
              <a
                href="https://github.com/inevitablegs"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-surface-700/50 bg-surface-800/50 text-surface-300 transition-all duration-300 hover:border-accent-500/50 hover:bg-surface-700 hover:text-accent-400 hover:scale-110"
                title="GitHub"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              
              <a
                href="https://linkedin.com/in/inevitable-gs"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-surface-700/50 bg-surface-800/50 text-surface-300 transition-all duration-300 hover:border-accent-500/50 hover:bg-surface-700 hover:text-accent-400 hover:scale-110"
                title="LinkedIn"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              
              <a
                href="https://x.com/inevitable_gs"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-surface-700/50 bg-surface-800/50 text-surface-300 transition-all duration-300 hover:border-accent-500/50 hover:bg-surface-700 hover:text-accent-400 hover:scale-110"
                title="X (Twitter)"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>

            <Link to="/profile" title="Profile">
              {assets?.profile_photo ? (
                <img
                  src={`${BASE_URL}${assets.profile_photo}`}
                  alt="Profile"
                  className="h-9 w-9 rounded-full border-2 border-surface-700 object-cover transition hover:border-accent-400 hover:shadow-glow-sm"
                />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-surface-700 bg-gradient-to-br from-accent-400/20 to-accent-600/20 text-xs font-bold text-accent-400 transition hover:border-accent-400 hover:shadow-glow-sm">
                  GS
                </div>
              )}
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
              <InfoCard
                icon="📧"
                label="Email"
                value="sonawaneganu3101@gmail.com"
              />
              <InfoCard
                icon="💼"
                label="Focus"
                value="Full-Stack Development"
              />
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
                  <p className="font-semibold text-surface-100">
                    B.E. / B.Tech – Engineering
                  </p>
                  <p className="mt-1 text-sm text-surface-400">
                    Dummy University
                  </p>
                  <p className="mt-1 text-xs text-surface-500">2022 – 2026</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-xl border border-surface-700/50 bg-surface-800/50 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-glow-violet/20 text-xl">
                  🏫
                </div>
                <div>
                  <p className="font-semibold text-surface-100">
                    Higher Secondary (12th)
                  </p>
                  <p className="mt-1 text-sm text-surface-400">
                    Dummy Junior College
                  </p>
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
                  Looking for internship opportunities where I can contribute my
                  skills in full-stack development, AI, and clean code
                  practices. Let's discuss how I can add value to your
                  organization.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=sonawaneganu3101@gmail.com"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                  >
                    Get in Touch
                    <span>→</span>
                  </a>
                  
                  {/* Social Media Links */}
                  <div className="flex items-center gap-3">
                    <a
                      href="https://github.com/inevitablegs"
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-surface-700/50 bg-surface-800/50 text-surface-300 transition-all duration-300 hover:border-accent-500/50 hover:bg-surface-700 hover:text-accent-400 hover:scale-110"
                      title="GitHub"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                    
                    <a
                      href="https://linkedin.com/in/inevitable-gs"
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-surface-700/50 bg-surface-800/50 text-surface-300 transition-all duration-300 hover:border-accent-500/50 hover:bg-surface-700 hover:text-accent-400 hover:scale-110"
                      title="LinkedIn"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    
                    <a
                      href="https://x.com/inevitable_gs"
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-surface-700/50 bg-surface-800/50 text-surface-300 transition-all duration-300 hover:border-accent-500/50 hover:bg-surface-700 hover:text-accent-400 hover:scale-110"
                      title="X (Twitter)"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <div className="hidden space-y-3 lg:block">
                <div className="rounded-xl border border-accent-500/20 bg-surface-800/50 p-4 backdrop-blur-sm">
                  <p className="text-xs text-surface-500">Response Time</p>
                  <p className="mt-1 text-lg font-bold text-accent-400">
                    Within 24 hours
                  </p>
                </div>
                <div className="rounded-xl border border-accent-500/20 bg-surface-800/50 p-4 backdrop-blur-sm">
                  <p className="text-xs text-surface-500">Availability</p>
                  <p className="mt-1 text-lg font-bold text-accent-400">
                    Immediate
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-surface-800/50 bg-surface-950 py-8">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-surface-500">
          <p>
            © 2026 Ganesh Sonawane.{" "}
            <span className="text-accent-500">Crafted with precision.</span>
          </p>
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
          <p className="mt-0.5 text-sm font-semibold text-accent-400">
            {value}
          </p>
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
          <p className="mt-0.5 text-sm font-semibold text-accent-400">
            {value}
          </p>
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


