import { useEffect } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/admin/dashboard/").catch(() => {
      localStorage.clear();
      navigate("/");
    });
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const sections = [
    {
      title: "Hero Section",
      description: "Edit your main introduction and tagline",
      icon: "🎯",
      link: "/admin/hero",
      color: "from-accent-500/20 to-accent-600/20 border-accent-500/30"
    },
    {
      title: "Profile",
      description: "Update personal information and contact details",
      icon: "👤",
      link: "/admin/profile",
      color: "from-blue-500/20 to-blue-600/20 border-blue-500/30"
    },
    {
      title: "Projects",
      description: "Manage your portfolio projects",
      icon: "🗂",
      link: "/admin/projects",
      color: "from-purple-500/20 to-purple-600/20 border-purple-500/30"
    },
    {
      title: "Skills (Legacy)",
      description: "Edit old comma-separated skills format",
      icon: "📝",
      link: "/admin/skills",
      color: "from-gray-500/20 to-gray-600/20 border-gray-500/30"
    },
    {
      title: "Skills & Proficiency",
      description: "Manage skills with types and proficiency levels",
      icon: "🛠",
      link: "/admin/skills-new",
      color: "from-green-500/20 to-green-600/20 border-green-500/30"
    },
    {
      title: "Experience",
      description: "Manage work experience and positions",
      icon: "💼",
      link: "/admin/experience",
      color: "from-orange-500/20 to-orange-600/20 border-orange-500/30"
    },
    {
      title: "Achievements",
      description: "Add and edit your achievements",
      icon: "🏆",
      link: "/admin/achievements",
      color: "from-yellow-500/20 to-yellow-600/20 border-yellow-500/30"
    },
    {
      title: "Certifications",
      description: "Manage certificates and credentials",
      icon: "🎓",
      link: "/admin/certifications",
      color: "from-pink-500/20 to-pink-600/20 border-pink-500/30"
    },
    {
      title: "Profile Assets",
      description: "Update resume and profile photo",
      icon: "📄",
      link: "/admin/profile-assets",
      color: "from-indigo-500/20 to-indigo-600/20 border-indigo-500/30"
    }
  ];

  return (
    <div className="min-h-screen bg-surface-950 text-surface-100">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 opacity-100 [background-image:linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-accent-500/10 blur-[120px]" />
        <div className="absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-glow-violet/10 blur-[100px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-surface-800/50 bg-surface-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/admin/dashboard" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 text-sm font-bold text-surface-950">
              GS
            </span>
            <span className="text-sm font-bold tracking-tight text-surface-100">
              Admin Dashboard
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
              onClick={logout}
              className="rounded-lg border border-surface-700 bg-surface-800/50 px-4 py-2 text-xs font-semibold text-surface-300 transition hover:border-accent-500/50 hover:text-accent-400"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-surface-100">
            Welcome back! 👋
          </h1>
          <p className="mt-2 text-surface-400">
            Manage your portfolio content from here
          </p>
        </div>

        {/* Quick Stats */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          <StatCard 
            label="Total Sections" 
            value="9" 
            icon="📊"
            gradient="from-accent-500 to-accent-600"
          />
          <StatCard 
            label="Last Updated" 
            value="Today" 
            icon="📅"
            gradient="from-purple-500 to-purple-600"
          />
          <StatCard 
            label="Status" 
            value="Active" 
            icon="✅"
            gradient="from-green-500 to-green-600"
          />
        </div>

        {/* Content Sections Grid */}
        <div>
          <h2 className="mb-6 text-xl font-bold tracking-tight text-surface-100">
            Content Management
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sections.map((section) => (
              <Link
                key={section.link}
                to={section.link}
                className="group relative overflow-hidden rounded-2xl border border-surface-800/50 bg-gradient-to-br from-surface-900/50 to-surface-900/30 p-6 backdrop-blur-xl transition hover:border-accent-500/50 hover:shadow-lg hover:shadow-accent-500/10"
              >
                {/* Icon */}
                <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${section.color} text-2xl`}>
                  {section.icon}
                </div>

                {/* Content */}
                <h3 className="mb-2 text-lg font-semibold text-surface-100 transition group-hover:text-accent-400">
                  {section.title}
                </h3>
                <p className="text-sm text-surface-400">
                  {section.description}
                </p>

                {/* Arrow indicator */}
                <div className="absolute bottom-6 right-6 text-surface-600 transition group-hover:translate-x-1 group-hover:text-accent-400">
                  →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, icon, gradient }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-surface-800/50 bg-gradient-to-br from-surface-900/50 to-surface-900/30 p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-surface-400">{label}</p>
          <p className="mt-2 text-3xl font-bold text-surface-100">{value}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-xl text-white shadow-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
