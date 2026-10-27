import { Mail, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-slate-900 bg-slate-950 py-16">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <h3 className="text-xl font-bold text-white">Let's connect</h3>
          <p className="text-sm text-slate-400 mt-1 max-w-md">
            Open for software engineering roles, hackathons, and systems collaboration.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm font-medium">
          <a
            href="https://github.com/ask-io"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
          >
            GitHub <ArrowUpRight size={14} />
          </a>
          <a
            href="https://www.linkedin.com/in/abhijit-s-kunnel/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
          >
            LinkedIn <ArrowUpRight size={14} />
          </a>
          <a
            href="mailto:abhijitsmijukunnel@gmail.com"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all"
          >
            <Mail size={15} /> Send an Email
          </a>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 mt-12 pt-6 border-t border-slate-900/60 text-center text-xs text-slate-600 font-mono">
        Built with Vite, React & Tailwind CSS
      </div>
    </footer>
  );
}