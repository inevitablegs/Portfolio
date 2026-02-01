import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="w-20 bg-white border-r flex flex-col items-center py-6">
        <Link to="/profile">
          <img
            src="https://via.placeholder.com/60"
            alt="Profile"
            className="w-14 h-14 rounded-full border hover:scale-105 transition"
          />
        </Link>
        <Link
          to="/admin/login"
          className="text-xs text-gray-400 hover:text-gray-700"
        >
          Admin
        </Link>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold">Welcome</h1>
        <p className="text-gray-600 mt-2">
          Click the profile picture to view personal information.
        </p>
      </main>
    </div>
  );
}
