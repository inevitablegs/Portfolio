import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

export default function AdminProjectForm() {
  const { id } = useParams(); // undefined for new
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const [project, setProject] = useState({
    title: "",
    short_description: "",
    description: "",
    tech_stack: "",
    github_url: "",
    live_url: "",
    featured: false,
    order: 0,
  });

  useEffect(() => {
    if (id) {
      api.get("/admin/projects/")
        .then(res => {
          const found = res.data.find(p => p.id === Number(id));
          if (found) setProject(found);
        })
        .catch(() => navigate("/admin/login"));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProject({
      ...project,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (id) {
        await api.patch(`/admin/projects/${id}/`, project);
      } else {
        await api.post("/admin/projects/", project);
      }
      navigate("/admin/projects");
    } catch (error) {
      alert("Failed to save project");
    } finally {
      setSaving(false);
    }
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
            onClick={() => navigate("/admin/projects")}
            className="flex items-center gap-2 text-sm text-surface-400 transition hover:text-accent-400"
          >
            ← Back to Projects
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
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-surface-100">
          {id ? "Edit Project" : "New Project"}
        </h1>

        <form onSubmit={save} className="rounded-2xl border border-surface-800/50 bg-surface-900/50 p-8 backdrop-blur-xl">
          <div className="space-y-6">
            <Input label="Title" name="title" value={project.title} onChange={handleChange} placeholder="Project title" required />
            <Input label="Short Description" name="short_description" value={project.short_description} onChange={handleChange} placeholder="Brief description" />
            <Textarea label="Full Description" name="description" value={project.description} onChange={handleChange} placeholder="Detailed project description" />
            <Input label="Tech Stack" name="tech_stack" value={project.tech_stack} onChange={handleChange} placeholder="e.g., React, Node.js, MongoDB" />

            <div className="grid gap-6 md:grid-cols-2">
              <Input label="GitHub URL" name="github_url" value={project.github_url} onChange={handleChange} placeholder="https://github.com/..." />
              <Input label="Live URL" name="live_url" value={project.live_url} onChange={handleChange} placeholder="https://..." />
            </div>

            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm text-surface-300">
                <input
                  type="checkbox"
                  name="featured"
                  checked={project.featured}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-surface-700 bg-surface-800/50 text-accent-500 focus:ring-2 focus:ring-accent-500/20"
                />
                Featured Project
              </label>

              <div className="flex-1">
                <Input
                  label="Display Order"
                  type="number"
                  name="order"
                  value={project.order}
                  onChange={handleChange}
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-gradient-to-r from-accent-500 to-accent-600 px-6 py-2.5 text-sm font-semibold text-surface-950 shadow-lg transition hover:shadow-accent-500/50 disabled:opacity-50"
            >
              {saving ? "Saving..." : id ? "Update Project" : "Create Project"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/projects")}
              className="rounded-lg border border-surface-700 bg-surface-800/50 px-6 py-2.5 text-sm font-semibold text-surface-300 transition hover:border-accent-500/50 hover:text-accent-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

/* ---------- Inputs ---------- */

function Input({ label, ...props }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-surface-300">{label}</label>
      <input
        {...props}
        className="w-full rounded-lg border border-surface-700 bg-surface-800/50 px-4 py-3 text-surface-100 placeholder-surface-500 transition focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
      />
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-surface-300">{label}</label>
      <textarea
        {...props}
        rows="4"
        className="w-full rounded-lg border border-surface-700 bg-surface-800/50 px-4 py-3 text-surface-100 placeholder-surface-500 transition focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
      />
    </div>
  );
}
