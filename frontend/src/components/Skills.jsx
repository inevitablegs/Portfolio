import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/skills-new/")
      .then(res => {
        setSkills(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Group skills by type
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.skill_type]) acc[skill.skill_type] = [];
    acc[skill.skill_type].push(skill);
    return acc;
  }, {});

  const typeIcons = {
    language: "💻",
    framework: "⚡",
    database: "🗄️",
    tool: "🛠️",
    other: "📦",
  };

  const typeLabels = {
    language: "Programming Languages",
    framework: "Frameworks & Libraries",
    database: "Databases",
    tool: "Tools & Platforms",
    other: "Other Skills",
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

  return (
    <div className="card">
      <p className="section-title">Technical Expertise</p>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-surface-100">
        Skills & Tech Stack
      </h2>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-items-stretch">
        {Object.entries(groupedSkills).map(([type, typeSkills]) => (
          <div key={type} className="flex flex-col">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-2xl">{typeIcons[type] || "📦"}</span>
              <h3 className="text-base font-semibold text-surface-100">
                {typeLabels[type] || "Other Skills"}
              </h3>
            </div>
            <div className="space-y-2 flex-1">
              {typeSkills.map((skill) => (
                <SkillRow key={skill.id} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {skills.length === 0 && (
        <div className="mt-8 text-center">
          <p className="text-surface-400">No skills added yet.</p>
        </div>
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
