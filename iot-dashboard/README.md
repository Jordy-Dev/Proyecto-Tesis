# Dashboard IoT - Monitoreo de Calidad de Aire y Vibraciones

Un dashboard moderno y responsivo para monitorear sensores de calidad de aire y vibraciones en tiempo real.

## 🚀 Características

- **Monitoreo de Calidad de Aire**: Seguimiento de niveles de gas en tiempo real
- **Detección de Vibraciones**: Monitoreo de movimientos y alarmas
- **Control Automático**: Activación automática de ventiladores según niveles de gas
- **Interfaz Moderna**: Diseño glassmorphism con modo oscuro/claro
- **Gráficos Interactivos**: Visualización de datos con Recharts
- **Actualización en Tiempo Real**: Datos actualizados cada 30 segundos
- **Responsive Design**: Compatible con dispositivos móviles y desktop

## 📊 Sensores Soportados

### Sensor de Gas (Calidad de Aire)
- **Nivel de Gas**: Medición en ppm (partes por millón)
- **Ventilador**: Control automático (0 = Apagado, 1 = Encendido)
- **Estados de Calidad**:
  - 🟢 Excelente: < 1000 ppm
  - 🟡 Buena: 1000-3000 ppm
  - 🟠 Moderada: 3000-5000 ppm
  - 🔴 Peligrosa: > 5000 ppm

### Sensor de Movimiento (Vibraciones)
- **Movimiento**: Detección de vibraciones (0 = Sin movimiento, 1 = Detectado)
- **Alarma**: Sistema de alertas (0 = Desactivada, 1 = Activada)

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 18 + TypeScript + Vite
- **UI**: Tailwind CSS + Glassmorphism
- **Gráficos**: Recharts
- **Iconos**: Lucide React
- **Animaciones**: GSAP
- **Estado**: React Hooks
- **API**: Fetch API

## 📦 Instalación

1. **Clonar el repositorio**:
```bash
git clone <repository-url>
cd iot-dashboard
```

2. **Instalar dependencias**:
```bash
npm install
```

3. **Configurar la API**:
Asegúrate de que la API esté corriendo en `http://localhost:3000` o modifica la URL en `src/services/api.ts`

4. **Ejecutar el dashboard**:
```bash
npm run dev
```

5. **Abrir en el navegador**:
```
http://localhost:5173
```

## 🔧 Configuración de la API

El dashboard se conecta a una API REST que debe proporcionar los siguientes endpoints:

### Endpoints de Gas Sensor
- `GET /api/gas` - Obtener todos los registros de gas
- `GET /api/gas/latest` - Obtener el último registro de gas
- `GET /api/gas/statistics` - Obtener estadísticas de gas

### Endpoints de Motion Sensor
- `GET /api/motion` - Obtener todos los registros de movimiento
- `GET /api/motion/latest` - Obtener el último registro de movimiento
- `GET /api/motion/statistics` - Obtener estadísticas de movimiento
- `GET /api/motion/motion-detected` - Obtener registros con movimiento detectado
- `GET /api/motion/alarm-activated` - Obtener registros con alarma activada

## 📈 Funcionalidades del Dashboard

### 1. Panel Principal
- **Tarjetas de Estadísticas**: Muestra total de lecturas, nivel promedio de gas, detecciones de movimiento y activaciones del ventilador
- **Indicadores en Tiempo Real**: Valores actuales de todos los sensores
- **Estado del Sistema**: Conexión y estado de los servicios

### 2. Gráficos
- **Gráfico de Nivel de Gas**: Línea temporal mostrando la evolución del nivel de gas
- **Gráfico de Movimiento y Alarmas**: Barras mostrando detecciones de movimiento y activaciones de alarma

### 3. Tabla de Datos
- **Filtros**: Búsqueda por tipo de sensor y valores
- **Ordenamiento**: Por fecha, nivel de gas, movimiento, etc.
- **Paginación**: Navegación por páginas de datos

### 4. Panel Lateral
- **Notificaciones**: Alertas del sistema en tiempo real
- **Estado de Sensores**: Valores actuales con indicadores visuales
- **Información de API**: Estado de conexión y última actualización

## 🎨 Temas y Personalización

El dashboard incluye:
- **Modo Claro/Oscuro**: Cambio automático según preferencias del sistema
- **Glassmorphism**: Efectos de cristal y transparencia
- **Animaciones**: Transiciones suaves con GSAP
- **Responsive**: Adaptable a diferentes tamaños de pantalla

## 🔄 Actualización de Datos

- **Automática**: Cada 30 segundos
- **Manual**: Botón de actualización en el header
- **Indicadores**: Estado de conexión en tiempo real

## 📱 Compatibilidad

- ✅ Chrome/Edge (recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Dispositivos móviles
- ✅ Tablets

## 🚨 Monitoreo de Alertas

El sistema detecta automáticamente:
- **Niveles de gas elevados**: Activación automática del ventilador
- **Movimientos sospechosos**: Activación de alarmas
- **Problemas de conexión**: Notificaciones de error
- **Estados críticos**: Indicadores visuales de alerta

## 🔧 Desarrollo

### Estructura del Proyecto
```
src/
├── components/          # Componentes reutilizables
│   ├── Charts.tsx      # Gráficos de datos
│   ├── StatsCards.tsx  # Tarjetas de estadísticas
│   ├── SensorsTable.tsx # Tabla de datos
│   └── ...
├── hooks/              # Custom hooks
│   └── useSensors.ts   # Hook para datos de sensores
├── services/           # Servicios de API
│   └── api.ts         # Cliente de API
├── types/              # Definiciones de TypeScript
│   └── index.ts       # Interfaces de datos
└── pages/              # Páginas de la aplicación
    └── DashboardPage.tsx # Página principal
```

### Scripts Disponibles
```bash
npm run dev          # Desarrollo
npm run build        # Producción
npm run preview      # Vista previa de producción
npm run lint         # Linting
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Para soporte técnico o preguntas:
- Crear un issue en GitHub
- Contactar al equipo de desarrollo
- Revisar la documentación de la API

---

**Dashboard IoT** - Monitoreo inteligente de calidad de aire y vibraciones en tiempo real 🚀
