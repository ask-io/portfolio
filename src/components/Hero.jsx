export default function Hero() {
  return (
    <section id="about" className="min-h-[85vh] flex flex-col justify-center max-w-6xl mx-auto px-6 pt-24">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-cyan-400 text-xs font-mono w-fit mb-6">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        Available for software engineering & systems work
      </div>
      <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-4">
        Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Abhijit</span>.
      </h1>
      <p className="text-lg sm:text-xl text-slate-400 max-w-2xl leading-relaxed mb-8">
        Computer Science student and full-stack builder. I engineer automated engineering platforms, zero-configuration local networking systems, and responsive web applications.
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <a
          href="#projects"
          className="px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold transition-all shadow-lg shadow-cyan-500/20"
        >
          View Projects
        </a>
        <a
          href="#contact"
          className="px-6 py-3 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-300 font-semibold transition-all"
        >
          Contact Me
        </a>
      </div>
    </section>
  );
}