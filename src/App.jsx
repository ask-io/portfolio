import Navbar from './components/Navbar';
import Hero from './components/Hero';

export default function App() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen selection:bg-cyan-500 selection:text-slate-950">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  );
}