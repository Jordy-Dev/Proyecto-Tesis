import React, { useRef, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';
import type { GasSensorData, MotionSensorData, ChartData } from '../types';
import { Wind, Eye, AlertTriangle } from 'lucide-react';

interface ChartsProps {
  gasSensors: GasSensorData[];
  motionSensors: MotionSensorData[];
  loading: boolean;
}

const Charts: React.FC<ChartsProps> = ({ gasSensors, motionSensors, loading }) => {
  const chartsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartsRef.current && !loading) {
      gsap.fromTo(chartsRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }
  }, [loading]);

  const gasChartData = useMemo(() => {
    if (!gasSensors.length) return [];
    
    return gasSensors.slice(0, 20).reverse().map((sensor, index) => ({
      name: `${index + 1}`,
      nivel_gas: sensor.nivel_gas,
      ventilador: sensor.ventilador,
      fecha: new Date(sensor.fecha_hora).toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      })
    }));
  }, [gasSensors]);

  const motionChartData = useMemo(() => {
    if (!motionSensors.length) return [];
    
    return motionSensors.slice(0, 20).reverse().map((sensor, index) => ({
      name: `${index + 1}`,
      movimiento: sensor.movimiento,
      alarma: sensor.alarma,
      fecha: new Date(sensor.fecha_hora).toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      })
    }));
  }, [motionSensors]);

  const gasLevelData = useMemo(() => {
    return gasChartData.map(item => ({
      name: item.name,
      value: item.nivel_gas,
      fecha: item.fecha
    }));
  }, [gasChartData]);

  const motionData = useMemo(() => {
    return motionChartData.map(item => ({
      name: item.name,
      movimiento: item.movimiento,
      alarma: item.alarma,
      fecha: item.fecha
    }));
  }, [motionChartData]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {[...Array(2)].map((_, index) => (
          <div key={index} className="glass-card p-6 animate-pulse">
            <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded mb-4"></div>
            <div className="h-64 bg-slate-300 dark:bg-slate-600 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={chartsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Gráfico de nivel de gas */}
      <div className="glass-card p-6">
        <div className="flex items-center space-x-2 mb-6">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <Wind className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Nivel de Gas en tiempo real
          </h3>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={gasLevelData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
            <XAxis 
              dataKey="name" 
              stroke="rgba(148, 163, 184, 0.8)"
              fontSize={12}
            />
            <YAxis 
              stroke="rgba(148, 163, 184, 0.8)"
              fontSize={12}
              label={{ 
                value: 'ppm', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle' }
              }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              labelStyle={{ color: '#475569' }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#22c55e" 
              strokeWidth={3}
              dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#22c55e', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de movimiento y alarmas */}
      <div className="glass-card p-6">
        <div className="flex items-center space-x-2 mb-6">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <Eye className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Movimiento y Alarmas
          </h3>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={motionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
            <XAxis 
              dataKey="name" 
              stroke="rgba(148, 163, 184, 0.8)"
              fontSize={12}
            />
            <YAxis 
              stroke="rgba(148, 163, 184, 0.8)"
              fontSize={12}
              domain={[0, 1]}
              ticks={[0, 1]}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              labelStyle={{ color: '#475569' }}
            />
            <Bar 
              dataKey="movimiento" 
              fill="#a855f7" 
              radius={[4, 4, 0, 0]}
              name="Movimiento"
            />
            <Bar 
              dataKey="alarma" 
              fill="#ef4444" 
              radius={[4, 4, 0, 0]}
              name="Alarma"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
