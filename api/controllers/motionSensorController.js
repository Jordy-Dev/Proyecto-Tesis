const MotionSensor = require('../models/MotionSensor');

// GET - Obtener todos los registros de movimiento
const getAllMotionSensors = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = '-fecha_hora' } = req.query;
    
    const motionSensors = await MotionSensor.find()
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await MotionSensor.countDocuments();

    res.status(200).json({
      success: true,
      data: motionSensors,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalRecords: count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener los registros de movimiento',
      error: error.message
    });
  }
};

// GET - Obtener un registro específico por ID
const getMotionSensorById = async (req, res) => {
  try {
    const motionSensor = await MotionSensor.findById(req.params.id);
    
    if (!motionSensor) {
      return res.status(404).json({
        success: false,
        message: 'Registro de movimiento no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: motionSensor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el registro de movimiento',
      error: error.message
    });
  }
};

// GET - Obtener el último registro
const getLatestMotionSensor = async (req, res) => {
  try {
    const latestMotionSensor = await MotionSensor.getLatest();
    
    if (!latestMotionSensor) {
      return res.status(404).json({
        success: false,
        message: 'No hay registros de movimiento disponibles'
      });
    }

    res.status(200).json({
      success: true,
      data: latestMotionSensor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el último registro de movimiento',
      error: error.message
    });
  }
};

// GET - Obtener registros por rango de fechas
const getMotionSensorsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Se requieren fechas de inicio y fin'
      });
    }

    const motionSensors = await MotionSensor.getByDateRange(
      new Date(startDate),
      new Date(endDate)
    );

    res.status(200).json({
      success: true,
      data: motionSensors,
      count: motionSensors.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener registros por rango de fechas',
      error: error.message
    });
  }
};

// GET - Obtener registros con movimiento detectado
const getMotionDetected = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const motionSensors = await MotionSensor.getMotionDetected()
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await MotionSensor.countDocuments({ movimiento: 1 });

    res.status(200).json({
      success: true,
      data: motionSensors,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalRecords: count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener registros con movimiento detectado',
      error: error.message
    });
  }
};

// GET - Obtener registros con alarma activada
const getAlarmActivated = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const motionSensors = await MotionSensor.getAlarmActivated()
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await MotionSensor.countDocuments({ alarma: 1 });

    res.status(200).json({
      success: true,
      data: motionSensors,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalRecords: count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener registros con alarma activada',
      error: error.message
    });
  }
};

// POST - Crear nuevo registro de movimiento
const createMotionSensor = async (req, res) => {
  try {
    const { fecha_hora, movimiento, alarma } = req.body;

    // Validar datos requeridos
    if (movimiento === undefined || alarma === undefined) {
      return res.status(400).json({
        success: false,
        message: 'movimiento y alarma son campos requeridos'
      });
    }

    const motionSensor = new MotionSensor({
      fecha_hora: fecha_hora ? new Date(fecha_hora) : new Date(),
      movimiento,
      alarma
    });

    const savedMotionSensor = await motionSensor.save();

    res.status(201).json({
      success: true,
      message: 'Registro de movimiento creado exitosamente',
      data: savedMotionSensor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear el registro de movimiento',
      error: error.message
    });
  }
};

// PUT - Actualizar registro de movimiento
const updateMotionSensor = async (req, res) => {
  try {
    const { fecha_hora, movimiento, alarma } = req.body;

    const motionSensor = await MotionSensor.findById(req.params.id);
    
    if (!motionSensor) {
      return res.status(404).json({
        success: false,
        message: 'Registro de movimiento no encontrado'
      });
    }

    // Actualizar solo los campos proporcionados
    if (fecha_hora !== undefined) motionSensor.fecha_hora = new Date(fecha_hora);
    if (movimiento !== undefined) motionSensor.movimiento = movimiento;
    if (alarma !== undefined) motionSensor.alarma = alarma;

    const updatedMotionSensor = await motionSensor.save();

    res.status(200).json({
      success: true,
      message: 'Registro de movimiento actualizado exitosamente',
      data: updatedMotionSensor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar el registro de movimiento',
      error: error.message
    });
  }
};

// DELETE - Eliminar registro de movimiento
const deleteMotionSensor = async (req, res) => {
  try {
    const motionSensor = await MotionSensor.findById(req.params.id);
    
    if (!motionSensor) {
      return res.status(404).json({
        success: false,
        message: 'Registro de movimiento no encontrado'
      });
    }

    await MotionSensor.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Registro de movimiento eliminado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar el registro de movimiento',
      error: error.message
    });
  }
};

// GET - Estadísticas de movimiento
const getMotionStatistics = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    let query = {};
    if (startDate && endDate) {
      query.fecha_hora = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const stats = await MotionSensor.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          totalRecords: { $sum: 1 },
          movimientoDetectado: {
            $sum: { $cond: [{ $eq: ['$movimiento', 1] }, 1, 0] }
          },
          alarmaActivada: {
            $sum: { $cond: [{ $eq: ['$alarma', 1] }, 1, 0] }
          }
        }
      }
    ]);

    // Calcular porcentajes manualmente
    const result = stats[0] || {
      totalRecords: 0,
      movimientoDetectado: 0,
      alarmaActivada: 0
    };

    result.porcentajeMovimiento = result.totalRecords > 0 
      ? Math.round((result.movimientoDetectado / result.totalRecords) * 100 * 100) / 100
      : 0;
    
    result.porcentajeAlarma = result.totalRecords > 0 
      ? Math.round((result.alarmaActivada / result.totalRecords) * 100 * 100) / 100
      : 0;

    res.status(200).json({
      success: true,
      data: stats[0] || {
        totalRecords: 0,
        movimientoDetectado: 0,
        alarmaActivada: 0,
        porcentajeMovimiento: 0,
        porcentajeAlarma: 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener estadísticas de movimiento',
      error: error.message
    });
  }
};

module.exports = {
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
};
