import type { GasSensorData, MotionSensorData, GasStatistics, MotionStatistics, DashboardStats } from '../types';

const API_BASE_URL = 'http://localhost:3000/api';

export class ApiService {
  // Gas Sensor (Air Quality) Methods
  static async getGasSensors(page: number = 1, limit: number = 50): Promise<{ data: GasSensorData[], totalRecords: number }> {
    try {
      const response = await fetch(`${API_BASE_URL}/gas?page=${page}&limit=${limit}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return {
        data: result.data,
        totalRecords: result.totalRecords
      };
    } catch (error) {
      console.error('Error fetching gas sensors:', error);
      throw error;
    }
  }

  static async getLatestGasSensor(): Promise<GasSensorData | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/gas/latest`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching latest gas sensor:', error);
      return null;
    }
  }

  static async getGasStatistics(startDate?: string, endDate?: string): Promise<GasStatistics> {
    try {
      let url = `${API_BASE_URL}/gas/statistics`;
      if (startDate && endDate) {
        url += `?startDate=${startDate}&endDate=${endDate}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching gas statistics:', error);
      throw error;
    }
  }

  // Motion Sensor (Vibration) Methods
  static async getMotionSensors(page: number = 1, limit: number = 50): Promise<{ data: MotionSensorData[], totalRecords: number }> {
    try {
      const response = await fetch(`${API_BASE_URL}/motion?page=${page}&limit=${limit}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return {
        data: result.data,
        totalRecords: result.totalRecords
      };
    } catch (error) {
      console.error('Error fetching motion sensors:', error);
      throw error;
    }
  }

  static async getLatestMotionSensor(): Promise<MotionSensorData | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/motion/latest`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching latest motion sensor:', error);
      return null;
    }
  }

  static async getMotionStatistics(startDate?: string, endDate?: string): Promise<MotionStatistics> {
    try {
      let url = `${API_BASE_URL}/motion/statistics`;
      if (startDate && endDate) {
        url += `?startDate=${startDate}&endDate=${endDate}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching motion statistics:', error);
      throw error;
    }
  }

  static async getMotionDetected(page: number = 1, limit: number = 50): Promise<{ data: MotionSensorData[], totalRecords: number }> {
    try {
      const response = await fetch(`${API_BASE_URL}/motion/motion-detected?page=${page}&limit=${limit}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return {
        data: result.data,
        totalRecords: result.totalRecords
      };
    } catch (error) {
      console.error('Error fetching motion detected:', error);
      throw error;
    }
  }

  static async getAlarmActivated(page: number = 1, limit: number = 50): Promise<{ data: MotionSensorData[], totalRecords: number }> {
    try {
      const response = await fetch(`${API_BASE_URL}/motion/alarm-activated?page=${page}&limit=${limit}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return {
        data: result.data,
        totalRecords: result.totalRecords
      };
    } catch (error) {
      console.error('Error fetching alarm activated:', error);
      throw error;
    }
  }

  // Dashboard Stats
  static async getDashboardStats(): Promise<DashboardStats> {
    try {
      const [gasStats, motionStats, latestGas, latestMotion] = await Promise.all([
        this.getGasStatistics(),
        this.getMotionStatistics(),
        this.getLatestGasSensor(),
        this.getLatestMotionSensor()
      ]);

      return {
        totalReadings: gasStats.totalRecords + motionStats.totalRecords,
        averageGasLevel: gasStats.avgNivelGas,
        maxGasLevel: gasStats.maxNivelGas,
        minGasLevel: gasStats.minNivelGas,
        ventilatorActivations: gasStats.ventiladorActivado,
        motionDetections: motionStats.movimientoDetectado,
        alarmActivations: motionStats.alarmaActivada,
        lastUpdate: latestGas?.fecha_hora || latestMotion?.fecha_hora || new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  }

  // Utility Methods
  static formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  static getGasLevelColor(nivelGas: number): string {
    if (nivelGas < 1000) return 'text-green-500';
    if (nivelGas < 3000) return 'text-yellow-500';
    if (nivelGas < 5000) return 'text-orange-500';
    return 'text-red-500';
  }

  static getGasLevelStatus(nivelGas: number): string {
    if (nivelGas < 1000) return 'Excelente';
    if (nivelGas < 3000) return 'Buena';
    if (nivelGas < 5000) return 'Moderada';
    return 'Peligrosa';
  }

  static getMotionStatus(movimiento: number): string {
    return movimiento === 1 ? 'Detectado' : 'Sin movimiento';
  }

  static getAlarmStatus(alarma: number): string {
    return alarma === 1 ? 'Activada' : 'Desactivada';
  }

  static getVentilatorStatus(ventilador: number): string {
    return ventilador === 1 ? 'Encendido' : 'Apagado';
  }
}
