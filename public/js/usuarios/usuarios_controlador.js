'use strict';

let botonGuardar = document.querySelector('#btnGuardar');
botonGuardar.addEventListener('click', obtenerDatos);

let botonCancelar = document.querySelector('#btnCancelar');
botonCancelar.addEventListener('click', function () {
    window.location = "../html/index.html";
    limpiarFormulario();
});

let imgPerfil = getImgUrl(getImgID());
let fotoPerfil = document.querySelector('#imgPerfil');
let inputCedula = document.querySelector('#txtCedula');
let inputPrimerNombre = document.querySelector('#txtPrimerNombre');
let inputSegundoNombre = document.querySelector('#txtSegundoNombre');
let inputPrimerApellido = document.querySelector('#txtPrimerApellido');
let inputSegundoApellido = document.querySelector('#txtSegundoApellido');
let inputCorreo = document.querySelector('#txtCorreo');
let inputFechaNacimiento = document.querySelector('#dateFechaNacimiento');
let inputSexo = document.querySelector('#txtSexo');
let inputContrasenna = document.querySelector('#txtContrasenna');
let inputConfirmacion = document.querySelector('#txtConfirmacion');

let fechaMaxima = moment(new Date());
inputFechaNacimiento.valueAsDate = fechaMaxima.subtract(18, 'years').toDate();

let sCedula = "";
let sPNombre = "";
let sSNombre = "";
let sPApellido = "";
let sSApellido = "";
let sCorreo = "";
let dFechaNacimiento = "";
let sSexo = "";
let sContrasenna = "";

if (localStorage.getItem('btnPrevio') == 'editar') {
    let infoUsuario = buscar_usuario(localStorage.getItem('idUsuario'));

    fotoPerfil.style.backgroundImage = 'url('+getImgUrl(infoUsuario['foto_usuario']) +')';
    
    inputCedula.value = infoUsuario['cedula_usuario'];
    inputPrimerNombre.value = infoUsuario['pNombre_usuario'];
    inputSegundoNombre.value = infoUsuario['sNombre_usuario'];
    inputPrimerApellido.value = infoUsuario['pApellido_usuario'];
    inputSegundoApellido.value = infoUsuario['sApellido_usuario'];
    inputCorreo.value = infoUsuario['correo_usuario'];
    inputFechaNacimiento.valueAsDate = new Date(infoUsuario['fecha_nacimiento_usuario']);
    inputSexo.value = infoUsuario['sexo_usuario'];

    // quitar el input para contrasennas

}


function obtenerDatos() {

    let paInfoUsuario = [];

    imgPerfil = getImgID();
    sCedula = inputCedula.value;
    sPNombre = inputPrimerNombre.value;
    sPApellido = inputPrimerApellido.value;
    // Validacion de segundo nombre
    if (inputSegundoNombre.value == "") {
        sSNombre = ""
    } else {
        sSNombre = inputSegundoNombre.value;
    }
    // Validacion de segundo apellido
    if (inputSegundoApellido.value == "") {
        sSApellido = ""
    } else {
        sSApellido = inputSegundoApellido.value;
    }
    sCorreo = inputCorreo.value;
    dFechaNacimiento = new Date(inputFechaNacimiento.value);
    sSexo = inputSexo.value;
    sContrasenna = inputContrasenna.value;

    let bError = false;
    bError = validarFormulario();

    if (bError) {
        swal({
            title: 'No guardado!',
            text: 'No se pudo guardar la información del usuario, verifique que completó correctamente toda la información que se le solicita',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        swal({
            title: 'Guardado',
            text: 'Información de usuario guardada correctamente',
            type: 'success',
            confirmButtonText: 'Entendido'
        });
        paInfoUsuario.push( sCedula, sPNombre, sSNombre, sPApellido, sSApellido, sCorreo, dFechaNacimiento, sSexo, sContrasenna);

        limpiarFormulario();

        $('.swal2-confirm').click(function () {

            // Si el nombre del formulario es modificar, busque el usuario.
            if (localStorage.getItem('rolUsuario') == null || localStorage.getItem('rolUsuario') == 'cliente') {
                paInfoUsuario.unshift(imgPerfil);
                registrar_usuario(paInfoUsuario);
                window.location.href = "../html/index.html";
            } else {
                if (localStorage.getItem('btnPrevio') == 'editar') {
                    paInfoUsuario.unshift(localStorage.getItem('idUsuario'));
                    modificar_usuario(paInfoUsuario);
                }else{
                    registrar_hotel(infoHotel);
                }
                window.location.href = "../html/listar-usuario.html";
            }
        });
    }

}

function validarFormulario() {

    let regexSoloLetras = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$/;
    let regexContrasenna = /^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ ]{6,}$/;
    let regexCorreo = /^[a-zA-Z0-9._~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    let regexNumeros = /^[0-9]{9,10}$/;

    let bError = false;

    sCedula = inputCedula.value;
    sPNombre = inputPrimerNombre.value;
    sPApellido = inputPrimerApellido.value;
    sSNombre = inputSegundoNombre.value;
    sSApellido = inputSegundoApellido.value;
    sCorreo = inputCorreo.value;
    dFechaNacimiento = new Date(inputFechaNacimiento.value);
    sSexo = inputSexo.value;
    sContrasenna = inputContrasenna.value;


    let arregloNombres = [];
    arregloNombres.push(inputPrimerNombre, inputSegundoNombre, inputPrimerApellido, inputSegundoApellido);

    // Validacion de solo letras para los nombres
    for (let i = 0; i < arregloNombres.length; i++) {
        if (regexSoloLetras.test(arregloNombres[i].value) == false && arregloNombres[i].value != "") {
            bError = true;
            arregloNombres[i].classList.add('errorInput');
        } else {
            arregloNombres[i].classList.remove('errorInput');
        }
    }

    let arregloInputs = document.querySelectorAll('input:required, select');

    for (let i = 0; i < arregloInputs.length; i++) {
        if (arregloInputs[i].value == "") {
            bError = true;
            arregloInputs[i].classList.add('errorInput');
        } else {
            arregloInputs[i].classList.remove('errorInput');
        }
    }


    // Validacion de solo numeros para la cedula
    if (regexNumeros.test(sCedula) == false) {
        bError = true;
        inputCedula.classList.add('errorInput');
    } else {
        inputCedula.classList.remove('errorInput');
    }

    if(regexCorreo.test(sCorreo) == false){
        bError= true;
        inputCorreo.classList.add('errorInput');
    }else{
        inputCorreo.classList.remove('erroInput');
    }

    // Validacion para la fecha
    if (dFechaNacimiento.getUTCFullYear() > fechaMaxima.year()) {
        bError = true;
        inputFechaNacimiento.classList.add('errorInput');
    } else {
        inputFechaNacimiento.classList.remove('errorInput');
    }

    // validacion contra caracteres especiales
    if (regexContrasenna.test(sContrasenna) == false) {
        bError = true;
        inputContrasenna.classList.add('errorInput');
    } else {
        inputContrasenna.classList.remove('errorInput');
    }

    // Validacion de contrasenna con su confirmacion
    let confirmacion = inputConfirmacion.value;
    if (!(sContrasenna === confirmacion)) {
        bError = true;
        inputContrasenna.classList.add('errorInput');
        inputConfirmacion.classList.add('errorInput');
    } else {
        inputConfirmacion.classList.remove('errorInput');
    }

    return bError;
}

function limpiarFormulario() {
    inputCedula.value = "";
    inputPrimerNombre.value = "";
    inputSegundoNombre.value = "";
    inputPrimerApellido.value = "";
    inputSegundoApellido.value = "";
    inputCorreo.value = "";
    inputFechaNacimiento.valueAsDate = fechaMaxima.subtract(18, 'years').toDate();
    inputSexo.value = "";
    inputContrasenna.value = "";
    inputConfirmacion.value = "";
}