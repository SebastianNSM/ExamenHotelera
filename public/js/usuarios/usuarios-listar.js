'use strict';

let inputBuscar = document.querySelector('#txtBuscar');
let usuarios = obtener_usuarios();
localStorage.removeItem('btnPrevio');


mostrarUsuarios();

inputBuscar.addEventListener('keyup', function () {
    let busqueda = inputBuscar.value;
    mostrarUsuarios(busqueda);
});

function mostrarUsuarios(paBuscar) {

    let listaUsuarios = usuarios;

    let text = document.querySelector('#noMatch');
    let table = document.querySelector('table');

    table.style.display = "table";
    text.hidden = true;

    if (!paBuscar) {
        paBuscar = '';
    }

    let tbody = document.querySelector('table tbody');
    tbody.innerHTML = '';
    for (let i = 0; i < listaUsuarios.length; i++) {

        if (listaUsuarios[i]['pNombre_usuario'].toLowerCase().includes(paBuscar.toLowerCase()) ||
            listaUsuarios[i]['sNombre_usuario'].toLowerCase().includes(paBuscar.toLowerCase()) ||
            listaUsuarios[i]['pApellido_usuario'].toLowerCase().includes(paBuscar.toLowerCase()) ||
            listaUsuarios[i]['sApellido_usuario'].toLowerCase().includes(paBuscar.toLowerCase())) {

            let fila = tbody.insertRow();

            let cFoto = fila.insertCell();
            let cNombreCompleto = fila.insertCell();
            let cCedula = fila.insertCell();
            let cFechaNacimiento = fila.insertCell();
            let cSexo = fila.insertCell();

            let url = "http://res.cloudinary.com/sebastiansm/image/upload/";
            let profileImg = document.createElement('img');
            profileImg.src = url + listaUsuarios[i]['foto_usuario'];
            cFoto.appendChild(profileImg);

            let nombreCompleto = listaUsuarios[i]['pNombre_usuario'] + ' ' + listaUsuarios[i]['sNombre_usuario'] + ' ' + listaUsuarios[i]['pApellido_usuario'] + ' ' + listaUsuarios[i]['sApellido_usuario'];
            cNombreCompleto.innerHTML = nombreCompleto;
            cCedula.innerHTML = listaUsuarios[i]['cedula_usuario'];

            let fechaCompleta = new Date(listaUsuarios[i]['fecha_nacimiento_usuario']);
            let anno = fechaCompleta.getUTCFullYear();
            let mes = fechaCompleta.getUTCMonth() + 1;
            let dia = fechaCompleta.getUTCDate();
            let stringFecha = anno + "-" + mes + "-" + dia;

            cFechaNacimiento.innerHTML = stringFecha;
            cSexo.innerHTML = listaUsuarios[i]['sexo_usuario'];
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
                btnEditar.id = listaUsuarios[i]['_id'];

                // Se guarda en el localStorage lat y lng.
                btnEditar.addEventListener('click', function () {
                    localStorage.setItem('btnPrevio', 'editar');
                    localStorage.setItem('idUsuario', this.id);
                    window.location.href = "../html/formulario-usuario.html";
                });

                // BOTON BORRAR
                // BOTON BORRAR
                // BOTON BORRAR
                let btnBorrar = document.createElement('a');
                btnBorrar.classList.add('fas');
                btnBorrar.classList.add('fa-trash-alt');

                // Se toma el id del hotel
                btnBorrar.id = listaUsuarios[i]['_id'];

                // Se guarda en el localStorage lat y lng.
                btnBorrar.addEventListener('click', function () {
                    swal({
                        title: '¿Seguro que desea eliminar este usuario?',
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Si'
                    }).then((result) => {
                        if (result.value) {
                            eliminar_usuario(this.id);
                            window.location.reload();
                        }
                    });
                });

                cOpciones.appendChild(btnEditar);
                cOpciones.appendChild(btnBorrar);
            }

        } else {
            table.style.display = "none";
            text.hidden = false;
        }
    }
};