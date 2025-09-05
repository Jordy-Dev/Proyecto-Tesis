import { useState, useEffect, useCallback } from 'react';
import type { GasSensorData, MotionSensorData, DashboardStats } from '../types';
import { ApiService } from '../services/api';

export const useSensors = () => {
  const [gasSensors, setGasSensors] = useState<GasSensorData[]>([]);
  const [motionSensors, setMotionSensors] = useState<MotionSensorData[]>([]);
  const [latestGasSensor, setLatestGasSensor] = useState<GasSensorData | null>(null);
  const [latestMotionSensor, setLatestMotionSensor] = useState<MotionSensorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);

  const fetchSensors = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [gasData, motionData, latestGas, latestMotion, dashboardStats] = await Promise.all([
        ApiService.getGasSensors(1, 50),
        ApiService.getMotionSensors(1, 50),
        ApiService.getLatestGasSensor(),
        ApiService.getLatestMotionSensor(),
        ApiService.getDashboardStats()
      ]);

      setGasSensors(gasData.data);
      setMotionSensors(motionData.data);
      setLatestGasSensor(latestGas);
      setLatestMotionSensor(latestMotion);
      setStats(dashboardStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshData = useCallback(() => {
    fetchSensors();
  }, [fetchSensors]);

  useEffect(() => {
    fetchSensors();
    
    // Actualizar datos cada 30 segundos
    const interval = setInterval(fetchSensors, 30000);
    
    return () => clearInterval(interval);
  }, [fetchSensors]);

  return {
    gasSensors,
    motionSensors,
    latestGasSensor,
    latestMotionSensor,
    loading,
    error,
    stats,
    refreshData,
    fetchSensors
  };
};
