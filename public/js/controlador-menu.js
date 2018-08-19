'use strict';
let rolActual = localStorage.getItem('rolUsuario');
changeButtons();

// Para menu Opciones
$('#menuHotel').click(function () {
    if ($('#optHoteles').css('display') === 'none') {
        $('#optHoteles').slideDown('250');
    }
});
$('#optHoteles, header nav ul, header nav>div').mouseleave(function () {
    $('#optHoteles').slideUp('250');
});

// Para menu reportes
$('#menuClientes').click(function () {
    if ($('#optClientes').css('display') === 'none') {
        $('#optClientes').slideDown('250');
    }
});
$('#optClientes, header nav ul, header nav>div').mouseleave(function () {
    $('#optClientes').slideUp('250');
});

function changeButtons() {
    let botonCerrar = document.querySelector('#btnCerrar');
    if (localStorage.getItem('idUsuario') != null) {
        document.querySelector('#btnRegistrarse').hidden = true;
        menuRol();
        leerRolOpciones();
        document.querySelector('#btnIniciar').hidden = true;
        botonCerrar.hidden = false;
        botonCerrar.addEventListener('click', cerrarSesion);
    } else {
        document.querySelector('#btnRegistrarse').hidden = false;
        document.querySelector('#btnIniciar').hidden = false;
        botonCerrar.hidden = true;
    }
    if(window.location.pathname.includes("index.html")){
        document.querySelector('#actividades').hidden = false;
    }else{
        document.querySelector('#actividades').hidden = true;
    }

    if (window.location.pathname.includes("formulario-usuario.html")){
        document.querySelector('#btnRegistrarse').hidden = true;
        document.querySelector('.sesion').hidden = true;
    }
}

function menuRol() {
    let menuClientes = document.querySelector('#menuClientes');
    let menuHotel = document.querySelector('#menuHotel');
    switch (localStorage.getItem('rolUsuario')) {
        case 'administrador':
            menuHotel.hidden = false;
            menuClientes.hidden = false;
            break;
        case 'cliente':
            menuHotel.hidden = false;
            menuClientes.hidden = true;
            break;
    }
}

// Desplegar el boton de opciones con las opciones que correopnden
function leerRolOpciones() {
    let optRegistrarHotel = ['Registrar Hoteles', '../html/hoteles-registrar.html'];
    let optListarHotel = ['Listar Hoteles', '../html/hoteles-listar.html'];
    let optRegistrarUsuario = ['Registrar Usuario', '../html/formulario-usuario.html'];
    let optListarUsuario = ['Listar Usuario', '../html/listar-usuario.html'];

    let opcionesHotelesAdministrador = [];
    opcionesHotelesAdministrador.push(optRegistrarHotel, optListarHotel);
    let opcionesUsuariosAdministrador = [];
    opcionesUsuariosAdministrador.push(optRegistrarUsuario, optListarUsuario);

    let opcionesHotelesCliente = [];
    opcionesHotelesCliente.push(optListarHotel);

    switch (rolActual) {
        case 'administrador':
            imprimirOpcionesHoteles(opcionesHotelesAdministrador);
            imprimirOpcionesClientes(opcionesUsuariosAdministrador);
            break;
        case 'cliente':
            imprimirOpcionesHoteles(opcionesHotelesCliente);
            break;
    }
}

function imprimirOpcionesHoteles(paOpciones) {
    let menu = document.querySelector('#optHoteles ul');
    for (let i = 0; i < paOpciones.length; i++) {
        let newLi = document.createElement('li');
        let newA = document.createElement('a');
        newA.href = paOpciones[i][1];
        newA.textContent = paOpciones[i][0];
        newLi.appendChild(newA);
        menu.appendChild(newLi);
    }
}
function imprimirOpcionesClientes(paOpciones) {
    let menu = document.querySelector('#optClientes ul');
    for (let i = 0; i < paOpciones.length; i++) {
        let newLi = document.createElement('li');
        let newA = document.createElement('a');
        newA.href = paOpciones[i][1];
        newA.textContent = paOpciones[i][0];
        newLi.appendChild(newA);
        menu.appendChild(newLi);
    }
}

function cerrarSesion() {
    swal({
        title: '¿Seguro que desea cerrar sesión?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
    }).then((result) => {
        if (result.value) {
            window.localStorage.clear();
            document.querySelector('#btnIniciar').hidden = false;
            document.querySelector('#btnCerrar').hidden = true;
            window.location.href = "../html/index.html";
            changeButtons();
        }
    });
}