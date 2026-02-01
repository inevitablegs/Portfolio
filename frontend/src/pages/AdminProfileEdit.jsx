import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AdminProfileEdit() {
  const [profile, setProfile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch profile on load
  useEffect(() => {
    api.get("/admin/profile/")
      .then(res => setProfile(res.data))
      .catch(() => {
        localStorage.clear();
        navigate("/admin/login");
      });
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      await api.patch("/admin/profile/", profile);
      alert("Profile updated successfully");
    } catch {
      setError("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  if (!profile) return <p className="p-8">Loading profile…</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl bg-white border rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>

        {error && (
          <p className="text-red-600 text-sm mb-3">{error}</p>
        )}

        <form onSubmit={saveProfile} className="space-y-4">

          <Input label="Name" name="name" value={profile.name} onChange={handleChange} />
          <Input label="Title" name="title" value={profile.title} onChange={handleChange} />
          <Input label="Location" name="location" value={profile.location} onChange={handleChange} />
          <Input label="Email" name="email" value={profile.email} onChange={handleChange} />
          <Input label="Phone" name="phone" value={profile.phone} onChange={handleChange} />
          <Input label="Open To" name="open_to" value={profile.open_to} onChange={handleChange} />

          <Textarea
            label="Skills (comma separated)"
            name="skills"
            value={profile.skills}
            onChange={handleChange}
          />

          <Input label="GitHub URL" name="github" value={profile.github || ""} onChange={handleChange} />
          <Input label="LinkedIn URL" name="linkedin" value={profile.linkedin || ""} onChange={handleChange} />
          <Input label="Resume URL" name="resume" value={profile.resume || ""} onChange={handleChange} />

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-black text-white px-5 py-2 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
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

/* ---------- Reusable Inputs ---------- */

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
        rows="3"
        className="w-full border px-3 py-2 rounded"
      />
    </div>
  );
}
