'use strict';

function registrar_usuario(paInfoUsuario) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_usuario',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            foto_usuario: paInfoUsuario[0],
            cedula_usuario: paInfoUsuario[1],
            pNombre_usuario: paInfoUsuario[2],
            sNombre_usuario: paInfoUsuario[3],
            pApellido_usuario: paInfoUsuario[4],
            sApellido_usuario: paInfoUsuario[5],
            correo_usuario: paInfoUsuario[6],
            fecha_nacimiento_usuario: paInfoUsuario[7],
            sexo_usuario: paInfoUsuario[8],
            contrasenna_usuario: paInfoUsuario[9]
        }
    });
    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;


}

function obtener_usuarios() {

    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_usuarios',
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

function buscar_usuario(pid) {
    let bitacora = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/buscar_usuario_id',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            _id: pid
        }
    });

    peticion.done(function (response) {
        bitacora = response;
    });

    peticion.fail(function (response) {

    });

    return bitacora;
};

function eliminar_usuario(pid) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/eliminar_usuario',
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

function modificar_usuario(paInfoUsuario) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/modificar_usuario',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            foto_usuario: paInfoUsuario[0],
            cedula_usuario: paInfoUsuario[1],
            pNombre_usuario: paInfoUsuario[2],
            sNombre_usuario: paInfoUsuario[3],
            pApellido_usuario: paInfoUsuario[4],
            sApellido_usuario: paInfoUsuario[5],
            fecha_nacimiento_usuario: paInfoUsuario[6],
            sexo_usuario: paInfoUsuario[7],
            contrasenna_usuario: paInfoUsuario[8]
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;
};