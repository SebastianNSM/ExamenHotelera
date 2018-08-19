let lng = -84.087502;
let lat = 9.934739;



function setLat(latitud) {
    lat = latitud
}
function setLng(longitud) {
    lng = longitud;
}

function initMap() {

    //configuracion del mapa (tendra zoom de 7) y se centrara en la posicion guardada
    let opciones = {
        zoom: 7,
        center: { lat: 9.934739, lng: -84.087502 }
    }

    //Creacion de mapa
    let mapa = new google.maps.Map(document.getElementById('mapa'), opciones);
    //Marker (la posicion del marker es la misma posicion que donde se centra el mapa y hace que el marker sea arrastrable)
    let markerMapa = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: mapa,
        draggable: true,
        icon: '../img/palm-tree.png',
        animation: google.maps.Animation.DROP
    });

    //event listener que cuando el marker se mueva, guarde la latitud y longitud en el localstorage//en su caso en la base de datos
    google.maps.event.addListener(markerMapa, 'dragend', function () {
        latitudHotel = markerMapa.getPosition().lat();
        longitudHotel = markerMapa.getPosition().lng();
        localStorage.setItem('latitudHotel', latitudHotel);
        localStorage.setItem('longitudHotel', longitudHotel);
    });
}

function centerMap() {
    map.setCenter({lat: 9.934739, lng: -84.087502});
}
