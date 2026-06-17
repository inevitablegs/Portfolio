import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function AdminPythonPackages() {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  const loadPackages = () => {
    api.get("/admin/python-packages/")
      .then(res => setPackages(res.data))
      .catch(() => {
        localStorage.clear();
        navigate("/admin/login");
      });
  };

  useEffect(() => {
    loadPackages();
  }, []);

  const deletePackage = async (id) => {
    if (!window.confirm("Delete this Python package?")) return;

    try {
      await api.delete(`/admin/python-packages/${id}/`);
      loadPackages();
    } catch (err) {
      console.error(err);
      alert("Failed to delete package");
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
            Manage Python Packages
          </h1>
          <Link
            to="/admin/python-packages/new"
            className="rounded-lg bg-gradient-to-r from-accent-500 to-accent-600 px-5 py-2.5 text-sm font-semibold text-surface-950 shadow-lg transition hover:shadow-accent-500/50"
          >
            + New Python Package
          </Link>
        </div>

        {packages.length === 0 && (
          <div className="rounded-xl border border-surface-800/50 bg-surface-900/50 p-12 text-center backdrop-blur-xl">
            <p className="text-surface-400">No Python packages yet. Add your first Python package!</p>
          </div>
        )}

        <div className="space-y-4">
          {packages.map(pkg => (
            <div
              key={pkg.id}
              className="rounded-xl border border-surface-800/50 bg-surface-900/50 overflow-hidden backdrop-blur-xl transition hover:border-accent-500/30"
            >
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📦</span>
                      <h3 className="text-xl font-semibold text-surface-100">{pkg.title}</h3>
                    </div>
                    <p className="mt-2 text-sm text-surface-400">
                      {pkg.description}
                    </p>
                    {pkg.installation_command && (
                      <div className="mt-3 flex items-center gap-2 rounded-lg bg-surface-950 border border-surface-800 p-2 max-w-max">
                        <code className="text-xs font-mono text-accent-400">{pkg.installation_command}</code>
                      </div>
                    )}
                    {pkg.tech_stack && (
                      <p className="mt-3 text-xs text-surface-500">
                        Tech Stack: {pkg.tech_stack}
                      </p>
                    )}
                    <div className="mt-3 flex items-center gap-3">
                      {pkg.pypi_url && (
                        <a href={pkg.pypi_url} target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:underline">PyPI Page</a>
                      )}
                      {pkg.github_url && (
                        <a href={pkg.github_url} target="_blank" rel="noreferrer" className="text-xs text-purple-400 hover:underline">GitHub</a>
                      )}
                      {pkg.documentation_url && (
                        <a href={pkg.documentation_url} target="_blank" rel="noreferrer" className="text-xs text-accent-400 hover:underline">Docs</a>
                      )}
                      <span className="text-xs text-surface-600">Order: {pkg.order}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link
                      to={`/admin/python-packages/${pkg.id}`}
                      className="rounded-lg border border-surface-700 bg-surface-800/50 px-4 py-2 text-sm font-semibold text-surface-300 transition hover:border-accent-500/50 hover:text-accent-400"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deletePackage(pkg.id)}
                      className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition hover:border-red-500/50 hover:bg-red-500/20"
                    >
                      Delete
                    </button>
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
