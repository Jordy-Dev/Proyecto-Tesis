const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config({ path: './config.env' });

// Importar rutas
const gasSensorRoutes = require('./routes/gasSensorRoutes');
const motionSensorRoutes = require('./routes/motionSensorRoutes');

// Conectar a la base de datos
connectDB();

const app = express();

// Configurar rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por ventana
  message: {
    success: false,
    message: 'Demasiadas solicitudes desde esta IP, inténtalo de nuevo más tarde.'
  }
});

// Middleware
app.use(helmet()); // Seguridad
app.use(cors()); // CORS
app.use(limiter); // Rate limiting
app.use(express.json({ limit: '10mb' })); // Parse JSON
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API de Sensores - Gas y Movimiento',
    version: '1.0.0',
    endpoints: {
      gas: '/api/gas',
      motion: '/api/motion'
    }
  });
});

// Rutas de la API
app.use('/api/gas', gasSensorRoutes);
app.use('/api/motion', motionSensorRoutes);

// Ruta para manejar rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// Middleware de manejo de errores
app.use(errorHandler);

// Configurar puerto
const PORT = process.env.PORT || 3000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  console.log(`Ambiente: ${process.env.NODE_ENV}`);
  console.log(`API disponible en: http://localhost:${PORT}`);
});

// Manejar errores no capturados
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Cerrar servidor y salir del proceso
  process.exit(1);
});
