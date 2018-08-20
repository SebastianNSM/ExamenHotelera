'use strict';

let botonGuardar = document.querySelector('#btnGuardar');
botonGuardar.addEventListener('click', obtenerDatos);

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
        // Si el nombre del formulario es modificar, busque el usuario.

        $('.swal2-confirm').click(function () {
            infoHotel.push(sNombre, lat, lng, sProvincia, sCanton, sDistrito, sUbicacion, telCliente, crrCliente, telRes, crrRes);
            registrar_hotel(infoHotel);
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

    if(regexSoloLetras.test(sNombre) == false){
        bError = true;
        inputNombre.classList.add('errorInput');
    }else{
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
    if(regexNumeros.test(telCliente) == false){
        bError = true;
        inputTelCliente.classList.add('errorInput');
    }else{
        inputTelCliente.classList.remove('errorInput');
    }
    if(regexNumeros.test(telRes) == false){
        bError = true;
        inputTelRes.classList.add('errorInput');
    }else{
        inputTelRes.classList.remove('errorInput');
    }

    return bError;
}

function limpiarFormulario() {
    window.location.reload();
}