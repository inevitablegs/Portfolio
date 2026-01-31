import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (!token) {
      navigate("/login");
      return;
    }

    api.get("/me/")
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        // token invalid or expired
        localStorage.clear();
        navigate("/login");
      });
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <h1>Dashboard</h1>

      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}
