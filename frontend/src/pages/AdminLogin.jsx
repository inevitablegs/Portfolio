import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/token/", {
        username,
        password,
      });

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      // test admin access
      await api.get("/admin/dashboard/");

      navigate("/admin/dashboard");
    } catch {
      localStorage.clear();
      setError("Not authorized as admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-950 text-surface-100">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 opacity-100 [background-image:linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-500/10 blur-[120px]" />
      </div>

      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-md">
          {/* Logo/Header */}
          <div className="mb-8 text-center">
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 text-lg font-bold text-surface-950">
                GS
              </span>
            </Link>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-surface-100">
              Admin Login
            </h2>
            <p className="mt-2 text-sm text-surface-400">
              Sign in to access the admin dashboard
            </p>
          </div>

          {/* Login Form */}
          <form
            onSubmit={login}
            className="rounded-2xl border border-surface-800/50 bg-surface-900/50 p-8 shadow-xl backdrop-blur-xl"
          >
            {error && (
              <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-surface-300">
                  Username
                </label>
                <input
                  className="w-full rounded-lg border border-surface-700 bg-surface-800/50 px-4 py-3 text-surface-100 placeholder-surface-500 transition focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                  placeholder="Enter username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-surface-300">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full rounded-lg border border-surface-700 bg-surface-800/50 px-4 py-3 text-surface-100 placeholder-surface-500 transition focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                  placeholder="Enter password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-8 w-full rounded-lg bg-gradient-to-r from-accent-500 to-accent-600 px-5 py-3 text-sm font-semibold text-surface-950 shadow-lg transition hover:shadow-accent-500/50 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <div className="mt-6 text-center">
              <Link
                to="/"
                className="text-sm text-surface-400 transition hover:text-accent-400"
              >
                ← Back to Home
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
