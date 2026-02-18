import type { ReactNode } from 'react';
import {
  Globe, Palette, Brain, Film, Smartphone
} from 'lucide-react';
import {
  SiReact, SiTailwindcss, SiNextdotjs, SiPython, SiFigma,
  SiGreensock, SiOpenai, SiLangchain, SiVite, SiTensorflow,
  SiFlutter, SiKotlin, SiTypescript, SiSupabase,
  SiAdobepremierepro, SiAdobephotoshop, SiAdobeillustrator
} from 'react-icons/si';

export type SkillItem = { name: string; icon: ReactNode };
export type SkillGroup = { domain: string; icon: ReactNode; color: string; skills: SkillItem[] };

export const SKILL_GROUPS: SkillGroup[] = [
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

export const MARQUEE_TECHS: { name: string; icon: ReactNode }[] = [
  { name: "Next.js", icon: <SiNextdotjs size={16} /> }, { name: "React", icon: <SiReact size={16} /> },
  { name: "TypeScript", icon: <SiTypescript size={16} /> }, { name: "Vite", icon: <SiVite size={16} /> },
  { name: "Tailwind", icon: <SiTailwindcss size={16} /> }, { name: "Figma", icon: <SiFigma size={16} /> },
  { name: "Supabase", icon: <SiSupabase size={16} /> }, { name: "Python", icon: <SiPython size={16} /> },
  { name: "Flutter", icon: <SiFlutter size={16} /> }, { name: "GSAP", icon: <SiGreensock size={16} /> },
];
