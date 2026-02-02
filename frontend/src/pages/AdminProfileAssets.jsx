import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AdminProfileAssets() {
  const [resume, setResume] = useState(null);
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  const save = async () => {
    const form = new FormData();
    if (resume) form.append("resume", resume);
    if (photo) form.append("profile_photo", photo);

    await api.patch("/admin/profile-assets/", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Updated successfully");
  };

  useEffect(() => {
    api.get("/admin/profile-assets/")
      .catch(() => navigate("/admin/login"));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-xl bg-white border p-6 rounded">
        <h1 className="text-xl font-bold mb-4">
          Resume & Profile Photo
        </h1>

        <div className="space-y-4">
          <input
            type="file"
            accept="application/pdf"
            onChange={e => setResume(e.target.files[0])}
          />

          <input
            type="file"
            accept="image/*"
            onChange={e => setPhoto(e.target.files[0])}
          />

          <button
            onClick={save}
            className="bg-black text-white px-5 py-2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
