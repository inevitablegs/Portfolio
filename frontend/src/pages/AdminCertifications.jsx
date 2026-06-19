// frontend/src/pages/AdminCertifications.jsx
import { useEffect, useState, useRef } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";

export default function AdminCertifications() {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [saving, setSaving] = useState(false);
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
      order: items.length,
    });
    load();
    setEditingId(newCert.data.id);
    setEditData(newCert.data);
    setImagePreview(null);
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this certification?")) return;
    try {
      await api.delete(`/admin/certifications/${id}/`);
      if (editingId === id) {
        setEditingId(null);
        setEditData({});
        setImagePreview(null);
      }
      load();
    } catch (err) {
      console.error(err);
      alert("Failed to delete certification");
    }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditData({ ...item });
    setImagePreview(item.image ? item.image : null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
    setImagePreview(null);
  };

  const handleImageChange = (file) => {
    if (file) {
      setEditData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const saveEdit = async () => {
    const formData = new FormData();
    formData.append("name", editData.name);
    formData.append("issuer", editData.issuer);
    formData.append("certificate_url", editData.certificate_url || "");
    formData.append("order", editData.order);

    if (editData.image instanceof File) {
      formData.append("image", editData.image);
    }

    try {
      await api.patch(`/admin/certifications/${editingId}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setEditingId(null);
      setEditData({});
      setImagePreview(null);
      load();
    } catch (error) {
      alert("Failed to save");
    }
  };

  // --- Drag and Drop ---
  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDrop = async (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const reordered = [...items];
    const [dragged] = reordered.splice(draggedIndex, 1);
    reordered.splice(dropIndex, 0, dragged);

    // Optimistic UI update
    setItems(reordered);
    setDraggedIndex(null);
    setDragOverIndex(null);

    // Persist to backend
    setSaving(true);
    try {
      const orderedIds = reordered.map((item) => item.id);
      const res = await api.put("/admin/certifications/", { order: orderedIds });
      setItems(res.data);
    } catch (err) {
      console.error("Reorder failed:", err);
      load(); // revert on error
    } finally {
      setSaving(false);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <AdminLayout title="Certifications" onAdd={add}>
      {/* Drag hint */}
      {items.length > 1 && (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-surface-800/50 bg-surface-900/30 px-4 py-2.5">
          <span className="text-base">↕️</span>
          <p className="text-xs text-surface-400">
            <span className="font-semibold text-surface-300">Drag & drop</span> cards to reorder.
            Order is saved automatically.
            {saving && (
              <span className="ml-2 text-accent-400 animate-pulse">Saving…</span>
            )}
          </p>
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <div
            key={item.id}
            draggable={editingId !== item.id}
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            className={`transition-all duration-200 ${
              draggedIndex === index ? "opacity-40 scale-95" : ""
            } ${
              dragOverIndex === index && draggedIndex !== index
                ? "ring-2 ring-accent-500/60 ring-offset-2 ring-offset-surface-950 rounded-2xl"
                : ""
            }`}
          >
            <CertCard
              item={item}
              index={index}
              isEditing={editingId === item.id}
              editData={editData}
              imagePreview={imagePreview}
              onEdit={startEdit}
              onDelete={remove}
              onSave={saveEdit}
              onCancel={cancelEdit}
              onFieldChange={(field, value) =>
                setEditData((prev) => ({ ...prev, [field]: value }))
              }
              onImageChange={handleImageChange}
              isDragging={draggedIndex !== null}
            />
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="rounded-xl border border-surface-800/50 bg-surface-900/50 p-12 text-center backdrop-blur-xl">
          <p className="text-surface-400">
            No certifications yet. Click "Add" to create one.
          </p>
        </div>
      )}
    </AdminLayout>
  );
}

function CertCard({
  item,
  index,
  isEditing,
  editData,
  imagePreview,
  onEdit,
  onDelete,
  onSave,
  onCancel,
  onFieldChange,
  onImageChange,
  isDragging,
}) {
  if (isEditing) {
    return (
      <div className="rounded-2xl border border-accent-500/50 bg-gradient-to-br from-surface-900/90 to-surface-800/90 p-6 backdrop-blur-xl shadow-glow-md">
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
            <label className="mb-1 block text-xs font-medium text-surface-400">
              Certificate Name
            </label>
            <input
              type="text"
              value={editData.name}
              onChange={(e) => onFieldChange("name", e.target.value)}
              className="w-full rounded-lg border border-surface-700 bg-surface-800/50 px-3 py-2 text-sm text-surface-100 placeholder-surface-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-surface-400">
              Issuer
            </label>
            <input
              type="text"
              value={editData.issuer}
              onChange={(e) => onFieldChange("issuer", e.target.value)}
              className="w-full rounded-lg border border-surface-700 bg-surface-800/50 px-3 py-2 text-sm text-surface-100 placeholder-surface-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-surface-400">
              Certificate URL
            </label>
            <input
              type="url"
              value={editData.certificate_url || ""}
              onChange={(e) => onFieldChange("certificate_url", e.target.value)}
              placeholder="https://..."
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
    <div
      className={`group relative rounded-2xl border border-surface-800/80 bg-surface-900/30 overflow-hidden backdrop-blur-md transition-all duration-300 hover:border-accent-500/40 hover:bg-surface-900/50 ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      {/* Order badge */}
      <div className="absolute top-3 left-3 z-10 flex h-7 w-7 items-center justify-center rounded-lg border border-surface-700 bg-surface-900/90 text-[10px] font-bold text-surface-400 backdrop-blur-sm">
        {index + 1}
      </div>

      {/* Drag handle icon */}
      <div className="absolute top-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-lg border border-surface-700 bg-surface-900/90 text-surface-500 backdrop-blur-sm text-xs group-hover:text-accent-400 group-hover:border-accent-500/30 transition-colors">
        ⠿
      </div>

      {/* Image area */}
      <div className="relative h-28 w-full bg-surface-950/40 flex items-center justify-center">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="max-h-full max-w-full object-contain p-4"
            draggable={false}
          />
        ) : (
          <div className="text-3xl">🎓</div>
        )}
      </div>

      {/* Card body */}
      <div className="p-4">
        <span className="inline-flex items-center rounded-md border border-accent-500/20 bg-accent-500/5 px-2 py-0.5 text-[10px] font-bold text-accent-400 uppercase tracking-wider mb-1.5">
          {item.issuer}
        </span>

        <h3 className="text-sm font-bold text-surface-100 leading-snug line-clamp-2">
          {item.name}
        </h3>

        <div className="mt-3 flex gap-2">
          <button
            onClick={() => onEdit(item)}
            className="rounded-lg border border-surface-700 bg-surface-800/50 px-3 py-1.5 text-xs font-semibold text-surface-300 transition hover:border-accent-500/50 hover:text-accent-400"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-400 transition hover:border-red-500/50"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}