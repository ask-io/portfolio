import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Footer from './components/Footer';
import CyberGridBackground from './components/CyberGridBackground';

export default function App() {
  return (
    <div className="relative bg-slate-950 text-slate-100 min-h-screen selection:bg-emerald-500 selection:text-slate-950 overflow-x-hidden">
      {/* Interactive Cyber Grid Background */}
      <CyberGridBackground />

      {/* Foreground Content */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Projects />
          <Skills />
        </main>
        <Footer />
      </div>
    </div>
  );
}