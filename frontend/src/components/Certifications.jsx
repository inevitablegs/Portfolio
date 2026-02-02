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

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {items.map(c => (
          <div
            key={c.id}
            className="flex items-start gap-4 rounded-xl border border-surface-700/50 bg-surface-800/50 p-4 transition hover:border-accent-500/30"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-500/20 text-lg">
              📜
            </span>
            <div className="flex-1">
              <p className="font-semibold text-surface-100">{c.name}</p>
              <p className="mt-1 text-sm text-surface-400">{c.issuer}</p>
              {c.certificate_url && (
                <a
                  href={c.certificate_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent-400 transition hover:text-accent-300"
                >
                  View Certificate
                  <span>→</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
