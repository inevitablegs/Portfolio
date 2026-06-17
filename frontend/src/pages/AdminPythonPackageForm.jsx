import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

export default function AdminPythonPackageForm() {
  const { id } = useParams(); // undefined for new
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const [pkg, setPkg] = useState({
    title: "",
    description: "",
    installation_command: "",
    pypi_url: "",
    github_url: "",
    documentation_url: "",
    tech_stack: "",
    order: 0,
  });

  useEffect(() => {
    if (id) {
      api.get("/admin/python-packages/")
        .then(res => {
          const found = res.data.find(p => p.id === Number(id));
          if (found) {
            setPkg(found);
          }
        })
        .catch(() => navigate("/admin/login"));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPkg({
      ...pkg,
      [name]: value,
    });
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (id) {
        await api.patch(`/admin/python-packages/${id}/`, pkg);
      } else {
        await api.post("/admin/python-packages/", pkg);
      }
      navigate("/admin/python-packages");
    } catch (error) {
      alert("Failed to save Python package");
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
            onClick={() => navigate("/admin/python-packages")}
            className="flex items-center gap-2 text-sm text-surface-400 transition hover:text-accent-400"
          >
            ← Back to Python Packages
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
          {id ? "Edit Python Package" : "New Python Package"}
        </h1>

        <form onSubmit={save} className="rounded-2xl border border-surface-800/50 bg-surface-900/50 p-8 backdrop-blur-xl">
          <div className="space-y-6">
            <Input label="Title/Name" name="title" value={pkg.title} onChange={handleChange} placeholder="e.g., django-fast-api" required />
            <Textarea label="Description" name="description" value={pkg.description} onChange={handleChange} placeholder="What does this package do?" required />
            <Input label="Installation Command" name="installation_command" value={pkg.installation_command} onChange={handleChange} placeholder="e.g., pip install my-package" />
            <Input label="Tech Stack / Dependencies" name="tech_stack" value={pkg.tech_stack} onChange={handleChange} placeholder="e.g., python, requests, cryptography" />

            <div className="grid gap-6 md:grid-cols-3">
              <Input label="PyPI URL" name="pypi_url" value={pkg.pypi_url} onChange={handleChange} placeholder="https://pypi.org/project/..." />
              <Input label="GitHub URL" name="github_url" value={pkg.github_url} onChange={handleChange} placeholder="https://github.com/..." />
              <Input label="Documentation URL" name="documentation_url" value={pkg.documentation_url} onChange={handleChange} placeholder="https://..." />
            </div>

            <Input
              label="Display Order"
              type="number"
              name="order"
              value={pkg.order}
              onChange={handleChange}
              placeholder="0"
            />
          </div>

          <div className="mt-8 flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-gradient-to-r from-accent-500 to-accent-600 px-6 py-2.5 text-sm font-semibold text-surface-950 shadow-lg transition hover:shadow-accent-500/50 disabled:opacity-50"
            >
              {saving ? "Saving..." : id ? "Update Package" : "Create Package"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/python-packages")}
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
