// src/components/Certifications.jsx
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Certifications() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/certifications/").then(res => setItems(res.data));
  }, []);

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-semibold">Certifications</h2>

      <ul className="mt-4 space-y-2">
        {items.map(c => (
          <li key={c.id}>
            <strong>{c.name}</strong> — {c.issuer}
            {c.certificate_url && (
              <a href={c.certificate_url} className="ml-2 underline">
                View
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
