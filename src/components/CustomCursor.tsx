import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom cursor with smooth interpolation — GPU-accelerated via transform.
 * Only rendered on desktop (pointer: fine).
 */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hidden, setHidden] = useState(false);
  const mousePos = useRef({ x: -100, y: -100 });
  const cursorPos = useRef({ x: -100, y: -100 });
  const followerPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);

  const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

  const animate = useCallback(() => {
    cursorPos.current.x = lerp(cursorPos.current.x, mousePos.current.x, 0.35);
    cursorPos.current.y = lerp(cursorPos.current.y, mousePos.current.y, 0.35);
    followerPos.current.x = lerp(followerPos.current.x, mousePos.current.x, 0.12);
    followerPos.current.y = lerp(followerPos.current.y, mousePos.current.y, 0.12);

    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0) translate(-50%, -50%)`;
    }
    if (followerRef.current) {
      followerRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0) translate(-50%, -50%) scale(${hovering ? 1.8 : 1})`;
    }
    rafId.current = requestAnimationFrame(animate);
  }, [hovering]);

  useEffect(() => {
    // Only show on devices with a fine pointer
    const mq = window.matchMedia('(pointer: fine)');
    if (!mq.matches) return;

    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    const onEnter = () => setHidden(false);
    const onLeave = () => setHidden(true);
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);

    // Track hover on interactive elements
    const interactives = document.querySelectorAll('a, button, [role="button"], input, textarea, select, .cursor-hover');
    const hIn = () => setHovering(true);
    const hOut = () => setHovering(false);
    interactives.forEach(el => {
      el.addEventListener('mouseenter', hIn);
      el.addEventListener('mouseleave', hOut);
    });

    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', hIn);
        el.removeEventListener('mouseleave', hOut);
      });
      cancelAnimationFrame(rafId.current);
    };
  }, [animate]);

  // Re-bind interactive elements on DOM changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const interactives = document.querySelectorAll('a, button, [role="button"], input, textarea, select, .cursor-hover');
      const hIn = () => setHovering(true);
      const hOut = () => setHovering(false);
      interactives.forEach(el => {
        el.addEventListener('mouseenter', hIn);
        el.addEventListener('mouseleave', hOut);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) return null;

  return (
    <>
      {/* Inner dot */}
      <div
        ref={cursorRef}
        className="custom-cursor-dot"
        style={{
          opacity: hidden ? 0 : clicking ? 0.6 : 1,
          width: hovering ? '6px' : '8px',
          height: hovering ? '6px' : '8px',
        }}
      />
      {/* Outer ring */}
      <div
        ref={followerRef}
        className="custom-cursor-ring"
        style={{
          opacity: hidden ? 0 : 1,
          borderColor: hovering ? 'rgba(249, 115, 22, 0.6)' : 'rgba(255, 255, 255, 0.15)',
          width: clicking ? '28px' : '36px',
          height: clicking ? '28px' : '36px',
        }}
      />
    </>
  );
}
