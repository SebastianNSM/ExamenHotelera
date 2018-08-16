'use strict';

let mongoose = require('mongoose');

let hotelSchema = new mongoose.Schema({
    nombre_hotel: { type: String, required: true },
    latitud_hotel: { type: String, required: true },
    longitud_hotel: { type: String, required: true },
    provincia_hotel: { type: String, require: true },
    canton_hotel: { type: String, require: true },
    distrito_hotel: { type: String, require: true },
    direccion_hotel: { type: String, require: true },
    telefono_hotel: { type: String, required: true },
    correo_hotel: { type: String, required: true }
});

module.exports = mongoose.model('Hotel', hotelSchema);