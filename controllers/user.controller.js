const admin = require('../firebase'); 
const { getAuth, createUserWithEmailAndPassword, sendEmailVerification } = require("firebase/auth");
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');

// exports.getLogin = async (req, res, next) => {
//     try {
//         const error = req.session.error || '';
//         const emailSent = req.session.emailSent || '';

//         req.session.error = null;
//         req.session.emailSent = null;

//         res.render('login', {
//             name: req.session.name,
//             error: error,
//             registrar: false,
//             emailSent: emailSent,
//             username: req.session.username,
//             csrfToken: req.csrfToken()
//         });
//     } catch(error){
//         console.log(error);
//     }
// }

// exports.postLogin = async (req, res, next) => {
//     try {
//         Usuario.validarUsuario(req.body.username)
//         .then(([users, fieldData]) => {
//             // console.log(users);
//             if(users.length == 1){
//                 const user = users[0];
//                 // console.log(user);
//                 bcrypt.compare(req.body.contrasena, user.contrasena)
//                 .then(doMatch => {
//                     if (doMatch){
//                         Usuario.getPermisos(user.username)
//                         .then(([permisos, fieldData]) => {
//                             req.session.name = user.nombre;
//                             req.session.username = user.username;
//                             req.session.permisos = permisos
//                             req.session.sesionIniciada = true;
//                             console.log(permisos);
//                             return res.redirect('/');
//                         })
//                     } else {
//                         req.session.error = "Usuario o contraseña incorrecto(s)";
//                         return res.redirect('/user/login');
//                     }
//                 });
//             } else {
//                 req.session.error = "Usuario o contraseña incorrecto(s)";
//                 return res.redirect('/user/login');
//             }
//         })
//     } catch(error){
//         console.log(error);
//     }
// }

// exports.getLogout = async (req, res, next) => {
//     try {
//         req.session.destroy(() => {
//             return res.redirect('/user/login');
//         });
//     } catch (error){
//         console.log(error);
//     }
// }

exports.getRegistrar = async (req, res, next) => {
    try {
        const error = req.session.error || '';
        const emailSent = req.session.emailSent || '';

        console.log(admin);

        req.session.error = null;
        res.render('login', {
            name: req.session.name,
            error: error,
            registrar: true,
            emailSent: emailSent,
            username: req.session.username,
            csrfToken: req.csrfToken()
        });
    } catch(error){
        console.log("[GET REGISTRAR]", error);
    }
}

exports.postRegistrar = async (req, res, next) => {
    try {
        // Get the email and password from the form
        const { email, password } = req.body;

        // Create user
        const user = await admin.auth().createUser({
			email,
			password
		});
        
        res.redirect('/user/login');
    } catch(error){
        console.log("[POST REGISTRAR]", error);
    }
}