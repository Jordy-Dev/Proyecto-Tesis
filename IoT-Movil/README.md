# IoT Dashboard Mobile

Aplicación móvil para monitoreo de sensores IoT desarrollada con React Native y Expo.

## Características

- **Monitoreo en tiempo real** de sensores de vibración SW-18010 y calidad de aire MQ-135
- **Dashboard interactivo** con gráficos y estadísticas
- **Tema claro/oscuro** adaptable
- **Autenticación** de usuarios
- **Actualización automática** de datos cada 30 segundos
- **Interfaz responsive** optimizada para móviles

## Sensores Monitoreados

### Sensor de Vibración SW-18010
- Nivel de vibración (0-1023)
- Estado de vibración (digital)
- Activación de alarmas

### Sensor de Calidad de Aire MQ-135
- Niveles de CO2, CO, NH3, NOx
- Control de ventilador
- Control de purificador de aire

## Tecnologías Utilizadas

- **React Native** - Framework de desarrollo móvil
- **Expo** - Plataforma de desarrollo
- **TypeScript** - Tipado estático
- **React Navigation** - Navegación
- **React Native Chart Kit** - Gráficos
- **Expo Linear Gradient** - Gradientes
- **AsyncStorage** - Almacenamiento local

## Instalación

1. Clona el repositorio:
```bash
git clone <repository-url>
cd IoT-Movil
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm start
```

4. Escanea el código QR con la app Expo Go en tu dispositivo móvil

## Uso

### Credenciales de Prueba
- **Email:** admin@iot.com
- **Contraseña:** admin123

### Funcionalidades
- **Dashboard:** Vista principal con estadísticas y gráficos
- **Configuración:** Ajustes de tema, notificaciones y perfil
- **Actualización:** Pull-to-refresh para actualizar datos manualmente

## Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Charts.tsx      # Gráficos de datos
│   ├── SensorsTable.tsx # Tabla de sensores
│   └── StatsCards.tsx  # Tarjetas de estadísticas
├── contexts/           # Contextos de React
│   ├── AuthContext.tsx # Autenticación
│   └── ThemeContext.tsx # Tema
├── hooks/              # Hooks personalizados
│   └── useSensors.ts   # Hook para sensores
├── screens/            # Pantallas de la app
│   ├── DashboardScreen.tsx
│   ├── LoginScreen.tsx
│   └── SettingsScreen.tsx
├── services/           # Servicios
│   └── api.ts          # API de sensores
└── types/              # Tipos TypeScript
    └── index.ts        # Definiciones de tipos
```

## API Endpoints

La aplicación se conecta a la API local en: `http://localhost:3000/api`

### Configuración de Red

**Para dispositivo físico:**
1. Obtén la IP de tu computadora: `ipconfig` (Windows) o `ifconfig` (Mac/Linux)
2. Actualiza la URL en `src/services/api.ts` con tu IP real
3. Asegúrate de que tu dispositivo móvil esté en la misma red WiFi

**Para emulador:**
- Android: `http://10.0.2.2:3000/api`
- iOS: `http://localhost:3000/api`

### Endpoints de Vibración
- `GET /vibration` - Obtener datos de vibración
- `GET /vibration/latest` - Último dato de vibración
- `GET /vibration/statistics` - Estadísticas de vibración

### Endpoints de Calidad de Aire
- `GET /air-quality` - Obtener datos de calidad de aire
- `GET /air-quality/latest` - Último dato de calidad de aire
- `GET /air-quality/statistics` - Estadísticas de calidad de aire

## Desarrollo

### Scripts Disponibles
- `npm start` - Inicia el servidor de desarrollo
- `npm run android` - Ejecuta en Android
- `npm run ios` - Ejecuta en iOS
- `npm run web` - Ejecuta en web

### Requisitos
- Node.js 16+
- Expo CLI
- Expo Go app en dispositivo móvil

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.
