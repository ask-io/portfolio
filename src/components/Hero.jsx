import avatarImg from '../assets/avatar.png';

export default function Hero() {
  return (
    <section id="about" className="min-h-[85vh] flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-6 pt-28 pb-12 gap-12">
      {/* Bio / Hook */}
      <div className="flex-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/40 text-emerald-400 text-xs font-mono w-fit mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          SYSTEM_ONLINE // Ready for deployment
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-4">
          Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">Abhijit</span>.
        </h1>

        <p className="text-lg text-slate-300 max-w-xl leading-relaxed mb-8">
          Computer Science student and systems builder. Focused on automated engineering platforms, zero-configuration local networking, and high-performance applications.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-lg shadow-emerald-500/20 font-mono text-sm"
          >
            ./view_projects.sh
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-lg border border-slate-700 hover:border-emerald-500/60 text-slate-300 hover:text-white transition-all font-mono text-sm"
          >
            connect()
          </a>
        </div>
      </div>

      {/* Avatar with Glow Ring */}
      <div className="relative group">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 opacity-40 blur-xl group-hover:opacity-75 transition duration-500"></div>
        <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden border-2 border-emerald-500/60 shadow-2xl bg-black">
          <img
            src={avatarImg}
            alt="Abhijit Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}