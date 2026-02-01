import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Hero() {
  const [hero, setHero] = useState({
    name: "Ganesh Sonawane",
    tagline: "Software Developer · Django · AI · Unity",
    intro: "I build practical, scalable software.",
    cta_text: "",
    cta_link: "",
  });

  useEffect(() => {
    api.get("/hero/")
      .then(res => res.data && setHero(res.data))
      .catch(() => {});
  }, []);

  return (
    <section className="max-w-5xl mx-auto px-8 pt-20">
      <h1 className="text-4xl font-bold">{hero.name}</h1>
      <p className="mt-2 text-lg text-gray-600">{hero.tagline}</p>
      <p className="mt-4 max-w-xl text-gray-700">{hero.intro}</p>

      {hero.cta_text && hero.cta_link && (
        <a
          href={hero.cta_link}
          className="inline-block mt-6 bg-black text-white px-6 py-2"
        >
          {hero.cta_text}
        </a>
      )}
    </section>
  );
}
