// src/components/Achievements.jsx
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Achievements() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/achievements/").then(res => setItems(res.data)).catch(() => {});
  }, []);

  if (!items.length) return null;

  return (
    <div className="card">
      <p className="section-title">Recognition</p>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-surface-100">
        Achievements
      </h2>

      <div className="mt-6 space-y-3">
        {items.map(a => (
          <div
            key={a.id}
            className="flex items-start gap-3 rounded-xl border border-surface-700/50 bg-surface-800/50 p-4 transition hover:border-glow-violet/30 hover:shadow-glow-violet"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-glow-violet/20 text-sm">
              🏆
            </span>
            <div>
              <p className="font-semibold text-surface-100">{a.title}</p>
              {a.description && (
                <p className="mt-1 text-sm text-surface-400">{a.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
 
