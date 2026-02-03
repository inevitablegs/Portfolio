import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const loadProjects = () => {
    api.get("/admin/projects/")
      .then(res => setProjects(res.data))
      .catch(() => {
        localStorage.clear();
        navigate("/admin/login");
      });
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const deleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    await api.delete(`/admin/projects/${id}/`);
    loadProjects();
  };

  return (
    <div className="min-h-screen bg-surface-950">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 opacity-100 [background-image:linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-accent-500/10 blur-[120px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-surface-800/50 bg-surface-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="flex items-center gap-2 text-sm text-surface-400 transition hover:text-accent-400"
          >
            ← Back to Dashboard
          </button>
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            className="rounded-lg border border-surface-700 bg-surface-800/50 px-4 py-2 text-xs font-semibold text-surface-300 transition hover:border-accent-500/50 hover:text-accent-400"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-surface-100">
            Manage Projects
          </h1>
          <Link
            to="/admin/projects/new"
            className="rounded-lg bg-gradient-to-r from-accent-500 to-accent-600 px-5 py-2.5 text-sm font-semibold text-surface-950 shadow-lg transition hover:shadow-accent-500/50"
          >
            + New Project
          </Link>
        </div>

        {projects.length === 0 && (
          <div className="rounded-xl border border-surface-800/50 bg-surface-900/50 p-12 text-center backdrop-blur-xl">
            <p className="text-surface-400">No projects yet. Create your first project!</p>
          </div>
        )}

        <div className="space-y-4">
          {projects.map(project => (
            <div
              key={project.id}
              className="rounded-xl border border-surface-800/50 bg-surface-900/50 overflow-hidden backdrop-blur-xl transition hover:border-accent-500/30"
            >
              <div className="flex items-start gap-4">
                {/* Project Image Thumbnail */}
                {project.image && (
                  <div className="w-32 h-32 flex-shrink-0 bg-surface-800">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-surface-100">{project.title}</h3>
                      <p className="mt-2 text-sm text-surface-400">
                        {project.short_description}
                      </p>
                      {project.use_cases && (
                        <p className="mt-2 text-xs text-surface-500">
                          Features: {project.use_cases.split(',').slice(0, 2).join(', ')}...
                        </p>
                      )}
                      {project.tech_stack && (
                        <p className="mt-2 text-xs text-surface-500">
                          Tech: {project.tech_stack}
                        </p>
                      )}
                      <div className="mt-2 flex items-center gap-2">
                        {project.featured && (
                          <span className="inline-block rounded-lg border border-accent-500/30 bg-accent-500/10 px-2 py-1 text-xs text-accent-400">
                            ⭐ Featured
                          </span>
                        )}
                        {project.github_url && (
                          <span className="text-xs text-surface-500">💻 GitHub</span>
                        )}
                        {project.live_url && (
                          <span className="text-xs text-surface-500">🚀 Live</span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Link
                        to={`/admin/projects/${project.id}`}
                        className="rounded-lg border border-surface-700 bg-surface-800/50 px-4 py-2 text-sm font-semibold text-surface-300 transition hover:border-accent-500/50 hover:text-accent-400"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition hover:border-red-500/50 hover:bg-red-500/20"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
