import { Link } from "react-router-dom";

import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Achievements from "../components/Achievements";
import Experience from "../components/Experience";
import Certifications from "../components/Certifications";
import ProfileAssets from "../components/ProfileAssets";

export default function Home() {
  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800">
      {/* SIDEBAR (Quick Actions) */}
      <aside className="w-20 bg-white border-r flex flex-col items-center py-6 gap-6">
        {/* Profile */}
        <Link to="/profile" title="Profile">
          <img
            src="https://via.placeholder.com/48"
            alt="Profile"
            className="w-12 h-12 rounded-full border hover:scale-105 transition"
          />
        </Link>

        {/* Admin */}
        <Link
          to="/admin/login"
          className="text-xs text-gray-400 hover:text-black"
        >
          Admin
        </Link>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto">
        <Hero />
        <ProfileAssets />
        <Skills />
        <Projects />
        <Achievements />
        <Experience />
        <Certifications />
        

        {/* PERSONAL INFO */}
        <section className="max-w-5xl mx-auto px-8 mt-16">
          <SectionTitle title="Personal Info" />
          <ul className="mt-4 text-sm space-y-1">
            <li>📍 Pune, India</li>
            <li>📧 ganeshsonawane.dev@gmail.com</li>
            <li>🚀 Open to internships</li>
          </ul>
        </section>

        {/* PROJECTS */}
        <section className="max-w-5xl mx-auto px-8 mt-16">
          <SectionTitle title="Projects" />
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <ProjectCard
              title="Portfolio CMS"
              desc="CMS-driven portfolio with admin dashboard."
            />
            <ProjectCard
              title="AI Study Buddy"
              desc="AI-powered learning assistant using Django."
            />
            <ProjectCard
              title="AgriVerse"
              desc="Agriculture-focused platform with AI solutions."
            />
          </div>
        </section>

        {/* FEATURED PROJECT */}
        <section className="max-w-5xl mx-auto px-8 mt-16">
          <SectionTitle title="Featured Project" />
          <div className="mt-4 bg-white border rounded-lg p-6">
            <h3 className="font-semibold text-lg">AgriVerse</h3>
            <p className="mt-2 text-sm text-gray-600">
              A case study on building offline-first, AI-powered tools for
              farmers.
            </p>
          </div>
        </section>

        {/* SKILLS */}
        <section className="max-w-5xl mx-auto px-8 mt-16">
          <SectionTitle title="Skills & Tech Stack" />
          <p className="mt-4 text-sm">
            Python, Django, PostgreSQL, React, Tailwind, Unity, C#, Git
          </p>
        </section>

        {/* EXPERIENCE */}
        <section className="max-w-5xl mx-auto px-8 mt-16">
          <SectionTitle title="Experience" />
          <p className="mt-4 text-sm text-gray-600">
            Fresher · Academic & self-driven real-world projects
          </p>
        </section>

        {/* EDUCATION */}
        <section className="max-w-5xl mx-auto px-8 mt-16">
          <SectionTitle title="Education" />
          <p className="mt-4 text-sm">
            B.E. / B.Tech – Engineering (Dummy University)
          </p>
        </section>

        {/* ACHIEVEMENTS */}
        <section className="max-w-5xl mx-auto px-8 mt-16">
          <SectionTitle title="Achievements & Certifications" />
          <ul className="mt-4 list-disc ml-5 text-sm text-gray-700">
            <li>Top scorer in Python assessments</li>
            <li>Built multiple full-stack and AI projects</li>
          </ul>
        </section>

        {/* OPEN SOURCE */}
        <section className="max-w-5xl mx-auto px-8 mt-16">
          <SectionTitle title="Open Source" />
          <p className="mt-4 text-sm text-gray-600">
            Maintainer and contributor to personal open-source repositories.
          </p>
        </section>

        {/* RESUME */}
        <section className="max-w-5xl mx-auto px-8 mt-16">
          <SectionTitle title="Resume" />
          <a
            href="#"
            className="inline-block mt-4 border px-5 py-2 text-sm hover:bg-black hover:text-white"
          >
            Download Resume
          </a>
        </section>

        {/* CONTACT */}
        <section className="max-w-5xl mx-auto px-8 mt-20 mb-20">
          <SectionTitle title="Contact" />
          <p className="mt-4 text-sm text-gray-600">
            Interested in collaborating or offering an opportunity?
          </p>
          <a
            href="mailto:ganeshsonawane.dev@gmail.com"
            className="inline-block mt-4 bg-black text-white px-6 py-2"
          >
            Get in Touch
          </a>
        </section>
      </main>
    </div>
  );
}

/* ---------- Components ---------- */

function SectionTitle({ title }) {
  return <h2 className="text-2xl font-semibold">{title}</h2>;
}

function ProjectCard({ title, desc }) {
  return (
    <div className="bg-white border rounded-lg p-5 hover:shadow-sm transition">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{desc}</p>
    </div>
  );
}


