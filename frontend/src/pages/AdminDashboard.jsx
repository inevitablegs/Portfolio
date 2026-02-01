import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function AdminDashboard() {
  const [mode, setMode] = useState("view");
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/admin/dashboard/")
      .catch(() => {
        localStorage.clear();
        navigate("/");
      });
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white border rounded-lg p-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={logout}
            className="text-sm text-gray-500 hover:text-black"
          >
            Logout
          </button>
        </div>

        {/* Mode Switch */}
        <div className="mt-6 flex gap-2">
          <button
            onClick={() => setMode("dev")}
            className={`border px-4 py-2 ${
              mode === "dev" ? "bg-black text-white" : ""
            }`}
          >
            Developer Mode
          </button>

          <button
            onClick={() => setMode("view")}
            className={`border px-4 py-2 ${
              mode === "view" ? "bg-black text-white" : ""
            }`}
          >
            View Mode
          </button>
        </div>

        {/* Content */}
        {mode === "dev" && (
          <div className="mt-6 space-y-3 text-sm">

            <Link
              to="/admin/profile"
              className="block underline"
            >
              ✏️ Edit Profile
            </Link>

            <span className="block text-gray-400">
              🗂 Manage Projects (coming next)
            </span>

            <span className="block text-gray-400">
              📄 Update Resume (coming next)
            </span>

          </div>
        )}

        {mode === "view" && (
          <div className="mt-6 text-sm text-gray-600">
            Public content preview mode.
          </div>
        )}
      </div>
    </div>
  );
}
