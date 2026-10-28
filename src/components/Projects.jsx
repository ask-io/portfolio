import { projects } from '../data/projects';
import { ExternalLink, Code2 } from 'lucide-react';

export default function Projects() {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-24 border-t border-slate-900">
      <div className="mb-12">
        <div className="font-mono text-xs text-emerald-500 uppercase tracking-widest mb-2">
          // Production Deployments
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Featured Projects</h2>
        <p className="text-slate-400 mt-2 text-sm">Key software systems, platforms, and network utilities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj, idx) => (
          <div
            key={idx}
            className="group flex flex-col justify-between p-6 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-950/30 transition-all duration-300 hover:-translate-y-1"
          >
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                {proj.title}
              </h3>
              <p className="text-xs font-mono text-emerald-400 mt-1 mb-3">{proj.tagline}</p>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">{proj.description}</p>
            </div>

            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                {proj.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-950/30 text-emerald-300 border border-emerald-900/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-slate-800/80">
                {proj.github && (
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors"
                  >
                    <Code2 size={15} /> Code
                  </a>
                )}
                {proj.demo && (
                  <a
                    href={proj.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <ExternalLink size={15} /> Live App
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}