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
            value={item.name}
            onChange={(e) => updateLocal(item.id, "name", e.target.value)}
          />
          <Input
            value={item.issuer}
            onChange={(e) => updateLocal(item.id, "issuer", e.target.value)}
          />
          <Input
            value={item.certificate_url}
            onChange={(e) =>
              updateLocal(item.id, "certificate_url", e.target.value)
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