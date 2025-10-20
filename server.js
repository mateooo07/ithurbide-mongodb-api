require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const batteryRoutes = require('./routes/batteryRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Conectado');
    })
    .catch((error) => {
        console.error('Error al conectar:', error);
        process.exit(1);
    });

app.get('/', (req, res) => {
    res.json({
        message: 'API Ithurbide',
        endpoints: {
        'GET /api/battery': 'Obtener todos los registros',
        'POST /api/battery': 'Crear nuevo registro',
        }
    });
});

app.use('/api/battery', batteryRoutes);

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