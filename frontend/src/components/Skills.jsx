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
    <section className="max-w-5xl mx-auto px-8 mt-16">
      <h2 className="text-2xl font-semibold">Skills & Tech Stack</h2>

      <div className="grid sm:grid-cols-2 gap-6 mt-6 text-sm">
        <SkillBlock title="Languages" value={skills.languages} />
        <SkillBlock title="Frameworks" value={skills.frameworks} />
        <SkillBlock title="Databases" value={skills.databases} />
        <SkillBlock title="Tools" value={skills.tools} />
      </div>
    </section>
  );
}

function SkillBlock({ title, value }) {
  return (
    <div className="bg-white border rounded p-4">
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{value}</p>
    </div>
  );
}
