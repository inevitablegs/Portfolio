import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("/projects/")
      .then(res => setProjects(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="card">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="section-title">Selected Work</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-surface-100">
            Projects
          </h2>
        </div>
        <span className="rounded-lg border border-accent-500/30 bg-accent-500/10 px-3 py-1.5 text-xs font-medium text-accent-400">
          {projects.length} Projects
        </span>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <div className="group relative rounded-xl border border-surface-700/50 bg-surface-800/50 p-5 transition hover:border-accent-500/50 hover:shadow-glow-sm">
      {/* Accent corner */}
      <div className="absolute right-0 top-0 h-px w-12 bg-gradient-to-l from-accent-400/50 to-transparent" />
      
      <h3 className="text-lg font-bold text-surface-100">
        {project.title}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-surface-400">
        {project.short_description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech_stack?.split(",").map((tech, i) => (
          <span
            key={i}
            className="rounded-md border border-glow-violet/20 bg-glow-violet/10 px-2 py-1 text-xs font-medium text-glow-violet"
          >
            {tech.trim()}
          </span>
        ))}
      </div>

      <div className="mt-5 flex gap-3 text-xs font-semibold">
        {project.github_url && (
          <a
            href={project.github_url}
            className="rounded-lg border border-surface-600 bg-surface-700/50 px-3 py-2 text-surface-300 transition hover:border-accent-500/50 hover:text-accent-400"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        )}

        {project.live_url && (
          <a
            href={project.live_url}
            className="rounded-lg bg-accent-500 px-3 py-2 text-surface-950 font-bold transition hover:bg-accent-400 hover:shadow-glow-sm"
            target="_blank"
            rel="noreferrer"
          >
            Live Preview
          </a>
        )}
      </div>
    </div>
  );
}
