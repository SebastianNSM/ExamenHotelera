'use strict';

let windowLocation = window.location.href;

// Inicio iniciar sesion
let inputCedula = document.querySelector('#txtCedula');
let inputContrasenna = document.querySelector('#txtContrasenna');
let botonIngresar = document.querySelector('#btnIngresar');
botonIngresar.addEventListener('click', obtenerDatosInicio);

let sCedula = "";
let sContrasenna = "";

function obtenerDatosInicio() {
    localStorage.clear();
    sCedula = inputCedula.value;
    sContrasenna = inputContrasenna.value;

    // validar pequenno
    if (sCedula == "") {
        inputCedula.classList.add('errorInput');
    } else {
        inputCedula.classList.remove('errorInput');
    }
    if (sContrasenna == "") {
        inputContrasenna.classList.add('errorInput');
    } else {
        inputContrasenna.classList.remove('errorInput');
    }
    // validar pequenno

    let bError = false;
    bError = verificarCredenciales(sCedula, sContrasenna);
    if (bError) {
        swal({
            title: 'No se pudo iniciar sesión',
            text: 'Verifique que la cédula y la contraseña estén bien escritas',
            type: 'warning',
            confirmButtonText: 'Entendido'
        });
    } else {
        popup.style.display = "none";
        inputContrasenna.value = "";
        inputCedula.value = "";
        inputCedula.classList.remove('errorInput');
        inputContrasenna.classList.remove('errorInput');
        changeButtons();
        window.location.reload();
    }
}

function verificarCredenciales(sCedula, sContrasenna) {

    let listaUsuarios = obtener_usuarios();

    let bError = true;
    for (let i = 0; i < listaUsuarios.length; i++) {
        if (sCedula == listaUsuarios[i]['cedula_usuario']) {
            if (sContrasenna == listaUsuarios[i]['contrasenna_usuario']) {

                let nombreCompleto = listaUsuarios[i]['pNombre_usuario']+' '+listaUsuarios[i]['sNombre_usuario']+' '+listaUsuarios[i]['pApellido_usuario']+' '+listaUsuarios[i]['sApellido_usuario'];
                localStorage.setItem('idUsuario', listaUsuarios[i]['_id']);
                localStorage.setItem('rolUsuario', listaUsuarios[i]['rol_usuario']);
                localStorage.setItem('nombreCompletoUsuario', nombreCompleto);


                inputContrasenna.classList.remove('errorInput');
                bError = false;
                break;
            }
        }
    }
    return bError;
}

// Contrasenna visible o no
let botonVer = document.querySelector('#btnVerContrasenna');
botonVer.addEventListener('click', function () {
    let isOpen = botonVer.classList.contains('fa-eye');
    if (isOpen) {
        botonVer.classList.remove('fa-eye');
        botonVer.classList.add('fa-eye-slash');
        inputContrasenna.type = 'password';
    } else {
        botonVer.classList.remove('fa-eye-slash');
        botonVer.classList.add('fa-eye');
        inputContrasenna.type = 'text';
    }
});

// Fin iniciar sesion

// Inicio formulario
let popup = document.querySelector('.popup-bg');
let botonIniciar = document.querySelector('#btnIniciar');
botonIniciar.addEventListener('click', function () {
    popup.style.display = "block";
});

// Esto es para que se salga del formulario si toca fuera del contenido
window.onclick = function (event) {
    if (event.target == popup) {
        popup.style.display = "none";
        inputContrasenna.value = "";
        inputCedula.value = "";
        inputCedula.classList.remove('errorInput');
        inputContrasenna.classList.remove('errorInput');
    }
}
// Esto es para que despliegue el formulario