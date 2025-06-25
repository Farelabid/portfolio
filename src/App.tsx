import { useState, useEffect, useRef, type JSX } from 'react';
import { 
  Menu, 
  X, 
  Github, 
  Linkedin, 
  Mail, 
  Instagram,
  Download,
  ExternalLink,
  Code,
  Palette,
  Film,
  Camera,
  Smartphone,
  Monitor,
  Cpu,
  Aperture,
  Youtube,
  Zap,
  Sparkles,
  Gamepad2,
  Headphones,
  Rocket,
  Brain,
  Play,
  Eye
} from 'lucide-react';

// Import react-icons
import { 
  SiAdobepremierepro,
  SiAdobeaftereffects,
  SiAdobephotoshop,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiFigma,
  SiPython,
  SiOllama,
  SiFlutter,
  SiNextdotjs
} from 'react-icons/si';

// Types
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
}

interface Project {
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  link?: string;
  icon: JSX.Element;
  category: string;
  hot?: boolean;
  image?: string;
  videoId?: string;
  features?: string[];
  techStack?: string[];
}

interface Skill {
  name: string;
  level: number;
  icon: JSX.Element;
  color: string;
}

interface Equipment {
  category: string;
  items: { name: string; desc: string }[];
  icon: JSX.Element;
}

interface TechLogo {
  name: string;
  icon: JSX.Element;
  color: string;
}

interface IsVisible {
  [key: string]: boolean;
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isVisible, setIsVisible] = useState<IsVisible>({});
  const [activeFilter, setActiveFilter] = useState('all');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const fullText = "Creative Developer";
  const typingSpeed = 100;

  // Refs for sections
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});

  // Mouse move effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Create particles on mount
  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10
    }));
    setParticles(newParticles);
  }, []);

  // Typing effect
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, typingSpeed);

    return () => clearInterval(timer);
  }, []);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionsRef.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const projects: Project[] = [
    {
      title: "Chatbot Akademik (TA)",
      description: "AI Chatbot using Llama 3.1 & RAG for student academic services",
      longDescription: "Tugas Akhir saya mengimplementasikan teknologi Retrieval-Augmented Generation (RAG) dengan Llama 3.1 untuk menciptakan chatbot akademik yang dapat membantu mahasiswa Informatika dalam layanan akademik. Chatbot ini dapat menjawab pertanyaan seputar kurikulum, jadwal, dosen, dan informasi akademik lainnya dengan akurasi tinggi.",
      tags: ["Python", "Llama 3.1", "RAG", "Ollama", "AI/ML"],
      icon: <Brain className="w-5 h-5" />,
      category: 'dev',
      hot: true,
      image: "https://via.placeholder.com/800x600/1e1b4b/6366f1?text=Chatbot+Akademik",
      features: [
        "Natural Language Understanding",
        "Context-aware responses",
        "Academic database integration",
        "Real-time query processing",
        "Multi-turn conversation support"
      ],
      techStack: ["Python", "LangChain", "Ollama", "ChromaDB", "FastAPI", "React"]
    },
    {
      title: "Cont Solutions Indonesia",
      description: "Company website with sick animations and modern vibes",
      longDescription: "Developed a modern, responsive company website for Cont Solutions Indonesia featuring smooth animations, glassmorphism effects, and optimized performance. The site showcases the company's services and portfolio with an engaging user experience.",
      tags: ["React", "Tailwind CSS", "GSAP"],
      link: "https://contsoldev.com/",
      icon: <Monitor className="w-5 h-5" />,
      category: 'dev',
      hot: true,
      image: "https://via.placeholder.com/800x600/1e1b4b/6366f1?text=Cont+Solutions",
      features: [
        "Responsive design",
        "Smooth animations",
        "SEO optimized",
        "Fast loading times",
        "Modern UI/UX"
      ]
    },
    {
      title: "JakNews Portal",
      description: "News portal UI that slaps different",
      longDescription: "Designed a comprehensive UI/UX for a modern news portal application. The design focuses on readability, user engagement, and seamless content discovery with a clean and intuitive interface.",
      tags: ["Figma", "UI/UX", "Design System"],
      icon: <Palette className="w-5 h-5" />,
      category: 'design',
      image: "https://via.placeholder.com/800x600/1e1b4b/6366f1?text=JakNews+Portal",
      features: [
        "Clean typography",
        "Dark mode support",
        "Category-based navigation",
        "Interactive components",
        "Mobile-first approach"
      ]
    },
    {
      title: "KerjaSini Mobile",
      description: "Job app that actually looks good",
      longDescription: "Created a user-friendly mobile application design for job seekers and employers. The app features intuitive job search, application tracking, and profile management with a modern, clean aesthetic.",
      tags: ["Figma", "Mobile UI", "UX"],
      icon: <Smartphone className="w-5 h-5" />,
      category: 'design',
      image: "https://via.placeholder.com/800x600/1e1b4b/6366f1?text=KerjaSini+App",
      features: [
        "Swipe-based job browsing",
        "Smart filtering system",
        "In-app messaging",
        "Application tracking",
        "Profile builder"
      ]
    },
    {
      title: "Putra Budaya Yogya",
      description: "Cultural video that hits different",
      longDescription: "Produced and edited a cultural advocacy video showcasing the rich heritage of Yogyakarta. The video features traditional arts, interviews with cultural figures, and stunning cinematography of historical sites.",
      tags: ["Premiere Pro", "Cinematography", "Color Grading"],
      link: "https://youtu.be/jf2qJ0xxI_g",
      icon: <Film className="w-5 h-5" />,
      category: 'video',
      hot: true,
      videoId: "jf2qJ0xxI_g",
      features: [
        "4K resolution",
        "Cinematic color grading",
        "Professional audio mixing",
        "Motion graphics",
        "Cultural storytelling"
      ]
    },
    {
      title: "Informatika 2021",
      description: "Class video with epic transitions",
      longDescription: "Created an engaging promotional video for the Informatics class of 2021, featuring dynamic transitions, student testimonials, and campus life highlights with professional editing and effects.",
      tags: ["Premiere Pro", "After Effects", "Motion Graphics"],
      link: "https://youtu.be/B1BlRRTrRI8",
      icon: <Film className="w-5 h-5" />,
      category: 'video',
      videoId: "B1BlRRTrRI8",
      features: [
        "Dynamic transitions",
        "Motion tracking",
        "Typography animation",
        "Sound design",
        "Color correction"
      ]
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const skills: Skill[] = [
    { name: "Frontend Dev", level: 90, icon: <Code />, color: "from-indigo-500 to-blue-500" },
    { name: "UI/UX Design", level: 85, icon: <Palette />, color: "from-purple-500 to-indigo-500" },
    { name: "Video Editing", level: 80, icon: <Film />, color: "from-blue-500 to-cyan-500" },
    { name: "Photography", level: 75, icon: <Camera />, color: "from-indigo-500 to-purple-500" },
    { name: "Mobile Dev", level: 70, icon: <Smartphone />, color: "from-purple-500 to-pink-500" },
    { name: "AI/ML", level: 65, icon: <Brain />, color: "from-pink-500 to-red-500" }
  ];

  const equipment: Equipment[] = [
    {
      category: "Camera",
      items: [
        { name: "Sony A7III", desc: "Full-frame beast 🔥" },
        { name: "Canon 80D", desc: "Reliable backup" }
      ],
      icon: <Camera className="w-5 h-5" />
    },
    {
      category: "Lenses",
      items: [
        { name: "24-70mm f/2.8", desc: "Versatile zoom" },
        { name: "85mm f/1.8", desc: "Portrait killer" },
        { name: "35mm f/1.4", desc: "Wide prime" }
      ],
      icon: <Aperture className="w-5 h-5" />
    },
    {
      category: "Audio",
      items: [
        { name: "Rode VideoMic Pro+", desc: "Crystal clear" },
        { name: "Zoom H4n Pro", desc: "Pro recorder" }
      ],
      icon: <Headphones className="w-5 h-5" />
    },
    {
      category: "Support",
      items: [
        { name: "DJI RS 3", desc: "Smooth operator" },
        { name: "Manfrotto 055", desc: "Rock solid" }
      ],
      icon: <Gamepad2 className="w-5 h-5" />
    }
  ];

  const techLogos: TechLogo[] = [
    { name: 'React', icon: <SiReact size={24} />, color: 'hover:shadow-blue-500/50' },
    { name: 'TypeScript', icon: <SiTypescript size={24} />, color: 'hover:shadow-indigo-500/50' },
    { name: 'Tailwind', icon: <SiTailwindcss size={24} />, color: 'hover:shadow-cyan-500/50' },
    { name: 'Node.js', icon: <SiNodedotjs size={24} />, color: 'hover:shadow-green-500/50' },
    { name: 'Python', icon: <SiPython size={24} />, color: 'hover:shadow-yellow-500/50' },
    { name: 'Figma', icon: <SiFigma size={24} />, color: 'hover:shadow-purple-500/50' },
    { name: 'Premiere', icon: <SiAdobepremierepro size={24} />, color: 'hover:shadow-violet-500/50' },
    { name: 'Photoshop', icon: <SiAdobephotoshop size={24} />, color: 'hover:shadow-blue-500/50' },
    { name: 'After Effects', icon: <SiAdobeaftereffects size={24} />, color: 'hover:shadow-purple-500/50' },
    { name: 'Ollama', icon: <SiOllama size={24} />, color: 'hover:shadow-gray-500/50' }
  ];

  return (
    <div className="dark">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }
        
        h1, h2, h3, h4, h5, h6, .font-heading {
          font-family: 'Poppins', sans-serif;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }

        @keyframes pulse-glow {
          0%, 100% { 
            opacity: 0.5;
            transform: scale(1);
          }
          50% { 
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes electric {
          0%, 100% { 
            text-shadow: 0 0 10px currentColor,
                         0 0 20px currentColor,
                         0 0 40px currentColor;
          }
          50% { 
            text-shadow: 0 0 20px currentColor,
                         0 0 40px currentColor,
                         0 0 80px currentColor;
          }
        }

        @keyframes particle-float {
          from {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          to {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes glitch {
          0%, 100% { 
            transform: translate(0);
            filter: hue-rotate(0deg);
          }
          20% { 
            transform: translate(-2px, 2px);
            filter: hue-rotate(90deg);
          }
          40% { 
            transform: translate(-2px, -2px);
            filter: hue-rotate(180deg);
          }
          60% { 
            transform: translate(2px, 2px);
            filter: hue-rotate(270deg);
          }
          80% { 
            transform: translate(2px, -2px);
            filter: hue-rotate(360deg);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        @keyframes modal-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-electric {
          animation: electric 2s ease-in-out infinite;
        }

        .animate-slide-up {
          animation: slide-up 0.5s ease-out forwards;
        }

        .animate-modal-in {
          animation: modal-in 0.3s ease-out forwards;
        }

        .glitch-hover:hover {
          animation: glitch 0.3s ease infinite;
        }

        .shake-hover:hover {
          animation: shake 0.3s ease infinite;
        }

        .particle {
          position: fixed;
          pointer-events: none;
          opacity: 0;
          animation: particle-float var(--duration) linear infinite;
          animation-delay: var(--delay);
        }

        .text-gradient {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hover-3d {
          transform-style: preserve-3d;
          transition: transform 0.3s;
        }

        .hover-3d:hover {
          transform: perspective(1000px) rotateX(10deg) rotateY(-10deg) scale(1.05);
        }

        .card-hover {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .card-hover:hover {
          transform: translateY(-10px) scale(1.02);
        }

        .bg-grid {
          background-image: 
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        .bg-dots {
          background-image: radial-gradient(circle, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        .neon-border {
          position: relative;
          overflow: hidden;
        }

        .neon-border::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #667eea, #764ba2, #667eea);
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.3s;
          z-index: -1;
        }

        .neon-border:hover::before {
          opacity: 1;
        }

        .cyber-button {
          position: relative;
          overflow: hidden;
          transition: all 0.3s;
        }

        .cyber-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }

        .cyber-button:hover::before {
          left: 100%;
        }

        .magnetic {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Hide scrollbar for Chrome, Safari and Opera */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>

      <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden relative">
        {/* Animated Background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/50 via-purple-950/30 to-gray-950" />
          <div className="absolute inset-0 bg-grid opacity-20" />
          
          {/* Floating Particles */}
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="particle"
              style={{
                ['--duration' as any]: `${particle.duration}s`,
                ['--delay' as any]: `${particle.id * 0.2}s`,
                left: `${particle.x}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                background: particle.id % 2 === 0 ? '#667eea' : '#764ba2'
              }}
            />
          ))}
        </div>

        {/* Mouse Follow Gradient */}
        <div 
          className="fixed pointer-events-none z-30 w-96 h-96 opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(102, 126, 234, 0.5) 0%, transparent 70%)',
            left: `${mousePosition.x - 192}px`,
            top: `${mousePosition.y - 192}px`,
            transform: 'translate(-50%, -50%)',
            filter: 'blur(40px)'
          }}
        />

        {/* Navigation */}
        <nav className="fixed top-0 w-full backdrop-blur-xl bg-gray-950/70 z-40 border-b border-indigo-500/10">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/10 via-purple-950/10 to-indigo-950/10"></div>
          <div className="container mx-auto px-6 py-4 relative">
            <div className="flex justify-between items-center">
              <div className="text-3xl font-black flex items-center gap-2 group">
                <span className="text-gradient animate-electric font-heading">FAY</span>
                <Zap className="w-6 h-6 text-indigo-400 group-hover:text-yellow-400 transition-all duration-300 group-hover:rotate-12" />
              </div>
              
              <div className="hidden md:flex items-center space-x-8">
                {['home', 'about', 'projects', 'equipment', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="capitalize text-gray-400 hover:text-white transition-all duration-300 relative group font-medium"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300" />
                  </button>
                ))}
                <button className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:scale-110 transition-transform">
                  <Download className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
              >
                {menuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-gray-950 z-30 md:hidden transition-all duration-500 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {['home', 'about', 'projects', 'equipment', 'contact'].map((item, index) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-4xl font-bold capitalize text-gray-400 hover:text-white transition-all glitch-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <div 
              className="bg-gradient-to-b from-gray-900 to-gray-950 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto no-scrollbar animate-modal-in border border-indigo-500/20 shadow-2xl shadow-indigo-500/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 p-3 bg-gray-800/80 backdrop-blur rounded-xl hover:bg-gray-700 transition-all duration-300 z-10 group"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>

                {/* Media Section */}
                <div className="relative">
                  {selectedProject.videoId ? (
                    <div className="aspect-video bg-black rounded-t-3xl overflow-hidden">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${selectedProject.videoId}?rel=0`}
                        title={selectedProject.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="relative group overflow-hidden rounded-t-3xl">
                      <img 
                        src={selectedProject.image || 'https://via.placeholder.com/1200x600/1e1b4b/6366f1?text=Project+Preview'}
                        alt={selectedProject.title}
                        className="w-full transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-8 md:p-12">
                  {/* Header */}
                  <div className="flex items-start gap-6 mb-8">
                    <div className="p-4 bg-gradient-to-br from-indigo-600/30 to-purple-600/30 rounded-2xl text-indigo-400 backdrop-blur-sm animate-pulse-glow">
                      {selectedProject.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-4xl font-bold font-heading mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        {selectedProject.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.slice(0, 3).map((tag, i) => (
                          <span 
                            key={i}
                            className="px-3 py-1 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 text-xs rounded-full text-indigo-300 border border-indigo-500/30 backdrop-blur-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-10">
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {selectedProject.longDescription}
                    </p>
                  </div>

                  {/* Features Grid */}
                  {selectedProject.features && (
                    <div className="mb-10">
                      <h4 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-heading">
                        Key Features
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {selectedProject.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-3 p-4 bg-gray-800/30 rounded-xl backdrop-blur-sm hover:bg-gray-800/50 transition-all">
                            <Sparkles className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech Stack */}
                  {selectedProject.techStack && (
                    <div className="mb-10">
                      <h4 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-heading">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {selectedProject.techStack.map((tech, i) => (
                          <span 
                            key={i}
                            className="px-4 py-2 bg-gradient-to-r from-indigo-950/50 to-purple-950/50 text-sm rounded-xl text-indigo-300 border border-indigo-500/30 backdrop-blur-sm hover:scale-105 transition-transform cursor-default"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-800">
                    {selectedProject.link && (
                      <a 
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-indigo-500/30"
                      >
                        <Eye className="w-5 h-5" />
                        <span>View Live Project</span>
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </a>
                    )}
                    {selectedProject.videoId && (
                      <a 
                        href={`https://youtu.be/${selectedProject.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-gray-800 rounded-xl font-semibold hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-indigo-500"
                      >
                        <Youtube className="w-5 h-5 text-red-500" />
                        <span>Watch on YouTube</span>
                        <Play className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section - Added pt-20 to fix cutoff issue */}
        <section 
          id="home" 
          ref={(el) => { sectionsRef.current.home = el; }}
          className="min-h-screen flex items-center relative z-10 px-6 pt-20"
        >
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-2 text-sm md:text-base text-indigo-400 mb-4 animate-fadeInUp">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-mono">&lt;welcome to my world/&gt;</span>
                </div>
                
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 animate-fadeInUp font-heading" style={{ animationDelay: '0.1s' }}>
                  <span className="block text-gray-500">I'm</span>
                  <span className="block text-gradient relative">
                    Farel Abid
                    <span className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-30 blur-lg"></span>
                  </span>
                </h1>
                
                <h2 className="text-2xl md:text-3xl lg:text-4xl mb-8 animate-fadeInUp font-heading" style={{ animationDelay: '0.2s' }}>
                  <span className="text-gray-300">{typedText}</span>
                  <span className="text-indigo-400 animate-pulse">_</span>
                </h2>
                
                <p className="text-lg text-gray-400 mb-8 max-w-lg animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                  Final year CS student crafting 
                  <span className="text-indigo-400 font-semibold"> next-level digital experiences</span> with 
                  <span className="text-purple-400 font-semibold"> creative code</span>. 
                  Currently working on <span className="text-gradient font-bold">AI-powered solutions</span> 🤖
                </p>
                
                <div className="flex flex-wrap gap-4 mb-12 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                  <button 
                    onClick={() => scrollToSection('projects')}
                    className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl font-bold hover:scale-105 transform transition-all duration-300 shadow-2xl shadow-indigo-500/25 hover:shadow-indigo-500/40 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    <span className="relative flex items-center gap-2">
                      Explore My Work 
                      <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                  </button>
                  
                  <button className="px-8 py-4 bg-gray-900/50 backdrop-blur-sm border-2 border-indigo-600/50 rounded-2xl font-bold hover:bg-indigo-600/10 hover:border-indigo-600 transition-all duration-300 group">
                    <span className="flex items-center gap-2">
                      Download Resume 
                      <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                    </span>
                  </button>
                </div>

                {/* Tech Stack Icons */}
                <div className="flex flex-wrap gap-4 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
                  {techLogos.map((tech) => (
                    <div 
                      key={tech.name}
                      className={`group relative w-16 h-16 bg-gradient-to-br from-gray-900/90 to-gray-950/90 backdrop-blur rounded-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer border border-gray-800 hover:border-indigo-500/50 ${tech.color}`}
                      title={tech.name}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/0 to-purple-600/0 rounded-2xl group-hover:from-indigo-600/20 group-hover:to-purple-600/20 transition-all duration-300"></div>
                      <div className="relative z-10 group-hover:scale-110 transition-transform duration-300">
                        {tech.icon}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Profile Image Section */}
              <div className="relative animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                <div className="relative w-80 h-80 mx-auto hover-3d">
                  {/* Animated Background Rings */}
                  <div className="absolute inset-0 rounded-3xl animate-pulse-glow">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl rotate-6 animate-float blur-md opacity-50" />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-3xl -rotate-6 animate-float blur-md opacity-50" style={{ animationDelay: '3s' }} />
                  </div>
                  
                  {/* Main Image Container */}
                  <div className="relative w-full h-full bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-3xl overflow-hidden border-2 border-indigo-500/50 backdrop-blur-sm neon-border">
                    <img 
                      src="assets/profile.png"
                      alt="Farel Abid"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-sm text-indigo-400 font-mono">@farelabid</p>
                      <p className="text-xs text-gray-500">Creative Developer • Indonesia</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section 
          id="about" 
          ref={(el) => { sectionsRef.current.about = el; }}
          className="py-20 relative z-10 px-6"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className={`text-5xl md:text-6xl lg:text-7xl font-black mb-4 font-heading ${
                isVisible.about ? 'animate-fadeInUp' : 'opacity-0'
              }`}>
                <span className="text-gray-600">about</span>
                <span className="text-gradient">.me</span>
                <span className="text-indigo-400">()</span>
              </h2>
              <p className="text-gray-400 text-lg">Here's my story in a nutshell 🥜</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                { 
                  icon: '🎨', 
                  title: 'Designer', 
                  desc: 'Creating designs that slap harder than your morning coffee', 
                  color: 'from-purple-600 to-indigo-600' 
                },
                { 
                  icon: '💻', 
                  title: 'Developer', 
                  desc: 'Writing code so clean, it makes your mom proud', 
                  color: 'from-indigo-600 to-blue-600' 
                },
                { 
                  icon: '📹', 
                  title: 'Creator', 
                  desc: 'Making videos that hit different every single time', 
                  color: 'from-blue-600 to-purple-600' 
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`group bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-indigo-500/50 transition-all duration-300 card-hover ${
                    isVisible.about ? 'animate-fadeInUp' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <span className="text-4xl">{item.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gradient font-heading">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Skills Section with Progress Bars */}
            <div className="bg-gradient-to-br from-indigo-950/30 to-purple-950/30 rounded-3xl p-8 md:p-12 border border-indigo-500/20 backdrop-blur-sm">
              <h3 className="text-3xl font-bold mb-10 text-center font-heading">
                <span className="text-indigo-400">&lt;</span>
                <span className="text-white">skills</span>
                <span className="text-purple-400">/&gt;</span>
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                {skills.map((skill, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-800 rounded-lg text-indigo-400">
                          {skill.icon}
                        </div>
                        <span className="font-semibold text-lg">{skill.name}</span>
                      </div>
                      <span className="text-sm text-gray-500 font-mono">{skill.level}%</span>
                    </div>
                    <div className="h-3 bg-gray-800 rounded-full overflow-hidden relative">
                      <div 
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1500 relative overflow-hidden`}
                        style={{ width: isVisible.about ? `${skill.level}%` : '0%' }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section 
          id="projects" 
          ref={(el) => { sectionsRef.current.projects = el; }}
          className="py-20 relative z-10 px-6"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className={`text-5xl md:text-6xl lg:text-7xl font-black mb-4 font-heading ${
                isVisible.projects ? 'animate-fadeInUp' : 'opacity-0'
              }`}>
                <span className="text-gray-600">my</span>
                <span className="text-gradient">.projects</span>
                <span className="text-indigo-400">[]</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8">Stuff I built that actually works 💪</p>
              
              {/* Filter Buttons */}
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { value: 'all', label: 'All Projects', icon: <Zap className="w-4 h-4" /> },
                  { value: 'dev', label: 'Development', icon: <Code className="w-4 h-4" /> },
                  { value: 'design', label: 'Design', icon: <Palette className="w-4 h-4" /> },
                  { value: 'video', label: 'Video', icon: <Film className="w-4 h-4" /> }
                ].map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setActiveFilter(filter.value)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeFilter === filter.value
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
                        : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-800'
                    }`}
                  >
                    {filter.icon}
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <div 
                  key={index}
                  onClick={() => setSelectedProject(project)}
                  className={`group relative bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all duration-500 card-hover cursor-pointer ${
                    isVisible.projects ? 'animate-slide-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/0 via-purple-600/0 to-indigo-600/0 group-hover:from-indigo-600/10 group-hover:via-purple-600/10 group-hover:to-indigo-600/10 transition-all duration-500"></div>
                  
                  {project.hot && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-xs font-bold animate-pulse shadow-lg shadow-orange-500/50">
                        🔥 HOT
                      </span>
                    </div>
                  )}
                  
                  <div className="p-8 relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-4 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-2xl text-indigo-400 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-indigo-500/30">
                        {project.icon}
                      </div>
                      <h3 className="text-xl font-bold font-heading group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all duration-300">
                        {project.title}
                      </h3>
                    </div>
                    
                    <p className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 bg-indigo-950/30 text-xs rounded-lg text-indigo-300 border border-indigo-900/50 group-hover:border-indigo-700/50 group-hover:bg-indigo-950/50 transition-all"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-indigo-400 text-sm font-medium group-hover:text-indigo-300 transition-colors">
                        Click to explore →
                      </span>
                      <Eye className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300 group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Equipment Section */}
        <section 
          id="equipment" 
          ref={(el) => { sectionsRef.current.equipment = el; }}
          className="py-20 relative z-10 px-6"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className={`text-5xl md:text-6xl lg:text-7xl font-black mb-4 font-heading ${
                isVisible.equipment ? 'animate-fadeInUp' : 'opacity-0'
              }`}>
                <span className="text-gray-600">my</span>
                <span className="text-gradient">.gear</span>
                <span className="text-indigo-400">⚡</span>
              </h2>
              <p className="text-gray-400 text-lg">The tools that make the magic happen 🎬</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {equipment.map((category, index) => (
                <div 
                  key={index}
                  className={`bg-gradient-to-br from-gray-900 to-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/20 ${
                    isVisible.equipment ? 'animate-fadeInUp' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl text-white">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gradient font-heading">{category.category}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {category.items.map((item, i) => (
                      <div key={i} className="group">
                        <div className="border-l-2 border-gray-700 pl-4 hover:border-indigo-500 transition-all">
                          <p className="font-semibold text-white group-hover:text-indigo-400 transition-colors">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section 
          id="contact" 
          ref={(el) => { sectionsRef.current.contact = el; }}
          className="py-20 relative z-10 px-6"
        >
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className={`text-5xl md:text-6xl lg:text-7xl font-black mb-4 font-heading ${
                isVisible.contact ? 'animate-fadeInUp' : 'opacity-0'
              }`}>
                <span className="text-gray-600">let's</span>
                <span className="text-gradient">.connect</span>
                <span className="text-indigo-400">()</span>
              </h2>
              <p className="text-gray-400 text-lg">Ready to build something legendary? Hit me up! 🔥</p>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-950/30 to-purple-950/30 rounded-3xl p-8 md:p-12 border border-indigo-500/20 backdrop-blur-sm hover:border-indigo-500/40 transition-all">
              <div className="text-center mb-12">
                <p className="text-2xl text-gray-300 mb-4">
                  Let's turn your
                  <span className="text-indigo-400 font-bold"> wild ideas</span> into
                  <span className="text-purple-400 font-bold"> digital reality</span>
                </p>
                <p className="text-gray-500">Available for freelance projects and full-time opportunities</p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {[
                  { icon: <Mail className="w-5 h-5" />, label: 'Email', href: 'mailto:farelabid@email.com', color: 'hover:shadow-blue-500/30' },
                  { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn', href: 'https://linkedin.com/in/farelabid', color: 'hover:shadow-indigo-500/30' },
                  { icon: <Github className="w-5 h-5" />, label: 'GitHub', href: 'https://github.com/farelabid', color: 'hover:shadow-purple-500/30' },
                  { icon: <Instagram className="w-5 h-5" />, label: 'Instagram', href: 'https://instagram.com/farelabid', color: 'hover:shadow-pink-500/30' },
                  { icon: <Youtube className="w-5 h-5" />, label: 'YouTube', href: 'https://youtube.com/@farelabid', color: 'hover:shadow-red-500/30' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-6 py-3 bg-gray-900 rounded-xl hover:scale-110 transform transition-all duration-300 group border border-gray-800 hover:border-indigo-500 hover:shadow-lg ${social.color}`}
                  >
                    <span className="text-gray-400 group-hover:text-white transition-colors">{social.icon}</span>
                    <span className="font-medium">{social.label}</span>
                  </a>
                ))}
              </div>
              
              <div className="text-center">
                <button className="group px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-bold text-lg hover:scale-105 transform transition-all duration-300 shadow-xl hover:shadow-indigo-500/50 cyber-button">
                  <span className="flex items-center gap-3">
                    Let's Work Together
                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-gray-900 relative z-10">
          <div className="container mx-auto px-6 text-center">
            <p className="text-gray-600 mb-2">
              © 2024 Farel Abid • Built with passion and way too much coffee ☕
            </p>
            <p className="text-gray-700 text-sm">
              React • TypeScript • Tailwind CSS • Pure Vibes ✨
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}