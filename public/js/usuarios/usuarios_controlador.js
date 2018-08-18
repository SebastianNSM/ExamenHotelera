'use strict';

let botonGuardar = document.querySelector('#btnGuardar');
botonGuardar.addEventListener('click', obtenerDatos);

let botonCancelar = document.querySelector('#btnCancelar');
botonCancelar.addEventListener('click', function(){
    window.location = "../html/index.html";
    limpiarFormulario();
});

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


if(localStorage.getItem('formActual') == 'modificar'){
    inputCedula.disabled = true;
    inputConfirmacion.hidden = true;
}

function obtenerDatos() {

    let paInfoUsuario = [];

    imgPerfil = getImgID();
    sCedula = inputCedula.value;
    sPNombre = inputPrimerNombre.value;
    sPApellido = inputPrimerApellido.value;
    // Validacion de segundo nombre
    if(inputSegundoNombre.value == ""){
        sSNombre = ""
    }else{
        sSNombre = inputSegundoNombre.value;
    }
    // Validacion de segundo apellido
    if(inputSegundoApellido.value == ""){
        sSApellido = ""
    }else{
        sSApellido = inputSegundoApellido.value;
    }
    dFechaNacimiento = new Date(inputFechaNacimiento.value);
    sSexo = inputSexo.value;

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
            text: 'Información de usuario ha sido guardada correctamente',
            type: 'success',
            confirmButtonText: 'Entendido'
        });
        paInfoUsuario.push(imgPerfil,sCedula,sPNombre,sSNombre,sPApellido,sSApellido,dFechaNacimiento,sSexo,sContrasenna);
        $('.swal2-confirm').click(function () {
            if(localStorage.getItem('rolActual') == 'administrador'){
                window.location = "../html/listar-usuario.html";
            }
            else{
                window.location = "../html/index.html";
            }
        });
    }

    console.log(paInfoUsuario);
        modificar_usuario(paInfoUsuario);
        registrar_usuario(paInfoUsuario);

}

function validarFormulario() {

    sCedula = inputCedula.value;
    sPNombre = inputPrimerNombre.value;
    sPApellido = inputPrimerApellido.value;
    // Validacion de segundo nombre
    if(inputSegundoNombre.value == ""){
        sSNombre = ""
    }else{
        sSNombre = inputSegundoNombre.value;
    }
    // Validacion de segundo apellido
    if(inputSegundoApellido.value == ""){
        sSApellido = ""
    }else{
        sSApellido = inputSegundoApellido.value;
    }
    dFechaNacimiento = new Date(inputFechaNacimiento.value);
    sSexo = inputSexo.value;

    let arregloInputs = document.querySelectorAll('input:required');
}

function limpiarFormulario() {
    inputCedula.value = "";
    inputPrimerNombre.value = "";
    inputSegundoNombre.value = "";
    inputPrimerApellido.value = "";
    inputSegundoApellido.value = "";
    inputFechaNacimiento.value = "";
    inputSexo.value = "";
    inputContrasenna.value = "";
    inputConfirmacion.value = "";
}