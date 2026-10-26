/* 
Navbar.jsx used in the main layout of the application. fferent sections of the page. 
The header has a semi-transparent background with a blur effect and a border at the bottom. 
The navigation links change color on hover for better user experience. 
It is a fixed header that contains a logo and navigation links to di
*/
export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-mono text-cyan-400 font-bold tracking-tight text-lg">
          &lt;dev /&gt;
        </a>
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
          <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
          <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
        </nav>
      </div>
    </header>
  );
}