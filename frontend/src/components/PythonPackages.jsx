import { useEffect, useState } from "react";
import { fetchWithCache, getCachedData } from "../api/cache";

export default function PythonPackages() {
  const [packages, setPackages] = useState(() => getCachedData("/python-packages/") || []);
  const [loading, setLoading] = useState(!packages.length);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchWithCache("/python-packages/", setPackages)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const displayedPackages = showAll ? packages : packages.slice(0, 3);
  const hasMore = packages.length > 3;

  return (
    <div className="card mt-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="section-title">Open Source</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-surface-100">
            Python Packages
          </h2>
        </div>
        <span className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-400 animate-pulse">
          {packages.length} Packages
        </span>
      </div>

      {loading ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {[1, 2].map(i => (
            <div key={i} className="h-60 rounded-xl border border-surface-700/50 bg-surface-800/50 animate-pulse" />
          ))}
        </div>
      ) : packages.length === 0 ? (
        <div className="mt-8 rounded-xl border border-surface-800/50 bg-surface-900/50 p-8 text-center">
          <p className="text-surface-400">No Python packages published yet.</p>
        </div>
      ) : (
        <>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {displayedPackages.map((pkg, index) => (
              <PackageCard key={pkg.id} pkg={pkg} index={index} />
            ))}
          </div>
          
          {hasMore && !showAll && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setShowAll(true)}
                className="group flex items-center gap-2 rounded-lg border border-blue-500/30 bg-blue-500/10 px-6 py-3 text-sm font-semibold text-blue-400 transition-all duration-300 hover:border-blue-500/50 hover:bg-blue-500/20 hover:shadow-glow-sm hover:scale-105"
              >
                See More Packages
                <span className="transition-transform duration-300 group-hover:translate-y-1">↓</span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function PackageCard({ pkg, index }) {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const copyCommand = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(pkg.installation_command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="group relative rounded-xl border border-surface-700/50 bg-gradient-to-br from-surface-800/50 to-surface-900/50 overflow-hidden p-6 transition-all duration-300 hover:border-blue-500/50 hover:shadow-glow-md hover:-translate-y-1 flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
      }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-glow-violet/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Accent corner */}
      <div className="absolute right-0 top-0 h-px w-20 bg-gradient-to-l from-blue-400/50 to-transparent transition-all duration-300 group-hover:w-40" />
      <div className="absolute bottom-0 left-0 h-px w-20 bg-gradient-to-r from-glow-violet/50 to-transparent transition-all duration-300 group-hover:w-40" />
      
      <div>
        <div className="flex items-center gap-3">
          <span className="text-3xl transition-transform duration-300 group-hover:scale-110">📦</span>
          <h3 className="text-lg font-bold text-surface-100 transition-colors duration-300 group-hover:text-blue-400">
            {pkg.title}
          </h3>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-surface-400 line-clamp-3">
          {pkg.description}
        </p>

        {pkg.installation_command && (
          <div 
            onClick={copyCommand}
            className="mt-4 flex items-center justify-between gap-2 rounded-lg bg-surface-950 border border-surface-800/80 px-3 py-2 cursor-pointer transition hover:border-blue-500/30 hover:bg-surface-900 group/cmd"
          >
            <code className="text-xs font-mono text-blue-400 select-all truncate">
              {pkg.installation_command}
            </code>
            <button 
              className="text-xs font-semibold text-surface-400 hover:text-blue-400 transition flex-shrink-0"
              title="Copy installation command"
            >
              {copied ? "copied! ✅" : "📋"}
            </button>
          </div>
        )}
      </div>

      <div>
        {/* Tech Stack tags */}
        {pkg.tech_stack && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {pkg.tech_stack.split(",").map((tech, i) => (
              <span
                key={i}
                className="rounded-md border border-glow-violet/20 bg-glow-violet/10 px-2 py-0.5 text-2xs font-medium text-glow-violet transition-all duration-300 hover:border-glow-violet/40 hover:bg-glow-violet/20"
              >
                {tech.trim()}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="mt-5 pt-3 border-t border-surface-800/50 flex items-center gap-4 text-xs font-semibold">
          {pkg.pypi_url && (
            <a 
              href={pkg.pypi_url} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-1 text-surface-300 hover:text-blue-400 transition"
            >
              <span>🐍</span> PyPI
            </a>
          )}
          {pkg.github_url && (
            <a 
              href={pkg.github_url} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-1 text-surface-300 hover:text-purple-400 transition"
            >
              <span>💻</span> GitHub
            </a>
          )}
          {pkg.documentation_url && (
            <a 
              href={pkg.documentation_url} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-1 text-surface-300 hover:text-accent-400 transition"
            >
              <span>📖</span> Docs
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
