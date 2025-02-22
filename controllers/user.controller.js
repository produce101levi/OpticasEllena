const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');

exports.getLogin = async (req, res, next) => {
    try {
        const error = req.session.error || '';

        req.session.error = null;
        res.render('login', {
            error: error,
            registrar: false,
        });
    } catch(error){
        console.log(error);
    }
}

exports.postLogin = async (req, res, next) => {
    try {
        const { username, contrasena } = req.body;
        // console.log("Username:", username);
        // console.log("Password:", contrasena);
        Usuario.validarUsuario(username, contrasena)
        .then(([users, fieldData]) => {
            // console.log(users);
            if(users.length == 1){
                const user = users[0];
                console.log(user);
                if (!user.contrasena){
                    request.session.error = "Usuario no tiene contraseña";
                    return res.redirect('/user/login');
                }
                return res.redirect('/');
                // bcrypt.compare(req.body.password, user.contrasena)
                // .then(doMatch => {
                //     if (doMatch){
                //         return req.redirect('/');
                //     }
                // });
            }
        })
    } catch(error){
        console.log(error);
    }
}