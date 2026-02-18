import { useState, useEffect } from 'react';

/**
 * Thin scroll progress bar fixed to the top of the viewport.
 * Uses requestAnimationFrame-throttled scroll listener for performance.
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[51] pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-brand-accent via-brand-glow to-brand-accent rounded-r-full"
        style={{
          width: `${progress}%`,
          transition: 'width 0.1s linear',
          boxShadow: '0 0 8px rgba(249, 115, 22, 0.4)',
        }}
      />
    </div>
  );
}
