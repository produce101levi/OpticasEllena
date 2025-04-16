const admin = require('../firebase'); 
// const { getAuth, createUserWithEmailAndPassword, sendEmailVerification } = require("firebase/auth");
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
        

        req.session.error = null;
        res.render('registrar_cuenta', {
            name: req.session.name,
            error: error,
            emailSent: emailSent,
            username: req.session.username,
            csrfToken: req.csrfToken(),
            apiKey: process.env.API_KEY,
            authDomain: process.env.AUTH_DOMAIN,
            projectId: process.env.PROJECT_ID,
            storageBucket: process.env.STORAGE_BUCKET,
            messagingSenderId: process.env.MESSAGING_SENDER_ID,
            appId: process.env.APP_ID,
            measurementId: process.env.MEASUREMENT_ID
        });


    } catch(error){
        console.log("[GET REGISTRAR]", error);
    }
}

exports.postRegistrar = async (req, res, next) => {
    try {
        // Get the email and password from the form
        const { email, contrasena } = req.body;

        // const nuevoUsuario = new Usuario(
        //     email, contrasena
        // );

        console.log(req.body);

        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!regex.test(contrasena)){
            req.session.error = "La contraseña debe tener una mayúscula, una minúscula, un número y un caracter special."
            return res.redirect('/user/registrar');
        }

        // nuevoUsuario.registrarUsuario()
        //     .then(([rows, fieldData]) => {
                
        //         // Create user
        //         const user = admin.auth().createUser({
        //             email,
        //             contrasena
        //         });
                
        //         res.redirect('/user/login');
        //     })
        //     .catch((error) => {
        //         errorCode = error.code
        //         console.log("[NUEVOUSUARIO POST]", error);
        //         if (errorCode == 'ER_DUP_ENTRY') {
        //             req.session.error = "Este usuario o correo electrónico ya está asociado con una cuenta."
        //         } else {
        //             req.session.error = "Ha ocurrido un error registrando el usuario.";
        //         }
        //         res.redirect('/user/registrar');
        //     })

    } catch(error){
        console.log("[POST REGISTRAR]", error);
    }
}