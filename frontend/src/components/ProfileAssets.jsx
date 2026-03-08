import { useEffect, useState } from "react";
import api from "../api/axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ProfileAssets() {
  const [assets, setAssets] = useState(null);

  useEffect(() => {
    api
      .get("/profile-assets/")
      .then((res) => setAssets(res.data))
      .catch(() => {});
  }, []);

  if (!assets) return null;

  return (
    <div className="flex flex-wrap items-center gap-6">
      {assets.profile_photo && (
        <div className="relative">
          <img
            src={assets.profile_photo}
            alt="Profile"
            className="h-24 w-24 rounded-2xl border-2 border-accent-500/30 object-cover shadow-glow-sm"
          />
          {/* Glow effect */}
          <div className="absolute inset-0 -z-10 rounded-2xl bg-accent-500/20 blur-xl" />
        </div>
      )}

      {assets.resume && (
        <a
          href={assets.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          <span>📄</span>
          Download Resume
        </a>
      )}
    </div>
  );
}
