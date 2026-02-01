import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import AdminProfileEdit from "./pages/AdminProfileEdit";
import AdminHeroEdit from "./pages/AdminHeroEdit";
import AdminProjects from "./pages/AdminProjects";
import AdminProjectForm from "./pages/AdminProjectForm";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/profile" element={<AdminProfileEdit />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin/hero" element={<AdminHeroEdit />} />  
      <Route path="/admin/projects" element={<AdminProjects />} />
      <Route path="/admin/projects/new" element={<AdminProjectForm />} />
      <Route path="/admin/projects/:id" element={<AdminProjectForm />} />
    </Routes>
  );
}
