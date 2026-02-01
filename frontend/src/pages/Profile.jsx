import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.get("/profile/")
      .then(res => setProfile(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!profile) {
    return <p className="p-10">Loading profile...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-12 px-4">
      <div className="bg-white max-w-xl w-full rounded-xl border p-6">

        {/* Header */}
        <h1 className="text-2xl font-bold">{profile.name}</h1>
        <p className="text-gray-600 text-sm mt-1">
          {profile.title}
        </p>

        <hr className="my-5" />

        {/* Info */}
        <div className="space-y-2 text-sm">
          <p>📍 {profile.location}</p>
          <p>📧 {profile.email}</p>
          <p>📞 {profile.phone}</p>
          <p className="font-medium">🚀 {profile.open_to}</p>
        </div>

        <hr className="my-5" />

        {/* Skills */}
        <div>
          <h2 className="font-semibold mb-2">🛠 Skills</h2>
          <p className="text-sm text-gray-700">
            {profile.skills}
          </p>
        </div>

        <hr className="my-5" />

        {/* Links */}
        <div>
          <h2 className="font-semibold mb-2">🔗 Links</h2>
          <div className="flex gap-4 text-sm">
            {profile.github && (
              <a href={profile.github} className="text-blue-600 hover:underline">
                GitHub
              </a>
            )}
            {profile.linkedin && (
              <a href={profile.linkedin} className="text-blue-600 hover:underline">
                LinkedIn
              </a>
            )}
            {profile.resume && (
              <a href={profile.resume} className="text-blue-600 hover:underline">
                Resume
              </a>
            )}
          </div>
        </div>

        <div className="mt-6">
          <Link to="/" className="text-sm text-gray-500 hover:text-black">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
