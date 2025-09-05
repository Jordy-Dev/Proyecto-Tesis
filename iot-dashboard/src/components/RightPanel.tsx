import React from 'react';
import { Bell, MessageCircle, AlertTriangle, CheckCircle, Clock, TrendingUp, Wifi, Database, Wind, Eye, Zap } from 'lucide-react';
import type { GasSensorData, MotionSensorData } from '../types';
import { ApiService } from '../services/api';

interface RightPanelProps {
  latestGasSensor: GasSensorData | null;
  latestMotionSensor: MotionSensorData | null;
  gasSensors: GasSensorData[];
  motionSensors: MotionSensorData[];
}

const RightPanel: React.FC<RightPanelProps> = ({ latestGasSensor, latestMotionSensor, gasSensors, motionSensors }) => {
  const notifications = [
    { id: 1, type: 'success', message: 'Sensor de gas calibrado', time: '2 min', icon: CheckCircle },
    { id: 2, type: 'warning', message: 'Nivel de gas elevado detectado', time: '5 min', icon: AlertTriangle },
    { id: 3, type: 'info', message: 'Ventilador activado automáticamente', time: '8 min', icon: TrendingUp },
    { id: 4, type: 'success', message: 'Conexión estable restaurada', time: '12 min', icon: CheckCircle },
  ];

  const systemStatus = [
    { id: 1, title: 'API Conectada', description: 'localhost:3000', status: 'online', icon: Wifi },
    { id: 2, title: 'Base de Datos', description: 'MongoDB operativo', status: 'online', icon: Database },
    { id: 3, title: 'Sensores Activos', description: `${gasSensors.length + motionSensors.length} dispositivos`, status: 'online', icon: CheckCircle },
  ];

  const getStatusColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'error': return 'text-red-500';
      case 'info': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusBgColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-500/20';
      case 'warning': return 'bg-yellow-500/20';
      case 'error': return 'bg-red-500/20';
      case 'info': return 'bg-blue-500/20';
      default: return 'bg-gray-500/20';
    }
  };

  return (
    <div className="w-80 h-screen glass-panel p-6 overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          Panel de Control IoT
        </h2>
        <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
          Monitoreo de calidad de aire y vibraciones
        </p>
      </div>

      {/* Notificaciones */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium flex items-center" style={{ color: 'var(--text-primary)' }}>
            <Bell className="w-5 h-5 mr-2" />
            Notificaciones
          </h3>
          <span className="text-xs bg-gradient-to-r from-purple-500 to-blue-500 text-white px-2 py-1 rounded-full shadow-lg">
            {notifications.length}
          </span>
        </div>
        
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-2xl ${getStatusBgColor(notification.type)} shadow-lg`}
              style={{ border: '1px solid var(--border-color)' }}
            >
              <div className="flex items-start space-x-3">
                <notification.icon className={`w-5 h-5 mt-0.5 ${getStatusColor(notification.type)}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    {notification.message}
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                    {notification.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Estado del Sistema */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4 flex items-center" style={{ color: 'var(--text-primary)' }}>
          <MessageCircle className="w-5 h-5 mr-2" />
          Estado del Sistema
        </h3>
        
        <div className="space-y-3">
          {systemStatus.map((status) => (
            <div
              key={status.id}
              className="p-3 rounded-2xl backdrop-blur-xl shadow-lg"
              style={{
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--border-color)'
              }}
            >
              <div className="flex items-start space-x-3">
                <status.icon className="w-5 h-5 text-green-500 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    {status.title}
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                    {status.description}
                  </p>
                  <div className="flex items-center mt-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-xs text-green-600 dark:text-green-400">Online</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Estado de los Sensores */}
      {(latestGasSensor || latestMotionSensor) && (
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4" style={{ color: 'var(--text-primary)' }}>
            Sensores en Tiempo Real
          </h3>
          
          <div className="space-y-3">
            {latestGasSensor && (
              <div className="p-3 rounded-2xl backdrop-blur-xl shadow-lg"
                   style={{
                     backgroundColor: 'var(--card-bg)',
                     border: '1px solid var(--border-color)'
                   }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Wind className="w-4 h-4 text-green-500" />
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Nivel de Gas</span>
                  </div>
                  <span className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {latestGasSensor.nivel_gas} ppm
                  </span>
                </div>
                <div className="mt-1">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    latestGasSensor.nivel_gas < 1000 ? 'bg-green-500/20 text-green-700 dark:text-green-400' :
                    latestGasSensor.nivel_gas < 3000 ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400' :
                    latestGasSensor.nivel_gas < 5000 ? 'bg-orange-500/20 text-orange-700 dark:text-orange-400' :
                    'bg-red-500/20 text-red-700 dark:text-red-400'
                  }`}>
                    {ApiService.getGasLevelStatus(latestGasSensor.nivel_gas)}
                  </span>
                </div>
              </div>
            )}
            
            {latestMotionSensor && (
              <div className="p-3 rounded-2xl backdrop-blur-xl shadow-lg"
                   style={{
                     backgroundColor: 'var(--card-bg)',
                     border: '1px solid var(--border-color)'
                   }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-purple-500" />
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Movimiento</span>
                  </div>
                  <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                    latestMotionSensor.movimiento === 1 ? 'bg-purple-500/20 text-purple-700 dark:text-purple-400' :
                    'bg-slate-500/20 text-slate-700 dark:text-slate-400'
                  }`}>
                    {latestMotionSensor.movimiento === 1 ? 'Detectado' : 'Sin movimiento'}
                  </span>
                </div>
              </div>
            )}
            
            {latestGasSensor && (
              <div className="p-3 rounded-2xl backdrop-blur-xl shadow-lg"
                   style={{
                     backgroundColor: 'var(--card-bg)',
                     border: '1px solid var(--border-color)'
                   }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-orange-500" />
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Ventilador</span>
                  </div>
                  <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                    latestGasSensor.ventilador === 1 ? 'bg-green-500/20 text-green-700 dark:text-green-400' :
                    'bg-slate-500/20 text-slate-700 dark:text-slate-400'
                  }`}>
                    {latestGasSensor.ventilador === 1 ? 'Encendido' : 'Apagado'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Información de la API */}
      <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 shadow-lg">
        <h4 className="text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
          API Status
        </h4>
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          Conectado a: localhost:3000
        </p>
        <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
          Última actualización: {(latestGasSensor || latestMotionSensor) ? 
            new Date(latestGasSensor?.fecha_hora || latestMotionSensor?.fecha_hora || '').toLocaleTimeString('es-ES') : 
            'N/A'}
        </p>
      </div>
    </div>
  );
};

export default RightPanel;
