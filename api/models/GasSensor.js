const mongoose = require('mongoose');

const gasSensorSchema = new mongoose.Schema({
  fecha_hora: {
    type: Date,
    required: true,
    default: Date.now
  },
  nivel_gas: {
    type: Number,
    required: true,
    min: 0,
    max: 10000
  },
  ventilador: {
    type: Number,
    required: true,
    enum: [0, 1],
    default: 0
  }
}, {
  timestamps: false,
  versionKey: false
});

// Índice para mejorar consultas por fecha
gasSensorSchema.index({ fecha_hora: -1 });

// Método para obtener el último registro
gasSensorSchema.statics.getLatest = function() {
  return this.findOne().sort({ fecha_hora: -1 });
};

// Método para obtener registros por rango de fechas
gasSensorSchema.statics.getByDateRange = function(startDate, endDate) {
  return this.find({
    fecha_hora: {
      $gte: startDate,
      $lte: endDate
    }
  }).sort({ fecha_hora: -1 });
};

module.exports = mongoose.model('GasSensor', gasSensorSchema);
