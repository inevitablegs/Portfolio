// src/components/Experience.jsx
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Experience() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/experience/").then(res => setItems(res.data));
  }, []);

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-semibold">Experience</h2>

      <div className="mt-6 space-y-4">
        {items.map(exp => (
          <div key={exp.id} className="border p-4 rounded">
            <h3 className="font-semibold">
              {exp.role} — {exp.organization}
            </h3>
            <p className="text-sm text-gray-500">
              {exp.start_date} – {exp.end_date || "Present"}
            </p>
            <p className="mt-2 text-sm">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
