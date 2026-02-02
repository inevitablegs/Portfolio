export default function AdminLayout({ title, onAdd, children }) {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl bg-white border p-6 rounded">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">{title}</h1>
          <button onClick={onAdd} className="bg-black text-white px-4 py-2">
            + Add
          </button>
        </div>
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
}

