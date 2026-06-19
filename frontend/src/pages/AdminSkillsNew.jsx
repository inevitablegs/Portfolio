import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AdminSkillsNew() {
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Skill form states
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [skillFormData, setSkillFormData] = useState({
    name: "",
    category: "",
    proficiency: 50,
    order: 0,
  });

  // Category form states
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryFormData, setCategoryFormData] = useState({
    name: "",
    order: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const [skillsRes, categoriesRes] = await Promise.all([
        api.get("/admin/skills-new/"),
        api.get("/admin/skills-categories/")
      ]);
      setSkills(skillsRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate("/admin/login");
      }
    } finally {
      setLoading(false);
    }
  };

  // Skill handlers
  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...skillFormData,
        category: skillFormData.category ? parseInt(skillFormData.category) : null,
      };
      if (editingSkill) {
        await api.patch(`/admin/skills-new/${editingSkill.id}/`, payload);
      } else {
        await api.post("/admin/skills-new/", payload);
      }
      fetchSkills();
      resetSkillForm();
    } catch (error) {
      alert("Failed to save skill");
    }
  };

  const handleSkillEdit = (skill) => {
    setEditingSkill(skill);
    setSkillFormData({
      name: skill.name,
      category: skill.category ? String(skill.category) : "",
      proficiency: skill.proficiency,
      order: skill.order,
    });
    setShowSkillForm(true);
  };

  const handleSkillDelete = async (id) => {
    if (!confirm("Delete this skill?")) return;
    try {
      await api.delete(`/admin/skills-new/${id}/`);
      fetchSkills();
    } catch (error) {
      alert("Failed to delete skill");
    }
  };

  const resetSkillForm = () => {
    setSkillFormData({
      name: "",
      category: categories[0]?.id ? String(categories[0].id) : "",
      proficiency: 50,
      order: 0,
    });
    setEditingSkill(null);
    setShowSkillForm(false);
  };

  // Category handlers
  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await api.patch(`/admin/skills-categories/${editingCategory.id}/`, categoryFormData);
      } else {
        await api.post("/admin/skills-categories/", categoryFormData);
      }
      fetchSkills();
      resetCategoryForm();
    } catch (error) {
      alert("Failed to save category");
    }
  };

  const handleCategoryEdit = (category) => {
    setEditingCategory(category);
    setCategoryFormData({
      name: category.name,
      order: category.order,
    });
    setShowCategoryForm(true);
  };

  const handleCategoryDelete = async (id) => {
    if (!confirm("Deleting this category will set its skills to Uncategorized. Continue?")) return;
    try {
      await api.delete(`/admin/skills-categories/${id}/`);
      fetchSkills();
    } catch (error) {
      alert("Failed to delete category");
    }
  };

  const resetCategoryForm = () => {
    setCategoryFormData({
      name: "",
      order: 0,
    });
    setEditingCategory(null);
    setShowCategoryForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-950 flex items-center justify-center">
        <p className="text-surface-400">Loading…</p>
      </div>
    );
  }

  // Group skills by category name
  const groupedSkills = skills.reduce((acc, skill) => {
    const catName = skill.category_name || "Uncategorized";
    if (!acc[catName]) acc[catName] = [];
    acc[catName].push(skill);
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
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-surface-100">
              Technical Skills Management
            </h1>
            <p className="mt-1 text-sm text-surface-400">
              Manage skill categories, display ordering, and individual skills.
            </p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => {
                resetCategoryForm();
                setShowCategoryForm(!showCategoryForm);
                setShowSkillForm(false);
              }}
              className="rounded-lg border border-surface-700 bg-surface-800/50 px-4 py-2 text-sm font-semibold text-surface-300 transition hover:border-accent-500/50 hover:text-accent-400"
            >
              {showCategoryForm ? "Cancel Category" : "+ Add Category"}
            </button>
            
            <button
              onClick={() => {
                resetSkillForm();
                setShowSkillForm(!showSkillForm);
                setShowCategoryForm(false);
              }}
              className="rounded-lg bg-gradient-to-r from-accent-500 to-accent-600 px-5 py-2 text-sm font-semibold text-surface-950 shadow-lg transition hover:shadow-accent-500/50"
            >
              {showSkillForm ? "Cancel Skill" : "+ Add Skill"}
            </button>
          </div>
        </div>

        {/* Category Form */}
        {showCategoryForm && (
          <div className="mb-8 rounded-2xl border border-surface-800/50 bg-surface-900/50 p-6 backdrop-blur-xl">
            <h2 className="mb-4 text-lg font-bold text-surface-100">
              {editingCategory ? "Edit Skill Category" : "Add New Skill Category"}
            </h2>
            <form onSubmit={handleCategorySubmit} className="space-y-4 max-w-xl">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-surface-300">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    value={categoryFormData.name}
                    onChange={(e) =>
                      setCategoryFormData({ ...categoryFormData, name: e.target.value })
                    }
                    required
                    className="w-full rounded-lg border border-surface-700 bg-surface-800/50 px-4 py-2.5 text-surface-100 placeholder-surface-500 transition focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                    placeholder="e.g., Frontend Development"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-surface-300">
                    Category Order
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={categoryFormData.order}
                    onChange={(e) =>
                      setCategoryFormData({
                        ...categoryFormData,
                        order: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full rounded-lg border border-surface-700 bg-surface-800/50 px-4 py-2.5 text-surface-100 transition focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="rounded-lg bg-gradient-to-r from-accent-500 to-accent-600 px-5 py-2 text-sm font-semibold text-surface-950 shadow-lg transition hover:shadow-accent-500/50"
                >
                  {editingCategory ? "Update Category" : "Add Category"}
                </button>
                <button
                  type="button"
                  onClick={resetCategoryForm}
                  className="rounded-lg border border-surface-700 bg-surface-800/50 px-5 py-2 text-sm font-semibold text-surface-300 transition hover:border-accent-500/50 hover:text-accent-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Skill Form */}
        {showSkillForm && (
          <div className="mb-8 rounded-2xl border border-surface-800/50 bg-surface-900/50 p-6 backdrop-blur-xl">
            <h2 className="mb-4 text-lg font-bold text-surface-100">
              {editingSkill ? "Edit Skill" : "Add New Skill"}
            </h2>
            <form onSubmit={handleSkillSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-surface-300">
                    Skill Name *
                  </label>
                  <input
                    type="text"
                    value={skillFormData.name}
                    onChange={(e) =>
                      setSkillFormData({ ...skillFormData, name: e.target.value })
                    }
                    required
                    className="w-full rounded-lg border border-surface-700 bg-surface-800/50 px-4 py-2.5 text-surface-100 placeholder-surface-500 transition focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                    placeholder="e.g., React, Python"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-surface-300">
                    Category
                  </label>
                  <select
                    value={skillFormData.category}
                    onChange={(e) =>
                      setSkillFormData({ ...skillFormData, category: e.target.value })
                    }
                    className="w-full rounded-lg border border-surface-700 bg-surface-800/50 px-4 py-2.5 text-surface-100 transition focus:border-accent-500 focus:outline-none"
                  >
                    <option value="">Uncategorized / Other</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-surface-300">
                    Proficiency (0-100) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={skillFormData.proficiency}
                    onChange={(e) =>
                      setSkillFormData({
                        ...skillFormData,
                        proficiency: parseInt(e.target.value) || 0,
                      })
                    }
                    required
                    className="w-full rounded-lg border border-surface-700 bg-surface-800/50 px-4 py-2.5 text-surface-100 transition focus:border-accent-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-surface-300">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={skillFormData.order}
                    onChange={(e) =>
                      setSkillFormData({
                        ...skillFormData,
                        order: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full rounded-lg border border-surface-700 bg-surface-800/50 px-4 py-2.5 text-surface-100 transition focus:border-accent-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="rounded-lg bg-gradient-to-r from-accent-500 to-accent-600 px-5 py-2 text-sm font-semibold text-surface-950 shadow-lg transition hover:shadow-accent-500/50"
                >
                  {editingSkill ? "Update Skill" : "Add Skill"}
                </button>
                <button
                  type="button"
                  onClick={resetSkillForm}
                  className="rounded-lg border border-surface-700 bg-surface-800/50 px-5 py-2 text-sm font-semibold text-surface-300 transition hover:border-accent-500/50 hover:text-accent-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Dynamic 2-Column Section */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Skills Column */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-surface-100 mb-2">
              Skills Grouped By Categories
            </h2>

            {Object.entries(groupedSkills).map(([catName, catSkills]) => (
              <div
                key={catName}
                className="rounded-2xl border border-surface-800/50 bg-surface-900/50 p-6 backdrop-blur-xl"
              >
                <h3 className="mb-4 text-base font-bold text-accent-400 flex justify-between items-center">
                  <span>{catName}</span>
                  <span className="text-xs text-surface-500 font-normal">
                    {catSkills.length} {catSkills.length === 1 ? "skill" : "skills"}
                  </span>
                </h3>
                
                <div className="space-y-3">
                  {catSkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="flex items-center justify-between rounded-xl border border-surface-700/50 bg-surface-800/50 p-4 transition hover:border-accent-500/30"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-4">
                          <p className="font-semibold text-surface-100 text-sm">
                            {skill.name}
                          </p>
                          <span className="text-xs text-surface-400">
                            Order: {skill.order}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center gap-3">
                          <div className="h-1.5 w-32 md:w-48 rounded-full bg-surface-700 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-accent-500 to-accent-600"
                              style={{ width: `${skill.proficiency}%` }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-accent-400">
                            {skill.proficiency}%
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSkillEdit(skill)}
                          className="rounded-lg border border-surface-700 bg-surface-800/50 px-3 py-1.5 text-xs font-semibold text-surface-300 transition hover:border-accent-500/50 hover:text-accent-400"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleSkillDelete(skill.id)}
                          className="rounded-lg border border-red-700/50 bg-red-900/20 px-3 py-1.5 text-xs font-semibold text-red-400 transition hover:border-red-500/50 hover:text-red-300"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {skills.length === 0 && (
              <div className="rounded-2xl border border-surface-800/50 bg-surface-900/50 p-8 text-center">
                <p className="text-surface-400 text-sm">
                  No skills added yet. Add a skill to get started!
                </p>
              </div>
            )}
          </div>

          {/* Categories Column */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-surface-100 mb-2">
              Categories Ordering & Info
            </h2>
            
            <div className="rounded-2xl border border-surface-800/50 bg-surface-900/50 p-6 backdrop-blur-xl">
              <p className="text-xs text-surface-400 mb-4">
                Categories are shown in ascending order of their "Display Order" value.
              </p>
              
              <div className="space-y-3">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="flex items-center justify-between rounded-xl border border-surface-700/50 bg-surface-800/50 p-3 transition hover:border-accent-500/30"
                  >
                    <div>
                      <p className="font-semibold text-surface-100 text-sm">
                        {cat.name}
                      </p>
                      <span className="text-xs text-surface-400">
                        Order: {cat.order}
                      </span>
                    </div>

                    <div className="flex gap-1.5">
                      <button
                        onClick={() => handleCategoryEdit(cat)}
                        className="rounded-lg border border-surface-700 bg-surface-800/50 p-1.5 text-xs text-surface-300 transition hover:text-accent-400"
                        title="Edit Category"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleCategoryDelete(cat.id)}
                        className="rounded-lg border border-red-700/50 bg-red-900/20 p-1.5 text-xs text-red-400 transition hover:text-red-300"
                        title="Delete Category"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}

                {categories.length === 0 && (
                  <p className="text-surface-500 text-xs text-center py-4">
                    No custom categories created yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
