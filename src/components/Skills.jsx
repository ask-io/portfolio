const skillCategories = [
  {
    category: "Languages",
    skills: ["Python", "C", "Java", "JavaScript", "Kotlin", "SQL"]
  },
  {
    category: "Frameworks & Web",
    skills: ["FastAPI", "React", "Tailwind CSS", "Vite", "PWA / Service Workers", "HTML5 / CSS3"]
  },
  {
    category: "Systems & Tools",
    skills: ["Linux", "Git & GitHub", "SQLite", "TCP/UDP Sockets", "Docker (Basics)", "VS Code"]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 max-w-6xl mx-auto px-6 py-24 border-t border-slate-900">
      <div className="mb-12">
        <div className="font-mono text-xs text-emerald-500 uppercase tracking-widest mb-2">
          // Capabilities & Stack
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Technical Toolkit</h2>
        <p className="text-slate-400 mt-2 text-sm">Languages, frameworks, and architecture patterns I work with.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skillCategories.map((group) => (
          <div
            key={group.category}
            className="p-6 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-emerald-500/30 transition-colors"
          >
            <h3 className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="text-emerald-600">&gt;</span> {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-emerald-950/20 text-slate-300 border border-emerald-900/30"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}