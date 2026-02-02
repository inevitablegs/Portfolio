import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AdminSkillsEdit() {
  const [skills, setSkills] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/admin/skills/")
      .then(res => setSkills(res.data))
      .catch(() => navigate("/admin/login"));
  }, []);

  const handleChange = (e) => {
    setSkills({ ...skills, [e.target.name]: e.target.value });
  };

  const save = async (e) => {
    e.preventDefault();
    await api.patch("/admin/skills/", skills);
    alert("Skills updated");
  };

  if (!skills) return <p className="p-8">Loading…</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-xl bg-white border p-6 rounded">
        <h1 className="text-xl font-bold mb-4">
          Edit Skills & Tech Stack
        </h1>

        <form onSubmit={save} className="space-y-3">
          <Textarea label="Languages" name="languages" value={skills.languages} onChange={handleChange} />
          <Textarea label="Frameworks" name="frameworks" value={skills.frameworks} onChange={handleChange} />
          <Textarea label="Databases" name="databases" value={skills.databases} onChange={handleChange} />
          <Textarea label="Tools" name="tools" value={skills.tools} onChange={handleChange} />

          <div className="flex gap-3 pt-4">
            <button className="bg-black text-white px-5 py-2">
              Save
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/dashboard")}
              className="border px-5 py-2"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <textarea {...props} rows="3" className="w-full border px-3 py-2 rounded" />
    </div>
  );
}
