require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const batteryRoutes = require('./routes/batteryRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Conectado');
    })
    .catch((error) => {
        console.error('Error al conectar:', error);
        process.exit(1);
    });

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.json({
        message: 'API Ithurbide',
        version: '1.0.0',
        endpoints: {
        'GET /api/battery': 'Obtener todos los datos',
        'POST /api/battery': 'Crear nuevo registro',
        }
    });
});

// Rutas de la API
app.use('/api/battery', batteryRoutes);

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Ruta no encontrada'
    });
    });

    // Iniciar servidor
    app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});