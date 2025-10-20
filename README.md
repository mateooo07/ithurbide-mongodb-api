# Ithurbide MongoDB API

API REST para monitoreo de baterías con ESP32, desarrollada con Node.js, Express y MongoDB Atlas.

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.0-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Descripción

Sistema de monitoreo en tiempo real que recibe datos de sensores INA226 y LM35 desde dispositivos ESP32, almacena las mediciones en MongoDB y proporciona endpoints para consultar la información histórica.

### Magnitudes monitoreadas:
- **Temperatura** (sensor LM35)
- **Amperaje** (sensor INA226)
- **Voltaje** (sensor INA226)

## Inicio Rápido

### Requisitos Previos

- Node.js v14 o superior
- npm o yarn
- Cuenta en MongoDB Atlas (gratuita)

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/battery-monitor-api.git
cd battery-monitor-api

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Edita .env con tus credenciales de MongoDB Atlas

# Iniciar en modo desarrollo
npm run dev
```

## Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
MONGODB_URI=mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/battery_monitor?retryWrites=true&w=majority
```

### MongoDB Atlas

1. Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Crea un cluster M0 (gratuito)
3. Configura un usuario de base de datos
4. Agrega `0.0.0.0/0` a IP Access List
5. Obtén la cadena de conexión y pégala en `.env`

## Endpoints

### Base URL
```
http://localhost:3000/api/battery
```

### GET - Obtener todos los registros

```http
GET /api/battery
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "count": 15,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "mac": "AA:BB:CC:DD:EE:FF",
      "magnitud": "temperatura",
      "fecha": "2025-10-20",
      "tomas": [
        {
          "valor": 25.3,
          "hora": "14:30:00"
        },
        {
          "valor": 25.5,
          "hora": "14:31:00"
        }
      ],
      "createdAt": "2025-10-20T14:30:00.000Z",
      "updatedAt": "2025-10-20T14:30:00.000Z"
    }
  ]
}
```
### POST - Crear nuevo registro

```http
POST /api/battery
Content-Type: application/json
```

**Body:**
```json
{
  "mac": "AA:BB:CC:DD:EE:FF",
  "magnitud": "temperatura",
  "fecha": "2025-10-20",
  "tomas": [
    {
      "valor": 25.3,
      "hora": "14:30:00"
    },
    {
      "valor": 25.5,
      "hora": "14:31:00"
    }
  ]
}
```

**Ejemplo con cURL:**
```bash
curl -X POST http://localhost:3000/api/battery \
  -H "Content-Type: application/json" \
  -d '{
    "mac": "AA:BB:CC:DD:EE:FF",
    "magnitud": "temperatura",
    "fecha": "2025-10-20",
    "tomas": [
      {"valor": 25.3, "hora": "14:30:00"},
      {"valor": 25.5, "hora": "14:31:00"}
    ]
  }'
```

## Estructura del Proyecto

```
battery-monitor-api/
├── models/
│   └── BatteryData.js      # Esquema de Mongoose
├── routes/
│   └── batteryRoutes.js    # Definición de endpoints
├── .env                     # Variables de entorno (no incluir en git)
├── .gitignore
├── package.json
├── README.md
└── server.js               # Punto de entrada de la aplicación
```

## Scripts Disponibles

```bash
# Modo desarrollo (con nodemon - reinicio automático)
npm run dev

# Modo producción
npm start

# Verificar dependencias
npm list

# Actualizar dependencias
npm update
```

## Modelo de Datos

### Schema: BatteryData

```javascript
{
  mac: String,              // MAC del dispositivo ESP32
  magnitud: String,         // temperatura | amperaje | voltaje
  fecha: String,            // Formato: YYYY-MM-DD
  tomas: [
    {
      valor: Number,        // Valor de la medición
      hora: String          // Formato: HH:MM:SS
    }
  ],
  createdAt: Date,          // Timestamp automático
  updatedAt: Date           // Timestamp automático
}
```

## Integración con ESP32

### Configuración del ESP32

Modifica tu código ESP32 para apuntar a esta API:

```c
// URL de la API (reemplaza con tu IP o dominio)
static const char *POST_URL = "http://192.168.1.100:3000/api/battery";
```

### Formato del JSON desde ESP32

El ESP32 debe enviar datos en este formato:

```json
{
  "mac": "AA:BB:CC:DD:EE:FF",
  "magnitud": "temperatura",
  "fecha": "2025-10-20",
  "tomas": [
    {"valor": 25.3, "hora": "14:30:00"}
  ]
}
```

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## Soporte

Si tienes problemas o preguntas:

- Email: mateopavoni6@gmail.com
- Issues: [GitHub Issues](https://github.com/tu-usuario/battery-monitor-api/issues)

