import React, { useEffect, useRef, useState } from 'react';
import { 
  Terminal, 
  Code2, 
  Database, 
  Cpu, 
  Layout, 
  GitBranch, 
  Wrench,
  Music,
  BrainCircuit,
  CalendarCheck,
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  User,
  GraduationCap,
  ExternalLink,
  Activity,
  Sparkles
} from 'lucide-react';

// --- CUSTOM CURSOR GLOW ---
const CursorGlow = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      // Smooth easing formula
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(animate);
    };
    
    animate();

    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-[400px] h-[400px] bg-sky-500/20 rounded-full blur-[100px] pointer-events-none z-50 mix-blend-screen"
      style={{ transform: 'translate(-50%, -50%)' }}
    />
  );
};

// --- INTERACTIVE CANVAS BACKGROUND ---
const InteractiveBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particlesArray;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let mouse = { x: null, y: null, radius: 150 };

    const handleMouseMove = (event) => { mouse.x = event.x; mouse.y = event.y; };
    const handleMouseOut = () => { mouse.x = undefined; mouse.y = undefined; };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x; this.y = y; this.directionX = directionX; this.directionY = directionY;
        this.size = size; this.color = color;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      update() {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius + this.size) {
          if (mouse.x < this.x && this.x < canvas.width - this.size * 10) this.x += 2;
          if (mouse.x > this.x && this.x > this.size * 10) this.x -= 2;
          if (mouse.y < this.y && this.y < canvas.height - this.size * 10) this.y += 2;
          if (mouse.y > this.y && this.y > this.size * 10) this.y -= 2;
        }
        
        this.x += this.directionX * 0.5;
        this.y += this.directionY * 0.5;
        this.draw();
      }
    }

    const init = () => {
      particlesArray = [];
      let numberOfParticles = (canvas.height * canvas.width) / 12000;
      for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 1.5) + 0.5;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 1) - 0.5;
        let directionY = (Math.random() * 1) - 0.5;
        particlesArray.push(new Particle(x, y, directionX, directionY, size, 'rgba(125, 211, 252, 0.5)'));
      }
    };

    const connect = () => {
      let opacityValue = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
            + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
          if (distance < (canvas.width / 8) * (canvas.height / 8)) {
            opacityValue = 0.4 - (distance / 40000);
            ctx.strokeStyle = `rgba(125, 211, 252, ${opacityValue})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connect();
    };

    const handleResize = () => {
      canvas.width = window.innerWidth; canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener('resize', handleResize);
    init(); animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 bg-[#020617] overflow-hidden">
      {/* Ambient Gradient Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[150px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-sky-600/20 blur-[150px] mix-blend-screen animate-pulse" style={{ animationDuration: '10s' }} />
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-auto opacity-60" />
      {/* Dark vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)] pointer-events-none" />
    </div>
  );
};

// --- SPOTLIGHT CARD COMPONENT ---
const SpotlightCard = ({ children, className = "", as: Component = "div", ...props }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <Component
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl ${className}`}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 ease-out"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(56,189,248,0.15), transparent 40%)`,
        }}
      />
      {/* Inner border glow */}
      <div 
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 ease-out border border-sky-400/20"
        style={{ opacity: opacity ? 1 : 0, maskImage: `radial-gradient(300px circle at ${position.x}px ${position.y}px, black, transparent)` }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </Component>
  );
};

// --- SCROLL REVEAL HOOK ---
const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0', 'scale-100');
          entry.target.classList.remove('opacity-0', 'translate-y-12', 'scale-95');
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    const hiddenElements = document.querySelectorAll('.reveal');
    hiddenElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
};

// --- MAIN APP ---
export default function App() {
  useScrollReveal();

  const skills = [
    {
      category: "Programming Languages",
      icon: <Code2 size={24} />,
      items: ["Python", "TypeScript", "JavaScript", "Java (Core, OOP)", "C (Core concepts)"]
    },
    {
      category: "Web & App Dev",
      icon: <Layout size={24} />,
      items: ["Frontend Architecture (TS/JS)", "Backend Engineering", "System Design", "Game Logic & State"]
    },
    {
      category: "AI & Data",
      icon: <BrainCircuit size={24} />,
      items: ["Generative AI Models", "Computer Vision", "Machine Learning (Basic)", "MySQL"]
    },
    {
      category: "Tools & Environments",
      icon: <Wrench size={24} />,
      items: ["Git & GitHub", "VS Code", "IntelliJ IDEA", "Eclipse"]
    }
  ];

  const projects = [
    {
      title: "Generative AI Suite",
      icon: <Sparkles size={28} className="text-violet-400" />,
      tags: ["Python", "Generative AI", "Machine Learning"],
      description: "Developed advanced generative AI models and applications, focusing on scalable AI architectures and innovative problem-solving methodologies.",
      color: "from-violet-500/20 to-fuchsia-500/20",
      repo: "https://github.com/harisdesai/Generative_AI_Project"
    },
    {
      title: "EmotionSense",
      icon: <User size={28} className="text-sky-400" />,
      tags: ["Python", "AI/ML", "Computer Vision"],
      description: "An intelligent system designed to detect and analyze human emotions using advanced Python-based machine learning algorithms.",
      color: "from-sky-500/20 to-blue-500/20",
      repo: "https://github.com/harisdesai/EmotionSense"
    },
    {
      title: "Python Game Engine",
      icon: <Terminal size={28} className="text-rose-400" />,
      tags: ["Python", "Game Development", "Logic"],
      description: "An interactive gaming experience built entirely in Python, demonstrating complex state management and game loop architectures.",
      color: "from-rose-500/20 to-orange-500/20",
      repo: "https://github.com/harisdesai/Game_Project"
    },
    {
      title: "LiftPro App",
      icon: <Activity size={28} className="text-emerald-400" />,
      tags: ["TypeScript", "Frontend", "Fitness"],
      description: "A robust fitness tracking application leveraging TypeScript for type-safe, scalable, and responsive user interfaces.",
      color: "from-emerald-500/20 to-teal-500/20",
      repo: "https://github.com/harisdesai/liftpro-app"
    },
    {
      title: "Krishi Sakha Connect",
      icon: <Database size={28} className="text-amber-400" />,
      tags: ["TypeScript", "Web App", "AgriTech"],
      description: "A comprehensive agricultural technology platform collaborating with delta-vision0 to connect farmers with vital resources.",
      color: "from-amber-500/20 to-orange-500/20",
      repo: "https://github.com/delta-vision0/krishi-sakha-connect"
    },
    {
      title: "AICC",
      icon: <Cpu size={28} className="text-indigo-400" />,
      tags: ["JavaScript", "Web Tech", "AI Integration"],
      description: "An AI-focused web application utilizing JavaScript to handle dynamic data processing, responsive UI, and robust user interactions.",
      color: "from-indigo-500/20 to-blue-500/20",
      repo: "https://github.com/harisdesai/AICC"
    }
  ];

  const SectionHeading = ({ title, icon: Icon }) => (
    <div className="flex items-center gap-4 mb-16 reveal opacity-0 translate-y-12 scale-95 transition-all duration-1000 ease-out">
      <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Icon size={24} className="text-sky-400 relative z-10" />
      </div>
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-500">
        {title}
      </h2>
      <div className="h-px bg-gradient-to-r from-sky-500/30 to-transparent flex-1 ml-4 md:ml-8" />
    </div>
  );

  return (
    <div className="relative min-h-screen text-slate-200 font-sans selection:bg-sky-500/30 selection:text-white pb-20 overflow-x-hidden">
      <CursorGlow />
      <InteractiveBackground />
      
      {/* Content Overlay */}
      <div className="relative z-10">
        
        {/* Modern Floating Header */}
        <div className="fixed top-6 left-0 w-full flex justify-center z-50 px-6 pointer-events-none">
          <nav className="pointer-events-auto flex justify-between items-center px-6 py-3 rounded-full backdrop-blur-xl bg-black/40 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] w-full max-w-5xl">
            <div className="text-lg font-bold tracking-tighter flex items-center gap-2">
              <span className="text-sky-400">{'<'}</span>
              HarisDesai
              <span className="text-sky-400">{'/>'}</span>
            </div>
            <div className="flex gap-6 items-center">
              <a href="https://github.com/harisdesai" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/haris-desai/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <div className="w-px h-4 bg-white/20 hidden sm:block"></div>
              <a href="mailto:harisdesai007@gmail.com" className="hidden sm:flex text-sm font-medium text-slate-300 hover:text-white transition-colors items-center gap-2">
                <Mail size={16} /> Contact
              </a>
            </div>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center px-6 pt-20">
          <div className="max-w-5xl w-full text-center reveal opacity-0 translate-y-12 scale-95 transition-all duration-1000 ease-out">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md mb-10 shadow-2xl hover:bg-white/[0.05] transition-colors cursor-default">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
              </span>
              <span className="text-sm font-medium text-slate-300 tracking-wide uppercase letter-spacing-2">
                B.Tech AIML Student & Developer
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter mb-8 leading-[1.1]">
              <span className="block text-slate-100">Haris Desai</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-14 leading-relaxed font-light">
              Engineering <span className="text-slate-200 font-medium">scalable architectures</span>, designing robust backend systems, and exploring the frontiers of <span className="text-sky-400 font-medium">Artificial Intelligence</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <button onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })} className="group relative px-8 py-4 rounded-full bg-white text-black font-bold tracking-wide transition-transform hover:scale-105 active:scale-95 overflow-hidden w-full sm:w-auto">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  View My Work <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-violet-400 opacity-0 group-hover:opacity-10 transition-opacity" />
              </button>
              <a href="https://github.com/harisdesai" target="_blank" rel="noreferrer" className="px-8 py-4 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-white font-medium transition-all backdrop-blur-md hover:scale-105 active:scale-95 flex items-center justify-center gap-2 w-full sm:w-auto">
                <Github size={20} /> GitHub Profile
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 px-6 max-w-6xl mx-auto">
          <SectionHeading title="Background" icon={User} />
          
          <div className="grid md:grid-cols-5 gap-6">
            <SpotlightCard className="md:col-span-3 p-10">
              <h3 className="text-xl font-medium text-slate-400 mb-6 flex items-center gap-3">
                <Terminal size={20} className="text-sky-400" /> Professional Summary
              </h3>
              <p className="text-slate-200 leading-relaxed text-lg md:text-xl font-light">
                I am a Computer Science student with a strong focus on software development, backend engineering, and system design. I am deeply passionate about building structured, high-performing applications and continuously exploring scalable architectures and AI-based solutions to solve complex problems.
              </p>
            </SpotlightCard>

            <SpotlightCard className="md:col-span-2 p-10 flex flex-col justify-center bg-gradient-to-br from-white/[0.02] to-sky-500/[0.02]">
              <h3 className="text-xl font-medium text-slate-400 mb-8 flex items-center gap-3">
                <GraduationCap size={20} className="text-violet-400" /> Education
              </h3>
              <div className="relative pl-6 border-l-2 border-white/10">
                <div className="absolute w-3 h-3 rounded-full bg-violet-500 -left-[7px] top-1.5 shadow-[0_0_15px_rgba(139,92,246,0.8)]" />
                <h4 className="text-2xl font-bold text-slate-100 tracking-tight mb-2">B.Tech</h4>
                <p className="text-violet-400 font-medium text-lg mb-2">Artificial Intelligence & ML</p>
                <p className="text-slate-500 font-light">Computer Science / IT</p>
              </div>
            </SpotlightCard>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-32 px-6 max-w-6xl mx-auto">
          <SectionHeading title="Technical Arsenal" icon={Layout} />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skillGroup, index) => (
              <SpotlightCard 
                key={index} 
                className={`reveal opacity-0 translate-y-12 scale-95 transition-all duration-700 ease-out p-8 group`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="mb-8 h-12 w-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/[0.08] transition-all duration-500">
                  {React.cloneElement(skillGroup.icon, { className: "text-slate-300 group-hover:text-white transition-colors" })}
                </div>
                <h3 className="text-xl font-bold mb-6 text-slate-100 tracking-tight">{skillGroup.category}</h3>
                <ul className="space-y-4">
                  {skillGroup.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-400 font-light text-sm md:text-base group-hover:text-slate-300 transition-colors">
                      <span className="text-sky-500/50 mt-1 text-xs">▹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-32 px-6 max-w-6xl mx-auto">
          <SectionHeading title="Featured Work" icon={GitBranch} />
          
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <SpotlightCard 
                key={index}
                as="a"
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className={`reveal opacity-0 translate-y-12 scale-95 transition-all duration-700 ease-out group block p-8 hover:-translate-y-2`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-between items-start mb-8">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${project.color} border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    {project.icon}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-slate-500 group-hover:text-white group-hover:bg-white/10 transition-all duration-300">
                    <ExternalLink size={18} />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-slate-100 tracking-tight group-hover:text-sky-400 transition-colors">{project.title}</h3>
                
                <p className="text-slate-400 mb-8 flex-1 leading-relaxed font-light text-sm md:text-base">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1.5 text-xs font-medium tracking-wide rounded-md bg-white/[0.03] border border-white/10 text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* Footer / Contact */}
        <footer id="contact" className="mt-20 border-t border-white/5 bg-black/20 backdrop-blur-2xl relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />
          
          <div className="max-w-4xl mx-auto px-6 py-24 text-center reveal opacity-0 translate-y-12 scale-95 transition-all duration-1000 ease-out">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-white/[0.03] border border-white/10 mb-8">
              <Mail size={28} className="text-sky-400" />
            </div>
            
            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-8 text-slate-100">Let's Connect</h2>
            <p className="text-slate-400 max-w-2xl mx-auto mb-12 text-lg md:text-xl font-light">
              Currently open for new opportunities, collaborations, and discussions about AI, System Design, and Backend architecture.
            </p>
            
            <div className="flex justify-center gap-4 mb-20">
              <a href="mailto:harisdesai007@gmail.com" className="px-8 py-4 rounded-full bg-white text-black font-bold hover:scale-105 active:scale-95 transition-transform flex items-center gap-2 tracking-wide">
                Get In Touch
              </a>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/5 pt-8">
              <p className="text-slate-500 text-sm font-light">
                © {new Date().getFullYear()} Haris Desai. All rights reserved.
              </p>
              <div className="flex gap-4">
                <a href="https://github.com/harisdesai" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors">
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/haris-desai/" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
