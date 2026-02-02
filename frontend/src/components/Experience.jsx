// src/components/Experience.jsx
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Experience() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/experience/").then(res => setItems(res.data)).catch(() => {});
  }, []);

  if (!items.length) return null;

  return (
    <div className="card">
      <p className="section-title">Career</p>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-surface-100">
        Experience
      </h2>

      <div className="mt-6 space-y-4 lg:border-l lg:border-accent-500/30 lg:pl-6">
        {items.map((exp, index) => (
          <div
            key={exp.id}
            className="relative rounded-xl border border-surface-700/50 bg-surface-800/50 p-5 transition hover:border-accent-500/30"
          >
            {/* Timeline dot with glow */}
            <div className="absolute -left-[31px] top-6 hidden h-3 w-3 rounded-full border-2 border-accent-400 bg-surface-900 shadow-glow-sm lg:block" />
            
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="font-bold text-surface-100">{exp.role}</h3>
                <p className="text-sm font-medium text-accent-400">{exp.organization}</p>
              </div>
              <span className="rounded-lg border border-surface-600 bg-surface-700/50 px-3 py-1 text-xs font-medium text-surface-400">
                {exp.start_date} – {exp.end_date || "Present"}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-surface-400">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
