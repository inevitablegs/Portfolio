import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

export default function AdminProjectForm() {
  const { id } = useParams(); // undefined for new
  const navigate = useNavigate();

  const [project, setProject] = useState({
    title: "",
    short_description: "",
    description: "",
    tech_stack: "",
    github_url: "",
    live_url: "",
    featured: false,
    order: 0,
  });

  useEffect(() => {
    if (id) {
      api.get("/admin/projects/")
        .then(res => {
          const found = res.data.find(p => p.id === Number(id));
          if (found) setProject(found);
        })
        .catch(() => navigate("/admin/login"));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProject({
      ...project,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const save = async (e) => {
    e.preventDefault();

    if (id) {
      await api.patch(`/admin/projects/${id}/`, project);
    } else {
      await api.post("/admin/projects/", project);
    }

    navigate("/admin/projects");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl bg-white border rounded p-6">

        <h1 className="text-2xl font-bold mb-4">
          {id ? "Edit Project" : "New Project"}
        </h1>

        <form onSubmit={save} className="space-y-4">

          <Input label="Title" name="title" value={project.title} onChange={handleChange} />
          <Input label="Short Description" name="short_description" value={project.short_description} onChange={handleChange} />
          <Textarea label="Full Description" name="description" value={project.description} onChange={handleChange} />
          <Input label="Tech Stack" name="tech_stack" value={project.tech_stack} onChange={handleChange} />

          <Input label="GitHub URL" name="github_url" value={project.github_url} onChange={handleChange} />
          <Input label="Live URL" name="live_url" value={project.live_url} onChange={handleChange} />

          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="featured"
                checked={project.featured}
                onChange={handleChange}
              />
              Featured
            </label>

            <Input
              label="Order"
              type="number"
              name="order"
              value={project.order}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button className="bg-black text-white px-5 py-2">
              Save
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/projects")}
              className="border px-5 py-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------- Inputs ---------- */

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        {...props}
        className="w-full border px-3 py-2 rounded"
      />
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <textarea
        {...props}
        rows="4"
        className="w-full border px-3 py-2 rounded"
      />
    </div>
  );
}
