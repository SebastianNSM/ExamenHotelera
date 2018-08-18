'use strict';

let imgID = 'user';
let imgForm = document.querySelector('#imgPerfil')

imgHtml(imgID);

$(function () {
    // Configure Cloudinary
    // with credentials available on
    // your Cloudinary account dashboard
    $.cloudinary.config({ cloud_name: 'sebastiansm', api_key: '973889298942642' });

    // Upload button
    let uploadButton = $('#btnSubirFoto');

    // Upload button event
    uploadButton.on('click', function (e) {
        // Initiate upload
        cloudinary.openUploadWidget({ cloud_name: 'sebastiansm', upload_preset: 'pokemonCloudSSM' },
            function (error, result) {
                if (error) console.log(error);
                // If NO error, log image data to console
                let id = result[0].public_id;

                // Esto guarda el id en una variable global
                imgID = id;
                console.log(id);
                console.log(getImgUrl(imgID));
                imgHtml(imgID);

                return getImgUrl(imgID);
            });
    });
})
// Toma el url de la imagen
function getImgUrl(id) {
    let url = "http://res.cloudinary.com/sebastiansm/image/upload/";
    let imgUrl = url + id;

    return imgUrl;
}
// Mete el url y se lo mete a la imagen del html
function imgHtml(id) {
    imgForm.style.backgroundImage = "url("+getImgUrl(id)+")";
}
function getImgID(){
    return imgID
}
function resetImg(){
   imgHtml('user');
}
