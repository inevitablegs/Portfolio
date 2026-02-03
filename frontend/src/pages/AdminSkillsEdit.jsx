import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AdminSkillsEdit() {
  const [skills, setSkills] = useState(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/admin/skills/")
      .then(res => setSkills(res.data))
      .catch(() => navigate("/admin/login"));
  }, []);

  const handleChange = (e) => {
    setSkills({ ...skills, [e.target.name]: e.target.value });
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.patch("/admin/skills/", skills);
      alert("Skills updated");
    } catch (error) {
      alert("Failed to update skills");
    } finally {
      setSaving(false);
    }
  };

  if (!skills) return (
    <div className="min-h-screen bg-surface-950 flex items-center justify-center">
      <p className="text-surface-400">Loading…</p>
    </div>
  );

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
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-surface-100">
          Edit Skills & Tech Stack
        </h1>

        <form onSubmit={save} className="rounded-2xl border border-surface-800/50 bg-surface-900/50 p-8 backdrop-blur-xl">
          <div className="space-y-6">
            <Textarea label="Languages" name="languages" value={skills.languages} onChange={handleChange} />
            <Textarea label="Frameworks" name="frameworks" value={skills.frameworks} onChange={handleChange} />
            <Textarea label="Databases" name="databases" value={skills.databases} onChange={handleChange} />
            <Textarea label="Tools" name="tools" value={skills.tools} onChange={handleChange} />
          </div>

          <div className="mt-8 flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-gradient-to-r from-accent-500 to-accent-600 px-6 py-2.5 text-sm font-semibold text-surface-950 shadow-lg transition hover:shadow-accent-500/50 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/dashboard")}
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

function Textarea({ label, ...props }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-surface-300">{label}</label>
      <textarea {...props} rows="3" className="w-full rounded-lg border border-surface-700 bg-surface-800/50 px-4 py-3 text-surface-100 placeholder-surface-500 transition focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20" />
    </div>
  );
}
