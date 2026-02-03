import { Link, useNavigate } from "react-router-dom";

export default function AdminLayout({ title, onAdd, children, showBackButton = true }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface-950">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 opacity-100 [background-image:linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-accent-500/10 blur-[120px]" />
      </div>

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 border-b border-surface-800/50 bg-surface-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/admin/dashboard" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 text-sm font-bold text-surface-950">
              GS
            </span>
            <span className="text-sm font-bold tracking-tight text-surface-100">
              Admin Panel
            </span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-sm text-surface-400 transition hover:text-accent-400"
            >
              View Site
            </Link>
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
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Page Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            {showBackButton && (
              <button
                onClick={() => navigate("/admin/dashboard")}
                className="mb-2 flex items-center gap-2 text-sm text-surface-400 transition hover:text-accent-400"
              >
                ← Back to Dashboard
              </button>
            )}
            <h1 className="text-3xl font-bold tracking-tight text-surface-100">
              {title}
            </h1>
          </div>
          
          {onAdd && (
            <button
              onClick={onAdd}
              className="rounded-lg bg-gradient-to-r from-accent-500 to-accent-600 px-5 py-2.5 text-sm font-semibold text-surface-950 shadow-lg transition hover:shadow-accent-500/50"
            >
              + Add New
            </button>
          )}
        </div>

        {/* Content Area */}
        <div className="space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
}

