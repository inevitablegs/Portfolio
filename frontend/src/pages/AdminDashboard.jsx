import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/me/").catch(() => {
      localStorage.clear();
      navigate("/admin/login");
    });
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Admin Dashboard</h1>

      <ul>
        <li>Add / Edit Projects</li>
        <li>Update Resume</li>
        <li>Post Updates</li>
      </ul>

      <p>(You’ll connect these to real APIs later)</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}
