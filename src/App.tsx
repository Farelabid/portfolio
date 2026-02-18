import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  Check, Download, Menu, X, ExternalLink,
  ChevronDown, Copy, MapPin, Mail, Coffee, Code2, Zap, TrendingUp,
  ArrowUp
} from 'lucide-react';
import {
  SiReact, SiNextdotjs, SiTypescript
} from 'react-icons/si';
import { PROJECTS } from './data/projects';
import { SKILL_GROUPS, MARQUEE_TECHS } from './data/skills';
import { EXPERIENCES, SOCIALS, SERVICES, PROCESS_STEPS } from './data/experience';
import { useCountUp, useRotatingText } from './hooks/useAnimations';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import ScrollProgress from './components/ScrollProgress';

gsap.registerPlugin(ScrollTrigger);

// ─── COMPONENTS ───────────────────────────────────

function SectionHeader({ num, title, accent, subtitle }: { num: string; title: string; accent: string; subtitle?: string }) {
  const headerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={headerRef} className="mb-16 md:mb-20">
      <div className="flex items-end gap-6">
        <span className="font-mono text-brand-accent text-sm tracking-wider">{num}</span>
        <div className="flex-1">
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-none">
            {title} <span className="text-brand-accent">{accent}</span>
          </h2>
        </div>
        <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
      </div>
      {subtitle && <p className="text-brand-muted text-sm mt-4 ml-12 max-w-lg">{subtitle}</p>}
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    let ticking = false;
    const h = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 80);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  // Track active section via scroll position — more reliable than IntersectionObserver
  useEffect(() => {
    let ticking2 = false;
    const trackSection = () => {
      if (!ticking2) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY + window.innerHeight * 0.35;
          const sections = document.querySelectorAll('section[id], footer[id]');
          let current = '';
          sections.forEach(section => {
            const el = section as HTMLElement;
            if (el.offsetTop <= scrollY) {
              current = el.id;
            }
          });
          setActiveSection(current);
          ticking2 = false;
        });
        ticking2 = true;
      }
    };
    window.addEventListener('scroll', trackSection, { passive: true });
    trackSection(); // initial check
    return () => window.removeEventListener('scroll', trackSection);
  }, []);

  const links = [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileOpen(false);
    }
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-3 glass' : 'py-6 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="font-display font-bold text-lg tracking-tight group flex items-center gap-1.5">
            <span className="text-brand-accent">F</span><span className="text-white/90 group-hover:text-white transition-colors">Abid</span>
          </a>
          <div className="hidden md:flex items-center gap-1 bg-brand-surface/60 backdrop-blur-xl px-1.5 py-1.5 rounded-full border border-white/[0.04]">
            {links.map(l => (
              <a key={l.label} href={l.href} onClick={e => handleNavClick(e, l.href)}
                className={`px-5 py-2 text-xs font-medium rounded-full transition-all duration-200 tracking-widest uppercase ${activeSection === l.href.slice(1) ? 'text-white bg-white/[0.08]' : 'text-brand-muted hover:text-white hover:bg-white/[0.06]'}`}>
                {l.label}
              </a>
            ))}
          </div>
          <a href="mailto:farelabid@gmail.com" className="hidden md:flex items-center gap-2 px-5 py-2.5 text-xs font-semibold bg-brand-accent text-black rounded-full hover:bg-brand-glow transition-colors tracking-wider uppercase magnetic-btn">
            Hire Me <ArrowUpRight size={14} />
          </a>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-white">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="drawer-overlay absolute inset-0" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 bg-brand-surface border-l border-white/[0.06] p-8 flex flex-col gap-6 animate-reveal">
            <button onClick={() => setMobileOpen(false)} className="self-end p-2 text-brand-muted hover:text-white"><X size={22} /></button>
            {links.map(l => (
              <a key={l.label} href={l.href} onClick={e => handleNavClick(e, l.href)}
                className="text-2xl font-display font-bold text-white/80 hover:text-brand-accent transition-colors">{l.label}</a>
            ))}
            <div className="mt-auto">
              <a href="mailto:farelabid@gmail.com" className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-accent text-black font-bold rounded-full text-sm">
                Get in Touch <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── HERO ─────────────────────────────────────────

function Hero() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const rotatingWord = useRotatingText(["websites", "platforms", "experiences", "solutions"], 2200);
  const [wordAnimating, setWordAnimating] = useState(false);
  const prevWordRef = useRef(rotatingWord);

  // Trigger word transition animation
  useEffect(() => {
    if (prevWordRef.current !== rotatingWord) {
      setWordAnimating(true);
      const t = setTimeout(() => setWordAnimating(false), 400);
      prevWordRef.current = rotatingWord;
      return () => clearTimeout(t);
    }
  }, [rotatingWord]);

  // GSAP hero entrance animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.from('.hero-badge', { y: 20, opacity: 0, duration: 0.7, delay: 1.5 })
        .from('.hero-title-line', { y: 80, opacity: 0, duration: 1, stagger: 0.15 }, '-=0.3')
        .from('.hero-subtitle', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
        .from('.hero-desc', { y: 30, opacity: 0, duration: 0.7 }, '-=0.3')
        .from('.hero-cta', { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
        .from('.hero-stats > div', { y: 30, opacity: 0, duration: 0.5, stagger: 0.1 }, '-=0.3')
        .from('.hero-footer', { opacity: 0, duration: 0.6 }, '-=0.2');
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  return (
    <section ref={heroRef} onMouseMove={handleMouseMove} className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(249, 115, 22, 0.06), transparent 60%)` }}>
      <div className="absolute inset-0 dot-grid opacity-40" />

      {/* Floating decorative elements */}
      <div className="absolute top-1/4 right-[10%] w-64 h-64 rounded-full border border-brand-accent/10 animate-float opacity-30 hidden md:block" />
      <div className="absolute bottom-1/4 left-[5%] w-40 h-40 rounded-full bg-brand-accent/[0.03] blur-2xl" />
      <div className="absolute top-[18%] left-[8%] text-brand-accent/10 animate-float hidden lg:block" style={{ animationDelay: '0.5s' }}><SiReact size={48} /></div>
      <div className="absolute bottom-[22%] right-[8%] text-white/[0.05] animate-float hidden lg:block" style={{ animationDelay: '1.5s' }}><SiNextdotjs size={56} /></div>
      <div className="absolute top-[60%] left-[15%] text-brand-accent/[0.06] animate-float hidden lg:block" style={{ animationDelay: '2.5s' }}><Code2 size={36} /></div>

      <div ref={contentRef} className="max-w-7xl mx-auto w-full px-6 pt-32 pb-20 relative z-10">
        {/* Badge */}
        <div className="hero-badge flex items-center gap-3 mb-10">
          <div className="w-2 h-2 rounded-full bg-brand-accent pulse-glow" />
          <span className="font-mono text-xs text-brand-muted tracking-[0.25em] uppercase">Creative Developer — Based in Jakarta</span>
        </div>

        {/* Title with per-line animation */}
        <div className="overflow-hidden">
          <h1 ref={titleRef} className="font-display text-[clamp(3rem,10vw,9rem)] leading-[0.88] font-black tracking-tight">
            <span className="hero-title-line block text-white">CREATIVE</span>
            <span className="hero-title-line block text-white/50 mt-1">DEV<span className="text-brand-accent">E</span>LOPER</span>
          </h1>
        </div>

        {/* Rotating subtitle with smooth transition */}
        <div className="hero-subtitle mt-8 md:mt-10">
          <p className="font-mono text-sm text-brand-muted tracking-wider">
            I build{' '}
            <span className={`inline-block min-w-[140px] text-brand-accent font-semibold transition-all duration-400 ${wordAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
              {rotatingWord}
            </span>
            <span className="text-brand-accent animate-blink ml-0.5">|</span>
          </p>
        </div>

        <div className="mt-10 md:mt-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div className="max-w-xl hero-desc">
            <p className="text-brand-muted text-lg leading-relaxed font-light">
              Crafting <span className="text-white font-medium">digital experiences</span> that harmonize technical precision with
              aesthetic excellence. Specializing in high-performance web applications built
              with <span className="text-white font-medium">Next.js</span> and modern design systems.
            </p>
            <div className="hero-cta flex gap-4 mt-10">
              <a href="#work" onClick={e => { e.preventDefault(); document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 border border-brand-accent/30 text-brand-accent rounded-full text-sm font-semibold hover:bg-brand-accent hover:text-black transition-all duration-300 tracking-wider uppercase magnetic-btn">
                View Works <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
              </a>
              <a href="mailto:farelabid@gmail.com" className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/10 text-brand-muted hover:text-white hover:border-white/30 transition-all duration-300 magnetic-btn">
                <Mail size={18} />
              </a>
            </div>
          </div>
          <div className="hidden md:flex gap-10 hero-stats">
            {[{ value: '3+', label: 'Years\nExperience' }, { value: '10+', label: 'Projects\nDelivered' }, { value: 'Cum\nLaude', label: 'Informatics\nGraduate' }].map((s, i) => (
              <div key={i} className="text-right">
                <div className="font-display text-2xl font-bold text-white whitespace-pre-line">{s.value}</div>
                <div className="font-mono text-[10px] text-brand-muted tracking-wider uppercase whitespace-pre-line mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-footer absolute bottom-6 left-6 right-6 flex justify-between items-center font-mono text-[10px] text-white/20 tracking-widest uppercase hidden md:flex">
        <span className="flex items-center gap-2"><MapPin size={10} /> Jakarta, Indonesia</span>
        <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" /> Open to Opportunities</span>
        <span>Scroll ↓</span>
      </div>
    </section>
  );
}

// ─── MARQUEE ──────────────────────────────────────

function TechMarquee() {
  const items = [...MARQUEE_TECHS, ...MARQUEE_TECHS];
  return (
    <div className="relative overflow-hidden py-5 border-y border-white/[0.04] bg-brand-surface/30">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0C0A09] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0C0A09] to-transparent z-10" />
      <div className="flex animate-ticker whitespace-nowrap gap-12">
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-3 font-display text-base font-bold uppercase tracking-tight text-white/20 hover:text-white/40 transition-colors">
            <span className="text-brand-accent/30">{t.icon}</span>{t.name}<span className="text-brand-accent/20 text-xs ml-2">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── STATS ────────────────────────────────────────

function StatsBand() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stats = [
    { end: 12, suffix: '+', label: 'Projects Shipped', icon: <Code2 size={20} /> },
    { end: 15000, suffix: '+', label: 'Lines of Code', icon: <Zap size={20} /> },
    { end: 3, suffix: '+', label: 'Years Experience', icon: <Coffee size={20} /> },
    { end: 100, suffix: '%', label: 'Client Satisfaction', icon: <TrendingUp size={20} /> },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.stat-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-brand-accent/[0.03] rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((s, i) => {
            const { count, ref } = useCountUp(s.end, 2200);
            return (
              <div key={i} ref={ref} className="stat-card group relative text-center p-6 md:p-8 rounded-2xl bg-brand-surface/50 border border-white/[0.04] hover:border-brand-accent/15 transition-all duration-500">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-accent/10 text-brand-accent mb-4 group-hover:scale-110 transition-transform duration-300">{s.icon}</div>
                <div className="font-display text-3xl md:text-4xl font-black text-white mb-2 tabular-nums">
                  {s.end > 1000 ? `${(count / 1000).toFixed(count >= s.end ? 0 : 1)}K` : count}<span className="text-brand-accent">{s.suffix}</span>
                </div>
                <div className="font-mono text-[10px] text-brand-muted tracking-wider uppercase">{s.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── SERVICES ─────────────────────────────────────

function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.service-card',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 md:py-36 px-6 relative accent-gradient-bg">
      <div className="max-w-7xl mx-auto">
        <SectionHeader num="01" title="What I" accent="Do" subtitle="End-to-end digital solutions, from concept to deployment." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => (
            <div key={i} className="service-card card-glow p-7 rounded-2xl bg-brand-surface border border-white/[0.04] transition-all duration-500">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${s.color}12`, color: s.color }}>
                {s.icon}
              </div>
              <h3 className="font-display text-sm font-bold text-white mb-3 tracking-wide">{s.title}</h3>
              <p className="text-brand-muted text-xs leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT ────────────────────────────────────────

function About() {
  const [time, setTime] = useState(new Date());
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-28 md:py-36 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader num="02" title="About" accent="Me" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Bio */}
          <div className="about-card md:col-span-7 p-8 md:p-10 bg-brand-surface rounded-2xl border border-white/[0.04] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-accent/[0.03] rounded-full blur-3xl group-hover:bg-brand-accent/[0.06] transition-all duration-700" />
            <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-5 leading-snug relative z-10">Architecting meaningful <br /><span className="text-brand-accent">digital solutions.</span></h3>
            <p className="text-brand-muted leading-relaxed text-[15px] relative z-10 max-w-lg">Cum Laude Informatics Graduate who doesn't just write code, but engineers scalable, user-centric digital systems. Obsessed with performance, clean architecture, and pixel-perfect execution.</p>
            <a href="#" className="inline-flex items-center gap-2 mt-8 text-xs font-semibold text-brand-accent hover:text-brand-glow transition-colors tracking-widest uppercase relative z-10"><Download size={14} /> Download Resume</a>
          </div>

          {/* Photo */}
          <div className="about-card md:col-span-5 rounded-2xl overflow-hidden relative group h-[280px] md:h-auto border border-white/[0.04] bg-brand-surface">
            <img src="assets/farel.png" alt="Farel Abid" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="font-mono text-[10px] text-brand-muted tracking-widest uppercase">{time.toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB</span>
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-green-400 tracking-wider uppercase"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />Online</span>
            </div>
          </div>

          {/* Currently Building */}
          <div className="about-card md:col-span-4 p-6 bg-brand-surface rounded-2xl border border-white/[0.04] relative overflow-hidden group">
            <div className="flex items-center gap-2 mb-4">
              <span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75" /><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-accent" /></span>
              <span className="font-mono text-[10px] text-brand-accent tracking-widest uppercase font-semibold">Currently Building</span>
            </div>
            <h4 className="font-display text-base font-bold text-white mb-1">TJ Radio Jakarta</h4>
            <p className="text-brand-muted text-xs leading-relaxed">Next-gen streaming platform. Low-latency audio, real-time interactivity.</p>
            <div className="flex gap-2 mt-4">
              {[SiNextdotjs, SiReact, SiTypescript].map((Icon, i) => <div key={i} className="w-6 h-6 rounded-md bg-white/[0.04] flex items-center justify-center text-brand-muted"><Icon size={11} /></div>)}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="about-card md:col-span-8 p-6 bg-brand-surface rounded-2xl border border-white/[0.04] flex items-center group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-accent/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="grid grid-cols-4 gap-4 w-full relative z-10">
              {[
                { val: "5", label: "Live Projects", ic: <SiReact className="inline text-brand-accent/60 mr-1" size={14} /> },
                { val: "100%", label: "Client Rating", ic: null },
                { val: "3.8/4", label: "GPA Score", ic: null },
                { val: "24/7", label: "Availability", ic: null },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="font-display text-xl md:text-2xl font-black text-white">{s.ic}{s.val}</div>
                  <div className="font-mono text-[9px] text-brand-muted tracking-wider uppercase mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div className="about-card md:col-span-12 p-6 bg-brand-surface rounded-2xl border border-white/[0.04] flex flex-wrap items-center justify-center md:justify-between gap-4">
            <span className="font-mono text-xs text-brand-muted tracking-widest uppercase">Connect →</span>
            <div className="flex gap-3">
              {SOCIALS.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/[0.06] text-brand-muted hover:text-white hover:border-brand-accent/30 hover:bg-brand-accent/5 transition-all duration-300 magnetic-btn">
                  {s.icon}<span className="text-xs font-medium tracking-wide hidden sm:inline">{s.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SKILLS ───────────────────────────────────────

function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.skill-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 md:py-36 px-6 relative bg-brand-surface/30">
      <div className="max-w-7xl mx-auto">
        <SectionHeader num="03" title="Technical" accent="Expertise" subtitle="Tools and technologies I use to bring ideas to life." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_GROUPS.map((g, gi) => (
            <div key={gi} className="skill-card p-6 rounded-2xl bg-brand-bg border border-white/[0.04] hover:border-white/[0.08] transition-all duration-500 card-lift">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${g.color}15`, color: g.color }}>{g.icon}</div>
                <h3 className="font-display text-sm font-bold tracking-wide text-white">{g.domain}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.skills.map((s, si) => (
                  <span key={si} className="inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-full bg-white/[0.04] text-brand-muted border border-white/[0.04] hover:text-white hover:border-white/10 transition-colors">
                    <span className="opacity-60">{s.icon}</span>{s.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROCESS ──────────────────────────────────────

function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.process-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 md:py-36 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <SectionHeader num="04" title="How I" accent="Work" subtitle="A systematic approach to delivering exceptional results." />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {PROCESS_STEPS.map((step, i) => (
            <div key={i} className="process-card relative p-6 rounded-2xl bg-brand-surface border border-white/[0.04] hover:border-brand-accent/15 transition-all duration-500 card-glow">
              <span className="font-display text-4xl font-black text-brand-accent/10 absolute top-4 right-5">{step.num}</span>
              <div className="relative z-10">
                <h3 className="font-display text-lg font-bold text-white mb-2 mt-6">{step.title}</h3>
                <p className="text-brand-muted text-xs leading-relaxed">{step.desc}</p>
              </div>
              {i < 3 && <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-white/10 to-transparent z-20" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS ─────────────────────────────────────

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: cardRef.current, start: 'top 85%' }
        }
      );
    }, cardRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={cardRef} className="group relative rounded-2xl overflow-hidden border border-white/[0.04] hover:border-brand-accent/20 bg-brand-surface transition-all duration-700 card-lift">
      <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
        <div className="md:w-[55%] relative h-64 md:h-[420px] overflow-hidden">
          <img src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-90" />
          <div className={`absolute inset-0 bg-gradient-to-${isEven ? 'r' : 'l'} from-brand-surface via-brand-surface/50 to-transparent`} />
          {project.featured && (
            <div className="absolute top-5 left-5 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" /><span className="text-[10px] font-bold text-brand-accent tracking-wider uppercase">Featured</span>
            </div>
          )}
        </div>
        <div className="md:w-[45%] p-8 md:p-10 flex flex-col justify-center">
          <span className="font-mono text-xs text-brand-accent tracking-wider mb-3 flex items-center gap-2"><span className="w-4 h-px bg-brand-accent" />{project.role}</span>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight group-hover:text-brand-accent transition-colors duration-300">{project.title}</h3>
          <p className="text-xs font-mono text-brand-muted tracking-wider uppercase mb-5">{project.shortDesc}</p>
          <p className="text-brand-muted text-sm leading-relaxed mb-6 line-clamp-3">{project.description}</p>
          <ul className="space-y-2 mb-6">
            {project.features.slice(0, 3).map((f, i) => <li key={i} className="flex items-center gap-2.5 text-xs text-white/60"><Check size={12} className="text-brand-accent flex-shrink-0" />{f}</li>)}
          </ul>
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            {project.techStack.map((t, i) => (
              <div key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.04] text-brand-muted hover:text-white hover:border-brand-accent/20 transition-all duration-200">
                <t.icon size={12} /><span className="text-[10px] font-mono tracking-wider">{t.label}</span>
              </div>
            ))}
          </div>
          {project.link !== "#" && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-semibold text-brand-accent hover:text-brand-glow transition-colors tracking-widest uppercase group/link">
              <ExternalLink size={14} /> Visit Live <ArrowUpRight size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <section id="work" className="py-28 md:py-36 px-6 relative bg-brand-surface/30">
      <div className="max-w-7xl mx-auto">
        <SectionHeader num="05" title="Selected" accent="Work" subtitle="A curated collection of projects I'm most proud of." />
        <div className="flex flex-col gap-8">
          {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIAL ─────────────────────────────────

function Testimonial() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.testimonial-content',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 md:py-36 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="testimonial-content max-w-3xl mx-auto text-center">
        <div className="testimonial-quote relative">
          <p className="font-display text-xl md:text-2xl font-bold text-white leading-relaxed mb-8">
            Farel delivered beyond expectations. His attention to detail and understanding of what we needed for our digital platform was{' '}
            <span className="text-brand-accent">exceptional</span>.
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-full bg-brand-surface border border-white/[0.06] flex items-center justify-center font-display font-bold text-brand-accent text-sm">MK</div>
          <div className="text-left">
            <div className="text-sm font-semibold text-white">Media Kawal Jakarta</div>
            <div className="text-xs text-brand-muted font-mono tracking-wider">Client — 2025</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── EXPERIENCE ───────────────────────────────────

function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.exp-item',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 md:py-36 px-6 relative bg-brand-surface/30">
      <div className="max-w-4xl mx-auto">
        <SectionHeader num="06" title="Experience" accent="Log" />
        <div className="space-y-0 border-l border-white/[0.06] ml-3">
          {EXPERIENCES.map((exp, i) => (
            <div key={i} className="exp-item relative pl-10 pb-14 last:pb-0">
              <div className={`absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${exp.active ? 'bg-brand-accent border-brand-accent shadow-[0_0_12px_rgba(249,115,22,0.4)]' : 'bg-brand-bg border-white/20'}`} />
              <span className={`font-mono text-xs tracking-wider block mb-2 ${exp.active ? 'text-brand-accent' : 'text-brand-muted'}`}>{exp.year}</span>
              <h3 className="font-display text-lg font-bold text-white mb-0.5">{exp.role}</h3>
              <h4 className="text-sm text-brand-muted mb-3 tracking-wide">{exp.company}</h4>
              <p className="text-sm text-white/40 leading-relaxed max-w-lg">{exp.desc}</p>
              {exp.active && (
                <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /><span className="text-[10px] font-bold text-green-400 tracking-wider uppercase">Currently Here</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── BACK TO TOP ──────────────────────────────────

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setVisible(window.scrollY > 600);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-brand-surface border border-white/[0.08] text-brand-muted hover:text-brand-accent hover:border-brand-accent/30 flex items-center justify-center transition-all duration-500 magnetic-btn ${visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      aria-label="Back to top"
    >
      <ArrowUp size={18} />
    </button>
  );
}

// ─── FOOTER ───────────────────────────────────────

function Footer() {
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const handleCopy = () => { navigator.clipboard.writeText("farelabid@gmail.com"); setCopied(true); setTimeout(() => setCopied(false), 2500); };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.footer-content',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer id="contact" ref={sectionRef} className="px-6 py-28 md:py-36 relative overflow-hidden border-t border-white/[0.04]">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-accent/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="footer-content max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] text-brand-muted text-xs font-mono tracking-widest uppercase mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Available for new projects
        </div>
        <h2 className="font-display text-5xl md:text-8xl font-black tracking-tight text-white mb-4 leading-none">Let's <span className="text-brand-accent">Talk</span></h2>
        <p className="text-brand-muted text-lg mb-12 max-w-md mx-auto">Got a project in mind? I'd love to hear about it.</p>
        <button onClick={handleCopy} className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-brand-bg font-bold rounded-full text-sm hover:bg-brand-accent hover:text-black transition-all duration-300 font-mono tracking-wider magnetic-btn">
          {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}{copied ? "Copied!" : "farelabid@gmail.com"}
        </button>
        <div className="mt-24 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-mono text-white/20 tracking-wider uppercase border-t border-white/[0.04] pt-10">
          <p>© {new Date().getFullYear()} Farel Abid</p>
          <div className="flex gap-6">{SOCIALS.map((s, i) => <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-brand-accent transition-colors">{s.label}</a>)}</div>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────

export default function App() {
  return (
    <div className="noise-bg min-h-screen font-body overflow-x-hidden cursor-none md:cursor-none">
      <Preloader />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <Hero />
      <TechMarquee />
      <StatsBand />
      <Services />
      <About />
      <Skills />
      <Process />
      <Projects />
      <Testimonial />
      <Experience />
      <Footer />
      <BackToTop />
    </div>
  );
}