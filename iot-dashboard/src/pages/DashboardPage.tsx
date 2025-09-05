import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useSensors } from '../hooks/useSensors';
import StatsCards from '../components/StatsCards';
import Charts from '../components/Charts';
import SensorsTable from '../components/SensorsTable';
import Sidebar from '../components/Sidebar';
import RightPanel from '../components/RightPanel';
import { ApiService } from '../services/api';
import { 
  Activity, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  TrendingUp,
  Wind,
  Eye,
  Zap,
  AlertTriangle
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { gasSensors, motionSensors, latestGasSensor, latestMotionSensor, loading, error, stats, refreshData } = useSensors();
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dashboardRef.current) {
      gsap.fromTo(dashboardRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="glass-card p-8 text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            Error de conexión
          </h2>
          <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
            No se pudo conectar con los sensores IoT. Verifica tu conexión a internet.
          </p>
          <button
            onClick={refreshData}
            className="glass-button bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-dashboard">
      {/* Sidebar Izquierdo */}
      <Sidebar />

      {/* Contenido Principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div ref={dashboardRef} className="flex-1 p-6 overflow-y-auto">
          {/* Header del dashboard */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                  Dashboard IoT
                </h1>
                <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                  Monitoreo de calidad de aire y vibraciones en tiempo real
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Conectado</span>
                  </div>
                  
                  {(latestGasSensor || latestMotionSensor) && (
                    <div className="text-sm px-3 py-2 rounded-2xl shadow-lg" style={{ 
                      color: 'var(--text-secondary)', 
                      backgroundColor: 'var(--card-bg)', 
                      border: '1px solid var(--border-color)' 
                    }}>
                      Última actualización: {new Date(latestGasSensor?.fecha_hora || latestMotionSensor?.fecha_hora || '').toLocaleTimeString('es-ES')}
                    </div>
                  )}
                </div>
                
                <button
                  onClick={refreshData}
                  className="glass-button bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 shadow-lg"
                >
                  <Activity className="w-4 h-4 mr-2" />
                  Actualizar
                </button>
              </div>
            </div>

            {/* Indicadores de estado principales */}
            {(latestGasSensor || latestMotionSensor) && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="glass-card p-6 flex items-center space-x-4 relative z-10">
                  <div className="p-3 bg-green-500/20 rounded-2xl flex-shrink-0">
                    <Wind className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>Nivel de Gas</p>
                    <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                      {latestGasSensor ? latestGasSensor.nivel_gas : 'N/A'} ppm
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      {latestGasSensor ? ApiService.getGasLevelStatus(latestGasSensor.nivel_gas) : 'Sin datos'}
                    </p>
                  </div>
                </div>
                
                <div className="glass-card p-6 flex items-center space-x-4 relative z-10">
                  <div className="p-3 bg-purple-500/20 rounded-2xl flex-shrink-0">
                    <Eye className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>Movimiento</p>
                    <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                      {latestMotionSensor ? (latestMotionSensor.movimiento === 1 ? 'Detectado' : 'Sin movimiento') : 'N/A'}
                    </p>
                  </div>
                </div>
                
                <div className="glass-card p-6 flex items-center space-x-4 relative z-10">
                  <div className="p-3 bg-orange-500/20 rounded-2xl flex-shrink-0">
                    <Zap className="w-8 h-8 text-orange-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>Ventilador</p>
                    <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                      {latestGasSensor ? (latestGasSensor.ventilador === 1 ? 'Encendido' : 'Apagado') : 'N/A'}
                    </p>
                  </div>
                </div>
                
                <div className="glass-card p-6 flex items-center space-x-4 relative z-10">
                  <div className="p-3 bg-red-500/20 rounded-2xl flex-shrink-0">
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>Alarma</p>
                    <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                      {latestMotionSensor ? (latestMotionSensor.alarma === 1 ? 'Activada' : 'Desactivada') : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tarjetas de estadísticas */}
          <StatsCards stats={stats} loading={loading} />

          {/* Gráficos */}
          <Charts gasSensors={gasSensors} motionSensors={motionSensors} loading={loading} />

          {/* Tabla de sensores */}
          <SensorsTable gasSensors={gasSensors} motionSensors={motionSensors} loading={loading} onRefresh={refreshData} />
        </div>
      </div>

      {/* Panel Derecho */}
      <RightPanel latestGasSensor={latestGasSensor} latestMotionSensor={latestMotionSensor} gasSensors={gasSensors} motionSensors={motionSensors} />
    </div>
  );
};

export default DashboardPage;
