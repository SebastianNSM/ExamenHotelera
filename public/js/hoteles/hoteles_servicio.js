'use strict';

function registrar_hotel(paInfoHotel) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_hotel',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            nombre: paInfoHotel[0],
            latitud: paInfoHotel[1],
            longitud: paInfoHotel[2],
            provincia: paInfoHotel[3],
            canton: paInfoHotel[4],
            distrito: paInfoHotel[5],
            direccion: paInfoHotel[6],
            telefono_servicio: paInfoHotel[7],
            correo_servicio: paInfoHotel[8],
            telefono_reservacion: paInfoHotel[9],
            correo_reservacion: paInfoHotel[10]
        }
    });
    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;


}

function obtener_hoteles() {

    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_hotel',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {

        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });
    return respuesta;
}

function buscar_hotel(pid) {
    let hotel = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/buscar_hotel_id',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            _id: pid
        }
    });

    peticion.done(function (response) {
        hotel = response;
    });

    peticion.fail(function (response) {

    });

    return hotel;
};

function eliminar_hotel(pid) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/eliminar_hotel',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            _id: pid
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;
};

function modificar_hotel(paInfoHotel) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/modificar_hotel',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            nombre: paInfoHotel[0],
            latitud: paInfoHotel[1],
            longitud: paInfoHotel[2],
            provincia_hotel: paInfoHotel[3],
            canton: paInfoHotel[4],
            distrito: paInfoHotel[5],
            direccion: paInfoHotel[6],
            telefono_servicio: paInfoHotel[7],
            correo_servicio: paInfoHotel[8],
            telefono_reservacion: paInfoHotel[9],
            correo_reservacion: paInfoHotel[10]
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;
};

function registrar_ranking(_id,id_usuario,promedio_rank) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/agregar_ranking',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            _id: id,
            usuario_rank: id_usuario,
            promedio_rank: promedio_rank
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;
};