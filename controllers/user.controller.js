const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');

exports.getLogin = async (req, res, next) => {
    try {
        const error = req.session.error || '';

        req.session.error = null;
        res.render('login', {
            name: req.session.name,
            error: error,
            registrar: false,
            username: req.session.username
        });
    } catch(error){
        console.log(error);
    }
}

exports.postLogin = async (req, res, next) => {
    try {
        Usuario.validarUsuario(req.body.username)
        .then(([users, fieldData]) => {
            // console.log(users);
            if(users.length == 1){
                const user = users[0];
                // console.log(user);
                bcrypt.compare(req.body.contrasena, user.contrasena)
                .then(doMatch => {
                    if (doMatch){
                        Usuario.getPermisos(user.username)
                        .then(([permisos, fieldData]) => {
                            req.session.name = user.nombre;
                            req.session.username = user.username;
                            req.session.permisos = permisos
                            req.session.sesionIniciada = true;
                            console.log(permisos);
                            return res.redirect('/');
                        })
                    } else {
                        req.session.error = "Usuario o contraseña incorrecto(s)";
                        return res.redirect('/user/login');
                    }
                });
            } else {
                req.session.error = "Usuario o contraseña incorrecto(s)";
                return res.redirect('/user/login');
            }
        })
    } catch(error){
        console.log(error);
    }
}

exports.getLogout = async (req, res, next) => {
    try {
        req.session.destroy(() => {
            return res.redirect('/user/login');
        });
    } catch (error){
        console.log(error);
    }
}

exports.getRegistrar = async (req, res, next) => {
    try {
        const error = req.session.error || '';

        req.session.error = null;
        res.render('login', {
            name: req.session.name,
            error: error,
            registrar: true,
            username: req.session.username
        });
    } catch(error){
        console.log("[GET REGISTRAR]", error);
    }
}

exports.postRegistrar = async (req, res, next) => {
    try {
        const auth = getAuth();
        const nuevoUsuario = new Usuario(
            req.body.username, req.body.nombre, req.body.apellido,
            req.body.telefono, req.body.correo, req.body.fecha_nacimiento,
            req.body.contrasena
        );

        const confirmar = req.body.confirmar_contrasena;
        if (confirmar != req.body.contrasena){
            req.session.error = "No has confirmado correctamente tu contraseña.";
            return res.redirect('/user/registrar');
        }

        createUserWithEmailAndPassword(auth, req.body.correo, req.body.contrasena)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                nuevoUsuario.registrarUsuario()
                    .then(([rows, fieldData]) => {
                        res.redirect('/user/login');
                    })
                    .catch((error) => {
                        console.log("[NUEVOUSUARIO POST]", error);
                        req.session.error = "Ha ocurrido un error registrando el usuario.";
                        res.redirect('/user/registrar');
                    })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                // ..
            });

    } catch(error){
        console.log("[POST REGISTRAR]", error);
    }
}