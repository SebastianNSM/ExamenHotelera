'use strict';

const hotelModel = require('./hoteles.model');

module.exports.registrar_hotel = function (req, res) {
    let nuevoHotel = new hotelModel({
        nombre_hotel: req.body.nombre_hotel,
        latitud_hotel: req.body.latitud_hotel,
        longitud_hotel: req.body.longitud_hotel,
        provincia_hotel: req.body.provincia_hotel,
        canton_hotel: req.body.canton_hotel,
        distrito_hotel: req.body.distrito_hotel,
        direccion_hotel: req.body.direccion_hotel,
        telefono_hotel: req.body.telefono_hotel,
        correo_hotel: req.body.correo_hotel
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
    hotelModel.find().sort({ nombre_hotel: 'asc' }).then(
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