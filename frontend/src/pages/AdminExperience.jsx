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
          <Input value={item.role} onChange={e => updateLocal(item.id, "role", e.target.value)} />
          <Input value={item.organization} onChange={e => updateLocal(item.id, "organization", e.target.value)} />
          <Input value={item.start_date} onChange={e => updateLocal(item.id, "start_date", e.target.value)} />
          <Input value={item.end_date} onChange={e => updateLocal(item.id, "end_date", e.target.value)} />
          <Textarea value={item.description} onChange={e => updateLocal(item.id, "description", e.target.value)} />

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