# API de Sensores - Gas y Movimiento

API RESTful para gestionar datos de sensores de gas y movimiento usando Node.js, Express y MongoDB.

## 🚀 Características

- **Patrón MVC**: Arquitectura Model-View-Controller
- **MongoDB**: Base de datos NoSQL
- **CRUD Completo**: Operaciones Create, Read, Update, Delete
- **Paginación**: Soporte para paginación en consultas
- **Filtros**: Filtrado por fechas y estados
- **Estadísticas**: Análisis de datos con agregaciones
- **Seguridad**: Helmet, CORS, Rate Limiting
- **Manejo de Errores**: Middleware personalizado

## 📋 Requisitos

- Node.js (v14 o superior)
- MongoDB Atlas (conexión configurada)
- npm o yarn

## 🛠️ Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd api_j
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
El archivo `config.env` ya está configurado con la conexión a MongoDB.

4. **Ejecutar la aplicación**
```bash
# Desarrollo
npm run dev

# Producción
npm start
```

## 📊 Estructura del Proyecto

```
api_j/
├── config/
│   └── database.js          # Configuración de MongoDB
├── controllers/
│   ├── gasSensorController.js    # Controlador sensor de gas
│   └── motionSensorController.js # Controlador sensor de movimiento
├── middleware/
│   └── errorHandler.js      # Manejo de errores
├── models/
│   ├── GasSensor.js         # Modelo sensor de gas
│   └── MotionSensor.js      # Modelo sensor de movimiento
├── routes/
│   ├── gasSensorRoutes.js   # Rutas sensor de gas
│   └── motionSensorRoutes.js # Rutas sensor de movimiento
├── config.env               # Variables de entorno
├── package.json
├── server.js               # Servidor principal
└── README.md
```

## 🔌 Endpoints de la API

### Base URL
```
http://localhost:3000
```

### Sensor de Gas (`/api/gas`)

#### GET - Obtener todos los registros
```
GET /api/gas?page=1&limit=10&sort=-fecha_hora
```

#### GET - Obtener último registro
```
GET /api/gas/latest
```

#### GET - Obtener por rango de fechas
```
GET /api/gas/date-range?startDate=2025-01-01&endDate=2025-01-31
```

#### GET - Obtener estadísticas
```
GET /api/gas/statistics?startDate=2025-01-01&endDate=2025-01-31
```

#### GET - Obtener por ID
```
GET /api/gas/:id
```

#### POST - Crear nuevo registro
```
POST /api/gas
Content-Type: application/json

{
  "fecha_hora": "2025-08-29 19:25:50",
  "nivel_gas": 2890,
  "ventilador": 0
}
```

#### PUT - Actualizar registro
```
PUT /api/gas/:id
Content-Type: application/json

{
  "nivel_gas": 3000,
  "ventilador": 1
}
```

#### DELETE - Eliminar registro
```
DELETE /api/gas/:id
```

### Sensor de Movimiento (`/api/motion`)

#### GET - Obtener todos los registros
```
GET /api/motion?page=1&limit=10&sort=-fecha_hora
```

#### GET - Obtener último registro
```
GET /api/motion/latest
```

#### GET - Obtener por rango de fechas
```
GET /api/motion/date-range?startDate=2025-01-01&endDate=2025-01-31
```

#### GET - Obtener movimiento detectado
```
GET /api/motion/motion-detected?page=1&limit=10
```

#### GET - Obtener alarma activada
```
GET /api/motion/alarm-activated?page=1&limit=10
```

#### GET - Obtener estadísticas
```
GET /api/motion/statistics?startDate=2025-01-01&endDate=2025-01-31
```

#### GET - Obtener por ID
```
GET /api/motion/:id
```

#### POST - Crear nuevo registro
```
POST /api/motion
Content-Type: application/json

{
  "fecha_hora": "2025-08-29 19:25:40",
  "movimiento": 1,
  "alarma": 1
}
```

#### PUT - Actualizar registro
```
PUT /api/motion/:id
Content-Type: application/json

{
  "movimiento": 0,
  "alarma": 0
}
```

#### DELETE - Eliminar registro
```
DELETE /api/motion/:id
```

## 📝 Esquemas de Datos

### Sensor de Gas
```json
{
  "fecha_hora": "2025-08-29 19:25:50",
  "nivel_gas": 2890,
  "ventilador": 0
}
```

- `fecha_hora`: Fecha y hora del registro (Date)
- `nivel_gas`: Nivel de gas detectado (Number, 0-10000)
- `ventilador`: Estado del ventilador (Number, 0 o 1)

### Sensor de Movimiento
```json
{
  "fecha_hora": "2025-08-29 19:25:40",
  "movimiento": 1,
  "alarma": 1
}
```

- `fecha_hora`: Fecha y hora del registro (Date)
- `movimiento`: Detección de movimiento (Number, 0 o 1)
- `alarma`: Estado de la alarma (Number, 0 o 1)

## 🔍 Parámetros de Consulta

### Paginación
- `page`: Número de página (default: 1)
- `limit`: Registros por página (default: 10)
- `sort`: Ordenamiento (default: -fecha_hora)

### Filtros de Fecha
- `startDate`: Fecha de inicio (YYYY-MM-DD)
- `endDate`: Fecha de fin (YYYY-MM-DD)

## 📊 Respuestas de Estadísticas

### Sensor de Gas
```json
{
  "success": true,
  "data": {
    "totalRecords": 100,
    "avgNivelGas": 2500,
    "maxNivelGas": 5000,
    "minNivelGas": 100,
    "ventiladorActivado": 25
  }
}
```

### Sensor de Movimiento
```json
{
  "success": true,
  "data": {
    "totalRecords": 100,
    "movimientoDetectado": 30,
    "alarmaActivada": 15,
    "porcentajeMovimiento": 30,
    "porcentajeAlarma": 15
  }
}
```

## 🛡️ Seguridad

- **Helmet**: Headers de seguridad
- **CORS**: Configuración de Cross-Origin
- **Rate Limiting**: Límite de 100 requests por 15 minutos
- **Validación**: Validación de datos de entrada
- **Manejo de Errores**: Respuestas de error consistentes

## 🧪 Testing

Para probar la API, puedes usar herramientas como:
- Postman
- Insomnia
- curl
- Thunder Client (VS Code)

### Ejemplo con curl

```bash
# Crear registro de gas
curl -X POST http://localhost:3000/api/gas \
  -H "Content-Type: application/json" \
  -d '{
    "fecha_hora": "2025-08-29 19:25:50",
    "nivel_gas": 2890,
    "ventilador": 0
  }'

# Crear registro de movimiento
curl -X POST http://localhost:3000/api/motion \
  -H "Content-Type: application/json" \
  -d '{
    "fecha_hora": "2025-08-29 19:25:40",
    "movimiento": 1,
    "alarma": 1
  }'
```

## 🚀 Despliegue

### Variables de Entorno
```env
MONGODB_URI=mongodb+srv://doki:doki@cluster0.bx5xxfk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=3000
NODE_ENV=production
```

### Comandos de Producción
```bash
npm start
```

## 📞 Soporte

Para reportar bugs o solicitar nuevas características, por favor crea un issue en el repositorio.

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.
