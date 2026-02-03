import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";


export default function AdminAchievements() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const load = () => {
    api
      .get("/admin/achievements/")
      .then((res) => setItems(res.data))
      .catch(() => navigate("/admin/login"));
  };

  useEffect(load, []);

  const add = async () => {
    await api.post("/admin/achievements/", {
      title: "Achievement title",
      description: "",
      order: items.length + 1,
    });
    load();
  };

  const update = async (id, field, value) => {
    await api.patch(`/admin/achievements/${id}/`, { [field]: value });
    load();
  };

  const remove = async (id) => {
    if (!window.confirm("Delete achievement?")) return;
    await api.delete(`/admin/achievements/${id}/`);
    load();
  };

  const updateLocal = (id, field, value) => {
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  const save = async (item) => {
    await api.patch(`/admin/achievements/${item.id}/`, item);
    alert("Saved");
    load();
  };

  return (
    <AdminLayout title="Achievements" onAdd={add}>
      {items.map((item) => (
        <Card key={item.id}>
          <Input
            value={item.title}
            onChange={(e) => updateLocal(item.id, "title", e.target.value)}
            placeholder="Achievement title"
          />
          <Textarea
            value={item.description}
            onChange={(e) =>
              updateLocal(item.id, "description", e.target.value)
            }
            placeholder="Description"
          />

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