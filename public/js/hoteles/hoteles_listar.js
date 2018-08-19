'use strict';
let ppDetalles = document.querySelector('#sct_detalles');
let ppCalificar = document.querySelector('#sct_ranking');
let inputLat = document.querySelector('#lat');
let inputLng = document.querySelector('#lng');
mostrarHoteles();

function calcularEstrellas() {
    let arregloSltEstrellas = document.querySelectorAll('input[type="radio"]:checked');
    let value = 0;
    for(let i =0;i<arregloSltEstrellas.length;i++){
        value += Number(arregloSltEstrellas[i].value);
    }
    value /= 5;
    value = Math.trunc(value);
    console.log(value);
    return value;
}

function mostrarHoteles(paBuscar) {

    if (!paBuscar) {
        paBuscar = '';
    }
    let listaHoteles = obtener_hoteles();
    let tbody = document.querySelector('table tbody');
    tbody.innerHTML = '';
    for (let i = 0; i < listaHoteles.length; i++) {
        if (listaHoteles[i]['nombre'].toLowerCase().includes(paBuscar.toLowerCase())) {
            let fila = tbody.insertRow();

            let cNombre = fila.insertCell();
            let cDireccion = fila.insertCell();
            let cCalificar = fila.insertCell();
            let cRanking = fila.insertCell();
            let cDetalles = fila.insertCell();
            let cEstado = fila.insertCell();
            let cOpciones = fila.insertCell();

            cNombre.innerHTML = listaHoteles[i]['nombre'];
            cDireccion.innerHTML = listaHoteles[i]['provincia'] + ', ' + listaHoteles[i]['canton'] + ', ' + listaHoteles[i]['distrito'];
            cRanking.innerHTML = '';
            cDetalles.innerHTML = '';
            cEstado.innerHTML = listaHoteles[i]['estado'];

            // Boton de detalles (mapa, direccion exacta y contacto)
            let btnDetalles = document.createElement('a');
            btnDetalles.name = "btnTabla";
            let libro = document.createElement('span');
            libro.classList.add('fas');
            libro.classList.add('fa-book');

            btnDetalles.dataset._id = listaHoteles[i]['_id'];

            btnDetalles.addEventListener('click', function () {
                ppDetalles.style.display = 'block';

                let inputLat = document.querySelector('#lat');
                let inputLng = document.querySelector('#lng');
                inputLat.value = listaHoteles[i]['latitud'];
                inputLng.value = listaHoteles[i]['longitud'];
                initMap();

                // Esto genera la location escrita
                let locationEscrita = document.querySelector('#locationEscrita');
                locationEscrita.innerHTML = "";
                locationEscrita.innerHTML = listaHoteles[i]['direccion'];

                // Esto genera el correo de servicio
                let contacto = document.querySelector('.contacto');
                contacto.innerHTML = '';
                contacto.appendChild(createH1('Correo de servicio:'));
                contacto.appendChild(createH1(listaHoteles[i]['correo_servicio']));
                contacto.appendChild(createH1('Correo para reservaciones:'));
                contacto.appendChild(createH1(listaHoteles[i]['correo_reservacion']));
                contacto.appendChild(createH1('Teléfono de servicio:'));
                contacto.appendChild(createH1(listaHoteles[i]['telefono_servicio']));
                contacto.appendChild(createH1('Teléfono para reservaciones:'));
                contacto.appendChild(createH1(listaHoteles[i]['telefono_reservacion']));

            });

            btnDetalles.appendChild(libro);
            cDetalles.appendChild(btnDetalles);

            // Boton de ranking
            let btnCalificar = document.createElement('a');
            btnCalificar.name = "btnTabla";

            btnCalificar.addEventListener('click', function () {
                ppCalificar.style.display = 'block';
                let btnCalificar = document.querySelector('#btnCalificar');
                btnCalificar.addEventListener('click',calcularEstrellas);
            });
            cCalificar.appendChild(btnCalificar);
            // BOTON EDITAR
            // BOTON EDITAR
            // BOTON EDITAR
            let btnEditar = document.createElement('a');
            btnEditar.classList.add('far');
            btnEditar.classList.add('fa-edit');

            // Se toma el id del hotel
            btnEditar.id = listaHoteles[i]['_id'];

            // Se guarda en el localStorage lat y lng.
            btnEditar.addEventListener('click', function () {

            });

            // BOTON ACTIVAR
            // BOTON ACTIVAR
            // BOTON ACTIVAR
            let btnActivar = document.createElement('a');
            btnActivar.classList.add('fas');
            btnActivar.classList.add('fa-check-circle');
            // Se toma el id del hotel
            btnActivar.id = listaHoteles[i]['_id'];

            // Se guarda en el localStorage lat y lng.
            btnActivar.addEventListener('click', function () {

            });

            // BOTON INACTIVAR
            // BOTON INACTIVAR
            // BOTON INACTIVAR
            let btnInactivar = document.createElement('a');
            btnInactivar.classList.add('fas');
            btnInactivar.classList.add('fa-times-circle');

            // Se toma el id del hotel
            btnInactivar.id = listaHoteles[i]['_id'];

            // Se guarda en el localStorage lat y lng.
            btnInactivar.addEventListener('click', function () {

            });

            // BOTON BORRAR
            // BOTON BORRAR
            // BOTON BORRAR
            let btnBorrar = document.createElement('a');
            btnBorrar.classList.add('fas');
            btnBorrar.classList.add('fa-trash-alt');

            // Se toma el id del hotel
            btnBorrar.id = listaHoteles[i]['_id'];

            // Se guarda en el localStorage lat y lng.
            btnBorrar.addEventListener('click', function () {

            });

            cOpciones.appendChild(btnActivar);
            cOpciones.appendChild(btnInactivar);
            cOpciones.appendChild(btnEditar);
            cOpciones.appendChild(btnBorrar);
        }
    };
};

function verRanking() {
    let hotelId = this.dataset._id;
    let infoHotel = buscar_hotel(hotelId);
    console.log(infoHotel);
}

window.onclick = function (event) {
    if (event.target == ppDetalles) {
        ppDetalles.style.display = "none";
        inputLat.value = 0;
        inputLng.value = 0;
    }
    if (event.target == ppCalificar) {
        ppCalificar.style.display = "none";
    }
}

function createH1(text) {
    let element = document.createElement('h1');
    element.innerHTML = text;
    return element;
}