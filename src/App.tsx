import { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  Github, 
  Linkedin, 
  Mail, 
  Instagram,
  ExternalLink,
  Code,
  Palette,
  Film,
  Camera,
  Smartphone,
  Monitor,
  Youtube,
  Sparkles,
  Rocket,
  Brain,
  Play,
  Eye,
  Star,
  Heart,
  Coffee
} from 'lucide-react';

// Import react-icons
import { 
  SiAdobepremierepro,
  SiAdobephotoshop,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiFlutter,
  SiFigma,
  SiPython
} from 'react-icons/si';

// Types
interface AuroraProps {
  colorStops?: string[];
  amplitude?: number;
  blend?: number;
}

interface ProfileCardProps {
  avatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  onContactClick?: () => void;
}

interface Project {
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  link?: string;
  icon: React.ReactElement;
  category: string;
  hot?: boolean;
  image?: string;
  videoId?: string;
  features?: string[];
  techStack?: string[];
  gradient?: string;
}

// Aurora Component
const Aurora = ({ colorStops = ["#5227FF", "#7cff67", "#5227FF"], amplitude = 1.0, blend = 0.5 }: AuroraProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const animate = () => {
      timeRef.current += 0.01;
      
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      
      // Create aurora-like gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      colorStops.forEach((color, i) => {
        gradient.addColorStop(i / (colorStops.length - 1), color + '40');
      });
      
      // Animated wave effect
      ctx.fillStyle = gradient;
      ctx.beginPath();
      
      for (let x = 0; x <= canvas.offsetWidth; x += 10) {
        const y = Math.sin((x * 0.01) + timeRef.current) * amplitude * 50 + canvas.offsetHeight * 0.5;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.lineTo(canvas.offsetWidth, canvas.offsetHeight);
      ctx.lineTo(0, canvas.offsetHeight);
      ctx.closePath();
      ctx.fill();
      
      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    animate();
    
    window.addEventListener('resize', resize);
    
    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [colorStops, amplitude, blend]);

  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

// ProfileCard Component
const ProfileCard = ({ 
  avatarUrl = "assets/farel.png", 
  name = "Farel Abid",
  title = "Creative Developer", 
  handle = "farel_abid",
  status = "Available for work",
  contactText = "Let's Connect",
  onContactClick 
}: ProfileCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div 
      ref={cardRef}
      className="relative w-80 h-[500px] group perspective-1000"
      onMouseMove={handleMouseMove}
      style={{
        transform: 'preserve-3d',
      }}
    >
      {/* Aurora Background */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <Aurora colorStops={["#667eea", "#764ba2", "#667eea"]} amplitude={0.8} />
      </div>
      
      {/* Main Card */}
      <div 
        className="relative w-full h-full bg-gradient-to-br from-gray-900/90 to-gray-950/90 backdrop-blur-xl rounded-3xl border border-gray-700/50 overflow-hidden transition-all duration-500 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/20"
        style={{
          transform: `rotateX(${(mousePos.y - 50) * 0.1}deg) rotateY(${(mousePos.x - 50) * 0.1}deg) translateZ(20px)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Shine Effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Avatar Section */}
          <div className="flex-1 relative overflow-hidden">
            <img 
              src={avatarUrl || "assets/farel.png"}
              alt={name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
          </div>
          
          {/* Info Section */}
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-500/50">
                <img 
                  src={avatarUrl || "assets/farel.png"}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-white text-sm">@{handle}</div>
                <div className="flex items-center gap-2 text-xs text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  {status}
                </div>
              </div>
            </div>
            
            <button 
              onClick={onContactClick}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-medium text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-indigo-500/30"
            >
              {contactText}
            </button>
          </div>
        </div>
        
        {/* Title Overlay */}
        <div className="absolute top-6 left-6 right-6 text-center">
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-1 font-trispace">
            {name}
          </h3>
          <p className="text-sm text-indigo-300 font-medium">{title}</p>
        </div>
      </div>
    </div>
  );
};

// Main Portfolio Component
export default function EnhancedPortfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isVisible, setIsVisible] = useState<{[key: string]: boolean}>({});
  const [activeFilter, setActiveFilter] = useState('all');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{id: number; x: number; y: number; size: number; duration: number}>>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const fullText = "Creative Developer & Digital Artist";
  const typingSpeed = 100;

  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});

  // Enhanced mouse move effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Create particles on mount
  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 15
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
      gradient: "from-violet-600 to-purple-600",
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
      gradient: "from-cyan-500 to-blue-600",
      image: "https://via.placeholder.com/800x600/1e1b4b/6366f1?text=Cont+Solutions",
      features: [
        "Responsive design",
        "Smooth animations",
        "SEO optimized",
        "Fast loading times",
        "Modern UI/UX"
      ],
      techStack: ["React", "Tailwind CSS", "GSAP", "Vite"]
    },
    {
      title: "JakNews Portal",
      description: "News portal UI that slaps different",
      longDescription: "Designed a comprehensive UI/UX for a modern news portal application with focus on readability and user engagement. The design focuses on readability, user engagement, and seamless content discovery with a clean and intuitive interface.",
      tags: ["Figma", "UI/UX", "Design System"],
      icon: <Palette className="w-5 h-5" />,
      category: 'design',
      gradient: "from-pink-500 to-rose-600",
      image: "https://via.placeholder.com/800x600/1e1b4b/6366f1?text=JakNews+Portal",
      features: [
        "Clean typography",
        "Dark mode support",
        "Category-based navigation",
        "Interactive components",
        "Mobile-first approach"
      ],
      techStack: ["Figma", "Design System", "Prototyping"]
    },
    {
      title: "KerjaSini Mobile",
      description: "Job app that actually looks good",
      longDescription: "Created a user-friendly mobile application design for job seekers and employers with intuitive job search and application tracking. The app features intuitive job search, application tracking, and profile management with a modern, clean aesthetic.",
      tags: ["Figma", "Mobile UI", "UX"],
      icon: <Smartphone className="w-5 h-5" />,
      category: 'design',
      gradient: "from-emerald-500 to-teal-600",
      image: "https://via.placeholder.com/800x600/1e1b4b/6366f1?text=KerjaSini+App",
      features: [
        "Swipe-based job browsing",
        "Smart filtering system",
        "In-app messaging",
        "Application tracking",
        "Profile builder"
      ],
      techStack: ["Figma", "Mobile Design", "User Research"]
    },
    {
      title: "Putra Budaya Yogya",
      description: "Cultural video that hits different",
      longDescription: "Produced and edited a cultural advocacy video showcasing the rich heritage of Yogyakarta with stunning cinematography. The video features traditional arts, interviews with cultural figures, and stunning cinematography of historical sites.",
      tags: ["Premiere Pro", "Cinematography", "Color Grading"],
      link: "https://youtu.be/jf2qJ0xxI_g",
      icon: <Film className="w-5 h-5" />,
      category: 'video',
      hot: true,
      videoId: "jf2qJ0xxI_g",
      gradient: "from-amber-500 to-orange-600",
      features: [
        "4K resolution",
        "Cinematic color grading",
        "Professional audio mixing",
        "Motion graphics",
        "Cultural storytelling"
      ],
      techStack: ["Adobe Premiere Pro", "After Effects", "DaVinci Resolve"]
    },
    {
      title: "Informatika 2021",
      description: "Class video with epic transitions",
      longDescription: "Created an engaging promotional video for the Informatics class of 2021, featuring dynamic transitions and student testimonials. Created an engaging promotional video for the Informatics class of 2021, featuring dynamic transitions, student testimonials, and campus life highlights with professional editing and effects.",
      tags: ["Premiere Pro", "After Effects", "Motion Graphics"],
      link: "https://youtu.be/B1BlRRTrRI8",
      icon: <Film className="w-5 h-5" />,
      category: 'video',
      videoId: "B1BlRRTrRI8",
      gradient: "from-indigo-500 to-purple-600",
      features: [
        "Dynamic transitions",
        "Motion tracking",
        "Typography animation",
        "Sound design",
        "Color correction"
      ],
      techStack: ["Adobe Premiere Pro", "After Effects", "Audition"]
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const skills = [
    { name: "Frontend Dev", level: 90, icon: <Code />, color: "from-violet-500 to-purple-500" },
    { name: "UI/UX Design", level: 85, icon: <Palette />, color: "from-pink-500 to-rose-500" },
    { name: "Video Editing", level: 80, icon: <Film />, color: "from-amber-500 to-orange-500" },
    { name: "Photography", level: 75, icon: <Camera />, color: "from-cyan-500 to-blue-500" },
    { name: "Mobile Dev", level: 70, icon: <Smartphone />, color: "from-emerald-500 to-teal-500" },
    { name: "AI/ML", level: 65, icon: <Brain />, color: "from-indigo-500 to-violet-500" }
  ];

  const techLogos = [
    { name: 'React', icon: <SiReact size={24} />, color: 'hover:shadow-cyan-500/50' },
    { name: 'TypeScript', icon: <SiTypescript size={24} />, color: 'hover:shadow-blue-500/50' },
    { name: 'Tailwind', icon: <SiTailwindcss size={24} />, color: 'hover:shadow-cyan-500/50' },
    { name: 'Flutter', icon: <SiFlutter size={24} />, color: 'hover:shadow-blue-500/50' },
    { name: 'Python', icon: <SiPython size={24} />, color: 'hover:shadow-yellow-500/50' },
    { name: 'Figma', icon: <SiFigma size={24} />, color: 'hover:shadow-purple-500/50' },
    { name: 'Premiere', icon: <SiAdobepremierepro size={24} />, color: 'hover:shadow-violet-500/50' },
    { name: 'Photoshop', icon: <SiAdobephotoshop size={24} />, color: 'hover:shadow-blue-500/50' }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden relative">
      {/* Enhanced Background with Aurora */}
      <div className="fixed inset-0 z-0">
        <Aurora colorStops={["#667eea", "#764ba2", "#667eea"]} amplitude={1.2} blend={0.6} />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950/80 via-gray-950/60 to-gray-950/80" />
        
        {/* Floating Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: particle.id % 3 === 0 ? '#667eea' : particle.id % 3 === 1 ? '#764ba2' : '#f093fb',
              borderRadius: '50%',
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.id * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Enhanced Mouse Follow Effect */}
      <div 
        className="fixed pointer-events-none z-30 w-96 h-96 opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.6) 50%, transparent 70%)',
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          filter: 'blur(60px)',
          transform: 'translate(-50%, -50%)'
        }}
      />

      {/* Enhanced Navigation */}
      <nav className="fixed top-0 w-full backdrop-blur-2xl bg-gray-950/80 z-40 border-b border-violet-500/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-3xl font-black flex items-center gap-3 group">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 animate-pulse font-trispace">FAY</span>
              <Sparkles className="w-6 h-6 text-violet-400 group-hover:text-fuchsia-400 transition-all duration-300 group-hover:rotate-180" />
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {['home', 'about', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="capitalize text-gray-400 hover:text-white transition-all duration-300 relative group font-medium"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 group-hover:w-full transition-all duration-300" />
                </button>
              ))}
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
      <div className={`fixed inset-0 bg-gray-950/95 backdrop-blur-xl z-30 md:hidden transition-all duration-500 ${
        menuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {['home', 'about', 'projects', 'contact'].map((item, index) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="text-4xl font-bold capitalize text-gray-400 hover:text-white transition-all hover:scale-110"
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
            className="bg-gradient-to-b from-gray-900 to-gray-950 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-violet-500/20 shadow-2xl shadow-violet-500/10"
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
                  <div className={`p-4 bg-gradient-to-br ${selectedProject.gradient || 'from-violet-600 to-fuchsia-600'} rounded-2xl text-white backdrop-blur-sm animate-pulse`}>
                    {selectedProject.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-4xl font-bold font-trispace mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                      {selectedProject.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.slice(0, 3).map((tag, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 text-xs rounded-full text-violet-300 border border-violet-500/30 backdrop-blur-sm"
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
                    <h4 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 font-trispace">
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
                    <h4 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 font-trispace">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.techStack.map((tech, i) => (
                        <span 
                          key={i}
                          className="px-4 py-2 bg-gradient-to-r from-violet-950/50 to-fuchsia-950/50 text-sm rounded-xl text-violet-300 border border-violet-500/30 backdrop-blur-sm hover:scale-105 transition-transform cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-800">
                  {selectedProject.link && !selectedProject.videoId && (
                    <a 
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-violet-500/30"
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
                      className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-red-500/30"
                    >
                      <Youtube className="w-5 h-5 text-white" />
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

      {/* Enhanced Hero Section with ProfileCard */}
      <section 
        id="home" 
        ref={(el) => { sectionsRef.current.home = el; }}
        className="min-h-screen flex items-center relative z-10 px-6 pt-20"
      >
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-3 text-violet-400 mb-6 animate-fadeIn">
                <Star className="w-5 h-5 animate-spin" />
                <span className="font-mono text-sm">&lt;welcome to my digital universe/&gt;</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 animate-fadeIn font-trispace">
                <span className="block text-gray-500 mb-2">Hello, I'm</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 relative">
                  Farel Abid
                  <div className="absolute -inset-2 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 blur-2xl -z-10 animate-pulse"></div>
                </span>
              </h1>
              
              <h2 className="text-2xl md:text-3xl lg:text-4xl mb-8 animate-fadeIn font-trispace">
                <span className="text-gray-300">{typedText}</span>
                <span className="text-violet-400 animate-pulse">|</span>
              </h2>
              
              <p className="text-lg text-gray-400 mb-8 max-w-lg animate-fadeIn leading-relaxed">
                Final year CS student crafting 
                <span className="text-violet-400 font-semibold"> extraordinary digital experiences</span> with 
                <span className="text-fuchsia-400 font-semibold"> creative code</span>. 
                Currently working on <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-bold">AI-powered solutions</span> 
                <Coffee className="inline w-5 h-5 ml-2 text-amber-400" />
              </p>
              
              <div className="flex flex-wrap gap-4 mb-12 animate-fadeIn">
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="group px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl font-bold hover:scale-105 transform transition-all duration-300 shadow-2xl shadow-violet-500/25 hover:shadow-violet-500/40 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="relative flex items-center gap-3">
                    Explore My Universe 
                    <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                </button>
                
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-4 bg-gray-900/50 backdrop-blur-sm border-2 border-violet-600/50 rounded-2xl font-bold hover:bg-violet-600/10 hover:border-violet-600 transition-all duration-300 group"
                >
                  <span className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform" />
                    Let's Connect 
                  </span>
                </button>
              </div>

              {/* Enhanced Tech Stack */}
              <div className="flex flex-wrap gap-4 animate-fadeIn">
                {techLogos.map((tech) => (
                  <div 
                    key={tech.name}
                    className={`group relative w-16 h-16 bg-gradient-to-br from-gray-900/90 to-gray-950/90 backdrop-blur rounded-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer border border-gray-800 hover:border-violet-500/50 ${tech.color}`}
                    title={tech.name}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-600/0 to-fuchsia-600/0 rounded-2xl group-hover:from-violet-600/20 group-hover:to-fuchsia-600/20 transition-all duration-300"></div>
                    <div className="relative z-10 group-hover:scale-110 transition-transform duration-300">
                      {tech.icon}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ProfileCard Integration */}
            <div className="flex justify-center animate-fadeIn">
              <ProfileCard
                avatarUrl="assets/farel.png"
                name="Farel Abid"
                title="Creative Developer"
                handle="farel_abid"
                status="Available for work"
                contactText="Let's Connect"
                onContactClick={() => {
                  console.log('Contact clicked');
                  scrollToSection('contact');
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section 
        id="about" 
        ref={(el) => { sectionsRef.current.about = el; }}
        className="py-20 relative z-10 px-6"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className={`text-5xl md:text-6xl lg:text-7xl font-black mb-4 font-trispace ${
              isVisible.about ? 'animate-fadeIn' : 'opacity-0'
            }`}>
              <span className="text-gray-600">about</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">.me</span>
              <span className="text-cyan-400">()</span>
            </h2>
            <p className="text-gray-400 text-lg">Here's my story in pixels and code ✨</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { 
                icon: '🎨', 
                title: 'Designer', 
                desc: 'Creating designs that make pixels dance and users smile', 
                gradient: 'from-pink-600 to-rose-600' 
              },
              { 
                icon: '💻', 
                title: 'Developer', 
                desc: 'Writing code so elegant, it deserves its own art gallery', 
                gradient: 'from-violet-600 to-purple-600' 
              },
              { 
                icon: '🎬', 
                title: 'Creator', 
                desc: 'Crafting visual stories that captivate and inspire audiences', 
                gradient: 'from-cyan-600 to-blue-600' 
              }
            ].map((item, index) => (
              <div 
                key={index}
                className={`group bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 hover:border-violet-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/20 ${
                  isVisible.about ? 'animate-fadeIn' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${item.gradient} rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-violet-500/30`}>
                  <span className="text-4xl">{item.icon}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 font-trispace">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Enhanced Skills Section */}
          <div className="bg-gradient-to-br from-violet-950/30 to-fuchsia-950/30 rounded-3xl p-8 md:p-12 border border-violet-500/20 backdrop-blur-sm hover:border-violet-500/40 transition-all duration-500">
            <h3 className="text-3xl font-bold mb-10 text-center font-trispace">
              <span className="text-violet-400">&lt;</span>
              <span className="text-white">skills & expertise</span>
              <span className="text-fuchsia-400">/&gt;</span>
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 bg-gradient-to-br ${skill.color} rounded-xl text-white shadow-lg`}>
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

      {/* Enhanced Projects Section */}
      <section 
        id="projects" 
        ref={(el) => { sectionsRef.current.projects = el; }}
        className="py-20 relative z-10 px-6"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className={`text-5xl md:text-6xl lg:text-7xl font-black mb-4 font-trispace ${
              isVisible.projects ? 'animate-fadeIn' : 'opacity-0'
            }`}>
              <span className="text-gray-600">my</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">.projects</span>
              <span className="text-cyan-400">[]</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">Digital creations that push boundaries 🚀</p>
            
            {/* Enhanced Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { value: 'all', label: 'All Projects', icon: <Sparkles className="w-4 h-4" />, gradient: 'from-violet-600 to-fuchsia-600' },
                { value: 'dev', label: 'Development', icon: <Code className="w-4 h-4" />, gradient: 'from-cyan-600 to-blue-600' },
                { value: 'design', label: 'Design', icon: <Palette className="w-4 h-4" />, gradient: 'from-pink-600 to-rose-600' },
                { value: 'video', label: 'Video', icon: <Film className="w-4 h-4" />, gradient: 'from-amber-600 to-orange-600' }
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeFilter === filter.value
                      ? `bg-gradient-to-r ${filter.gradient} text-white shadow-lg hover:scale-105`
                      : 'bg-gray-900/50 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-800 hover:border-violet-500/50'
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
                className={`group relative bg-gradient-to-br from-gray-900/90 to-gray-950/90 backdrop-blur-sm border border-gray-800 rounded-3xl overflow-hidden hover:border-violet-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/20 cursor-pointer ${
                  isVisible.projects ? 'animate-fadeIn' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Enhanced Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-all duration-500`}></div>
                
                {project.hot && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-xs font-bold animate-pulse shadow-lg shadow-orange-500/50">
                      🔥 HOT
                    </span>
                  </div>
                )}
                
                <div className="p-8 relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-4 bg-gradient-to-br ${project.gradient} rounded-2xl text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-violet-500/30`}>
                      {project.icon}
                    </div>
                    <h3 className="text-xl font-bold font-trispace group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-fuchsia-400 transition-all duration-300">
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
                        className="px-3 py-1 bg-violet-950/30 text-xs rounded-lg text-violet-300 border border-violet-900/50 group-hover:border-violet-700/50 group-hover:bg-violet-950/50 transition-all"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-violet-400 text-sm font-medium group-hover:text-violet-300 transition-colors">
                      Click to explore →
                    </span>
                    <Eye className="w-5 h-5 text-violet-400 group-hover:text-violet-300 group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section 
        id="contact" 
        ref={(el) => { sectionsRef.current.contact = el; }}
        className="py-20 relative z-10 px-6"
      >
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className={`text-5xl md:text-6xl lg:text-7xl font-black mb-4 font-trispace ${
              isVisible.contact ? 'animate-fadeIn' : 'opacity-0'
            }`}>
              <span className="text-gray-600">let's</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">.connect</span>
              <span className="text-cyan-400">()</span>
            </h2>
            <p className="text-gray-400 text-lg">Ready to create something extraordinary? Let's talk! ✨</p>
          </div>
          
          <div className="bg-gradient-to-br from-violet-950/30 to-fuchsia-950/30 rounded-3xl p-8 md:p-12 border border-violet-500/20 backdrop-blur-sm hover:border-violet-500/40 transition-all">
            <div className="text-center mb-12">
              <p className="text-2xl text-gray-300 mb-4">
                Let's transform your
                <span className="text-violet-400 font-bold"> wildest ideas</span> into
                <span className="text-fuchsia-400 font-bold"> digital masterpieces</span>
              </p>
              <p className="text-gray-500">Available for freelance projects and full-time opportunities</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                { icon: <Mail className="w-5 h-5" />, label: 'Email', href: 'mailto:farelabid@gmail.com', gradient: 'from-blue-600 to-cyan-600' },
                { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn', href: 'https://linkedin.com/in/farelabid', gradient: 'from-blue-600 to-indigo-600' },
                { icon: <Github className="w-5 h-5" />, label: 'GitHub', href: 'https://github.com/Farelabid', gradient: 'from-gray-600 to-gray-800' },
                { icon: <Instagram className="w-5 h-5" />, label: 'Instagram', href: 'https://instagram.com/farel_abid', gradient: 'from-pink-600 to-purple-600' },
                { icon: <Youtube className="w-5 h-5" />, label: 'YouTube', href: 'https://youtube.com/@farel_abid', gradient: 'from-red-600 to-pink-600' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${social.gradient} rounded-xl hover:scale-110 transform transition-all duration-300 group shadow-lg hover:shadow-violet-500/30`}
                >
                  <span className="text-white group-hover:scale-110 transition-transform">{social.icon}</span>
                  <span className="font-medium text-white">{social.label}</span>
                </a>
              ))}
            </div>
            
            <div className="text-center">
              <button className="group px-12 py-5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl font-bold text-lg hover:scale-105 transform transition-all duration-300 shadow-xl hover:shadow-violet-500/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative flex items-center gap-3">
                  Let's Create Magic Together
                  <Heart className="w-5 h-5 group-hover:scale-110 group-hover:text-pink-300 transition-all" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="py-12 border-t border-violet-900/30 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-4 h-4 text-pink-400 animate-pulse" />
            <p className="text-gray-600">
              Made with passion and lots of coffee by Farel Abid
            </p>
            <Coffee className="w-4 h-4 text-amber-400 animate-bounce" />
          </div>
          <p className="text-gray-700 text-sm">
            React • TypeScript • Tailwind CSS • Creative Vibes ✨
          </p>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Trispace:wdth,wght@75..125,100..800&display=swap');
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-20px) rotate(180deg); 
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .font-trispace {
          font-family: "Trispace", monospace;
          font-optical-sizing: auto;
          font-variation-settings: "wdth" 100;
        }
      `}</style>
    </div>
  );
}