import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const loadProjects = () => {
    api.get("/admin/projects/")
      .then(res => setProjects(res.data))
      .catch(() => {
        localStorage.clear();
        navigate("/admin/login");
      });
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const deleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    await api.delete(`/admin/projects/${id}/`);
    loadProjects();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl bg-white border rounded p-6">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Projects</h1>
          <Link
            to="/admin/projects/new"
            className="bg-black text-white px-4 py-2 text-sm"
          >
            + New Project
          </Link>
        </div>

        {projects.length === 0 && (
          <p className="text-sm text-gray-500">No projects yet.</p>
        )}

        <ul className="space-y-3">
          {projects.map(project => (
            <li
              key={project.id}
              className="border rounded p-4 flex justify-between items-start"
            >
              <div>
                <h3 className="font-semibold">{project.title}</h3>
                <p className="text-sm text-gray-600">
                  {project.short_description}
                </p>
              </div>

              <div className="flex gap-3 text-sm">
                <Link
                  to={`/admin/projects/${project.id}`}
                  className="underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteProject(project.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <Link
            to="/admin/dashboard"
            className="text-sm text-gray-500 hover:text-black"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
