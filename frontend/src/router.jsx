import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import AdminProfileEdit from "./pages/AdminProfileEdit";
import AdminHeroEdit from "./pages/AdminHeroEdit";
import AdminProjects from "./pages/AdminProjects";
import AdminProjectForm from "./pages/AdminProjectForm";
import AdminSkillsEdit from "./pages/AdminSkillsEdit";
import AdminSkillsNew from "./pages/AdminSkillsNew";

import AdminExperience from "./pages/AdminExperience";
import AdminAchievements from "./pages/AdminAchievements";
import AdminCertifications from "./pages/AdminCertifications";

import AdminProfileAssets from "./pages/AdminProfileAssets";

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
      <Route path="/admin/skills" element={<AdminSkillsEdit />} />
      <Route path="/admin/skills-new" element={<AdminSkillsNew />} />
      <Route path="/admin/experience" element={<AdminExperience />} />
      <Route path="/admin/achievements" element={<AdminAchievements />} />
      <Route path="/admin/certifications" element={<AdminCertifications />} />
      <Route path="/admin/profile-assets" element={<AdminProfileAssets />} />
    </Routes>
  );
}
