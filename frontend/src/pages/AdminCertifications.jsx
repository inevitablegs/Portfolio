import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";


export default function AdminCertifications() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const load = () => {
    api
      .get("/admin/certifications/")
      .then((res) => setItems(res.data))
      .catch(() => navigate("/admin/login"));
  };

  useEffect(load, []);

  const add = async () => {
    await api.post("/admin/certifications/", {
      name: "Certificate name",
      issuer: "Issuer",
      certificate_url: "",
      order: items.length + 1,
    });
    load();
  };

//   const update = async (id, field, value) => {
//     await api.patch(`/admin/certifications/${id}/`, { [field]: value });
//     load();
//   };

  const remove = async (id) => {
    if (!window.confirm("Delete certification?")) return;
    await api.delete(`/admin/certifications/${id}/`);
    load();
  };

  const updateLocal = (id, field, value) => {
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  const save = async (item) => {
    await api.patch(`/admin/certifications/${item.id}/`, item);
    alert("Saved");
    load();
  };

  return (
    <AdminLayout title="Certifications" onAdd={add}>
      {items.map((item) => (
        <Card key={item.id}>
          <Input
            placeholder="Certificate name"
            value={item.name}
            onChange={(e) => updateLocal(item.id, "name", e.target.value)}
          />
          <Input
            placeholder="Issuer"
            value={item.issuer}
            onChange={(e) => updateLocal(item.id, "issuer", e.target.value)}
          />
          <Input
            placeholder="Certificate URL (optional)"
            value={item.certificate_url}
            onChange={(e) =>
              updateLocal(item.id, "certificate_url", e.target.value)
            }
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