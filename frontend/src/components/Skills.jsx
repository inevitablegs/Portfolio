import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Skills() {
  const [skills, setSkills] = useState({
    languages: "Python, JavaScript, C#",
    frameworks: "Django, React, Tailwind",
    databases: "PostgreSQL, SQLite",
    tools: "Git, Docker, Unity",
  });

  useEffect(() => {
    api.get("/skills/")
      .then(res => {
        if (res.data && Object.keys(res.data).length) {
          setSkills(res.data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="card">
      <p className="section-title">Technical Expertise</p>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-surface-100">
        Skills & Tech Stack
      </h2>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <SkillBlock icon="💻" title="Languages" value={skills.languages} />
        <SkillBlock icon="⚡" title="Frameworks" value={skills.frameworks} />
        <SkillBlock icon="🗄️" title="Databases" value={skills.databases} />
        <SkillBlock icon="🛠️" title="Tools" value={skills.tools} />
      </div>
    </div>
  );
}

function SkillBlock({ icon, title, value }) {
  const tags = value.split(",").map(s => s.trim());
  
  return (
    <div className="rounded-xl border border-surface-700/50 bg-surface-800/50 p-5 transition hover:border-accent-500/30 hover:shadow-glow-sm">
      <div className="flex items-center gap-3">
        <span className="text-xl">{icon}</span>
        <h3 className="font-semibold text-surface-100">{title}</h3>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="rounded-md border border-accent-500/20 bg-accent-500/10 px-2.5 py-1 text-xs font-medium text-accent-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
