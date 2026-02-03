import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AdminProfileEdit() {
  const [profile, setProfile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch profile on load
  useEffect(() => {
    api.get("/admin/profile/")
      .then(res => setProfile(res.data))
      .catch(() => {
        localStorage.clear();
        navigate("/admin/login");
      });
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      await api.patch("/admin/profile/", profile);
      alert("Profile updated successfully");
    } catch {
      setError("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  if (!profile) return (
    <div className="min-h-screen bg-surface-950 flex items-center justify-center">
      <p className="text-surface-400">Loading profile…</p>
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
          Edit Profile
        </h1>

        <form onSubmit={saveProfile} className="rounded-2xl border border-surface-800/50 bg-surface-900/50 p-8 backdrop-blur-xl">
          {error && (
            <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Input label="Name" name="name" value={profile.name} onChange={handleChange} placeholder="Your name" />
              <Input label="Title" name="title" value={profile.title} onChange={handleChange} placeholder="e.g., Full-Stack Developer" />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Input label="Location" name="location" value={profile.location} onChange={handleChange} placeholder="City, Country" />
              <Input label="Email" name="email" type="email" value={profile.email} onChange={handleChange} placeholder="email@example.com" />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Input label="Phone" name="phone" value={profile.phone} onChange={handleChange} placeholder="+1 (555) 123-4567" />
              <Input label="Open To" name="open_to" value={profile.open_to} onChange={handleChange} placeholder="e.g., Internships" />
            </div>

            <Textarea
              label="Skills (comma separated)"
              name="skills"
              value={profile.skills}
              onChange={handleChange}
              placeholder="React, Node.js, Python, etc."
            />

            <div className="space-y-6">
              <Input label="GitHub URL" name="github" value={profile.github || ""} onChange={handleChange} placeholder="https://github.com/username" />
              <Input label="LinkedIn URL" name="linkedin" value={profile.linkedin || ""} onChange={handleChange} placeholder="https://linkedin.com/in/username" />
              <Input label="Resume URL" name="resume" value={profile.resume || ""} onChange={handleChange} placeholder="https://..." />
            </div>
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

/* ---------- Reusable Inputs ---------- */

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
        rows="3"
        className="w-full rounded-lg border border-surface-700 bg-surface-800/50 px-4 py-3 text-surface-100 placeholder-surface-500 transition focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
      />
    </div>
  );
}
