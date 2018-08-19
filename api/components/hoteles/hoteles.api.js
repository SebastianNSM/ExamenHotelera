'use strict';

const hotelModel = require('./hoteles.model');

module.exports.registrar_hotel = function (req, res) {
    let nuevoHotel = new hotelModel({
        nombre: req.body.nombre,
        latitud: req.body.latitud,
        longitud: req.body.longitud,
        provincia: req.body.provincia,
        canton: req.body.canton,
        distrito: req.body.distrito,
        direccion: req.body.direccion,
        telefono_servicio: req.body.telefono_servicio,
        correo_servicio: req.body.correo_servicio,
        telefono_reservacion: req.body.telefono_reservacion,
        correo_reservacion: req.body.correo_reservacion,
        estrellas: 0,
        estado: "Activo"
    })

    nuevoHotel.save(function (error) {
        if (error) {
            res.json({ success: false, msg: 'No se pudo registrar el hotel, ocurrió el siguiente error' + error });
        } else {
            res.json({ success: true, msg: 'El hotel se registró con éxito' });
        }
    });
};

module.exports.listar_hotel = function (req, res) {
    hotelModel.find().sort({ nombre: 'asc' }).then(
        function (hoteles) {
            res.send(hoteles);
        }
    );
};
module.exports.buscar_hotel_id = function (req, res) {
    hotelModel.findById({ _id: req.body._id }).then(
        function (hotel) {
            res.send(hotel);
        }
    );
};

module.exports.eliminar_hotel = function (req, res) {
    hotelModel.findByIdAndDelete(req.body._id,
        function (err) {
            if (err) {
                res.json({ success: false, msg: 'El hotel no se ha podido eliminar. ' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'Se ha eliminado correctamente. ' + res });
            }
        });
};

module.exports.modificar_hotel = function (req, res) {
    hotelModel.findByIdAndUpdate(req.body._id, { $set: req.body },
        function (err) {
            if (err) {
                res.json({ success: false, msg: 'El hotel no se ha podido modificar. ' + err });

            } else {
                res.json({ success: true, msg: 'Se ha actualizado correctamente. ' + res });
            }
        });
};

module.exports.agregar_ranking = function (req, res) {

    hotelModel.update(
        { _id: req.body._id },
        {
            $push:
            {
                'rank':
                {
                    usuario_rank: req.body.usuario_rank,
                    promedio_rank: req.body.promedio_rank,
                }
            }
        },
        function (error) {
            if (error) {
                res.json({ success: false, msg: 'No se pudo registrar la calificación, ocurrió el siguiente error' + error });
            } else {
                res.json({ success: true, msg: 'Se ha registrado la calificación correctamente. ' + res });
            }
        }
    )
};