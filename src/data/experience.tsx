import { Layout, Palette, Cpu, Sparkles } from 'lucide-react';
import { Github, Linkedin, Mail, Instagram } from 'lucide-react';

export const EXPERIENCES = [
  { year: "2025 — Present", company: "Media Kawal Jakarta", role: "IT & Fullstack Engineer",
    desc: "Leading tech infrastructure and fullstack development. Architecting a unified digital ecosystem for Jakarta's next-generation media network.", active: true },
  { year: "2023 — 2024", company: "Cont Solutions Indonesia", role: "Creative Developer",
    desc: "Designed and engineered interactive corporate web experiences. Complex GSAP animations and pixel-perfect UI implementation." },
  { year: "2021 — 2023", company: "University Events", role: "Head of Creative Documentation",
    desc: "Directed visual storytelling for major campus events. Managed multimedia teams and established visual identity standards." },
  { year: "2019 — 2021", company: "Freelance", role: "Visual Content Creator",
    desc: "Professional photography and videography for commercial clients. High-end visual assets for events and brand profiling." },
];

export const SOCIALS = [
  { icon: <Github size={18} />, label: "GitHub", href: "https://github.com/Farelabid" },
  { icon: <Linkedin size={18} />, label: "LinkedIn", href: "https://linkedin.com/in/farelabid" },
  { icon: <Instagram size={18} />, label: "Instagram", href: "https://instagram.com/farel_abid" },
  { icon: <Mail size={18} />, label: "Email", href: "mailto:farelabid@gmail.com" },
];

export const SERVICES = [
  { icon: <Layout size={24} />, title: "Web Development", desc: "High-performance web apps built with Next.js, React, and modern frameworks. From landing pages to complex platforms.", color: "#F97316" },
  { icon: <Palette size={24} />, title: "UI/UX Design", desc: "Pixel-perfect interfaces with intuitive user flows. Design systems that scale from concept to production.", color: "#EC4899" },
  { icon: <Cpu size={24} />, title: "AI Solutions", desc: "Intelligent systems powered by LLMs and RAG architectures. Chatbots, search engines, and automation tools.", color: "#8B5CF6" },
  { icon: <Sparkles size={24} />, title: "Creative Media", desc: "Visual storytelling through photography, videography, and motion design. Premium content for brands and events.", color: "#06B6D4" },
];

export const PROCESS_STEPS = [
  { num: "01", title: "Discover", desc: "Deep-dive into your goals, audience, and technical requirements." },
  { num: "02", title: "Design", desc: "Wireframes and high-fidelity prototypes. Every pixel intentional." },
  { num: "03", title: "Develop", desc: "Clean, scalable code with performance-first architecture." },
  { num: "04", title: "Deploy", desc: "Launch, monitor, and iterate. Continuous improvement post-launch." },
];
