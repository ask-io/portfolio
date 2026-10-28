import { useEffect, useRef } from 'react';

export default function MatrixBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Characters: Katakana, Numbers, and Symbols
    const chars = '0123456789ABCDEF<>/{};:*+-~@#$%';
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = Array(columns).fill(1);

    const render = () => {
      // Semi-transparent fade creates trailing effect
      ctx.fillStyle = 'rgba(2, 6, 23, 0.08)'; // matches slate-950
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // Lead character is bright/white, trailing stream is emerald
        if (Math.random() > 0.85) {
          ctx.fillStyle = '#6ee7b7'; // emerald-300
        } else {
          ctx.fillStyle = '#059669'; // emerald-600
        }

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top with randomized delay once it falls off screen
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-25"
    />
  );
}