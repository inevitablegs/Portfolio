// frontend/src/pages/AdminCertifications.jsx
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";

export default function AdminCertifications() {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const load = () => {
    api
      .get("/admin/certifications/")
      .then((res) => setItems(res.data))
      .catch(() => navigate("/admin/login"));
  };

  useEffect(load, []);

  const add = async () => {
    const newCert = await api.post("/admin/certifications/", {
      name: "New Certificate",
      issuer: "Issuer Name",
      certificate_url: "",
      order: items.length + 1,
    });
    load();
    setEditingId(newCert.data.id);
    setEditData(newCert.data);
    setImagePreview(null);
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this certification?")) return;
    await api.delete(`/admin/certifications/${id}/`);
    if (editingId === id) {
      setEditingId(null);
      setEditData({});
      setImagePreview(null);
    }
    load();
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditData({ ...item });
    // FIX: Just use item.image, don't prepend BASE_URL for Cloudinary
    setImagePreview(item.image ? item.image : null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
    setImagePreview(null);
  };

  const handleImageChange = (file) => {
    if (file) {
      setEditData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const saveEdit = async () => {
    const formData = new FormData();
    formData.append('name', editData.name);
    formData.append('issuer', editData.issuer);
    formData.append('certificate_url', editData.certificate_url || '');
    formData.append('order', editData.order);
    
    if (editData.image instanceof File) {
      formData.append('image', editData.image);
    }

    try {
      await api.patch(`/admin/certifications/${editingId}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setEditingId(null);
      setEditData({});
      setImagePreview(null);
      load();
    } catch (error) {
      alert("Failed to save");
    }
  };

  return (
    <AdminLayout title="Certifications" onAdd={add}>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <CertCard 
            key={item.id} 
            item={item}
            isEditing={editingId === item.id}
            editData={editData}
            imagePreview={imagePreview}
            onEdit={startEdit}
            onDelete={remove}
            onSave={saveEdit}
            onCancel={cancelEdit}
            onFieldChange={(field, value) => setEditData(prev => ({ ...prev, [field]: value }))}
            onImageChange={handleImageChange}
          />
        ))}
      </div>
      
      {items.length === 0 && (
        <div className="rounded-xl border border-surface-800/50 bg-surface-900/50 p-12 text-center backdrop-blur-xl">
          <p className="text-surface-400">No certifications yet. Click "Add" to create one.</p>
        </div>
      )}
    </AdminLayout>
  );
}

function CertCard({ item, isEditing, editData, imagePreview, onEdit, onDelete, onSave, onCancel, onFieldChange, onImageChange }) {
  if (isEditing) {
    return (
      <div className="rounded-xl border border-accent-500/50 bg-gradient-to-br from-surface-900/90 to-surface-800/90 p-6 backdrop-blur-xl shadow-glow-md">
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-accent-400">
              Certificate Badge/Logo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => onImageChange(e.target.files[0])}
              className="w-full rounded-lg border border-surface-700 bg-surface-800/50 px-3 py-2 text-sm text-surface-100 file:mr-3 file:rounded-md file:border-0 file:bg-accent-500 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-surface-950 hover:file:bg-accent-400"
            />
            {imagePreview && (
              <div className="mt-3 flex justify-center">
                <div className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-accent-500/30 bg-surface-900">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-surface-400">Certificate Name</label>
            <input
              type="text"
              value={editData.name}
              onChange={(e) => onFieldChange('name', e.target.value)}
              className="w-full rounded-lg border border-surface-700 bg-surface-800/50 px-3 py-2 text-sm text-surface-100 placeholder-surface-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-surface-400">Issuer</label>
            <input
              type="text"
              value={editData.issuer}
              onChange={(e) => onFieldChange('issuer', e.target.value)}
              className="w-full rounded-lg border border-surface-700 bg-surface-800/50 px-3 py-2 text-sm text-surface-100 placeholder-surface-500"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={onSave}
              className="flex-1 rounded-lg bg-gradient-to-r from-accent-500 to-accent-600 px-4 py-2 text-sm font-semibold text-surface-950"
            >
              Save
            </button>
            <button
              onClick={onCancel}
              className="rounded-lg border border-surface-700 bg-surface-800/50 px-4 py-2 text-sm font-semibold text-surface-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative rounded-xl border border-surface-800/50 bg-surface-900/50 overflow-hidden backdrop-blur-xl">
      <div className="relative h-32 bg-surface-900/50 flex items-center justify-center">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-contain p-4"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-500/20 text-3xl">
            📜
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-sm font-bold text-surface-100 line-clamp-2 min-h-[2.5rem]">{item.name}</h3>
        <p className="mt-1 text-xs text-surface-400">{item.issuer}</p>

        <div className="mt-4 flex gap-2">
          <button onClick={() => onEdit(item)} className="flex-1 rounded-lg border border-surface-700 bg-surface-800/50 px-3 py-1.5 text-xs font-semibold text-surface-300">Edit</button>
          <button onClick={() => onDelete(item.id)} className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-400">Delete</button>
        </div>
      </div>
    </div>
  );
}