const mongoose = require('mongoose');

const tomaSchema = new mongoose.Schema({
    valor: {
        type: Number,
        required: true
    },
    hora: {
        type: String,
        required: true
    }
    }, { _id: false });

    const batteryDataSchema = new mongoose.Schema({
    mac: {
        type: String,
        required: true,
        trim: true
    },
    magnitud: {
        type: String,
        required: true,
        enum: ['temperatura', 'amperaje', 'voltaje']
    },
    fecha: {
        type: String,
        required: true
    },
    tomas: [tomaSchema]
}, {
    timestamps: true 
});


batteryDataSchema.index({ mac: 1, magnitud: 1, fecha: 1 });

module.exports = mongoose.model('BatteryData', batteryDataSchema);