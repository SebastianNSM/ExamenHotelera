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


function obtenerDatos(){

    let bError = false;
    bError = validarFormulario();
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