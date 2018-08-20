'use strict';

let botonGuardar = document.querySelector('#btnGuardar');
botonGuardar.addEventListener('click',obtenerDatos);

let inputNombre = document.querySelector('#txtNombre');
let inputUbicacion = document.querySelector('#txtUbicacionEscrita');
let selectProvincia = document.querySelector('#sltProvincia');
let selectCanton = document.querySelector('#sltCanton');
let selectDistrito = document.querySelector('#sltDistrito');
let inputTelCliente = document.querySelector('#txtTelCliente');
let inputCorreoCliente = document.querySelector('#txtCorreoCliente');
let inputTelRes = document.querySelector('#txtTelRes');
let inputCorreoRes = document.querySelector('#txtCorreoRes');

let sNombre = "";
let sUbicacion = "";
let sProvincia = "";
let sCanton = "";
let sDistrito = "";
let telCliente = "";
let crrCliente = "";
let telRes = "";
let crrRes = "";

if (localStorage.getItem('btnPrevio') == 'editar') {
    let infoHotel = buscar_hotel(localStorage.getItem('idHotel'));

    // Sets the map to the saves position
    let inputLat = document.querySelector('#lat');
    let inputLng = document.querySelector('#lng');
    inputLat.value = infoHotel['latitud'];
    inputLng.value = infoHotel['longitud'];

    inputNombre.value = infoHotel['nombre'];
    inputUbicacion.value = infoHotel['direccion'];

    if (selectProvincia.value === "San José" || selectProvincia.value == "") {
        buscarIndex(selectProvincia, infoHotel['provincia']);
    }
    if (selectCanton.value == "") {
        buscarIndex(selectCanton, infoHotel['canton']);
    }
    if (selectDistrito.value == "") {
        buscarIndex(selectDistrito, infoHotel['distrito']);
    }
    inputTelCliente.value = infoHotel['telefono_servicio'];
    inputCorreoCliente.value = infoHotel['correo_servicio'];
    inputTelRes.value = infoHotel['telefono_reservacion'];
    inputCorreoRes.value = infoHotel['correo_reservacion'];
}

function buscarIndex(select, compare) {
    for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value === compare) {
            $('select option:eq('+i+')').prop('selected', true);
        }
    }

}

function obtenerDatos() {

    let infoHotel = [];

    sNombre = inputNombre.value;
    let lat = localStorage.getItem('latitudHotel');
    let lng = localStorage.getItem('longitudHotel');
    sUbicacion = inputUbicacion.value;
    sProvincia = selectProvincia.value;
    sCanton = selectCanton.value;
    sDistrito = selectDistrito.value;
    telCliente = inputTelCliente.value;
    crrCliente = inputCorreoCliente.value;
    telRes = inputTelRes.value;
    crrRes = inputCorreoRes.value;

    let bError = false;
    bError = validarFormulario();

    if (bError) {
        swal({
            title: 'No guardado!',
            text: 'No se pudo guardar la información del hotel, verifique que completó correctamente toda la información que se le solicita',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        swal({
            title: 'Guardado',
            text: 'Información del hotel guardada correctamente',
            type: 'success',
            confirmButtonText: 'Entendido'
        });
        // Si el nombre del formulario es modificar, busque el usuario.

        $('.swal2-confirm').click(function () {
            infoHotel.push(sNombre, lat, lng, sProvincia, sCanton, sDistrito, sUbicacion, telCliente, crrCliente, telRes, crrRes);
            if (localStorage.getItem('btnPrevio') == 'editar') {
                infoHotel.unshift(localStorage.getItem('idHotel'));
                modificar_hotel(infoHotel);
            }else{
                registrar_hotel(infoHotel);
            }
            
            
            // limpiarFormulario();
            window.location.href = "../html/hoteles-listar.html";
        });
    }
}

function validarFormulario() {

    let regexSoloLetras = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/;
    let regexCorreo = /^[a-zA-Z0-9._~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    let regexNumeros = /^[0-9]{8}$/;

    let bError = false;

    sNombre = inputNombre.value;
    sUbicacion = inputUbicacion.value;
    sProvincia = selectProvincia.value;
    sCanton = selectCanton.value;
    sDistrito = selectDistrito.value;
    telCliente = inputTelCliente.value;
    crrCliente = inputCorreoCliente.value;
    telRes = inputTelRes.value;
    crrRes = inputCorreoRes.value;

    let arregloInputs = document.querySelectorAll('input:required, select');

    for (let i = 0; i < arregloInputs.length; i++) {
        if (arregloInputs[i].value == "") {
            bError = true;
            arregloInputs[i].classList.add('errorInput');
        } else {
            arregloInputs[i].classList.remove('errorInput');
        }
    }

    if (regexSoloLetras.test(sNombre) == false) {
        bError = true;
        inputNombre.classList.add('errorInput');
    } else {
        inputNombre.classList.remove('errorInput');
    }

    // Validacion de correos
    if (regexCorreo.test(crrCliente) == false) {
        bError = true;
        inputCorreoCliente.classList.add('errorInput');
    } else {
        inputCorreoCliente.classList.remove('erroInput');
    }
    if (regexCorreo.test(crrRes) == false) {
        bError = true;
        inputCorreoRes.classList.add('errorInput');
    } else {
        inputCorreoRes.classList.remove('erroInput');
    }

    // Validacion de telefonos
    if (regexNumeros.test(telCliente) == false) {
        bError = true;
        inputTelCliente.classList.add('errorInput');
    } else {
        inputTelCliente.classList.remove('errorInput');
    }
    if (regexNumeros.test(telRes) == false) {
        bError = true;
        inputTelRes.classList.add('errorInput');
    } else {
        inputTelRes.classList.remove('errorInput');
    }

    return bError;
}

function limpiarFormulario() {
    window.location.reload();
}