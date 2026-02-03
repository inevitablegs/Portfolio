import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Resume() {
  const [assets, setAssets] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/profile-assets/")
      .then(res => {
        setAssets(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-950 flex items-center justify-center">
        <div className="flex items-center gap-3 text-surface-400">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-surface-700 border-t-accent-400" />
          Loading resume...
        </div>
      </div>
    );
  }

  if (!assets?.resume) {
    return (
      <div className="min-h-screen bg-surface-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-surface-400 mb-4">Resume not available</p>
          <Link to="/" className="text-accent-400 hover:text-accent-300">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-950 text-surface-100">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 opacity-100 [background-image:linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-accent-500/10 blur-[120px]" />
        <div className="absolute -right-40 top-1/2 h-80 w-80 rounded-full bg-glow-violet/10 blur-[100px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-surface-800/50 bg-surface-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2 text-sm text-surface-400 transition hover:text-accent-400">
            ← Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <a
              href={`${BASE_URL}${assets.resume}`}
              download
              className="rounded-lg border border-accent-500/30 bg-accent-500/10 px-4 py-2 text-xs font-semibold text-accent-400 transition-all hover:border-accent-500/50 hover:bg-accent-500/20"
            >
              📥 Download PDF
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="rounded-2xl border border-surface-800/50 bg-surface-900/50 p-8 backdrop-blur-xl shadow-glow-sm">
          {/* PDF Viewer using Google Docs Viewer as fallback */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-surface-100 mb-2">Resume</h2>
              <p className="text-sm text-surface-400">View or download the PDF below</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`${BASE_URL}${assets.resume}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-accent-500 to-accent-600 px-6 py-3 font-semibold text-surface-950 shadow-lg transition hover:shadow-accent-500/50 hover:scale-105"
              >
                <span>🔗</span>
                Open PDF in New Tab
              </a>
              <a
                href={`${BASE_URL}${assets.resume}`}
                download
                className="flex items-center gap-2 rounded-lg border border-surface-700 bg-surface-800/50 px-6 py-3 font-semibold text-surface-300 transition hover:border-accent-500/50 hover:text-accent-400 hover:scale-105"
              >
                <span>📥</span>
                Download PDF
              </a>
            </div>

            {/* Embedded viewer */}
            <div className="rounded-lg border border-surface-700/50 overflow-hidden">
              <embed
                src={`${BASE_URL}${assets.resume}#toolbar=1&navpanes=0&scrollbar=1`}
                type="application/pdf"
                className="w-full"
                style={{ height: "calc(100vh - 350px)", minHeight: "700px" }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
