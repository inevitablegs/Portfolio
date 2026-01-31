import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/token/", {
        username,
        password,
      });

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      navigate("/admin/dashboard");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div style={{ maxWidth: "350px", margin: "100px auto" }}>
      <h2>Admin Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={login}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
