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
    <section className="max-w-5xl mx-auto px-8 mt-16">
      <h2 className="text-2xl font-semibold">Projects</h2>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <div className="bg-white border rounded-lg p-5">
      <h3 className="font-semibold">{project.title}</h3>

      <p className="mt-2 text-sm text-gray-600">
        {project.short_description}
      </p>

      <p className="mt-2 text-xs text-gray-500">
        {project.tech_stack}
      </p>

      <div className="flex gap-4 mt-4 text-sm">
        {project.github_url && (
          <a
            href={project.github_url}
            className="underline"
            target="_blank"
          >
            GitHub
          </a>
        )}

        {project.live_url && (
          <a
            href={project.live_url}
            className="underline"
            target="_blank"
          >
            Live
          </a>
        )}
      </div>
    </div>
  );
}
