import { useState, useEffect, useRef, type ReactNode } from 'react';
import {
  ArrowUpRight, Github, Linkedin, Mail, Instagram,
  Check, Download, Menu, X, ExternalLink,
  Smartphone, Brain, Palette, Globe, Film,
  ChevronDown, Copy, MapPin, Coffee, Code2, Zap, TrendingUp,
  Layout, Cpu, Sparkles
} from 'lucide-react';
import {
  SiReact, SiTailwindcss, SiNextdotjs, SiPython, SiFigma,
  SiGreensock, SiOpenai, SiLangchain, SiVite, SiTensorflow,
  SiFlutter, SiKotlin, SiTypescript, SiSupabase,
  SiAdobepremierepro, SiAdobephotoshop, SiAdobeillustrator
} from 'react-icons/si';

// ─── DATA ─────────────────────────────────────────

const PROJECTS = [
  {
    id: 1, title: "Media Kawal Jakarta", role: "Lead Fullstack Engineer",
    shortDesc: "Digital Ecosystem Platform",
    description: "Architected a comprehensive digital ecosystem for Jakarta's leading media network. Integrating real-time news delivery, community tools, and scalable CMS into a unified platform.",
    tags: ["Next.js", "React", "Supabase", "Architecture"],
    image: "https://images.unsplash.com/photo-1504711434969-e33886168d9c?q=80&w=2670&auto=format&fit=crop",
    features: ["Unified digital ecosystem", "Real-time news aggregation", "Interactive community platform", "High-availability CDN"],
    techStack: [{ icon: SiNextdotjs, label: "Next.js" }, { icon: SiReact, label: "React" }, { icon: SiTailwindcss, label: "Tailwind" }, { icon: SiSupabase, label: "Supabase" }],
    link: "https://mediakawaljakarta.id", featured: true
  },
  {
    id: 2, title: "TJ Radio Jakarta", role: "Fullstack Developer",
    shortDesc: "Live Streaming Platform",
    description: "Revolutionizing digital radio. Low-latency streaming, interactive schedules, social integration, and responsive audio visualization for maximum engagement.",
    tags: ["Next.js", "Audio Streaming", "WebSockets", "SSR"],
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2670&auto=format&fit=crop",
    features: ["Low-latency audio streaming", "Real-time interactive schedule", "Live listener engagement", "Audio visualization"],
    techStack: [{ icon: SiNextdotjs, label: "Next.js" }, { icon: SiReact, label: "React" }, { icon: SiTailwindcss, label: "Tailwind" }, { icon: SiTypescript, label: "TypeScript" }],
    link: "https://www.tjradiojakarta.com", featured: true
  },
  {
    id: 3, title: "Jakarta Comedy Battle", role: "Frontend Engineer",
    shortDesc: "Event Experience Platform",
    description: "Official platform for Jakarta's biggest stand-up comedy event. High-performance registration, real-time QR validation, and immersive GSAP-powered gallery.",
    tags: ["Vite", "React", "GSAP", "Event Tech"],
    image: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?q=80&w=2671&auto=format&fit=crop",
    features: ["Seamless ticket registration", "Real-time QR access control", "Immersive GSAP animations", "Dynamic winner showcase"],
    techStack: [{ icon: SiVite, label: "Vite" }, { icon: SiReact, label: "React" }, { icon: SiGreensock, label: "GSAP" }, { icon: SiSupabase, label: "Supabase" }],
    link: "https://www.jakartacomedybattle.com", featured: true
  },
  {
    id: 4, title: "Chatbot Akademik (TA)", role: "AI Engineer",
    shortDesc: "Llama 3.1 RAG System",
    description: "Academic virtual assistant powered by RAG with Llama 3.1. Context-aware responses from university knowledge bases with multi-turn conversation.",
    tags: ["Python", "Generative AI", "RAG", "LLM"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2832&auto=format&fit=crop",
    features: ["LLM integration", "Vector database retrieval", "Natural Language Understanding", "Multi-turn conversation"],
    techStack: [{ icon: SiPython, label: "Python" }, { icon: SiLangchain, label: "LangChain" }, { icon: SiOpenai, label: "OpenAI" }, { icon: SiTensorflow, label: "TensorFlow" }],
    link: "#", featured: false
  },
  {
    id: 5, title: "Cont Solutions Indo", role: "Creative Developer",
    shortDesc: "Corporate Experience",
    description: "Modern corporate presence with GSAP scroll effects and glassmorphism design. Premium brand showcase optimized for Core Web Vitals.",
    tags: ["React", "GSAP", "Corporate"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
    features: ["Parallax scroll effects", "Glassmorphism UI", "Performance-optimized", "Dynamic content"],
    techStack: [{ icon: SiReact, label: "React" }, { icon: SiGreensock, label: "GSAP" }, { icon: SiTailwindcss, label: "Tailwind" }],
    link: "https://contsoldev.com/", featured: false
  }
];

type SkillItem = { name: string; icon: ReactNode };
const SKILL_GROUPS: { domain: string; icon: ReactNode; color: string; skills: SkillItem[] }[] = [
  { domain: "Frontend", icon: <Globe size={18} />, color: "#F97316", skills: [
    { name: "React", icon: <SiReact size={13} /> }, { name: "Next.js", icon: <SiNextdotjs size={13} /> },
    { name: "TypeScript", icon: <SiTypescript size={13} /> }, { name: "Vite", icon: <SiVite size={13} /> },
    { name: "Tailwind", icon: <SiTailwindcss size={13} /> }, { name: "GSAP", icon: <SiGreensock size={13} /> },
  ]},
  { domain: "Creative Design", icon: <Palette size={18} />, color: "#EC4899", skills: [
    { name: "Figma", icon: <SiFigma size={13} /> }, { name: "Illustrator", icon: <SiAdobeillustrator size={13} /> },
    { name: "Photoshop", icon: <SiAdobephotoshop size={13} /> }, { name: "UI/UX", icon: <Palette size={13} /> },
  ]},
  { domain: "Backend & AI", icon: <Brain size={18} />, color: "#8B5CF6", skills: [
    { name: "Python", icon: <SiPython size={13} /> }, { name: "Supabase", icon: <SiSupabase size={13} /> },
    { name: "LangChain", icon: <SiLangchain size={13} /> }, { name: "OpenAI", icon: <SiOpenai size={13} /> },
    { name: "TensorFlow", icon: <SiTensorflow size={13} /> },
  ]},
  { domain: "Media", icon: <Film size={18} />, color: "#06B6D4", skills: [
    { name: "Premiere", icon: <SiAdobepremierepro size={13} /> },
    { name: "Photography", icon: <Film size={13} /> }, { name: "Videography", icon: <Film size={13} /> },
  ]},
  { domain: "Mobile", icon: <Smartphone size={18} />, color: "#22C55E", skills: [
    { name: "Flutter", icon: <SiFlutter size={13} /> }, { name: "Kotlin", icon: <SiKotlin size={13} /> },
    { name: "Responsive", icon: <Smartphone size={13} /> },
  ]}
];

const EXPERIENCES = [
  { year: "2025 — Present", company: "Media Kawal Jakarta", role: "IT & Fullstack Engineer",
    desc: "Leading tech infrastructure and fullstack development. Architecting a unified digital ecosystem for Jakarta's next-generation media network.", active: true },
  { year: "2023 — 2024", company: "Cont Solutions Indonesia", role: "Creative Developer",
    desc: "Designed and engineered interactive corporate web experiences. Complex GSAP animations and pixel-perfect UI implementation." },
  { year: "2021 — 2023", company: "University Events", role: "Head of Creative Documentation",
    desc: "Directed visual storytelling for major campus events. Managed multimedia teams and established visual identity standards." },
  { year: "2019 — 2021", company: "Freelance", role: "Visual Content Creator",
    desc: "Professional photography and videography for commercial clients. High-end visual assets for events and brand profiling." },
];

const SOCIALS = [
  { icon: <Github size={18} />, label: "GitHub", href: "https://github.com/Farelabid" },
  { icon: <Linkedin size={18} />, label: "LinkedIn", href: "https://linkedin.com/in/farelabid" },
  { icon: <Instagram size={18} />, label: "Instagram", href: "https://instagram.com/farel_abid" },
  { icon: <Mail size={18} />, label: "Email", href: "mailto:farelabid@gmail.com" },
];

const MARQUEE_TECHS: { name: string; icon: ReactNode }[] = [
  { name: "Next.js", icon: <SiNextdotjs size={16} /> }, { name: "React", icon: <SiReact size={16} /> },
  { name: "TypeScript", icon: <SiTypescript size={16} /> }, { name: "Vite", icon: <SiVite size={16} /> },
  { name: "Tailwind", icon: <SiTailwindcss size={16} /> }, { name: "Figma", icon: <SiFigma size={16} /> },
  { name: "Supabase", icon: <SiSupabase size={16} /> }, { name: "Python", icon: <SiPython size={16} /> },
  { name: "Flutter", icon: <SiFlutter size={16} /> }, { name: "GSAP", icon: <SiGreensock size={16} /> },
];

const SERVICES = [
  { icon: <Layout size={24} />, title: "Web Development", desc: "High-performance web apps built with Next.js, React, and modern frameworks. From landing pages to complex platforms.", color: "#F97316" },
  { icon: <Palette size={24} />, title: "UI/UX Design", desc: "Pixel-perfect interfaces with intuitive user flows. Design systems that scale from concept to production.", color: "#EC4899" },
  { icon: <Cpu size={24} />, title: "AI Solutions", desc: "Intelligent systems powered by LLMs and RAG architectures. Chatbots, search engines, and automation tools.", color: "#8B5CF6" },
  { icon: <Sparkles size={24} />, title: "Creative Media", desc: "Visual storytelling through photography, videography, and motion design. Premium content for brands and events.", color: "#06B6D4" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Discover", desc: "Deep-dive into your goals, audience, and technical requirements." },
  { num: "02", title: "Design", desc: "Wireframes and high-fidelity prototypes. Every pixel intentional." },
  { num: "03", title: "Develop", desc: "Clean, scalable code with performance-first architecture." },
  { num: "04", title: "Deploy", desc: "Launch, monitor, and iterate. Continuous improvement post-launch." },
];

// ─── HOOKS ────────────────────────────────────────

function useInView(threshold = 0.15) {
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

function useCountUp(end: number, duration = 2000, startOnView = true) {
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

function useRotatingText(words: string[], interval = 2500) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);
  return words[index];
}

// ─── COMPONENTS ───────────────────────────────────

function SectionHeader({ num, title, accent, subtitle }: { num: string; title: string; accent: string; subtitle?: string }) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`mb-16 md:mb-20 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  const links = [{ label: 'Work', href: '#work' }, { label: 'About', href: '#about' }, { label: 'Contact', href: '#contact' }];
  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 glass' : 'py-6 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="font-display font-bold text-lg tracking-tight group flex items-center gap-1.5">
            <span className="text-brand-accent">F</span><span className="text-white/90 group-hover:text-white transition-colors">Abid</span>
          </a>
          <div className="hidden md:flex items-center gap-1 bg-brand-surface/60 backdrop-blur-xl px-1.5 py-1.5 rounded-full border border-white/[0.04]">
            {links.map(l => <a key={l.label} href={l.href} className="px-5 py-2 text-xs font-medium text-brand-muted hover:text-white hover:bg-white/[0.06] rounded-full transition-all duration-200 tracking-widest uppercase">{l.label}</a>)}
          </div>
          <a href="mailto:farelabid@gmail.com" className="hidden md:flex items-center gap-2 px-5 py-2.5 text-xs font-semibold bg-brand-accent text-black rounded-full hover:bg-brand-glow transition-colors tracking-wider uppercase">Hire Me <ArrowUpRight size={14} /></a>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-white">{mobileOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </nav>
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="drawer-overlay absolute inset-0" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 bg-brand-surface border-l border-white/[0.06] p-8 flex flex-col gap-6 animate-reveal">
            <button onClick={() => setMobileOpen(false)} className="self-end p-2 text-brand-muted hover:text-white"><X size={22} /></button>
            {links.map(l => <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)} className="text-2xl font-display font-bold text-white/80 hover:text-brand-accent transition-colors">{l.label}</a>)}
            <div className="mt-auto"><a href="mailto:farelabid@gmail.com" className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-accent text-black font-bold rounded-full text-sm">Get in Touch <ArrowUpRight size={16} /></a></div>
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
  const rotatingWord = useRotatingText(["websites", "platforms", "experiences", "solutions"], 2200);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  return (
    <section ref={heroRef} onMouseMove={handleMouseMove} className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(249, 115, 22, 0.06), transparent 60%)` }}>
      <div className="absolute inset-0 dot-grid opacity-40" />
      <div className="absolute top-1/4 right-[10%] w-64 h-64 rounded-full border border-brand-accent/10 animate-float opacity-30 hidden md:block" />
      <div className="absolute bottom-1/4 left-[5%] w-40 h-40 rounded-full bg-brand-accent/[0.03] blur-2xl" />
      <div className="absolute top-[18%] left-[8%] text-brand-accent/10 animate-float hidden lg:block" style={{ animationDelay: '0.5s' }}><SiReact size={48} /></div>
      <div className="absolute bottom-[22%] right-[8%] text-white/[0.05] animate-float hidden lg:block" style={{ animationDelay: '1.5s' }}><SiNextdotjs size={56} /></div>
      <div className="absolute top-[60%] left-[15%] text-brand-accent/[0.06] animate-float hidden lg:block" style={{ animationDelay: '2.5s' }}><Code2 size={36} /></div>

      <div className="max-w-7xl mx-auto w-full px-6 pt-32 pb-20 relative z-10">
        <div className="reveal reveal-d1 flex items-center gap-3 mb-10">
          <div className="w-2 h-2 rounded-full bg-brand-accent pulse-glow" />
          <span className="font-mono text-xs text-brand-muted tracking-[0.25em] uppercase">Creative Developer — Based in Jakarta</span>
        </div>

        <div className="reveal reveal-d2">
          <h1 className="font-display text-[clamp(3rem,10vw,9rem)] leading-[0.88] font-black tracking-tight">
            <span className="block text-white">CREATIVE</span>
            <span className="block text-white/50 mt-1">DEV<span className="text-brand-accent">E</span>LOPER</span>
          </h1>
        </div>

        {/* Rotating subtitle */}
        <div className="reveal reveal-d3 mt-8 md:mt-10">
          <p className="font-mono text-sm text-brand-muted tracking-wider">
            I build <span className="inline-block min-w-[140px] text-brand-accent font-semibold transition-all duration-500">{rotatingWord}</span>
            <span className="text-brand-accent animate-blink ml-0.5">|</span>
          </p>
        </div>

        <div className="mt-10 md:mt-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div className="max-w-xl reveal reveal-d4">
            <p className="text-brand-muted text-lg leading-relaxed font-light">
              Crafting <span className="text-white font-medium">digital experiences</span> that harmonize technical precision with
              aesthetic excellence. Specializing in high-performance web applications built
              with <span className="text-white font-medium">Next.js</span> and modern design systems.
            </p>
            <div className="flex gap-4 mt-10">
              <a href="#work" className="group inline-flex items-center gap-2.5 px-7 py-3.5 border border-brand-accent/30 text-brand-accent rounded-full text-sm font-semibold hover:bg-brand-accent hover:text-black transition-all duration-300 tracking-wider uppercase">
                View Works <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
              </a>
              <a href="mailto:farelabid@gmail.com" className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/10 text-brand-muted hover:text-white hover:border-white/30 transition-all duration-300"><Mail size={18} /></a>
            </div>
          </div>
          <div className="hidden md:flex gap-10 reveal reveal-d5">
            {[{ value: '3+', label: 'Years\nExperience' }, { value: '10+', label: 'Projects\nDelivered' }, { value: 'Cum\nLaude', label: 'Informatics\nGraduate' }].map((s, i) => (
              <div key={i} className="text-right">
                <div className="font-display text-2xl font-bold text-white whitespace-pre-line">{s.value}</div>
                <div className="font-mono text-[10px] text-brand-muted tracking-wider uppercase whitespace-pre-line mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center font-mono text-[10px] text-white/20 tracking-widest uppercase hidden md:flex">
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
  const stats = [
    { end: 12, suffix: '+', label: 'Projects Shipped', icon: <Code2 size={20} /> },
    { end: 15000, suffix: '+', label: 'Lines of Code', icon: <Zap size={20} /> },
    { end: 3, suffix: '+', label: 'Years Experience', icon: <Coffee size={20} /> },
    { end: 100, suffix: '%', label: 'Client Satisfaction', icon: <TrendingUp size={20} /> },
  ];
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-brand-accent/[0.03] rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((s, i) => {
            const { count, ref } = useCountUp(s.end, 2200);
            return (
              <div key={i} ref={ref} className="group relative text-center p-6 md:p-8 rounded-2xl bg-brand-surface/50 border border-white/[0.04] hover:border-brand-accent/15 transition-all duration-500">
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
  return (
    <section className="py-28 md:py-36 px-6 relative accent-gradient-bg">
      <div className="max-w-7xl mx-auto">
        <SectionHeader num="01" title="What I" accent="Do" subtitle="End-to-end digital solutions, from concept to deployment." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => {
            const { ref, inView } = useInView(0.1);
            return (
              <div key={i} ref={ref}
                className={`card-glow p-7 rounded-2xl bg-brand-surface border border-white/[0.04] transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${s.color}12`, color: s.color }}>
                  {s.icon}
                </div>
                <h3 className="font-display text-sm font-bold text-white mb-3 tracking-wide">{s.title}</h3>
                <p className="text-brand-muted text-xs leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT ────────────────────────────────────────

function About() {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);

  return (
    <section id="about" className="py-28 md:py-36 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader num="02" title="About" accent="Me" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Bio */}
          <div className="md:col-span-7 p-8 md:p-10 bg-brand-surface rounded-2xl border border-white/[0.04] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-accent/[0.03] rounded-full blur-3xl group-hover:bg-brand-accent/[0.06] transition-all duration-700" />
            <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-5 leading-snug relative z-10">Architecting meaningful <br /><span className="text-brand-accent">digital solutions.</span></h3>
            <p className="text-brand-muted leading-relaxed text-[15px] relative z-10 max-w-lg">Cum Laude Informatics Graduate who doesn't just write code, but engineers scalable, user-centric digital systems. Obsessed with performance, clean architecture, and pixel-perfect execution.</p>
            <a href="#" className="inline-flex items-center gap-2 mt-8 text-xs font-semibold text-brand-accent hover:text-brand-glow transition-colors tracking-widest uppercase relative z-10"><Download size={14} /> Download Resume</a>
          </div>

          {/* Photo */}
          <div className="md:col-span-5 rounded-2xl overflow-hidden relative group h-[280px] md:h-auto border border-white/[0.04] bg-brand-surface">
            <img src="assets/farel.png" alt="Farel Abid" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="font-mono text-[10px] text-brand-muted tracking-widest uppercase">{time.toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta' })} WIB</span>
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-green-400 tracking-wider uppercase"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />Online</span>
            </div>
          </div>

          {/* Currently Building */}
          <div className="md:col-span-4 p-6 bg-brand-surface rounded-2xl border border-white/[0.04] relative overflow-hidden group">
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
          <div className="md:col-span-8 p-6 bg-brand-surface rounded-2xl border border-white/[0.04] flex items-center group relative overflow-hidden">
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
          <div className="md:col-span-12 p-6 bg-brand-surface rounded-2xl border border-white/[0.04] flex flex-wrap items-center justify-center md:justify-between gap-4">
            <span className="font-mono text-xs text-brand-muted tracking-widest uppercase">Connect →</span>
            <div className="flex gap-3">
              {SOCIALS.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/[0.06] text-brand-muted hover:text-white hover:border-brand-accent/30 hover:bg-brand-accent/5 transition-all duration-300">
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
  return (
    <section className="py-28 md:py-36 px-6 relative bg-brand-surface/30">
      <div className="max-w-7xl mx-auto">
        <SectionHeader num="03" title="Technical" accent="Expertise" subtitle="Tools and technologies I use to bring ideas to life." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_GROUPS.map((g, gi) => {
            const { ref, inView } = useInView(0.1);
            return (
              <div key={gi} ref={ref} className={`p-6 rounded-2xl bg-brand-bg border border-white/[0.04] hover:border-white/[0.08] transition-all duration-500 card-lift ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: `${gi * 80}ms` }}>
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
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── PROCESS ──────────────────────────────────────

function Process() {
  return (
    <section className="py-28 md:py-36 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <SectionHeader num="04" title="How I" accent="Work" subtitle="A systematic approach to delivering exceptional results." />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {PROCESS_STEPS.map((step, i) => {
            const { ref, inView } = useInView(0.1);
            return (
              <div key={i} ref={ref} className={`relative p-6 rounded-2xl bg-brand-surface border border-white/[0.04] hover:border-brand-accent/15 transition-all duration-500 card-glow ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: `${i * 120}ms` }}>
                <span className="font-display text-4xl font-black text-brand-accent/10 absolute top-4 right-5">{step.num}</span>
                <div className="relative z-10">
                  <h3 className="font-display text-lg font-bold text-white mb-2 mt-6">{step.title}</h3>
                  <p className="text-brand-muted text-xs leading-relaxed">{step.desc}</p>
                </div>
                {i < 3 && <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-white/10 to-transparent z-20" />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS ─────────────────────────────────────

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const { ref, inView } = useInView(0.1);
  const isEven = index % 2 === 0;
  return (
    <div ref={ref} className={`group relative rounded-2xl overflow-hidden border border-white/[0.04] hover:border-brand-accent/20 bg-brand-surface transition-all duration-700 card-lift ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
        <div className="md:w-[55%] relative h-64 md:h-[420px] overflow-hidden">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-90" />
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
  const { ref, inView } = useInView(0.1);
  return (
    <section className="py-28 md:py-36 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div ref={ref} className={`max-w-3xl mx-auto text-center transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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
  return (
    <section className="py-28 md:py-36 px-6 relative bg-brand-surface/30">
      <div className="max-w-4xl mx-auto">
        <SectionHeader num="06" title="Experience" accent="Log" />
        <div className="space-y-0 border-l border-white/[0.06] ml-3">
          {EXPERIENCES.map((exp, i) => {
            const { ref, inView } = useInView(0.1);
            return (
              <div key={i} ref={ref} className={`relative pl-10 pb-14 last:pb-0 transition-all duration-600 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: `${i * 100}ms` }}>
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
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────

function Footer() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText("farelabid@gmail.com"); setCopied(true); setTimeout(() => setCopied(false), 2500); };
  const { ref, inView } = useInView(0.1);

  return (
    <footer id="contact" className="px-6 py-28 md:py-36 relative overflow-hidden border-t border-white/[0.04]">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-accent/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div ref={ref} className="max-w-4xl mx-auto text-center relative z-10">
        <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] text-brand-muted text-xs font-mono tracking-widest uppercase mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Available for new projects
          </div>
          <h2 className="font-display text-5xl md:text-8xl font-black tracking-tight text-white mb-4 leading-none">Let's <span className="text-brand-accent">Talk</span></h2>
          <p className="text-brand-muted text-lg mb-12 max-w-md mx-auto">Got a project in mind? I'd love to hear about it.</p>
          <button onClick={handleCopy} className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-brand-bg font-bold rounded-full text-sm hover:bg-brand-accent hover:text-black transition-all duration-300 font-mono tracking-wider">
            {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}{copied ? "Copied!" : "farelabid@gmail.com"}
          </button>
        </div>
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
    <div className="noise-bg min-h-screen font-body overflow-x-hidden">
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
    </div>
  );
}