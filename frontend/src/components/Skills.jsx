import { useEffect, useState } from "react";
import { fetchWithCache, getCachedData } from "../api/cache";

export default function Skills() {
  const [categories, setCategories] = useState(() => getCachedData("/skills-categories/") || []);
  const [loading, setLoading] = useState(!categories.length);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchWithCache("/skills-categories/", setCategories)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const getCategoryIcon = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes("language")) return "💻";
    if (lower.includes("framework") || lower.includes("library") || lower.includes("libraries")) return "⚡";
    if (lower.includes("database") || lower.includes("sql") || lower.includes("storage")) return "🗄️";
    if (lower.includes("tool") || lower.includes("platform") || lower.includes("devops") || lower.includes("cloud")) return "🛠️";
    if (lower.includes("design") || lower.includes("ui") || lower.includes("ux")) return "🎨";
    return "📦";
  };

  if (loading) {
    return (
      <div className="card">
        <p className="section-title">Technical Expertise</p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-surface-100">
          Skills & Tech Stack
        </h2>
        <div className="mt-8">
          <p className="text-surface-400">Loading skills...</p>
        </div>
      </div>
    );
  }

  const visibleCategories = showAll ? categories : categories.slice(0, 3);

  return (
    <div className="card">
      <p className="section-title">Technical Expertise</p>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-surface-100">
        Skills & Tech Stack
      </h2>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-items-stretch">
        {visibleCategories.map((category) => (
          <CategoryGroup
            key={category.id || 'uncategorized'}
            category={category}
            getCategoryIcon={getCategoryIcon}
          />
        ))}
      </div>

      {categories.length > 3 && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2.5 rounded-lg border border-surface-700 bg-surface-800/50 text-sm font-semibold text-surface-300 transition hover:border-accent-500/50 hover:text-accent-400"
          >
            {showAll ? "See Less" : "See More"}
          </button>
        </div>
      )}

      {categories.length === 0 && (
        <div className="mt-8 text-center">
          <p className="text-surface-400">No skills added yet.</p>
        </div>
      )}
    </div>
  );
}

function CategoryGroup({ category, getCategoryIcon }) {
  const [showAllSkills, setShowAllSkills] = useState(false);
  const skills = category.skills || [];
  const visibleSkills = showAllSkills ? skills : skills.slice(0, 4);

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex items-center gap-3">
        <span className="text-2xl">{getCategoryIcon(category.name)}</span>
        <h3 className="text-base font-semibold text-surface-100">
          {category.name}
        </h3>
      </div>
      <div className="space-y-2 flex-1">
        {visibleSkills.map((skill) => (
          <SkillRow key={skill.id} skill={skill} />
        ))}
      </div>
      {skills.length > 4 && (
        <button
          onClick={() => setShowAllSkills(!showAllSkills)}
          className="mt-3 inline-flex items-center gap-1.5 self-start text-xs font-semibold text-accent-400 hover:text-accent-300 transition-colors bg-surface-800/30 hover:bg-surface-800/70 border border-surface-700/50 hover:border-accent-500/30 px-3 py-1.5 rounded-lg shadow-sm"
        >
          {showAllSkills ? "See Less" : `See More (+${skills.length - 4})`}
        </button>
      )}
    </div>
  );
}

function SkillRow({ skill }) {
  const [isHovered, setIsHovered] = useState(false);
  const [animatedWidth, setAnimatedWidth] = useState(0);
  const [displayedPercentage, setDisplayedPercentage] = useState(0);

  const getProficiencyColor = (proficiency) => {
    if (proficiency >= 80) return "from-emerald-500 to-emerald-600";
    if (proficiency >= 60) return "from-accent-500 to-accent-600";
    if (proficiency >= 40) return "from-blue-500 to-blue-600";
    return "from-surface-500 to-surface-600";
  };

  useEffect(() => {
    if (isHovered) {
      // Animate the bar filling
      const timer = setTimeout(() => {
        setAnimatedWidth(skill.proficiency);
      }, 50);

      // Animate the percentage counting up
      const duration = 1000; // 1 second
      const steps = 50;
      const increment = skill.proficiency / steps;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const counter = setInterval(() => {
        currentStep++;
        if (currentStep >= steps) {
          setDisplayedPercentage(skill.proficiency);
          clearInterval(counter);
        } else {
          setDisplayedPercentage(Math.round(increment * currentStep));
        }
      }, stepDuration);

      return () => {
        clearTimeout(timer);
        clearInterval(counter);
      };
    } else {
      setAnimatedWidth(0);
      setDisplayedPercentage(0);
    }
  }, [isHovered, skill.proficiency]);

  return (
    <div 
      className="group rounded-lg border border-surface-700/50 bg-surface-800/50 p-3 transition-all duration-300 hover:border-accent-500/30 hover:shadow-glow-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <p className="text-sm font-semibold text-surface-100">{skill.name}</p>
        <span className={`text-xs font-bold text-accent-400 tabular-nums transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          {displayedPercentage}%
        </span>
      </div>
      
      {/* Proficiency Bar - Hidden by default, animated on hover */}
      <div className={`h-1.5 w-full rounded-full bg-surface-700/50 overflow-hidden transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <div
          className={`h-full rounded-full bg-gradient-to-r ${getProficiencyColor(
            skill.proficiency
          )} transition-all duration-1000 ease-out`}
          style={{ width: `${animatedWidth}%` }}
        />
      </div>
    </div>
  );
}
