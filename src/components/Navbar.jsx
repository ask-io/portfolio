/* 
  Navbar.jsx: Fixed sticky header with blurred backdrop.
  Provides quick navigation to core portfolio sections with terminal green accents.
*/
export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a 
          href="#" 
          className="font-mono text-emerald-400 font-bold tracking-tight text-lg hover:text-emerald-300 transition-colors flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>&lt;abhijit /&gt;</span>
        </a>
        <nav className="flex items-center gap-6 text-sm font-mono text-slate-300">
          <a href="#about" className="hover:text-emerald-400 transition-colors">./about</a>
          <a href="#projects" className="hover:text-emerald-400 transition-colors">./projects</a>
          <a href="#skills" className="hover:text-emerald-400 transition-colors">./skills</a>
          <a href="#contact" className="hover:text-emerald-400 transition-colors">./contact</a>
        </nav>
      </div>
    </header>
  );
}