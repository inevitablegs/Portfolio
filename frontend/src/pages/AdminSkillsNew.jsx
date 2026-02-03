import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AdminSkillsNew() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    skill_type: "language",
    proficiency: 50,
    order: 0,
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await api.get("/admin/skills-new/");
      setSkills(res.data);
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate("/admin/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSkill) {
        await api.patch(`/admin/skills-new/${editingSkill.id}/`, formData);
      } else {
        await api.post("/admin/skills-new/", formData);
      }
      fetchSkills();
      resetForm();
    } catch (error) {
      alert("Failed to save skill");
    }
  };

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      skill_type: skill.skill_type,
      proficiency: skill.proficiency,
      order: skill.order,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this skill?")) return;
    try {
      await api.delete(`/admin/skills-new/${id}/`);
      fetchSkills();
    } catch (error) {
      alert("Failed to delete skill");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      skill_type: "language",
      proficiency: 50,
      order: 0,
    });
    setEditingSkill(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-950 flex items-center justify-center">
        <p className="text-surface-400">Loading…</p>
      </div>
    );
  }

  // Group skills by type
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.skill_type]) acc[skill.skill_type] = [];
    acc[skill.skill_type].push(skill);
    return acc;
  }, {});

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
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-surface-100">
            Manage Skills
          </h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-lg bg-gradient-to-r from-accent-500 to-accent-600 px-6 py-2.5 text-sm font-semibold text-surface-950 shadow-lg transition hover:shadow-accent-500/50"
          >
            {showForm ? "Cancel" : "+ Add Skill"}
          </button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="mb-8 rounded-2xl border border-surface-800/50 bg-surface-900/50 p-8 backdrop-blur-xl">
            <h2 className="mb-6 text-xl font-bold text-surface-100">
              {editingSkill ? "Edit Skill" : "Add New Skill"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-surface-300">
                    Skill Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="w-full rounded-lg border border-surface-700 bg-surface-800/50 px-4 py-3 text-surface-100 placeholder-surface-500 transition focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                    placeholder="e.g., Python, React, PostgreSQL"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-surface-300">
                    Skill Type *
                  </label>
                  <select
                    value={formData.skill_type}
                    onChange={(e) =>
                      setFormData({ ...formData, skill_type: e.target.value })
                    }
                    className="w-full rounded-lg border border-surface-700 bg-surface-800/50 px-4 py-3 text-surface-100 transition focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                  >
                    <option value="language">Programming Language</option>
                    <option value="framework">Framework/Library</option>
                    <option value="database">Database</option>
                    <option value="tool">Tool/Platform</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-surface-300">
                    Proficiency (0-100) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.proficiency}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        proficiency: parseInt(e.target.value),
                      })
                    }
                    required
                    className="w-full rounded-lg border border-surface-700 bg-surface-800/50 px-4 py-3 text-surface-100 placeholder-surface-500 transition focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                  />
                  <div className="mt-2">
                    <div className="h-2 w-full rounded-full bg-surface-700">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-accent-500 to-accent-600 transition-all"
                        style={{ width: `${formData.proficiency}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-surface-300">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        order: parseInt(e.target.value),
                      })
                    }
                    className="w-full rounded-lg border border-surface-700 bg-surface-800/50 px-4 py-3 text-surface-100 placeholder-surface-500 transition focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="rounded-lg bg-gradient-to-r from-accent-500 to-accent-600 px-6 py-2.5 text-sm font-semibold text-surface-950 shadow-lg transition hover:shadow-accent-500/50"
                >
                  {editingSkill ? "Update Skill" : "Add Skill"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg border border-surface-700 bg-surface-800/50 px-6 py-2.5 text-sm font-semibold text-surface-300 transition hover:border-accent-500/50 hover:text-accent-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Skills List - Grouped by Type */}
        <div className="space-y-6">
          {Object.entries(groupedSkills).map(([type, typeSkills]) => (
            <div
              key={type}
              className="rounded-2xl border border-surface-800/50 bg-surface-900/50 p-6 backdrop-blur-xl"
            >
              <h3 className="mb-4 text-lg font-bold text-surface-100 capitalize">
                {type === "language"
                  ? "Programming Languages"
                  : type === "framework"
                  ? "Frameworks/Libraries"
                  : type === "database"
                  ? "Databases"
                  : type === "tool"
                  ? "Tools/Platforms"
                  : "Other"}
              </h3>
              <div className="space-y-3">
                {typeSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center justify-between rounded-xl border border-surface-700/50 bg-surface-800/50 p-4 transition hover:border-accent-500/30"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <p className="font-semibold text-surface-100">
                          {skill.name}
                        </p>
                        <span className="text-sm text-surface-400">
                          Order: {skill.order}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-3">
                        <div className="h-2 w-48 rounded-full bg-surface-700">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-accent-500 to-accent-600"
                            style={{ width: `${skill.proficiency}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-accent-400">
                          {skill.proficiency}%
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(skill)}
                        className="rounded-lg border border-surface-700 bg-surface-800/50 px-4 py-2 text-xs font-semibold text-surface-300 transition hover:border-accent-500/50 hover:text-accent-400"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(skill.id)}
                        className="rounded-lg border border-red-700/50 bg-red-900/20 px-4 py-2 text-xs font-semibold text-red-400 transition hover:border-red-500/50 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {skills.length === 0 && (
          <div className="rounded-2xl border border-surface-800/50 bg-surface-900/50 p-12 text-center backdrop-blur-xl">
            <p className="text-surface-400">
              No skills added yet. Click "Add Skill" to get started.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
