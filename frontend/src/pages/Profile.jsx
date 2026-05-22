import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [assets, setAssets] = useState(null);

  useEffect(() => {
    api.get("/profile/")
      .then(res => setProfile(res.data))
      .catch(err => console.error(err));
    
    api.get("/profile-assets/")
      .then(res => setAssets(res.data))
      .catch(() => {});
  }, []);

  if (!profile) {
    return (
      <div className="min-h-screen bg-surface-950 flex items-center justify-center">
        <div className="flex items-center gap-3 text-surface-400">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-surface-700 border-t-accent-400" />
          Loading profile...
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
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2 text-sm text-surface-400 transition hover:text-accent-400">
            ← Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <span className="rounded-lg border border-accent-500/30 bg-accent-500/10 px-3 py-1.5 text-xs font-medium text-accent-400">
              📋 Profile
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-6 py-12">
        {/* Profile Header Card */}
        <div className="rounded-2xl border border-surface-800/50 bg-gradient-to-br from-surface-900/50 to-surface-900/30 p-8 backdrop-blur-xl shadow-glow-sm">
          <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left md:gap-8">
            {/* Avatar */}
            {assets?.profile_photo ? (
              <img
                src={`${BASE_URL}${assets.profile_photo}`}
                alt={profile.name}
                className="h-24 w-24 flex-shrink-0 rounded-2xl border-2 border-accent-500/30 object-cover shadow-glow-md"
              />
            ) : (
              <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-400 to-accent-600 text-4xl font-bold text-surface-950 shadow-glow-md">
                {profile.name?.charAt(0) || "U"}
              </div>
            )}
            
            {/* Info */}
            <div className="mt-6 flex-1 md:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-surface-100">{profile.name}</h1>
              <p className="mt-2 text-lg text-accent-400 font-medium">{profile.title}</p>
              
              <div className="mt-6 flex flex-wrap gap-4">
                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-surface-700/50 bg-surface-800/50 px-4 py-2 text-sm font-medium text-surface-300 transition-all hover:border-accent-500/50 hover:text-accent-400 hover:scale-105"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    GitHub
                  </a>
                )}
                {profile.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-surface-700/50 bg-surface-800/50 px-4 py-2 text-sm font-medium text-surface-300 transition-all hover:border-accent-500/50 hover:text-accent-400 hover:scale-105"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                )}
                {profile.resume && (
                  <a
                    href={profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-accent-500 to-accent-600 px-4 py-2 text-sm font-semibold text-surface-950 transition-all hover:shadow-glow-md hover:scale-105"
                  >
                    📄 Resume
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Contact Information */}
          <div className="rounded-2xl border border-surface-800/50 bg-surface-900/50 p-6 backdrop-blur-xl">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent-400">Contact Information</h2>
            <div className="space-y-4">
              <InfoItem icon="📍" label="Location" value={profile.location} />
              <InfoItem icon="📧" label="Email" value={profile.email} link={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`} />
              <InfoItem icon="📞" label="Phone" value={profile.phone} />
            </div>
          </div>

          {/* Status */}
          <div className="rounded-2xl border border-surface-800/50 bg-surface-900/50 p-6 backdrop-blur-xl">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent-400">Current Status</h2>
            <div className="rounded-xl border border-accent-500/30 bg-accent-500/10 p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🚀</span>
                <div className="flex-1">
                  <p className="text-xs font-medium text-surface-400">Open To</p>
                  <p className="mt-1 text-lg font-semibold text-accent-400">{profile.open_to}</p>
                </div>
                <span className="h-2 w-2 animate-pulse rounded-full bg-accent-400 shadow-glow-sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        {profile.skills && (
          <div className="mt-8 rounded-2xl border border-surface-800/50 bg-surface-900/50 p-6 backdrop-blur-xl">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent-400">🛠 Technical Skills</h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.split(",").map((skill, i) => (
                <span
                  key={i}
                  className="rounded-lg border border-glow-violet/20 bg-glow-violet/10 px-3 py-1.5 text-sm font-medium text-glow-violet transition-all hover:border-glow-violet/40 hover:bg-glow-violet/20 hover:scale-105"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

/* ---------- Helper Component ---------- */

function InfoItem({ icon, label, value, link }) {
  const content = (
    <>
      <span className="text-xl">{icon}</span>
      <div className="flex-1">
        <p className="text-xs font-medium text-surface-500">{label}</p>
        <p className="mt-1 text-sm text-surface-200">{value}</p>
      </div>
    </>
  );

  if (link) {
    return (
      <a
        href={link}
        className="flex items-start gap-3 rounded-lg border border-surface-700/50 bg-surface-800/30 p-3 transition-all hover:border-accent-500/30 hover:bg-surface-800/50"
      >
        {content}
        <span className="text-accent-400">→</span>
      </a>
    );
  }

  return (
    <div className="flex items-start gap-3 rounded-lg border border-surface-700/50 bg-surface-800/30 p-3">
      {content}
    </div>
  );
}
