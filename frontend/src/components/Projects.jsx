import { useEffect, useState } from "react";
import api from "../api/axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    api.get("/projects/")
      .then(res => setProjects(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const displayedProjects = showAll ? projects : projects.slice(0, 2);
  const hasMore = projects.length > 2;

  return (
    <div className="card">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="section-title">Selected Work</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-surface-100">
            Projects
          </h2>
        </div>
        <span className="rounded-lg border border-accent-500/30 bg-accent-500/10 px-3 py-1.5 text-xs font-medium text-accent-400 animate-pulse">
          {projects.length} Projects
        </span>
      </div>

      {loading ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {[1, 2].map(i => (
            <div key={i} className="h-96 rounded-xl border border-surface-700/50 bg-surface-800/50 animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {displayedProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
          
          {hasMore && !showAll && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setShowAll(true)}
                className="group flex items-center gap-2 rounded-lg border border-accent-500/30 bg-accent-500/10 px-6 py-3 text-sm font-semibold text-accent-400 transition-all duration-300 hover:border-accent-500/50 hover:bg-accent-500/20 hover:shadow-glow-sm hover:scale-105"
              >
                See More Projects
                <span className="transition-transform duration-300 group-hover:translate-y-1">↓</span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function ProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  return (
    <div 
      className="group relative rounded-xl border border-surface-700/50 bg-gradient-to-br from-surface-800/50 to-surface-900/50 overflow-hidden transition-all duration-300 hover:border-accent-500/50 hover:shadow-glow-md hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
      }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 via-transparent to-glow-violet/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Accent corner */}
      <div className="absolute right-0 top-0 h-px w-20 bg-gradient-to-l from-accent-400/50 to-transparent transition-all duration-300 group-hover:w-40" />
      <div className="absolute bottom-0 left-0 h-px w-20 bg-gradient-to-r from-glow-violet/50 to-transparent transition-all duration-300 group-hover:w-40" />
      
      {/* Project Image */}
      {project.image && (
        <div className="relative h-48 w-full overflow-hidden bg-surface-900/50">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-900 via-surface-900/50 to-transparent opacity-60" />
          
          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-3 right-3 rounded-lg border border-accent-500/30 bg-accent-500/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-surface-950 shadow-glow-sm">
              ⭐ Featured
            </div>
          )}

          {/* Action Buttons - Bottom Right Corner */}
          <div className="absolute bottom-3 right-3 flex gap-2 text-xs font-semibold">
            {project.github_url && (
              <a
                href={project.github_url}
                className="flex items-center gap-1.5 rounded-lg border border-surface-600/80 bg-surface-900/90 backdrop-blur-sm px-3 py-2 text-surface-200 transition-all duration-300 hover:border-accent-500/50 hover:bg-surface-800/90 hover:text-accent-400 hover:shadow-glow-sm hover:scale-105"
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <span>💻</span>
                GitHub
              </a>
            )}

            {project.live_url && (
              <a
                href={project.live_url}
                className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-accent-500 to-accent-600 px-3 py-2 text-surface-950 font-bold backdrop-blur-sm transition-all duration-300 hover:from-accent-400 hover:to-accent-500 hover:shadow-glow-md hover:scale-105"
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <span>🚀</span>
                Live
              </a>
            )}
          </div>
        </div>
      )}
      
      {/* Content */}
      <div className="relative p-5">
        <h3 className="text-lg font-bold text-surface-100 transition-colors duration-300 group-hover:text-accent-400">
          {project.title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-surface-400 line-clamp-2">
          {project.short_description}
        </p>

        {/* Full Description (expandable) */}
        {project.description && (
          <div className="mt-3">
            <button
              onClick={() => setShowFullDesc(!showFullDesc)}
              className="text-xs font-medium text-accent-400 hover:text-accent-300 transition-colors"
            >
              {showFullDesc ? "Show less ↑" : "Read more ↓"}
            </button>
            {showFullDesc && (
              <div className="mt-2 space-y-3 border-l-2 border-accent-500/30 pl-3 animate-fadeIn">
                <p className="text-xs leading-relaxed text-surface-400">
                  {project.description}
                </p>
                
                {/* Use Cases - Inside expanded section */}
                {project.use_cases && (
                  <div>
                    <p className="text-xs font-semibold text-accent-400 mb-2">✨ Key Features:</p>
                    <div className="space-y-1.5">
                      {project.use_cases.split(",").map((useCase, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-surface-300">
                          <span className="text-accent-400 mt-0.5">▸</span>
                          <span>{useCase.trim()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tech Stack */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech_stack?.split(",").map((tech, i) => (
            <span
              key={i}
              className="rounded-md border border-glow-violet/20 bg-glow-violet/10 px-2 py-1 text-xs font-medium text-glow-violet transition-all duration-300 hover:border-glow-violet/40 hover:bg-glow-violet/20 hover:scale-105"
              style={{
                animation: isHovered ? `techPulse 0.6s ease-out ${i * 0.1}s` : 'none'
              }}
            >
              {tech.trim()}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
