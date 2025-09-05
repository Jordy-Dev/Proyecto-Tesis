const GasSensor = require('../models/GasSensor');

// GET - Obtener todos los registros de gas
const getAllGasSensors = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = '-fecha_hora' } = req.query;
    
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sort
    };

    const gasSensors = await GasSensor.find()
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await GasSensor.countDocuments();

    res.status(200).json({
      success: true,
      data: gasSensors,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalRecords: count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener los registros de gas',
      error: error.message
    });
  }
};

// GET - Obtener un registro específico por ID
const getGasSensorById = async (req, res) => {
  try {
    const gasSensor = await GasSensor.findById(req.params.id);
    
    if (!gasSensor) {
      return res.status(404).json({
        success: false,
        message: 'Registro de gas no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: gasSensor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el registro de gas',
      error: error.message
    });
  }
};

// GET - Obtener el último registro
const getLatestGasSensor = async (req, res) => {
  try {
    const latestGasSensor = await GasSensor.getLatest();
    
    if (!latestGasSensor) {
      return res.status(404).json({
        success: false,
        message: 'No hay registros de gas disponibles'
      });
    }

    res.status(200).json({
      success: true,
      data: latestGasSensor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el último registro de gas',
      error: error.message
    });
  }
};

// GET - Obtener registros por rango de fechas
const getGasSensorsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Se requieren fechas de inicio y fin'
      });
    }

    const gasSensors = await GasSensor.getByDateRange(
      new Date(startDate),
      new Date(endDate)
    );

    res.status(200).json({
      success: true,
      data: gasSensors,
      count: gasSensors.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener registros por rango de fechas',
      error: error.message
    });
  }
};

// POST - Crear nuevo registro de gas
const createGasSensor = async (req, res) => {
  try {
    const { fecha_hora, nivel_gas, ventilador } = req.body;

    // Validar datos requeridos
    if (nivel_gas === undefined || ventilador === undefined) {
      return res.status(400).json({
        success: false,
        message: 'nivel_gas y ventilador son campos requeridos'
      });
    }

    const gasSensor = new GasSensor({
      fecha_hora: fecha_hora ? new Date(fecha_hora) : new Date(),
      nivel_gas,
      ventilador
    });

    const savedGasSensor = await gasSensor.save();

    res.status(201).json({
      success: true,
      message: 'Registro de gas creado exitosamente',
      data: savedGasSensor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear el registro de gas',
      error: error.message
    });
  }
};

// PUT - Actualizar registro de gas
const updateGasSensor = async (req, res) => {
  try {
    const { fecha_hora, nivel_gas, ventilador } = req.body;

    const gasSensor = await GasSensor.findById(req.params.id);
    
    if (!gasSensor) {
      return res.status(404).json({
        success: false,
        message: 'Registro de gas no encontrado'
      });
    }

    // Actualizar solo los campos proporcionados
    if (fecha_hora !== undefined) gasSensor.fecha_hora = new Date(fecha_hora);
    if (nivel_gas !== undefined) gasSensor.nivel_gas = nivel_gas;
    if (ventilador !== undefined) gasSensor.ventilador = ventilador;

    const updatedGasSensor = await gasSensor.save();

    res.status(200).json({
      success: true,
      message: 'Registro de gas actualizado exitosamente',
      data: updatedGasSensor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al actualizar el registro de gas',
      error: error.message
    });
  }
};

// DELETE - Eliminar registro de gas
const deleteGasSensor = async (req, res) => {
  try {
    const gasSensor = await GasSensor.findById(req.params.id);
    
    if (!gasSensor) {
      return res.status(404).json({
        success: false,
        message: 'Registro de gas no encontrado'
      });
    }

    await GasSensor.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Registro de gas eliminado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar el registro de gas',
      error: error.message
    });
  }
};

// GET - Estadísticas de gas
const getGasStatistics = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    let query = {};
    if (startDate && endDate) {
      query.fecha_hora = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const stats = await GasSensor.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          totalRecords: { $sum: 1 },
          avgNivelGas: { $avg: '$nivel_gas' },
          maxNivelGas: { $max: '$nivel_gas' },
          minNivelGas: { $min: '$nivel_gas' },
          ventiladorActivado: {
            $sum: { $cond: [{ $eq: ['$ventilador', 1] }, 1, 0] }
          }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: stats[0] || {
        totalRecords: 0,
        avgNivelGas: 0,
        maxNivelGas: 0,
        minNivelGas: 0,
        ventiladorActivado: 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener estadísticas de gas',
      error: error.message
    });
  }
};

module.exports = {
  getAllGasSensors,
  getGasSensorById,
  getLatestGasSensor,
  getGasSensorsByDateRange,
  createGasSensor,
  updateGasSensor,
  deleteGasSensor,
  getGasStatistics
};
