const Usuario = require('../models/usuario.model');

exports.getLogin = async (req, res, next) => {
    try {
        res.render('login');
    } catch(error){
        console.log(error);
    }
}

exports.postLogin = async (req, res, next) => {
    try {
        const { username, contrasena } = req.body;
        // console.log("Username:", username);
        // console.log("Password:", contrasena);
        const [rows] = await Usuario.validarUsuario(username, contrasena);
        console.log(rows[0]);
        if (rows[0]){
            res.redirect('/');
        }
    } catch(error){
        console.log(error);
    }
}