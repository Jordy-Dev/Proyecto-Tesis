const mongoose = require('mongoose');

const motionSensorSchema = new mongoose.Schema({
  fecha_hora: {
    type: Date,
    required: true,
    default: Date.now
  },
  movimiento: {
    type: Number,
    required: true,
    enum: [0, 1],
    default: 0
  },
  alarma: {
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
motionSensorSchema.index({ fecha_hora: -1 });

// Método para obtener el último registro
motionSensorSchema.statics.getLatest = function() {
  return this.findOne().sort({ fecha_hora: -1 });
};

// Método para obtener registros por rango de fechas
motionSensorSchema.statics.getByDateRange = function(startDate, endDate) {
  return this.find({
    fecha_hora: {
      $gte: startDate,
      $lte: endDate
    }
  }).sort({ fecha_hora: -1 });
};

// Método para obtener registros con movimiento detectado
motionSensorSchema.statics.getMotionDetected = function() {
  return this.find({ movimiento: 1 }).sort({ fecha_hora: -1 });
};

// Método para obtener registros con alarma activada
motionSensorSchema.statics.getAlarmActivated = function() {
  return this.find({ alarma: 1 }).sort({ fecha_hora: -1 });
};

module.exports = mongoose.model('MotionSensor', motionSensorSchema);
