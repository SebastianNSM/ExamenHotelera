'use strict';

const usuarioModel = require('./usuarios.model');
const nodemailer = require('nodemailer');
//Primero permitir el acceso de aplicaciones menos seguras: SÍ https://myaccount.google.com/lesssecureapps
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ssmdownload@gmail.com',
        pass: 'sotico12'
    }
});

let mailOptions = {
    from: 'ssmdownload@gmail.com',
    to: '',
    subject: 'Bienvenido a Hoteles Costa Rica',
    html: ''
};

module.exports.registrar_usuario = function (req, res) {
    let nuevoUsuario = new usuarioModel({

        foto_usuario: req.body.foto_usuario,
        cedula_usuario: req.body.cedula_usuario,
        pNombre_usuario: req.body.pNombre_usuario,
        sNombre_usuario: req.body.sNombre_usuario,
        pApellido_usuario: req.body.pApellido_usuario,
        sApellido_usuario: req.body.sApellido_usuario,
        correo_usuario: req.body.correo_usuario,
        fecha_nacimiento_usuario: req.body.fecha_nacimiento_usuario,
        sexo_usuario: req.body.sexo_usuario,
        contrasenna_usuario: req.body.contrasenna_usuario,
        rol_usuario: "cliente"

    })

    nuevoUsuario.save(function (error) {
        if (error) {
            res.json({ success: false, msg: 'No se pudo registrar el usuario, ocurrió el siguiente error' + error });
        } else {
            mailOptions.to = nuevoUsuario.correo_usuario;
            mailOptions.html = `
            <html>

            <head>

                <style>
                    html {
                        font-family: sans-serif;
                    }

                    #foto {
                        background-image: url('http://res.cloudinary.com/sebastiansm/image/upload/hcr.jpg');
                        background-position: center;
                        background-size: contain;
                        background-repeat: no-repeat;
                        height: 281.5px;
                        box-shadow: 0 0 3rem 0 rgba(0, 0, 0, .2);
                        width: 500px;
                        margin: 0 auto;
                    }

                    h1 {
                        border-bottom: 2px solid rgba(37, 111, 91, 0.7);
                        padding: 15px 0 15px 0;
                        text-align: center;
                        color: rgba(37, 111, 91, 0.7);
                        font-size: 1.5em;
                    }
                    p {
                        color: #2b2a2a; 
                    }
                </style>
            </head>

            <body>
                <h1>Bienvenido(a) ${nuevoUsuario.pNombre_usuario} ${nuevoUsuario.sNombre_usuario} ${nuevoUsuario.pApellido_usuario} ${nuevoUsuario.sApellido_usuario}</h1>
                <p>Ahora podrá acceder a las funcionalidades de nuestro sitio.</p>

                <div id="foto"></div>

            </body>

            </html>
            `;
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.json({ success: true, msg: 'El usuario se registró con éxito' });
        }

    });

};

module.exports.listar_usuarios = function (req, res) {
    usuarioModel.find().sort({ pNombre_usuario: 'asc' }).then(
        function (usuarios) {
            res.send(usuarios);
        }
    );
};
module.exports.buscar_usuario_id = function (req, res) {
    usuarioModel.findById({ _id: req.body._id }).then(
        function (usuario) {
            res.send(usuario);
        }
    );
};

module.exports.eliminar_usuario = function (req, res) {
    usuarioModel.findByIdAndDelete(req.body._id,
        function (err) {
            if (err) {
                res.json({ success: false, msg: 'El usuario no se ha podido eliminar. ' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'Se ha eliminado correctamente. ' + res });
            }
        });
};

module.exports.modificar_usuario = function (req, res) {
    usuarioModel.findByIdAndUpdate(req.body._id, { $set: req.body },
        function (err) {
            if (err) {
                res.json({ success: false, msg: 'El usuario no se ha podido modificar. ' + err });

            } else {
                res.json({ success: true, msg: 'Se ha actualizado correctamente. ' + res });
            }
        });
};

