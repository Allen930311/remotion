import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import Pet from './Pet';
import './App.css';

function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDizzy, setIsDizzy] = useState(false);
  const [isSleeping, setIsSleeping] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const lastTime = useRef(Date.now());
  const bgRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    setMousePos({ x: clientX, y: clientY });

    // Calculate velocity
    const now = Date.now();
    const dt = now - lastTime.current;
    if (dt > 10) {
      const dx = clientX - lastMousePos.current.x;
      const dy = clientY - lastMousePos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const velocity = dist / dt;

      if (velocity > 5) {
        setIsDizzy(true);
        setTimeout(() => setIsDizzy(false), 2000);
      }

      lastMousePos.current = { x: clientX, y: clientY };
      lastTime.current = now;
    }
  };

  useEffect(() => {
    // GSAP Background transition based on mouse position
    if (bgRef.current) {
      const hue = (mousePos.x / window.innerWidth) * 360;
      gsap.to(bgRef.current, {
        background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, hsla(${hue}, 70%, 50%, 0.4), #0f172a)`,
        duration: 0.5,
      });
    }
  }, [mousePos]);

  return (
    <div
      className={`app-root ${isSleeping ? 'sleeping' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsSleeping(true)}
      onMouseEnter={() => setIsSleeping(false)}
      ref={bgRef}
    >
      <header className="glass-header">
        <h1>Digital Pet</h1>
        <p>A interactive companion that watches you.</p>
      </header>

      <main className="game-area">
        <Pet
          mouseX={mousePos.x}
          mouseY={mousePos.y}
          isDizzy={isDizzy}
          isSleeping={isSleeping}
        />
      </main>

      <footer className="status-bars">
        <div className="status-item">
          <span>Dizzy Level:</span>
          <div className="bar"><div className="fill" style={{ width: isDizzy ? '100%' : '0%' }}></div></div>
        </div>
        <div className="status-item">
          <span>Status:</span>
          <strong>{isSleeping ? '💤 Sleeping' : isDizzy ? '😵 Dizzy!' : '👀 Watching'}</strong>
        </div>
      </footer>
    </div>
  );
}

export default App;
