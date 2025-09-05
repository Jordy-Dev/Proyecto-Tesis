import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  RefreshCw, 
  Activity,
  Wind,
  Eye,
  AlertTriangle,
  Zap,
  Settings,
  Power,
  Sun,
  Moon,
  LogOut
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useSensors } from '../hooks/useSensors';
import { ApiService } from '../services/api';

const Sidebar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { latestGasSensor, latestMotionSensor, loading } = useSensors();

  // Función para obtener el estado de calidad del aire
  const getAirQualityStatus = () => {
    if (!latestGasSensor) return { value: 'N/A', status: 'normal' };
    const level = latestGasSensor.nivel_gas;
    if (level < 1000) return { value: 'Excelente', status: 'success' };
    if (level < 3000) return { value: 'Buena', status: 'success' };
    if (level < 5000) return { value: 'Moderada', status: 'warning' };
    return { value: 'Peligrosa', status: 'error' };
  };

  // Función para obtener el estado de vibraciones
  const getVibrationStatus = () => {
    if (!latestMotionSensor) return { value: 'N/A', status: 'normal' };
    return latestMotionSensor.movimiento === 1 
      ? { value: 'Detectado', status: 'warning' }
      : { value: 'Estable', status: 'success' };
  };

  // Función para obtener el estado del ventilador
  const getVentilatorStatus = () => {
    if (!latestGasSensor) return { value: 'N/A', status: 'normal' };
    return latestGasSensor.ventilador === 1 
      ? { value: 'Encendido', status: 'warning' }
      : { value: 'Apagado', status: 'success' };
  };

  // Función para obtener el estado de alarmas
  const getAlarmStatus = () => {
    if (!latestMotionSensor) return { value: '0', status: 'success' };
    return latestMotionSensor.alarma === 1 
      ? { value: '1', status: 'error' }
      : { value: '0', status: 'success' };
  };

  const airQuality = getAirQualityStatus();
  const vibration = getVibrationStatus();
  const ventilator = getVentilatorStatus();
  const alarm = getAlarmStatus();

  const sensorItems = [
    { icon: Wind, label: 'Calidad de Aire', value: airQuality.value, status: airQuality.status },
    { icon: Eye, label: 'Vibraciones', value: vibration.value, status: vibration.status },
    { icon: Zap, label: 'Ventilador', value: ventilator.value, status: ventilator.status },
    { icon: AlertTriangle, label: 'Alarmas', value: alarm.value, status: alarm.status },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSettings = () => {
    navigate('/settings');
  };

  return (
    <div className="w-20 h-screen glass-sidebar flex flex-col items-center py-6 space-y-8">
      {/* Logo/Refresh */}
      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200 shadow-lg">
        <RefreshCw className="w-6 h-6 text-white" />
      </div>

      {/* Sensor Status - Monitoreo de Calidad de Aire y Vibraciones */}
      <div className="flex flex-col space-y-3">
        {sensorItems.map((item, index) => (
          <div
            key={index}
            className={`w-12 h-12 rounded-2xl backdrop-blur-xl flex items-center justify-center cursor-pointer transition-all duration-200 group relative shadow-lg ${
              loading ? 'animate-pulse' : ''
            }`}
            style={{
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--border-color)'
            }}
          >
            <item.icon className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
            
            {/* Tooltip */}
            <div className="absolute left-full ml-3 px-3 py-2 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 shadow-xl"
                 style={{
                   backgroundColor: theme === 'dark' ? '#27272a' : '#f8fafc',
                   color: theme === 'dark' ? '#ffffff' : '#000000',
                   border: '1px solid var(--border-color)'
                 }}>
              <div className="font-medium">{item.label}</div>
              <div className={`text-sm ${
                item.status === 'success' ? 'text-green-400' :
                item.status === 'warning' ? 'text-yellow-400' :
                item.status === 'error' ? 'text-red-400' :
                'text-gray-300 dark:text-gray-600'
              }`}>
                {item.value}
              </div>
              {item.label === 'Calidad de Aire' && latestGasSensor && (
                <div className="text-xs text-gray-400 mt-1">
                  {latestGasSensor.nivel_gas} ppm
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Configuración y Tema */}
      <div className="flex flex-col space-y-3 mt-auto">
        <button
          onClick={toggleTheme}
          className="w-12 h-12 rounded-2xl backdrop-blur-xl flex items-center justify-center transition-all duration-200 shadow-lg"
          style={{
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--border-color)'
          }}
          title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
          )}
        </button>
        
        <button
          onClick={handleSettings}
          className="w-12 h-12 rounded-2xl backdrop-blur-xl flex items-center justify-center transition-all duration-200 shadow-lg"
          style={{
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--border-color)'
          }}
          title="Ajustes del sistema"
        >
          <Settings className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
        </button>
        
        <button
          onClick={handleLogout}
          className="w-12 h-12 rounded-2xl backdrop-blur-xl flex items-center justify-center transition-all duration-200 shadow-lg"
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.3)',
            border: '1px solid rgba(239, 68, 68, 0.5)',
            color: '#dc2626'
          }}
          title="Cerrar sesión"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
