import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-10 relative">
      <div className="absolute top-4 right-6 text-sm">
        <a href="/admin/login" className="text-gray-500 hover:text-black">
          Admin
        </a>
      </div>

      <h1 className="text-4xl font-bold">Ganesh Sonawane</h1>
      <p className="text-gray-600 mt-2">
        Full Stack Developer | Django | React
      </p>

      <hr className="my-6" />

      <h2 className="text-2xl font-semibold">Projects</h2>
      <ul className="list-disc ml-6 mt-2 text-gray-700">
        <li>Portfolio CMS</li>
        <li>AI Study Buddy</li>
        <li>AgriVerse</li>
      </ul>
    </div>
  );
}
