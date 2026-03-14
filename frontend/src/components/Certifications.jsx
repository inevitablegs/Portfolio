// src/components/Certifications.jsx
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Certifications() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/certifications/").then(res => setItems(res.data)).catch(() => {});
  }, []);

  if (!items.length) return null;

  return (
    <div className="card">
      <p className="section-title">Credentials</p>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-surface-100">
        Certifications
      </h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
      className="group relative rounded-xl border border-surface-700/50 bg-gradient-to-br from-surface-800/50 to-surface-900/50 overflow-hidden transition-all duration-300 hover:border-accent-500/50 hover:shadow-glow-md hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 via-transparent to-glow-violet/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-accent-400 to-glow-violet transition-all duration-500 group-hover:w-full" />

      <div className="relative h-32 w-full bg-surface-900/50 flex items-center justify-center overflow-hidden">
        {cert.image ? (
          <img
            src={cert.image}
            alt={cert.name}
            className="h-full w-full object-contain p-4 transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-accent-500/20 to-glow-violet/20 text-4xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
            📜
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-900 via-transparent to-transparent opacity-40" />
      </div>

      <div className="relative p-4">
        <h3 className="text-sm font-bold text-surface-100 line-clamp-2 min-h-[2.5rem] transition-colors duration-300 group-hover:text-accent-400">
          {cert.name}
        </h3>
        
        <p className="mt-2 text-xs text-surface-400 line-clamp-1">{cert.issuer}</p>

        {cert.certificate_url && (
          <a
            href={cert.certificate_url}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-accent-500/30 bg-accent-500/10 px-3 py-1.5 text-xs font-semibold text-accent-400 transition-all duration-300 hover:border-accent-500/50 hover:bg-accent-500/20 hover:shadow-glow-sm hover:scale-105"
            onClick={(e) => e.stopPropagation()}
          >
            <span>🔗</span> View Certificate
          </a>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}