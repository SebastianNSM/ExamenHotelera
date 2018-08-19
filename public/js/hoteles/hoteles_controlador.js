'use strict';

let botonGuardar = document.querySelector('#btnGuardar');
botonGuardar.addEventListener('click', obtenerDatos);

let botonCancelar = document.querySelector('#btnCancelar');
botonCancelar.addEventListener('click', function () {
    window.location = "../html/index.html";
    limpiarFormulario();
});

let form = document.querySelector('div.text-box-content');
// form.name = modificar
if (form.name == 'modificar') {
    inputCedula.disabled = true;
    inputConfirmacion.hidden = true;
}

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
        infoHotel.push(sNombre, lat, lng, sProvincia, sCanton, sDistrito, sUbicacion, telCliente, crrCliente, telRes, crrRes);

        // Si el nombre del formulario es modificar, busque el usuario.


        // limpiarFormulario();

        $('.swal2-confirm').click(function () {
            registrar_hotel(infoHotel);
        });
    }
}

function validarFormulario() {
    let bError = false;
    let arregloInputs = document.querySelectorAll('input:required, select');

    for (let i = 0; i < arregloInputs.length; i++) {
        if (arregloInputs[i].value == "") {
            bError = true;
            arregloInputs[i].classList.add('errorInput');
        } else {
            arregloInputs[i].classList.remove('errorInput');
        }
    }
    return bError;
}

function limpiarFormulario() {
    window.location.reload();
}