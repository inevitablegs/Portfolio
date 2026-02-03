import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";

export default function AdminExperience() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const load = () => {
    api.get("/admin/experience/")
      .then(res => setItems(res.data))
      .catch(() => navigate("/admin/login"));
  };

  useEffect(load, []);

  const add = async () => {
    await api.post("/admin/experience/", {
      role: "Role",
      organization: "Organization",
      start_date: "2024",
      end_date: "",
      description: "Description",
      order: items.length + 1,
    });
    load();
  };

  const updateLocal = (id, field, value) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const save = async (item) => {
    await api.patch(`/admin/experience/${item.id}/`, item);
    alert("Saved");
    load();
  };

  const remove = async (id) => {
    if (!window.confirm("Delete experience?")) return;
    await api.delete(`/admin/experience/${id}/`);
    load();
  };

  return (
    <AdminLayout title="Experience" onAdd={add}>
      {items.map(item => (
        <Card key={item.id}>
          <Input placeholder="Role" value={item.role} onChange={e => updateLocal(item.id, "role", e.target.value)} />
          <Input placeholder="Organization" value={item.organization} onChange={e => updateLocal(item.id, "organization", e.target.value)} />
          <div className="grid gap-4 md:grid-cols-2">
            <Input placeholder="Start Date (e.g., 2024)" value={item.start_date} onChange={e => updateLocal(item.id, "start_date", e.target.value)} />
            <Input placeholder="End Date (or leave empty)" value={item.end_date} onChange={e => updateLocal(item.id, "end_date", e.target.value)} />
          </div>
          <Textarea placeholder="Description" value={item.description} onChange={e => updateLocal(item.id, "description", e.target.value)} />

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => save(item)}
              className="rounded-lg bg-gradient-to-r from-accent-500 to-accent-600 px-5 py-2 text-sm font-semibold text-surface-950 shadow-lg transition hover:shadow-accent-500/50"
            >
              Save
            </button>
            <DeleteBtn onClick={() => remove(item.id)} />
          </div>
        </Card>
      ))}
    </AdminLayout>
  );
}


const Card = ({ children }) => (
  <div className="rounded-xl border border-surface-800/50 bg-surface-900/50 p-6 backdrop-blur-xl space-y-4">{children}</div>
);

const Input = (props) => (
  <input {...props} className="w-full rounded-lg border border-surface-700 bg-surface-800/50 px-4 py-3 text-surface-100 placeholder-surface-500 transition focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20" />
);

const Textarea = (props) => (
  <textarea {...props} rows="3" className="w-full rounded-lg border border-surface-700 bg-surface-800/50 px-4 py-3 text-surface-100 placeholder-surface-500 transition focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20" />
);

const DeleteBtn = ({ onClick }) => (
  <button onClick={onClick} className="rounded-lg border border-red-500/30 bg-red-500/10 px-5 py-2 text-sm font-semibold text-red-400 transition hover:border-red-500/50 hover:bg-red-500/20">
    Delete
  </button>
);