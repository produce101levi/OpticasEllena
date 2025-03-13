const Cita = require('../models/cita.model');
const Usuario = require('../models/usuario.model');

// Middleware para cargar página de "Agendar Cita"
exports.getAgendarCita = async (req, res, next) => {
    try {
        const edad = await Usuario.getEdadUsuario(req.session.username);
        Usuario.getInfoUsuario(req.session.username)
        .then(([users, fieldData]) => {
            // console.log(users);
            const userFormato = users.map(user => ({
                ...user,
                fecha_nacimiento: new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium' }).format(new Date(user.fecha_nacimiento)),
            }));
            const user = userFormato[0];
            // console.log(user);
            req.session.propio = true;
            res.render('agendar_cita', {
                confirmed: false,
                edad: edad,
                propio: req.session.propio,
                user: user,
                name: req.session.name,  
                error: req.session.error
            });
        });
    } catch(error) {
        console.log(error);
    }
}

exports.getAgendarOtro = async (req, res, next) => {
    try {
            req.session.propio = false;
            return res.status(200).json({
                confirmed: false,
                propio: req.session.propio,
                name: req.session.name,  
                error: req.session.error
            });
    } catch(error) {
        console.log(error);
    }
}

exports.getAgendarPropio = async (req, res, next) => {
    try {
        const edad = await Usuario.getEdadUsuario(req.session.username);
        Usuario.getInfoUsuario(req.session.username)
        .then(([users, fieldData]) => {
            // console.log(users);
            const userFormato = users.map(user => ({
                ...user,
                fecha_nacimiento: new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium' }).format(new Date(user.fecha_nacimiento)),
            }));
            req.session.propio = true;
            const user = userFormato[0];
            return res.status(200).json({
                edad: edad,
                confirmed: false,
                propio: req.session.propio,
                user: user,
                name: req.session.name,  
                error: req.session.error
            });
        })
    } catch(error) {
        console.log(error);
    }
}

exports.postAgendarPropio = async (req, res, next) => {
    try {
        const edad = await Usuario.getEdadUsuario(req.session.username);
        Usuario.getInfoUsuario(req.session.username)
        .then(([usuarios, fieldData]) => {
            const usuarioFormato = usuarios.map(user => ({
                ...user,
                fecha_nacimiento: new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium' }).format(new Date(user.fecha_nacimiento)),
            }));
            const usuarioActual = usuarioFormato[0];
            if (req.body.fecha_cita === '') req.body.fecha_cita = null;
            Cita.agendarCita(req.session.username, usuarioActual.nombre, usuarioActual.apellido, usuarioActual.telefono, edad, req.body.fecha_cita);

        });
    } catch (error){
        console.log(error)
    }
}

exports.postAgendarOtro = async (req, res, next) => {
    try {
        console.log(req.body);
    } catch(error){
        console.log(error)
    }
}