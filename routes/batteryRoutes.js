const express = require('express');
const router = express.Router();
const BatteryData = require('../models/BatteryData');

// GET: Obtener todos los datos
router.get('/', async (req, res) => {
    try {
        const data = await BatteryData.find().sort({ createdAt: -1 });
        res.json({
        success: true,
        count: data.length,
        data: data
        });
    } catch (error) {
        res.status(500).json({
        success: false,
        message: 'Error al obtener datos',
        error: error.message
        });
    }
});

// POST: Crear nuevo registro
router.post('/', async (req, res) => {
    try {
        const batteryData = new BatteryData(req.body);
        const savedData = await batteryData.save();
        
        res.status(201).json({
        success: true,
        message: 'Datos guardados correctamente',
        data: savedData
        });
    } catch (error) {
        res.status(400).json({
        success: false,
        message: 'Error al guardar datos',
        error: error.message
        });
    }
});


module.exports = router;