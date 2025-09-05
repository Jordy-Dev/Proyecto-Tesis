import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import type { GasSensorData, MotionSensorData } from '../types';
import { ApiService } from '../services/api';
import { 
  Wind, 
  Eye, 
  Activity, 
  Clock, 
  RefreshCw,
  Search,
  Filter,
  AlertTriangle,
  Zap
} from 'lucide-react';

interface SensorsTableProps {
  gasSensors: GasSensorData[];
  motionSensors: MotionSensorData[];
  loading: boolean;
  onRefresh: () => void;
}

const SensorsTable: React.FC<SensorsTableProps> = ({ gasSensors, motionSensors, loading, onRefresh }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sensorType, setSensorType] = useState<'gas' | 'motion'>('gas');
  const [sortBy, setSortBy] = useState<string>('fecha_hora');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tableRef.current && !loading) {
      gsap.fromTo(tableRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [loading]);

  const currentSensors = sensorType === 'gas' ? gasSensors : motionSensors;

  const filteredAndSortedSensors = React.useMemo(() => {
    let filtered = currentSensors.filter(sensor => {
      if (sensorType === 'gas') {
        const gasSensor = sensor as GasSensorData;
        return (
          gasSensor.nivel_gas.toString().includes(searchTerm) ||
          gasSensor.ventilador.toString().includes(searchTerm)
        );
      } else {
        const motionSensor = sensor as MotionSensorData;
        return (
          motionSensor.movimiento.toString().includes(searchTerm) ||
          motionSensor.alarma.toString().includes(searchTerm)
        );
      }
    });

    filtered.sort((a, b) => {
      const aValue = a[sortBy as keyof typeof a];
      const bValue = b[sortBy as keyof typeof b];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });

    return filtered;
  }, [currentSensors, searchTerm, sensorType, sortBy, sortOrder]);

  const handleSort = (key: string) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  const getGasLevelBadge = (level: number) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    
    if (level < 1000) return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
    if (level < 3000) return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`;
    if (level < 5000) return `${baseClasses} bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200`;
    return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`;
  };

  const getVentilatorBadge = (ventilador: number) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    
    return ventilador === 1 
      ? `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`
      : `${baseClasses} bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200`;
  };

  const getMotionBadge = (movimiento: number) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    
    return movimiento === 1 
      ? `${baseClasses} bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200`
      : `${baseClasses} bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200`;
  };

  const getAlarmBadge = (alarma: number) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    
    return alarma === 1 
      ? `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`
      : `${baseClasses} bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200`;
  };

  if (loading) {
    return (
      <div className="glass-card p-6 animate-pulse">
        <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded mb-4"></div>
        <div className="space-y-3">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-12 bg-slate-300 dark:bg-slate-600 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={tableRef} className="glass-card p-6">
      {/* Header de la tabla */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Datos de Sensores
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {filteredAndSortedSensors.length} de {currentSensors.length} registros
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={onRefresh}
            className="glass-button p-2 hover:scale-105 transition-transform"
            title="Actualizar datos"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder={`Buscar ${sensorType === 'gas' ? 'nivel de gas o ventilador' : 'movimiento o alarma'}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="glass-input w-full pl-10"
          />
        </div>
        
        <select
          value={sensorType}
          onChange={(e) => setSensorType(e.target.value as 'gas' | 'motion')}
          className="glass-input min-w-[150px]"
        >
          <option value="gas">Sensor de Gas</option>
          <option value="motion">Sensor de Movimiento</option>
        </select>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="text-left py-3 px-4 font-medium text-slate-700 dark:text-slate-300">
                <button
                  onClick={() => handleSort('fecha_hora')}
                  className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
                >
                  <Clock className="w-4 h-4" />
                  <span>Fecha</span>
                </button>
              </th>
              {sensorType === 'gas' ? (
                <>
                  <th className="text-left py-3 px-4 font-medium text-slate-700 dark:text-slate-300">
                    <button
                      onClick={() => handleSort('nivel_gas')}
                      className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
                    >
                      <Wind className="w-4 h-4" />
                      <span>Nivel de Gas</span>
                    </button>
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700 dark:text-slate-300">
                    <button
                      onClick={() => handleSort('ventilador')}
                      className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
                    >
                      <Zap className="w-4 h-4" />
                      <span>Ventilador</span>
                    </button>
                  </th>
                </>
              ) : (
                <>
                  <th className="text-left py-3 px-4 font-medium text-slate-700 dark:text-slate-300">
                    <button
                      onClick={() => handleSort('movimiento')}
                      className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Movimiento</span>
                    </button>
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700 dark:text-slate-300">
                    <button
                      onClick={() => handleSort('alarma')}
                      className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      <span>Alarma</span>
                    </button>
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedSensors.slice(0, 50).map((sensor) => (
              <tr 
                key={sensor._id} 
                className="border-b border-slate-100 dark:border-slate-800 hover:bg-white/5 transition-colors"
              >
                <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                  {ApiService.formatDate(sensor.fecha_hora)}
                </td>
                {sensorType === 'gas' ? (
                  <>
                    <td className="py-3 px-4">
                      <span className={getGasLevelBadge((sensor as GasSensorData).nivel_gas)}>
                        {(sensor as GasSensorData).nivel_gas}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={getVentilatorBadge((sensor as GasSensorData).ventilador)}>
                        {(sensor as GasSensorData).ventilador === 1 ? 'Encendido' : 'Apagado'}
                      </span>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-3 px-4">
                      <span className={getMotionBadge((sensor as MotionSensorData).movimiento)}>
                        {(sensor as MotionSensorData).movimiento === 1 ? 'Detectado' : 'Sin movimiento'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={getAlarmBadge((sensor as MotionSensorData).alarma)}>
                        {(sensor as MotionSensorData).alarma === 1 ? 'Activada' : 'Desactivada'}
                      </span>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAndSortedSensors.length === 0 && (
        <div className="text-center py-8 text-slate-500 dark:text-slate-400">
          No se encontraron sensores que coincidan con los filtros
        </div>
      )}
    </div>
  );
};

export default SensorsTable;
