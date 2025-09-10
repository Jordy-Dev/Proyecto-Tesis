import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useAuth } from '../contexts/AuthContext';
import { 
  Sparkles, 
  Zap, 
  Cpu, 
  Network, 
  Eye, 
  EyeOff,
  ArrowRight,
  Shield
} from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Timeline principal
    const tl = gsap.timeline();

    // Animación de entrada
    tl.fromTo(containerRef.current, 
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" }
    )
    .fromTo(titleRef.current,
      { y: -50, opacity: 0, rotationX: -90 },
      { y: 0, opacity: 1, rotationX: 0, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo(subtitleRef.current,
      { y: 30, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
      "-=0.3"
    )
    .fromTo(iconsRef.current,
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" },
      "-=0.2"
    )
    .fromTo(formRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    );

    // Animación de partículas flotantes
    if (particlesRef.current) {
      const particles = particlesRef.current.children;
      gsap.set(particles, { opacity: 0, y: 20 });
      
      gsap.to(particles, {
        opacity: [0, 1, 0],
        y: -20,
        duration: 3,
        stagger: 0.2,
        repeat: -1,
        ease: "power2.inOut"
      });
    }

    // Animación de iconos flotantes
    if (iconsRef.current) {
      const icons = iconsRef.current.children;
      gsap.to(icons, {
        y: -10,
        duration: 2,
        stagger: 0.1,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular delay de login
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      await login(email, password);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const animateInput = (index: number) => {
    const input = inputRefs.current[index];
    if (input) {
      gsap.fromTo(input,
        { scale: 1, borderColor: 'var(--border-color)' },
        { scale: 1.02, borderColor: 'var(--text-secondary)', duration: 0.3, yoyo: true, repeat: 1 }
      );
    }
  };

  const animateButton = () => {
    if (buttonRef.current) {
      gsap.timeline()
        .to(buttonRef.current, { scale: 0.95, duration: 0.1 })
        .to(buttonRef.current, { scale: 1, duration: 0.1 })
        .to(buttonRef.current, { 
          boxShadow: "0 0 30px rgba(139, 92, 246, 0.5)", 
          duration: 0.3 
        });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Partículas flotantes */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: i % 3 === 0 ? '#8b5cf6' : i % 3 === 1 ? '#3b82f6' : '#06b6d4',
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>

      {/* Contenedor principal */}
      <div ref={containerRef} className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header con iconos flotantes */}
          <div className="text-center mb-8">
            <div ref={iconsRef} className="flex justify-center space-x-4 mb-6">
              <div className="p-3 rounded-2xl" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                <Sparkles className="w-6 h-6" style={{ color: '#8b5cf6' }} />
              </div>
              <div className="p-3 rounded-2xl" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                <Cpu className="w-6 h-6" style={{ color: '#3b82f6' }} />
              </div>
              <div className="p-3 rounded-2xl" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                <Network className="w-6 h-6" style={{ color: '#06b6d4' }} />
              </div>
            </div>
            
            <h1 ref={titleRef} className="text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
              Sensores IoT 
            </h1>
            <p ref={subtitleRef} className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              Monitoreo de Vibraciones y Gases
            </p>
          </div>

          {/* Formulario */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {/* Campo de email */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Zap className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
              </div>
              <input
                ref={el => inputRefs.current[0] = el}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => animateInput(0)}
                placeholder="Tu email"
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 transition-all duration-300 focus:outline-none"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)'
                }}
                required
              />
            </div>

            {/* Campo de contraseña */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Shield className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
              </div>
              <input
                ref={el => inputRefs.current[1] = el}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => animateInput(1)}
                placeholder="Tu contraseña"
                className="w-full pl-12 pr-12 py-4 rounded-2xl border-2 transition-all duration-300 focus:outline-none"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)'
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
                style={{ color: 'var(--text-secondary)' }}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Botón de login */}
            <button
              ref={buttonRef}
              type="submit"
              disabled={isLoading}
              onClick={animateButton}
              className="w-full py-4 px-6 rounded-2xl font-semibold text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 50%, #06b6d4 100%)'
              }}
            >
              <span className="relative z-10 flex items-center justify-center">
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Conectando...
                  </>
                ) : (
                  <>
                    Acceder al Dashboard
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </span>
              
              {/* Efecto de brillo */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              ¿Primera vez? Usa cualquier email y contraseña para demo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
