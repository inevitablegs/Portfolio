import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AdminHeroEdit() {
  const [hero, setHero] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/admin/hero/")
      .then(res => setHero(res.data))
      .catch(() => navigate("/admin/login"));
  }, []);

  const handleChange = (e) => {
    setHero({ ...hero, [e.target.name]: e.target.value });
  };

  const save = async (e) => {
    e.preventDefault();
    await api.patch("/admin/hero/", hero);
    alert("Hero section updated");
  };

  if (!hero) return <p className="p-8">Loading…</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-xl bg-white border p-6 rounded">
        <h1 className="text-xl font-bold mb-4">Edit Hero Section</h1>

        <form onSubmit={save} className="space-y-3">
          <Input label="Name" name="name" value={hero.name} onChange={handleChange} />
          <Input label="Tagline" name="tagline" value={hero.tagline} onChange={handleChange} />
          <Textarea label="Intro" name="intro" value={hero.intro} onChange={handleChange} />
          <Input label="CTA Text" name="cta_text" value={hero.cta_text || ""} onChange={handleChange} />
          <Input label="CTA Link" name="cta_link" value={hero.cta_link || ""} onChange={handleChange} />

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

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <input {...props} className="w-full border px-3 py-2 rounded" />
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
