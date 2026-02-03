import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AdminProfileAssets() {
  const [resume, setResume] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const save = async () => {
    if (!resume && !photo) {
      alert("Please select at least one file to upload");
      return;
    }

    setUploading(true);
    const form = new FormData();
    if (resume) form.append("resume", resume);
    if (photo) form.append("profile_photo", photo);

    try {
      await api.patch("/admin/profile-assets/", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Updated successfully");
      setResume(null);
      setPhoto(null);
    } catch (error) {
      alert("Failed to upload files");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    api.get("/admin/profile-assets/")
      .catch(() => navigate("/admin/login"));
  }, []);

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
          Resume & Profile Photo
        </h1>

        <div className="rounded-2xl border border-surface-800/50 bg-surface-900/50 p-8 backdrop-blur-xl">
          <div className="space-y-6">
            {/* Resume Upload */}
            <div>
              <label className="mb-3 block text-sm font-medium text-surface-300">
                Resume (PDF)
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={e => setResume(e.target.files[0])}
                  className="block w-full rounded-lg border border-surface-700 bg-surface-800/50 px-4 py-3 text-sm text-surface-100 file:mr-4 file:rounded-lg file:border-0 file:bg-accent-500/20 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-accent-400 hover:file:bg-accent-500/30"
                />
              </div>
              {resume && (
                <p className="mt-2 text-sm text-accent-400">
                  Selected: {resume.name}
                </p>
              )}
            </div>

            {/* Profile Photo Upload */}
            <div>
              <label className="mb-3 block text-sm font-medium text-surface-300">
                Profile Photo
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => setPhoto(e.target.files[0])}
                  className="block w-full rounded-lg border border-surface-700 bg-surface-800/50 px-4 py-3 text-sm text-surface-100 file:mr-4 file:rounded-lg file:border-0 file:bg-accent-500/20 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-accent-400 hover:file:bg-accent-500/30"
                />
              </div>
              {photo && (
                <p className="mt-2 text-sm text-accent-400">
                  Selected: {photo.name}
                </p>
              )}
            </div>

            {/* Upload Info */}
            <div className="rounded-lg border border-surface-700/50 bg-surface-800/30 p-4">
              <p className="text-sm text-surface-400">
                <strong className="text-surface-300">Note:</strong> Upload a PDF resume and a profile photo (JPG, PNG). 
                The files will replace any existing files.
              </p>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={save}
              disabled={uploading}
              className="rounded-lg bg-gradient-to-r from-accent-500 to-accent-600 px-6 py-2.5 text-sm font-semibold text-surface-950 shadow-lg transition hover:shadow-accent-500/50 disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Upload Files"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/dashboard")}
              className="rounded-lg border border-surface-700 bg-surface-800/50 px-6 py-2.5 text-sm font-semibold text-surface-300 transition hover:border-accent-500/50 hover:text-accent-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
