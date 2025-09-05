import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import type { DashboardStats } from '../types';
import { Activity, Wind, AlertTriangle, Clock, Zap, Eye } from 'lucide-react';

interface StatsCardsProps {
  stats: DashboardStats | null;
  loading: boolean;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats, loading }) => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (cardsRef.current.length > 0) {
      gsap.fromTo(cardsRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.6, 
          stagger: 0.1,
          ease: "power3.out" 
        }
      );
    }
  }, [stats]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="glass-card p-6 animate-pulse">
            <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded mb-4"></div>
            <div className="h-8 bg-slate-300 dark:bg-slate-600 rounded mb-2"></div>
            <div className="h-3 bg-slate-300 dark:bg-slate-600 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  const getGasLevelColor = (level: number) => {
    if (level < 1000) return 'text-green-600';
    if (level < 3000) return 'text-yellow-600';
    if (level < 5000) return 'text-orange-600';
    return 'text-red-600';
  };

  const getGasLevelStatus = (level: number) => {
    if (level < 1000) return 'Excelente';
    if (level < 3000) return 'Buena';
    if (level < 5000) return 'Moderada';
    return 'Peligrosa';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total de lecturas */}
      <div 
        ref={(el) => { cardsRef.current[0] = el; }}
        className="glass-card p-6 hover:scale-105 transition-transform duration-300"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Activity className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-2xl font-bold text-blue-600">
            {stats.totalReadings}
          </span>
        </div>
        <h3 className="text-slate-600 dark:text-slate-400 text-sm font-medium">
          Total de lecturas
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
          Datos recopilados
        </p>
      </div>

      {/* Nivel de gas promedio */}
      <div 
        ref={(el) => { cardsRef.current[1] = el; }}
        className="glass-card p-6 hover:scale-105 transition-transform duration-300"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <Wind className="w-6 h-6 text-green-600" />
          </div>
          <span className={`text-2xl font-bold ${getGasLevelColor(stats.averageGasLevel)}`}>
            {Math.round(stats.averageGasLevel)}
          </span>
        </div>
        <h3 className="text-slate-600 dark:text-slate-400 text-sm font-medium">
          Nivel de gas promedio
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
          {getGasLevelStatus(stats.averageGasLevel)}
        </p>
      </div>

      {/* Detecciones de movimiento */}
      <div 
        ref={(el) => { cardsRef.current[2] = el; }}
        className="glass-card p-6 hover:scale-105 transition-transform duration-300"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <Eye className="w-6 h-6 text-purple-600" />
          </div>
          <span className="text-2xl font-bold text-purple-600">
            {stats.motionDetections}
          </span>
        </div>
        <h3 className="text-slate-600 dark:text-slate-400 text-sm font-medium">
          Detecciones de movimiento
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
          Vibraciones detectadas
        </p>
      </div>

      {/* Estado del ventilador */}
      <div 
        ref={(el) => { cardsRef.current[3] = el; }}
        className="glass-card p-6 hover:scale-105 transition-transform duration-300"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-orange-500/20 rounded-lg">
            <Zap className="w-6 h-6 text-orange-600" />
          </div>
          <span className="text-lg font-bold text-orange-600">
            {stats.ventilatorActivations}
          </span>
        </div>
        <h3 className="text-slate-600 dark:text-slate-400 text-sm font-medium">
          Activaciones del ventilador
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
          Control de calidad de aire
        </p>
      </div>
    </div>
  );
};

export default StatsCards;
