import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchWithCache, getCachedData } from "../api/cache";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Hero() {
  const [hero, setHero] = useState(() => getCachedData("/hero/") || {
    name: "Ganesh Sonawane",
    tagline: "Software Developer · Django · AI · Unity",
    intro: "I build practical, scalable software.",
    cta_text: "",
    cta_link: "",
  });

  const [assets, setAssets] = useState(() => getCachedData("/profile-assets/"));

  useEffect(() => {
    fetchWithCache("/hero/", setHero).catch(() => {});
    fetchWithCache("/profile-assets/", setAssets).catch(() => {});
  }, []);

  return (
    <section className="relative pt-20 pb-12">
      {/* Accent glow line */}
      <div className="absolute left-0 top-24 h-px w-20 bg-gradient-to-r from-accent-400 to-transparent shadow-glow-sm" />

      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <p className="section-title">Portfolio 2026</p>
          <h1 className="mt-4 text-5xl font-bold tracking-tight text-surface-100 md:text-6xl">
            <span className="text-gradient">{hero.name}</span>
          </h1>
          <div className="mt-3 flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent-400 shadow-glow-sm" />
            <span className="text-sm font-medium text-accent-400">Open to opportunities</span>
          </div>
          <p className="mt-4 text-xl font-medium text-surface-300">{hero.tagline}</p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-surface-400">
            {hero.intro}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            {hero.cta_text && hero.cta_link && (
              <a
                href={hero.cta_link}
                className="btn-primary"
              >
                {hero.cta_text}
                <span>→</span>
              </a>
            )}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=sonawaneganu3101@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              Say Hello
            </a>
            {assets?.resume && (
              <Link
                to="/resume"
                className="btn-primary"
              >
                <span>📄</span>
                Resume
              </Link>
            )}
          </div>
        </div>

        {/* Profile Card - Right Side */}
        <div className="flex flex-col items-center gap-6">
          {/* Profile Photo with Glow */}
          <div className="relative">
            {/* Glowing ring layers */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-accent-400 via-accent-300 to-accent-500 opacity-60 blur-lg animate-pulse" />
            <div className="absolute -inset-1 rounded-full bg-accent-400/50 blur-md" />
            
            {assets?.profile_photo ? (
              <img
                src={assets.profile_photo}
                alt="Profile"
                className="relative h-[17rem] w-[17rem] rounded-full object-cover"
              />
            ) : (
              <div className="relative flex h-[17rem] w-[17rem] items-center justify-center rounded-full bg-surface-800 text-7xl">
                👨‍💻
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
