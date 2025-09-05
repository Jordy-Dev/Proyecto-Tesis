import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  ArrowLeft,
  Palette,
  Bell,
  Shield,
  Database,
  Wifi,
  Save,
  RotateCcw,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    critical: true,
    maintenance: false
  });
  const [autoRefresh, setAutoRefresh] = useState(30);
  const [dataRetention, setDataRetention] = useState(90);
  const [saved, setSaved] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const actionButtonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Timeline principal con animaciones escalonadas
    const tl = gsap.timeline();
    
    // Animación del header con efectos 3D
    tl.fromTo(headerRef.current,
      { opacity: 0, y: -50, scale: 0.9, rotationX: -15 },
      { opacity: 1, y: 0, scale: 1, rotationX: 0, duration: 1.2, ease: "back.out(1.7)" }
    )
    .fromTo(titleRef.current,
      { opacity: 0, x: -100, rotationY: -90, scale: 0.5 },
      { opacity: 1, x: 0, rotationY: 0, scale: 1, duration: 1, ease: "power2.out" },
      "-=0.8"
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, x: -50, scale: 0.8, rotationZ: -5 },
      { opacity: 1, x: 0, scale: 1, rotationZ: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" },
      "-=0.6"
    )
    .fromTo(backButtonRef.current,
      { opacity: 0, scale: 0, rotation: -180, y: -20 },
      { opacity: 1, scale: 1, rotation: 0, y: 0, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.4"
    );

    // Animación del contenido principal con efecto de profundidad
    tl.fromTo(containerRef.current,
      { opacity: 0, y: 50, scale: 0.95, rotationX: 5 },
      { opacity: 1, y: 0, scale: 1, rotationX: 0, duration: 1.2, ease: "power2.out" },
      "-=0.6"
    );

    // Animación de las secciones con stagger y efectos 3D
    sectionsRef.current.forEach((section, index) => {
      if (section) {
        gsap.fromTo(section,
          { 
            opacity: 0, 
            x: -100, 
            scale: 0.8,
            rotationY: -15,
            rotationX: -5
          },
          { 
            opacity: 1, 
            x: 0, 
            scale: 1,
            rotationY: 0,
            rotationX: 0,
            duration: 1, 
            ease: "power2.out", 
            delay: 0.8 + (index * 0.2)
          }
        );
      }
    });

    // Animación de los botones de acción con bounce
    gsap.fromTo(actionButtonsRef.current,
      { opacity: 0, y: 30, scale: 0.9, rotationZ: -5 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        rotationZ: 0,
        duration: 1, 
        ease: "back.out(1.7)",
        delay: 1.8
      }
    );

    // Animación continua de partículas flotantes
    const particles = gsap.utils.toArray('.floating-particle');
    particles.forEach((particle: any, index: number) => {
      gsap.to(particle, {
        y: -30,
        x: Math.sin(index) * 15,
        rotation: 360,
        scale: 0.5 + Math.random() * 0.5,
        duration: 4 + Math.random() * 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.3
      });
    });

    return () => {
      tl.kill();
      gsap.killTweensOf(particles);
    };
  }, []);

  // Animaciones de hover para las secciones
  const handleSectionHover = (index: number, isEntering: boolean) => {
    const section = sectionsRef.current[index];
    if (!section) return;

    if (isEntering) {
      gsap.to(section, {
        scale: 1.03,
        y: -8,
        rotationY: 2,
        duration: 0.4,
        ease: "power2.out"
      });
      
      // Efecto de brillo en el borde con color del tema
      gsap.to(section, {
        boxShadow: theme === 'dark' 
          ? "0 25px 50px -12px rgba(139, 92, 246, 0.4)" 
          : "0 25px 50px -12px rgba(139, 92, 246, 0.3)",
        duration: 0.4
      });

      // Animación del icono
      const icon = section.querySelector('svg');
      if (icon) {
        gsap.to(icon, {
          scale: 1.2,
          rotation: 15,
          duration: 0.3,
          ease: "back.out(1.7)"
        });
      }
    } else {
      gsap.to(section, {
        scale: 1,
        y: 0,
        rotationY: 0,
        duration: 0.4,
        ease: "power2.out"
      });
      
      gsap.to(section, {
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        duration: 0.4
      });

      // Reset del icono
      const icon = section.querySelector('svg');
      if (icon) {
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    }
  };

  // Animación del botón de guardar con confeti
  const handleSave = () => {
    setSaved(true);
    
    // Animación de éxito del botón
    const button = document.querySelector('.save-button');
    if (button) {
      gsap.to(button, {
        scale: 1.15,
        duration: 0.2,
        ease: "back.out(1.7)",
        yoyo: true,
        repeat: 1
      });
    }

    // Efecto de confeti animado
    const confettiElements = document.querySelectorAll('.confetti-particle');
    confettiElements.forEach((particle, index) => {
      gsap.fromTo(particle,
        { 
          opacity: 0, 
          scale: 0, 
          y: 0,
          rotation: 0
        },
        {
          opacity: 1,
          scale: 1,
          y: -150 - Math.random() * 100,
          x: (Math.random() - 0.5) * 200,
          rotation: Math.random() * 360,
          duration: 1.5,
          delay: index * 0.05,
          ease: "power2.out"
        }
      );
    });

    setTimeout(() => setSaved(false), 2000);
  };

  // Animación del botón de reset con rotación
  const handleReset = () => {
    // Animación de rotación del botón
    const resetButton = document.querySelector('.reset-button');
    if (resetButton) {
      gsap.to(resetButton, {
        rotation: 360,
        scale: 1.1,
        duration: 0.8,
        ease: "power2.out"
      });
    }

    setNotifications({
      email: true,
      push: false,
      critical: true,
      maintenance: false
    });
    setAutoRefresh(30);
    setDataRetention(90);

    // Animación de las secciones con efecto de reset
    sectionsRef.current.forEach((section, index) => {
      if (section) {
        gsap.fromTo(section,
          { scale: 0.95, opacity: 0.8, rotationY: -5 },
          { scale: 1, opacity: 1, rotationY: 0, duration: 0.6, delay: index * 0.1 }
        );
      }
    });
  };

  // Animación del toggle de tema con efectos 3D
  const handleThemeToggle = () => {
    const themeButton = document.querySelector('.theme-toggle');
    if (themeButton) {
      gsap.to(themeButton, {
        scale: 1.3,
        rotationY: 180,
        rotationZ: 10,
        duration: 0.6,
        ease: "back.out(1.7)",
        yoyo: true,
        repeat: 1
      });
    }
    toggleTheme();
  };

  // Animación de los sliders con feedback visual
  const handleSliderChange = (value: number, setter: (value: number) => void) => {
    setter(value);
    
    // Efecto de pulso en el valor mostrado
    const valueDisplay = document.querySelector('.slider-value');
    if (valueDisplay) {
      gsap.to(valueDisplay, {
        scale: 1.2,
        color: '#8b5cf6',
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "power2.out"
      });
    }

    // Efecto en el slider
    const slider = document.querySelector('input[type="range"]:focus');
    if (slider) {
      gsap.to(slider, {
        scale: 1.02,
        duration: 0.2,
        yoyo: true,
        repeat: 1
      });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Partículas flotantes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="floating-particle absolute w-2 h-2 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: i % 4 === 0 ? '#8b5cf6' : i % 4 === 1 ? '#3b82f6' : i % 4 === 2 ? '#06b6d4' : '#10b981'
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div ref={headerRef} className="p-6 border-b relative" style={{ borderColor: 'var(--border-color)' }}>
        <div className="flex items-center space-x-4">
          <button
            ref={backButtonRef}
            onClick={() => window.history.back()}
            className="p-2 rounded-lg hover:bg-opacity-80 transition-all duration-200 group"
            style={{ backgroundColor: 'var(--card-bg)' }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, { scale: 1.1, rotation: -10, duration: 0.2 });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, { scale: 1, rotation: 0, duration: 0.2 });
            }}
          >
            <ArrowLeft className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
          </button>
          <div>
            <h1 
              ref={titleRef}
              className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
            >
              Ajustes del Sistema
            </h1>
            <p 
              ref={subtitleRef}
              className="text-sm" 
              style={{ color: 'var(--text-secondary)' }}
            >
              Personaliza tu experiencia IoT
            </p>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div ref={containerRef} className="p-6 max-w-4xl mx-auto space-y-8">
        
        {/* Apariencia */}
        <div 
          ref={(el) => { sectionsRef.current[0] = el; }} 
          className="glass-card p-6 cursor-pointer transform transition-all duration-300"
          onMouseEnter={() => handleSectionHover(0, true)}
          onMouseLeave={() => handleSectionHover(0, false)}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)' }}>
              <Palette className="w-6 h-6" style={{ color: '#8b5cf6' }} />
            </div>
            <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              Apariencia
            </h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>
                  Tema de la interfaz
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {theme === 'dark' ? 'Modo oscuro activo' : 'Modo claro activo'}
                </p>
              </div>
              <button
                className="theme-toggle px-4 py-2 rounded-lg font-medium transition-all duration-300"
                onClick={handleThemeToggle}
                style={{
                  backgroundColor: 'var(--card-bg)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)'
                }}
              >
                {theme === 'dark' ? '🌙 Oscuro' : '☀️ Claro'}
              </button>
            </div>
          </div>
        </div>

        {/* Notificaciones */}
        <div 
          ref={(el) => { sectionsRef.current[1] = el; }} 
          className="glass-card p-6 cursor-pointer transform transition-all duration-300"
          onMouseEnter={() => handleSectionHover(1, true)}
          onMouseLeave={() => handleSectionHover(1, false)}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
              <Bell className="w-6 h-6" style={{ color: '#3b82f6' }} />
            </div>
            <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              Notificaciones
            </h2>
          </div>
          
          <div className="space-y-4">
            {Object.entries(notifications).map(([key, value], index) => (
              <div 
                key={key} 
                className="flex items-center justify-between p-3 rounded-lg hover:bg-opacity-50 transition-all duration-200"
                style={{ backgroundColor: 'var(--bg-secondary)' }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, { x: 8, duration: 0.3, ease: "power2.out" });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { x: 0, duration: 0.3, ease: "power2.out" });
                }}
              >
                <div>
                  <h3 className="font-medium capitalize" style={{ color: 'var(--text-primary)' }}>
                    {key === 'email' ? 'Notificaciones por email' :
                     key === 'push' ? 'Notificaciones push' :
                     key === 'critical' ? 'Alertas críticas' :
                     'Mantenimiento del sistema'}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {key === 'email' ? 'Recibe reportes por correo electrónico' :
                     key === 'push' ? 'Notificaciones en tiempo real' :
                     key === 'critical' ? 'Alertas de emergencia siempre activas' :
                     'Avisos de mantenimiento programado'}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setNotifications(prev => ({ ...prev, [key]: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 bg-gray-200 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Rendimiento */}
        <div 
          ref={(el) => { sectionsRef.current[2] = el; }} 
          className="glass-card p-6 cursor-pointer transform transition-all duration-300"
          onMouseEnter={() => handleSectionHover(2, true)}
          onMouseLeave={() => handleSectionHover(2, false)}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(6, 182, 212, 0.1)' }}>
              <Database className="w-6 h-6" style={{ color: '#06b6d4' }} />
            </div>
            <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              Rendimiento
            </h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                Actualización automática: <span className="slider-value font-bold text-purple-600">{autoRefresh}s</span>
              </label>
              <input
                type="range"
                min="10"
                max="60"
                value={autoRefresh}
                onChange={(e) => handleSliderChange(Number(e.target.value), setAutoRefresh)}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  backgroundColor: 'var(--border-color)',
                  outline: 'none'
                }}
              />
              <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                <span>10s</span>
                <span>60s</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                Retención de datos: <span className="slider-value font-bold text-purple-600">{dataRetention} días</span>
              </label>
              <input
                type="range"
                min="30"
                max="365"
                value={dataRetention}
                onChange={(e) => handleSliderChange(Number(e.target.value), setDataRetention)}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  backgroundColor: 'var(--border-color)',
                  outline: 'none'
                }}
              />
              <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                <span>30 días</span>
                <span>1 año</span>
              </div>
            </div>
          </div>
        </div>

        {/* Seguridad */}
        <div 
          ref={(el) => { sectionsRef.current[3] = el; }} 
          className="glass-card p-6 cursor-pointer transform transition-all duration-300"
          onMouseEnter={() => handleSectionHover(3, true)}
          onMouseLeave={() => handleSectionHover(3, false)}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
              <Shield className="w-6 h-6" style={{ color: '#10b981' }} />
            </div>
            <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              Seguridad
            </h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <div>
                <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>
                  Sesión activa
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Conectado como {user?.email}
                </p>
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  color: '#dc2626',
                  border: '1px solid rgba(239, 68, 68, 0.3)'
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2 });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { scale: 1, duration: 0.2 });
                }}
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div ref={actionButtonsRef} className="flex items-center justify-between pt-6">
          <button
            className="reset-button flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
            onClick={handleReset}
            style={{
              backgroundColor: 'var(--card-bg)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)'
            }}
          >
            <RotateCcw className="w-5 h-5" />
            <span>Restablecer</span>
          </button>

          <button
            className="save-button flex items-center space-x-2 px-8 py-3 rounded-lg font-medium text-white transition-all duration-300 hover:scale-105 relative overflow-hidden group"
            onClick={handleSave}
            style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)'
            }}
          >
            <span className="relative z-10 flex items-center">
              {saved ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  ¡Guardado!
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Guardar Cambios
                </>
              )}
            </span>
            
            {/* Efecto de brillo */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </button>
        </div>

        {/* Confeti oculto */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {[...Array(60)].map((_, i) => (
            <div
              key={i}
              className="confetti-particle absolute w-2 h-2 rounded-full opacity-0"
              style={{
                left: `${Math.random() * 100}%`,
                top: '100%',
                backgroundColor: ['#8b5cf6', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'][i % 6]
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
