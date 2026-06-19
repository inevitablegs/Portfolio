// src/components/Certifications.jsx
import { useEffect, useState } from "react";
import { fetchWithCache, getCachedData } from "../api/cache";

export default function Certifications() {
  const [items, setItems] = useState(() => getCachedData("/certifications/") || []);

  useEffect(() => {
    fetchWithCache("/certifications/", setItems).catch(() => {});
  }, []);

  if (!items.length) return null;

  return (
    <div className="card relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute right-0 top-0 -z-10 h-72 w-72 rounded-full bg-accent-500/5 blur-[80px]" />
      
      <p className="section-title">Credentials</p>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-surface-100">
        Certifications
      </h2>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((c, index) => (
          <CertCard key={c.id} cert={c} index={index} />
        ))}
      </div>
    </div>
  );
}

function CertCard({ cert, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative flex items-center gap-4 rounded-2xl border border-surface-800/80 bg-surface-900/30 p-4 backdrop-blur-md transition-all duration-300 hover:border-accent-500/40 hover:bg-surface-900/50 hover:shadow-glow-sm hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both` }}
    >
      {/* Dynamic light streak */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 via-transparent to-glow-violet/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

      {/* Image container */}
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-surface-800 bg-surface-950/60 flex items-center justify-center p-2 group-hover:border-accent-500/30 transition-colors duration-300">
        {cert.image ? (
          <img
            src={cert.image}
            alt={cert.name}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="text-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
            🎓
          </div>
        )}
      </div>

      {/* Metadata content */}
      <div className="flex-1 min-w-0">
        <span className="inline-flex items-center rounded-md border border-accent-500/20 bg-accent-500/5 px-2 py-0.5 text-[10px] font-bold text-accent-400 uppercase tracking-wider mb-1">
          {cert.issuer}
        </span>
        
        <h3 className="text-sm font-bold text-surface-100 leading-snug line-clamp-2 group-hover:text-accent-400 transition-colors duration-300">
          {cert.name}
        </h3>

        {cert.certificate_url && (
          <a
            href={cert.certificate_url}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-surface-400 hover:text-accent-400 transition-colors duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            Verify Credential <span>↗</span>
          </a>
        )}
      </div>
    </div>
  );
}