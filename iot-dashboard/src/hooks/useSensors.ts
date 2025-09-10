import { useState, useEffect, useCallback } from 'react';
import type { GasSensorData, MotionSensorData, DashboardStats } from '../types';
import { ApiService } from '../services/api';

export const useSensors = () => {
  const [gasSensors, setGasSensors] = useState<GasSensorData[]>([]);
  const [motionSensors, setMotionSensors] = useState<MotionSensorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);

  // Calcula el último registro localmente
  const latestGasSensor = gasSensors.length > 0 ? gasSensors[0] : null;
  const latestMotionSensor = motionSensors.length > 0 ? motionSensors[0] : null;

  const fetchSensors = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Solo dos llamadas principales
      const [gasData, motionData, dashboardStats] = await Promise.all([
        ApiService.getGasSensors(1, 50),
        ApiService.getMotionSensors(1, 50),
        ApiService.getDashboardStats()
      ]);

      setGasSensors(gasData.data);
      setMotionSensors(motionData.data);
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

    // Actualizar datos cada 2 minutos (120000 ms)
    const interval = setInterval(fetchSensors, 120000);

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
