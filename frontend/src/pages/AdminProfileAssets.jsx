// frontend/src/pages/AdminProfileAssets.jsx
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";

export default function AdminProfileAssets() {
  const [assets, setAssets] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const navigate = useNavigate();

  const load = async () => {
    try {
      const res = await api.get("/admin/profile-assets/");
      setAssets(res.data);
      if (res.data.profile_photo) {
        setPreviewPhoto(res.data.profile_photo);
      }
    } catch (error) {
      navigate("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhotoFile(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const formData = new FormData();
    
    if (profilePhotoFile) {
      formData.append("profile_photo", profilePhotoFile);
    }
    
    if (resumeFile) {
      formData.append("resume", resumeFile);
    }

    try {
      const response = await api.patch("/admin/profile-assets/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setAssets(response.data);
      setProfilePhotoFile(null);
      setResumeFile(null);
      alert("Assets updated successfully!");
      load(); // Reload to get fresh URLs
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to update assets");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Profile Assets">
        <div className="flex items-center justify-center p-12">
          <div className="text-surface-400">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Profile Assets">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Profile Photo Section */}
        <div className="rounded-xl border border-surface-800/50 bg-surface-900/50 p-6 backdrop-blur-xl">
          <h3 className="text-lg font-semibold text-surface-100 mb-4">
            Profile Photo
          </h3>
          
          {/* Preview */}
          {previewPhoto && (
            <div className="mb-4 flex justify-center">
              <div className="relative">
                <img
                  src={previewPhoto}
                  alt="Profile Preview"
                  className="h-32 w-32 rounded-2xl border-2 border-accent-500/30 object-cover"
                />
              </div>
            </div>
          )}

          {/* Upload */}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePhotoChange}
              className="w-full rounded-lg border border-surface-700 bg-surface-800/50 px-3 py-2 text-sm text-surface-100 file:mr-3 file:rounded-md file:border-0 file:bg-accent-500 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-surface-950 hover:file:bg-accent-400"
            />
            <p className="mt-1 text-xs text-surface-500">
              Recommended: Square image, at least 300x300px
            </p>
          </div>
        </div>

        {/* Resume Section */}
        <div className="rounded-xl border border-surface-800/50 bg-surface-900/50 p-6 backdrop-blur-xl">
          <h3 className="text-lg font-semibold text-surface-100 mb-4">
            Resume / CV
          </h3>
          
          {/* Current Resume Link */}
          {assets?.resume && (
            <div className="mb-4 p-3 bg-surface-800/30 rounded-lg">
              <p className="text-sm text-surface-400 mb-2">Current Resume:</p>
              <a
                href={assets.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent-400 hover:text-accent-300"
              >
                <span>📄</span>
                View Current Resume
              </a>
            </div>
          )}

          {/* Upload New Resume */}
          <div>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeChange}
              className="w-full rounded-lg border border-surface-700 bg-surface-800/50 px-3 py-2 text-sm text-surface-100 file:mr-3 file:rounded-md file:border-0 file:bg-accent-500 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-surface-950 hover:file:bg-accent-400"
            />
            <p className="mt-1 text-xs text-surface-500">
              Accepted formats: PDF, DOC, DOCX
            </p>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving || (!profilePhotoFile && !resumeFile)}
            className={`rounded-lg bg-gradient-to-r from-accent-500 to-accent-600 px-6 py-3 text-sm font-semibold text-surface-950 shadow-lg transition hover:shadow-accent-500/50 ${
              saving || (!profilePhotoFile && !resumeFile)
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}