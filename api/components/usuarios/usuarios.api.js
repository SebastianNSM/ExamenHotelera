'use strict';

const usuarioModel = require('./usuarios.model');

module.exports.registrar_usuario = function (req, res) {
    let nuevoUsuario = new usuarioModel({
        
        foto_usuario: req.body.foto_usuario,
        cedula_usuario: req.body.cedula_usuario,
        pNombre_usuario: req.body.pNombre_usuario,
        sNombre_usuario: req.body.sNombre_usuario,
        pApellido_usuario: req.body.pApellido_usuario,
        sApellido_usuario: req.body.sApellido_usuario,
        fecha_nacimiento_usuario: req.body.fecha_nacimiento_usuario,
        sexo_usuario: req.body.sexo_usuario,
        contrasenna_usuario: req.body.contrasenna_usuario,
        rol_usuario: "cliente"
        
    })

    nuevoUsuario.save(function (error) {
        if (error) {
            res.json({ success: false, msg: 'No se pudo registrar el usuario, ocurrió el siguiente error' + error });
        } else {
            res.json({ success: true, msg: 'El usuario se registró con éxito' });
        }
    });
};

module.exports.listar_usuarios = function (req, res) {
    usuarioModel.find().sort({ pNombre_usuario: 'asc' }).then(
        function (usuarios) {
            res.send(usuarios);
        }
    );
};
module.exports.buscar_usuario_id = function (req, res) {
    usuarioModel.findById({ _id: req.body._id }).then(
        function (usuario) {
            res.send(usuario);
        }
    );
};

module.exports.eliminar_usuario = function (req, res) {
    usuarioModel.findByIdAndDelete(req.body._id,
        function (err) {
            if (err) {
                res.json({ success: false, msg: 'El usuario no se ha podido eliminar. ' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'Se ha eliminado correctamente. ' + res });
            }
        });
};

module.exports.modificar_usuario = function (req, res) {
    usuarioModel.findByIdAndUpdate(req.body._id, { $set: req.body },
        function (err) {
            if (err) {
                res.json({ success: false, msg: 'El usuario no se ha podido modificar. ' + err });

            } else {
                res.json({ success: true, msg: 'Se ha actualizado correctamente. ' + res });
            }
        });
};

