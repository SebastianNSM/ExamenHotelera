'use strict';

let mongoose = require('mongoose');

let usuarioSchema = new mongoose.Schema({
    foto_usuario: { type: String, required: true },
    cedula_usuario: { type: String, required: true, unique: true },
    pNombre_usuario: { type: String, required: true },
    sNombre_usuario: { type: String },
    pApellido_usuario: { type: String, required: true },
    sApellido_usuario: { type: String },
    fecha_nacimiento_usuario: { type: Date, required: true },
    sexo_usuario: { type: String, required: true },
    contrasenna_usuario: { type: String, required: true },
    rol_usuario: { type: String, required: true}
});

module.exports = mongoose.model('Usuario', usuarioSchema);