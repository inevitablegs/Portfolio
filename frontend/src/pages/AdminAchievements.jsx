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
          />
          <Textarea
            value={item.description}
            onChange={(e) =>
              updateLocal(item.id, "description", e.target.value)
            }
          />

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => save(item)}
              className="bg-black text-white px-4 py-1 text-sm"
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
  <div className="border p-4 rounded space-y-2">{children}</div>
);

const Input = (props) => (
  <input {...props} className="w-full border px-3 py-2 rounded" />
);

const Textarea = (props) => (
  <textarea {...props} rows="3" className="w-full border px-3 py-2 rounded" />
);

const DeleteBtn = ({ onClick }) => (
  <button onClick={onClick} className="text-sm text-red-600">
    Delete
  </button>
);