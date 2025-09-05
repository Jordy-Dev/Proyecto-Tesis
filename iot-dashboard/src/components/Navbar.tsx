import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  User, 
  LogOut, 
  Settings,
  Thermometer,
  Droplets
} from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  const navbarRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (navbarRef.current) {
      gsap.fromTo(navbarRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }
  }, []);

  const handleLogout = () => {
    logout();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav 
      ref={navbarRef}
      className="glass-card sticky top-0 z-50 mx-4 mt-4 mb-6"
    >
      <div className="flex items-center justify-between p-4">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
            <Thermometer className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gradient">IoT Dashboard</h1>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Monitoreo en tiempo real
            </p>
          </div>
        </div>

        {/* Navegación central */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#dashboard" className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <Thermometer size={18} />
            <span>Dashboard</span>
          </a>
          <a href="#sensores" className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <Droplets size={18} />
            <span>Sensores</span>
          </a>
        </div>

        {/* Acciones del usuario */}
        <div className="flex items-center space-x-4">
          {/* Toggle del tema */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl glass-button hover:scale-110 transition-transform"
            aria-label="Cambiar tema"
          >
            {theme === 'light' ? (
              <Moon size={20} className="text-slate-700 dark:text-slate-300" />
            ) : (
              <Sun size={20} className="text-slate-700 dark:text-slate-300" />
            )}
          </button>

          {/* Usuario */}
          <div className="relative">
            <button
              onClick={toggleMenu}
              className="flex items-center space-x-2 p-2 rounded-xl glass-button hover:scale-105 transition-transform"
            >
              <User size={18} className="text-slate-700 dark:text-slate-300" />
              <span className="hidden sm:block text-slate-700 dark:text-slate-300">
                {user?.name || 'Usuario'}
              </span>
            </button>

            {/* Menú desplegable */}
            {isMenuOpen && (
              <div 
                ref={menuRef}
                className="absolute right-0 mt-2 w-48 glass-card p-2 space-y-1"
              >
                <div className="p-3 border-b border-slate-200 dark:border-slate-700">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {user?.name}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {user?.email}
                  </p>
                </div>
                
                <button className="w-full flex items-center space-x-2 p-2 rounded-lg hover:bg-white/20 dark:hover:bg-black/20 transition-colors text-left">
                  <Settings size={16} />
                  <span className="text-sm">Configuración</span>
                </button>
                
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 p-2 rounded-lg hover:bg-red-500/20 transition-colors text-left text-red-600 dark:text-red-400"
                >
                  <LogOut size={16} />
                  <span className="text-sm">Cerrar sesión</span>
                </button>
              </div>
            )}
          </div>

          {/* Menú móvil */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-xl glass-button"
          >
            {isMenuOpen ? (
              <X size={20} className="text-slate-700 dark:text-slate-300" />
            ) : (
              <Menu size={20} className="text-slate-700 dark:text-slate-300" />
            )}
          </button>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {isMenuOpen && (
        <div className="md:hidden glass-card mx-4 mb-4 p-4 space-y-3">
          <a href="#dashboard" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/20 dark:hover:bg-black/20 transition-colors">
            <Thermometer size={18} />
            <span>Dashboard</span>
          </a>
          <a href="#sensores" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/20 dark:hover:bg-black/20 transition-colors">
            <Droplets size={18} />
            <span>Sensores</span>
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
