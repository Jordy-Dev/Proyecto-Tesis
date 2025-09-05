export interface GasSensorData {
  _id: string;
  fecha_hora: string;
  nivel_gas: number;
  ventilador: number; // 0 or 1
}

export interface MotionSensorData {
  _id: string;
  fecha_hora: string;
  movimiento: number; // 0 or 1
  alarma: number; // 0 or 1
}

export interface SensorData {
  _id: string;
  temperatura: number;
  humedad: number;
  estado: 'frio' | 'caliente' | 'normal';
  actuador: 'calefactor' | 'ventilador' | 'ninguno';
  fecha: string;
}

export interface ChartData {
  name: string;
  nivel_gas?: number;
  movimiento?: number;
  temperatura?: number;
  humedad?: number;
}

export interface DashboardStats {
  totalReadings: number;
  averageGasLevel: number;
  maxGasLevel: number;
  minGasLevel: number;
  ventilatorActivations: number;
  motionDetections: number;
  alarmActivations: number;
  lastUpdate: string;
}

export interface GasStatistics {
  totalRecords: number;
  avgNivelGas: number;
  maxNivelGas: number;
  minNivelGas: number;
  ventiladorActivado: number;
}

export interface MotionStatistics {
  totalRecords: number;
  movimientoDetectado: number;
  alarmaActivada: number;
  porcentajeMovimiento: number;
  porcentajeAlarma: number;
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export interface LoginFormData {
  email: string;
  password: string;
}
