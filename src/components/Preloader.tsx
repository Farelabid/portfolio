import { useState, useEffect } from 'react';

/**
 * Branded page preloader with logo animation.
 * Auto-hides after content loads, with a graceful exit animation.
 */
export default function Preloader() {
  const [loaded, setLoaded] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Wait for fonts + a minimum display time for branding
    const minDelay = new Promise(r => setTimeout(r, 1400));
    const fontsReady = document.fonts?.ready ?? Promise.resolve();

    Promise.all([minDelay, fontsReady]).then(() => {
      setLoaded(true);
      setTimeout(() => setHidden(true), 600); // wait for exit animation
    });
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[9998] flex items-center justify-center bg-[#0C0A09] transition-all duration-600 ${loaded ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
      style={{ pointerEvents: loaded ? 'none' : 'all' }}
    >
      <div className="text-center">
        {/* Logo mark */}
        <div className={`preloader-logo ${loaded ? 'preloader-logo-exit' : ''}`}>
          <span className="font-display text-5xl md:text-6xl font-black tracking-tight">
            <span className="text-brand-accent">F</span>
            <span className="text-white/90">A</span>
          </span>
        </div>
        {/* Loading bar */}
        <div className="mt-8 w-32 h-[2px] bg-white/[0.06] rounded-full overflow-hidden mx-auto">
          <div className={`h-full bg-brand-accent rounded-full transition-all duration-1000 ease-out ${loaded ? 'w-full' : 'w-0'}`}
            style={{ animation: loaded ? 'none' : 'preloaderBar 1.2s ease-in-out forwards' }}
          />
        </div>
      </div>
    </div>
  );
}
