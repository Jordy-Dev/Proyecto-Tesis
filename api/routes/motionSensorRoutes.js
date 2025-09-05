const express = require('express');
const router = express.Router();
const {
  getAllMotionSensors,
  getMotionSensorById,
  getLatestMotionSensor,
  getMotionSensorsByDateRange,
  getMotionDetected,
  getAlarmActivated,
  createMotionSensor,
  updateMotionSensor,
  deleteMotionSensor,
  getMotionStatistics
} = require('../controllers/motionSensorController');

// Rutas para sensor de movimiento

// GET - Obtener todos los registros (con paginación)
router.get('/', getAllMotionSensors);

// GET - Obtener el último registro
router.get('/latest', getLatestMotionSensor);

// GET - Obtener registros por rango de fechas
router.get('/date-range', getMotionSensorsByDateRange);

// GET - Obtener registros con movimiento detectado
router.get('/motion-detected', getMotionDetected);

// GET - Obtener registros con alarma activada
router.get('/alarm-activated', getAlarmActivated);

// GET - Obtener estadísticas
router.get('/statistics', getMotionStatistics);

// GET - Obtener un registro específico por ID
router.get('/:id', getMotionSensorById);

// POST - Crear nuevo registro
router.post('/', createMotionSensor);

// PUT - Actualizar registro
router.put('/:id', updateMotionSensor);

// DELETE - Eliminar registro
router.delete('/:id', deleteMotionSensor);

module.exports = router;
