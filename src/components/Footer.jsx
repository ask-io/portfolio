import { Mail, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-slate-900 bg-slate-950 py-16">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <div className="font-mono text-xs text-emerald-500 uppercase tracking-widest mb-2">
            // End Transmission
          </div>
          <h3 className="text-xl font-bold text-white font-mono">Let's connect.</h3>
          <p className="text-sm text-slate-400 mt-1 max-w-md">
            Open for software engineering roles, hackathons, and systems collaboration.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm font-mono">
          <a
            href="https://github.com/ask-io"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-slate-400 hover:text-emerald-400 transition-colors"
          >
            GitHub <ArrowUpRight size={14} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-slate-400 hover:text-emerald-400 transition-colors"
          >
            LinkedIn <ArrowUpRight size={14} />
          </a>
          <a
            href="mailto:contact@example.com"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all font-mono"
          >
            <Mail size={15} /> Send an Email
          </a>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 mt-12 pt-6 border-t border-slate-900/60 text-center text-xs text-slate-600 font-mono">
        Built with Vite, React & Tailwind CSS // ask-io
      </div>
    </footer>
  );
}