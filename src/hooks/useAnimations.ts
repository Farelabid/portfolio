import { useState, useEffect, useRef } from 'react';

export function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export function useCountUp(end: number, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(!startOnView);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!startOnView) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.unobserve(el); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [startOnView]);
  useEffect(() => {
    if (!started) return;
    let startTime: number;
    let af: number;
    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setCount(Math.floor(eased * end));
      if (p < 1) af = requestAnimationFrame(animate);
    };
    af = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(af);
  }, [started, end, duration]);
  return { count, ref };
}

export function useRotatingText(words: string[], interval = 2500) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);
  return words[index];
}
