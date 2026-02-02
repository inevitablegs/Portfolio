// src/components/Achievements.jsx
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Achievements() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/achievements/").then(res => setItems(res.data));
  }, []);

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-semibold">Achievements</h2>
      <ul className="mt-4 list-disc ml-6">
        {items.map(a => (
          <li key={a.id}>{a.title}</li>
        ))}
      </ul>
    </section>
  );
}
 
