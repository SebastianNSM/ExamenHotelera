'use strict';

let mongoose = require('mongoose');

let hotelSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    latitud: { type: String, required: true },
    longitud: { type: String, required: true },
    provincia: { type: String, require: true },
    canton: { type: String, require: true },
    distrito: { type: String, require: true },
    direccion: { type: String, require: true },
    telefono_servicio: { type: String, required: true },
    correo_servicio: { type: String, required: true },
    telefono_reservacion: { type: String, required: true },
    correo_reservacion: { type: String, required: true },
    estrellas: { type: Number },
    estado: { type: String },
    rank: [
        {
            promedio_rank: { type: Number }
        }
    ]
});

module.exports = mongoose.model('Hotel', hotelSchema);