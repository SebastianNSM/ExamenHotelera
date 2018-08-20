'use strict';
let ppDetalles = document.querySelector('#sct_detalles');
let ppCalificar = document.querySelector('#sct_ranking');
let inputBuscar = document.querySelector('#txtBuscar');
let inputLat = document.querySelector('#lat');
let inputLng = document.querySelector('#lng');
let hoteles = obtener_hoteles();
localStorage.removeItem('btnPrevio');
localStorage.removeItem('idHotel');

mostrarHoteles();

inputBuscar.addEventListener('keyup', function () {
    let busqueda = inputBuscar.value;
    mostrarHoteles(busqueda);
});

function calcularEstrellasUsuario() {
    let arregloSltEstrellas = document.querySelectorAll('input[type="radio"]:checked');
    let value = 0;
    for (let i = 0; i < arregloSltEstrellas.length; i++) {
        value += Number(arregloSltEstrellas[i].value);
    }
    value /= 5;
    value = Math.trunc(value);
    return value;
}

function calcularEstrellasTotalesHotel(_id) {
    let hotel = buscar_hotel(_id);
    let estrellas = 0;
    for (let i = 0; i < hotel['rank'].length; i++) {
        estrellas += hotel['rank'][i]['promedio_rank'];
    }
    estrellas = estrellas / hotel['rank'].length;
    return estrellas;
}

function mostrarEstrellas(cantEstrellas, parent) {
    for (let i = 0; i < cantEstrellas; i++) {
        let estrella = document.createElement('span');
        estrella.classList.add('fas');
        estrella.classList.add('fa-star');
        parent.appendChild(estrella);
    }
}

function mostrarHoteles(paBuscar) {

    let listaHoteles = hoteles;
    let text = document.querySelector('#noMatch');
    let table = document.querySelector('table');

    table.style.display = "table";
    text.hidden = true;

    if (!paBuscar) {
        paBuscar = '';
    }

    let tbody = document.querySelector('table tbody');
    tbody.innerHTML = '';
    for (let i = 0; i < listaHoteles.length; i++) {
        if (listaHoteles[i]['nombre'].toLowerCase().includes(paBuscar.toLowerCase()) ||
            listaHoteles[i]['provincia'].toLowerCase().includes(paBuscar.toLowerCase()) ||
            listaHoteles[i]['canton'].toLowerCase().includes(paBuscar.toLowerCase()) ||
            listaHoteles[i]['distrito'].toLowerCase().includes(paBuscar.toLowerCase())) {
            let fila = tbody.insertRow();

            let cNombre = fila.insertCell();
            let cDireccion = fila.insertCell();
            let cCalificar = fila.insertCell();
            let cRanking = fila.insertCell();
            let cDetalles = fila.insertCell();
            let cEstado = fila.insertCell();

            cNombre.innerHTML = listaHoteles[i]['nombre'];
            cDireccion.innerHTML = listaHoteles[i]['provincia'] + ', ' + listaHoteles[i]['canton'] + ', ' + listaHoteles[i]['distrito'];
            if (listaHoteles[i]['estrellas'] == 0) {
                cRanking.innerHTML = '-';
            } else {
                mostrarEstrellas(listaHoteles[i]['estrellas'], cRanking);
            }

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
            let sello = document.createElement('span');
            sello.classList.add('fas');
            sello.classList.add('fa-certificate');

            btnCalificar.addEventListener('click', function () {
                ppCalificar.style.display = 'block';
                let guardarCalif = document.querySelector('#btnCalificar');
                guardarCalif.addEventListener('click', function () {
                    let estrellasUsuario = calcularEstrellasUsuario();
                    registrar_ranking(listaHoteles[i]['_id'], estrellasUsuario);

                    let estrellasTotales = calcularEstrellasTotalesHotel(listaHoteles[i]['_id'])
                    actualizarRanking(listaHoteles[i]['_id'], estrellasTotales);
                    window.location.reload();
                });
            });
            btnCalificar.appendChild(sello);
            cCalificar.appendChild(btnCalificar);

            if (rolActual == 'administrador') {
                let thOpciones = document.querySelector('#cOpcionesTh');
                thOpciones.hidden = false;
                let cOpciones = fila.insertCell();

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
                    localStorage.setItem('btnPrevio', 'editar');
                    localStorage.setItem('idHotel', this.id);
                    window.location.href = "../html/hoteles-registrar.html";
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
                    swal({
                        title: '¿Seguro que desea activar este hotel?',
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Si'
                    }).then((result) => {
                        if (result.value) {
                            activar_hotel(this.id);
                            window.location.reload();
                        }
                    });
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
                    swal({
                        title: '¿Seguro que desea inactivar este hotel?',
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Si'
                    }).then((result) => {
                        if (result.value) {
                            inactivar_hotel(this.id);
                            window.location.reload();
                        }
                    });
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
                    swal({
                        title: '¿Seguro que desea eliminar este hotel?',
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Si'
                    }).then((result) => {
                        if (result.value) {
                            eliminar_hotel(this.id);
                            window.location.reload();
                        }
                    });
                });

                cOpciones.appendChild(btnActivar);
                cOpciones.appendChild(btnInactivar);
                cOpciones.appendChild(btnEditar);
                cOpciones.appendChild(btnBorrar);
            }
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