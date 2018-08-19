'use strict';
mostrarHoteles();

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
            let cProvincia = fila.insertCell();
            let cCanton = fila.insertCell();
            let cDistrito = fila.insertCell();
            let cMapa = fila.insertCell();
            let cContacto = fila.insertCell();
            let cEstado = fila.insertCell();
            let cOpciones = fila.insertCell();

            cNombre.innerHTML = listaHoteles[i]['nombre'];
            cDireccion.innerHTML = listaHoteles[i]['direccion'];
            cProvincia.innerHTML = listaHoteles[i]['provincia'];
            cCanton.innerHTML = listaHoteles[i]['canton'];
            cDistrito.innerHTML = listaHoteles[i]['distrito'];
            cMapa.innerHTML = '-';
            cContacto.innerHTML = '-';
            cEstado.innerHTML = listaHoteles[i]['estado'];

            let btnEditar = document.createElement('a');
            btnEditar.classList.add('far');
            btnEditar.classList.add('fa-edit');

            // Se toma el id del hotel
            btnEditar.id = listaHoteles[i]['_id'];

            // Se guarda en el localStorage lat y lng.
            btnEditar.addEventListener('click', function () {
                localStorage.setItem('lat', listaHoteles[i]['latitud']);
                localStorage.setItem('lng', listaHoteles[i]['longitud']);

                console.log("lat = '"+ localStorage.getItem('lat') +"'");
                console.log("lng = '"+ localStorage.getItem('lng') +"'");
            });

            cOpciones.appendChild(btnEditar);
        }
    };
};
