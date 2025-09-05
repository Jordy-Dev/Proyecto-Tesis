const express = require('express');
const router = express.Router();
const {
  getAllGasSensors,
  getGasSensorById,
  getLatestGasSensor,
  getGasSensorsByDateRange,
  createGasSensor,
  updateGasSensor,
  deleteGasSensor,
  getGasStatistics
} = require('../controllers/gasSensorController');

// Rutas para sensor de gas

// GET - Obtener todos los registros (con paginación)
router.get('/', getAllGasSensors);

// GET - Obtener el último registro
router.get('/latest', getLatestGasSensor);

// GET - Obtener registros por rango de fechas
router.get('/date-range', getGasSensorsByDateRange);

// GET - Obtener estadísticas
router.get('/statistics', getGasStatistics);

// GET - Obtener un registro específico por ID
router.get('/:id', getGasSensorById);

// POST - Crear nuevo registro
router.post('/', createGasSensor);

// PUT - Actualizar registro
router.put('/:id', updateGasSensor);

// DELETE - Eliminar registro
router.delete('/:id', deleteGasSensor);

module.exports = router;
