import React, { useEffect, useRef } from 'react';
import {
  Terminal,
  Code2,
  Database,
  Cpu,
  Layout,
  GitBranch,
  Wrench,
  BrainCircuit,
  ChevronDown,
  Link,
  Link2,
  Mail,
  User,
  GraduationCap,
  ExternalLink,
  Activity,
} from 'lucide-react';

class Particle {
  constructor({ x, y, directionX, directionY, size, ctx, canvas, mouse }) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.ctx = ctx;
    this.canvas = canvas;
    this.mouse = mouse;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    this.ctx.fillStyle = '#38bdf8';
    this.ctx.fill();
  }

  update() {
    if (this.x > this.canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > this.canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }

    let dx = this.mouse.x - this.x;
    let dy = this.mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.mouse.radius + this.size) {
      if (this.mouse.x < this.x && this.x < this.canvas.width - this.size * 10) {
        this.x += 10;
      }
      if (this.mouse.x > this.x && this.x > this.size * 10) {
        this.x -= 10;
      }
      if (this.mouse.y < this.y && this.y < this.canvas.height - this.size * 10) {
        this.y += 10;
      }
      if (this.mouse.y > this.y && this.y > this.size * 10) {
        this.y -= 10;
      }
    }

    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
}

const InteractiveBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particlesArray;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let mouse = {
      x: null,
      y: null,
      radius: (canvas.height / 80) * (canvas.width / 80),
    };

    const handleMouseMove = (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
    };

    const handleMouseOut = () => {
      mouse.x = undefined;
      mouse.y = undefined;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    const init = () => {
      particlesArray = [];
      let numberOfParticles = (canvas.height * canvas.width) / 9000;
      for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 2 + 1;
        let x = Math.random() * (innerWidth - size * 4) + size * 2;
        let y = Math.random() * (innerHeight - size * 4) + size * 2;
        let directionX = Math.random() * 1 - 0.5;
        let directionY = Math.random() * 1 - 0.5;
        particlesArray.push(new Particle({ x, y, directionX, directionY, size, ctx, canvas, mouse }));
      }
    };

    const connect = () => {
      let opacityValue = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let distance =
            (particlesArray[a].x - particlesArray[b].x) *
              (particlesArray[a].x - particlesArray[b].x) +
            (particlesArray[a].y - particlesArray[b].y) *
              (particlesArray[a].y - particlesArray[b].y);
          if (distance < (canvas.width / 7) * (canvas.height / 7)) {
            opacityValue = 1 - distance / 20000;
            ctx.strokeStyle = `rgba(56, 189, 248, ${opacityValue})`;
            ctx.lineWidth = 1;
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
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      mouse.radius = (canvas.height / 80) * (canvas.width / 80);
      init();
    };

    window.addEventListener('resize', handleResize);

    init();
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-auto bg-[#030712]"
    />
  );
};

const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-12');
          }
        });
      },
      { threshold: 0.1 }
    );

    const hiddenElements = document.querySelectorAll('.reveal');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

const SectionHeading = ({ title, icon: Icon }) => (
  <div className="flex items-center gap-4 mb-12 reveal opacity-0 translate-y-12 transition-all duration-700 ease-out">
    <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
      <Icon size={28} />
    </div>
    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
      {title}
    </h2>
    <div className="h-px bg-gradient-to-r from-sky-500/50 to-transparent flex-1 ml-4" />
  </div>
);

export default function App() {
  useScrollReveal();

  const skills = [
    {
      category: 'Programming Languages',
      icon: <Code2 size={24} />,
      items: ['Python', 'TypeScript', 'JavaScript', 'Java (Core, OOP)', 'C (Core concepts)'],
    },
    {
      category: 'Web & App Dev',
      icon: <Layout size={24} />,
      items: ['Frontend Architecture (TS/JS)', 'Backend Engineering', 'System Design', 'Game Logic & State'],
    },
    {
      category: 'AI & Data',
      icon: <BrainCircuit size={24} />,
      items: ['Generative AI Models', 'Computer Vision', 'Machine Learning (Basic)', 'MySQL'],
    },
    {
      category: 'Tools & Environments',
      icon: <Wrench size={24} />,
      items: ['Git & GitHub', 'VS Code', 'IntelliJ IDEA', 'Eclipse'],
    },
  ];

  const projects = [
    {
      title: 'Generative AI Suite',
      icon: <BrainCircuit size={32} className="text-sky-400" />,
      tags: ['Python', 'Generative AI', 'Machine Learning'],
      description:
        'Developed advanced generative AI models and applications, focusing on scalable AI architectures and innovative problem-solving methodologies.',
      color: 'from-sky-500/20 to-blue-500/20',
      borderColor: 'group-hover:border-sky-500/50',
      repo: 'https://github.com/harisdesai/Generative_AI_Project',
    },
    {
      title: 'EmotionSense',
      icon: <User size={32} className="text-purple-400" />,
      tags: ['Python', 'AI/ML', 'Computer Vision'],
      description:
        'An intelligent system designed to detect and analyze human emotions using advanced Python-based machine learning algorithms.',
      color: 'from-purple-500/20 to-fuchsia-500/20',
      borderColor: 'group-hover:border-purple-500/50',
      repo: 'https://github.com/harisdesai/EmotionSense',
    },
    {
      title: 'Python Game Engine',
      icon: <Terminal size={32} className="text-red-400" />,
      tags: ['Python', 'Game Development', 'Logic'],
      description:
        'An interactive gaming experience built entirely in Python, demonstrating complex state management and game loop architectures.',
      color: 'from-red-500/20 to-rose-500/20',
      borderColor: 'group-hover:border-red-500/50',
      repo: 'https://github.com/harisdesai/Game_Project',
    },
    {
      title: 'LiftPro App',
      icon: <Activity size={32} className="text-orange-400" />,
      tags: ['TypeScript', 'Frontend', 'Fitness'],
      description:
        'A robust fitness tracking application leveraging TypeScript for type-safe, scalable, and responsive user interfaces.',
      color: 'from-orange-500/20 to-amber-500/20',
      borderColor: 'group-hover:border-orange-500/50',
      repo: 'https://github.com/harisdesai/liftpro-app',
    },
    {
      title: 'Krishi Sakha Connect',
      icon: <Database size={32} className="text-emerald-400" />,
      tags: ['TypeScript', 'Web App', 'AgriTech'],
      description:
        'A comprehensive agricultural technology platform collaborating with delta-vision0 to connect farmers with vital resources.',
      color: 'from-emerald-500/20 to-teal-500/20',
      borderColor: 'group-hover:border-emerald-500/50',
      repo: 'https://github.com/delta-vision0/krishi-sakha-connect',
    },
    {
      title: 'AICC',
      icon: <Cpu size={32} className="text-yellow-400" />,
      tags: ['JavaScript', 'Web Tech', 'AI Integration'],
      description:
        'An AI-focused web application utilizing JavaScript to handle dynamic data processing, responsive UI, and robust user interactions.',
      color: 'from-yellow-500/20 to-amber-500/20',
      borderColor: 'group-hover:border-yellow-500/50',
      repo: 'https://github.com/harisdesai/AICC',
    },
  ];

  return (
    <div className="relative min-h-screen text-slate-200 font-sans selection:bg-sky-500/30">
      <InteractiveBackground />

      <div className="relative z-10">
        <nav className="fixed w-full top-0 p-6 flex justify-between items-center backdrop-blur-md bg-black/20 border-b border-white/5 z-50">
          <div className="text-xl font-bold tracking-tighter flex items-center gap-2">
            <span className="text-sky-400">{'<'}</span>
            Haris Desai
            <span className="text-sky-400">{'/>'}</span>
          </div>
          <div className="flex gap-4">
            <a
              href="https://github.com/harisdesai"
              target="_blank"
              rel="noreferrer"
              className="hover:text-sky-400 transition-colors"
            >
              <Link size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/haris-desai/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-sky-400 transition-colors"
            >
              <Link2 size={20} />
            </a>
          </div>
        </nav>

        <section className="min-h-screen flex flex-col justify-center items-center px-6 pt-20">
          <div className="max-w-4xl w-full text-center reveal opacity-0 translate-y-12 transition-all duration-1000 ease-out delay-200">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 mb-8 backdrop-blur-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
              </span>
              B.Tech AIML Student & Developer
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6">
              Hi, I'm{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
                Haris Desai
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              Engineering scalable backend architectures, designing robust systems, and exploring the
              frontiers of Artificial Intelligence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-900 font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_-5px_rgba(56,189,248,0.4)]"
              >
                View My Projects
              </button>
              <button
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all backdrop-blur-sm hover:scale-105 active:scale-95"
              >
                Contact Me
              </button>
            </div>
          </div>

          <div className="absolute bottom-10 animate-bounce text-slate-500">
            <ChevronDown size={32} />
          </div>
        </section>

        <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
          <SectionHeading title="About & Education" icon={User} />

          <div className="grid md:grid-cols-2 gap-8">
            <div className="reveal opacity-0 translate-y-12 transition-all duration-700 ease-out delay-100 p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/[0.07] transition-colors">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Terminal className="text-sky-400" /> Professional Summary
              </h3>
              <p className="text-slate-400 leading-relaxed text-lg">
                I am a Computer Science student with a strong focus on software development, backend
                engineering, and system design. I am deeply passionate about building structured,
                high-performing applications and continuously exploring scalable architectures and AI-based
                solutions to solve complex problems.
              </p>
            </div>

            <div className="reveal opacity-0 translate-y-12 transition-all duration-700 ease-out delay-200 p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/[0.07] transition-colors flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <GraduationCap className="text-sky-400" /> Academic Background
              </h3>
              <div className="relative pl-8 border-l border-sky-500/30">
                <div className="absolute w-4 h-4 rounded-full bg-sky-500 left-[-8.5px] top-1 shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
                <h4 className="text-xl font-bold text-slate-200">Bachelor of Technology</h4>
                <p className="text-sky-400 font-medium mb-2">Artificial Intelligence & Machine Learning</p>
                <p className="text-slate-500">Pursuing Computer Science / IT</p>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="py-24 px-6 max-w-6xl mx-auto">
          <SectionHeading title="Technical Arsenal" icon={Layout} />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skillGroup, index) => (
              <div
                key={index}
                className="reveal opacity-0 translate-y-12 transition-all duration-700 ease-out group p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-sky-500/50 hover:bg-white/[0.08]"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="mb-6 p-3 inline-block rounded-lg bg-white/5 group-hover:bg-sky-500/20 group-hover:text-sky-400 transition-colors">
                  {skillGroup.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-200">{skillGroup.category}</h3>
                <ul className="space-y-3">
                  {skillGroup.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-400">
                      <span className="text-sky-500 mt-1">▹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
          <SectionHeading title="Featured Projects" icon={GitBranch} />

          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                key={index}
                className="reveal opacity-0 translate-y-12 transition-all duration-700 ease-out group relative p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-sky-500/50 hover:to-transparent overflow-hidden block"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />

                <div
                  className={`h-full bg-[#0a0a0a]/90 backdrop-blur-xl p-8 rounded-2xl flex flex-col border border-transparent ${project.borderColor} transition-colors duration-500`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${project.color} border border-white/5 shadow-lg`}
                    >
                      {project.icon}
                    </div>
                    <ExternalLink size={20} className="text-slate-500 group-hover:text-sky-400 transition-colors" />
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-slate-100 group-hover:text-sky-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-slate-400 mb-6 flex-1 leading-relaxed text-sm md:text-base">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <footer id="contact" className="border-t border-white/10 bg-black/50 backdrop-blur-lg mt-24">
          <div className="max-w-6xl mx-auto px-6 py-16 text-center reveal opacity-0 translate-y-12 transition-all duration-700 ease-out">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Let's Build Something Great</h2>
            <p className="text-slate-400 max-w-2xl mx-auto mb-10 text-lg">
              Currently open for new opportunities, collaborations, and discussions about AI, System
              Design, and Backend architecture.
            </p>

            <div className="flex justify-center gap-6 mb-16">
              <a
                href="mailto:harisdesai007@gmail.com"
                className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-sky-500 hover:text-slate-900 transition-all hover:scale-110"
              >
                <Mail size={24} />
              </a>
              <a
                href="https://github.com/harisdesai"
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-sky-500 hover:text-slate-900 transition-all hover:scale-110"
              >
                <Link size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/haris-desai/"
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-sky-500 hover:text-slate-900 transition-all hover:scale-110"
              >
                <Link2 size={24} />
              </a>
            </div>

            <p className="text-slate-600 text-sm">© {new Date().getFullYear()} Haris Desai. Built with React & Tailwind.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
