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

let imgPerfil = getImgUrl(getImgID());
let inputCedula = document.querySelector('#txtCedula');
let inputPrimerNombre = document.querySelector('#txtPrimerNombre');
let inputSegundoNombre = document.querySelector('#txtSegundoNombre');
let inputPrimerApellido = document.querySelector('#txtPrimerApellido');
let inputSegundoApellido = document.querySelector('#txtSegundoApellido');
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
let dFechaNacimiento = "";
let sSexo = "";
let sContrasenna = "";

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
        paInfoUsuario.push(imgPerfil, sCedula, sPNombre, sSNombre, sPApellido, sSApellido, dFechaNacimiento, sSexo, sContrasenna);

        // Si el nombre del formulario es modificar, busque el usuario.

        registrar_usuario(paInfoUsuario);
        limpiarFormulario();

        $('.swal2-confirm').click(function () {
            if (localStorage.getItem('rolActual') == 'administrador') {
                window.location = "../html/listar-usuario.html";
            }
            else {

            }
        });
    }

}

function validarFormulario() {

    let regexNumeros = /^[0-9]{9,10}$/;

    let bError = false;

    sCedula = inputCedula.value;
    sPNombre = inputPrimerNombre.value;
    sPApellido = inputPrimerApellido.value;
    sSNombre = inputSegundoNombre.value;
    sSApellido = inputSegundoApellido.value;
    dFechaNacimiento = new Date(inputFechaNacimiento.value);
    sSexo = inputSexo.value;

    let arregloInputs = document.querySelectorAll('input:required, select');

    for (let i = 0; i < arregloInputs.length; i++) {
        if (arregloInputs[i].value == "") {
            bError = true;
            arregloInputs[i].classList.add('errorInput');
        } else {
            arregloInputs[i].classList.remove('errorInput');
        }
    }

    if (regexNumeros.test(sCedula) == false) {
        bError = true;
        inputCedula.classList.add('errorInput');
    } else {
        inputCedula.classList.remove('errorInput');
    }

    // Validacion de contrasenna con su confirmacion
    let contrasenna = inputContrasenna.value;
    let confirmacion = inputConfirmacion.value;
    if (!(contrasenna === confirmacion)) {
        bError = true;
        inputContrasenna.classList.add('errorInput');
        inputConfirmacion.classList.add('errorInput');
    } else {
        inputContrasenna.classList.remove('errorInput');
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
    inputFechaNacimiento.valueAsDate = fechaMaxima.subtract(18, 'years').toDate();
    inputSexo.value = "";
    inputContrasenna.value = "";
    inputConfirmacion.value = "";
}