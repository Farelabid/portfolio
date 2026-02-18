import {
  SiReact, SiTailwindcss, SiNextdotjs, SiPython,
  SiGreensock, SiOpenai, SiLangchain, SiVite, SiTensorflow,
  SiTypescript, SiSupabase
} from 'react-icons/si';

export const PROJECTS = [
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
