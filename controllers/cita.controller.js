const Cita = require('../models/cita.model');
const Usuario = require('../models/usuario.model');

// Middleware para cargar página de "Agendar Cita"
exports.getAgendarCita = async (req, res, next) => {
    try {
        Usuario.getInfoUsuario(req.session.username)
        .then(([users, fieldData]) => {
            // console.log(users);
            const userFormato = users.map(user => ({
                ...user,
                fecha_nacimiento: new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium' }).format(new Date(user.fecha_nacimiento)),
            }));
            const user = userFormato[0];
            // console.log(user);
            res.render('agendar_cita', {
                confirmed: false,
                propio: true,
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
        return res.status(200).json({
            confirmed: false,
            propio: false,
            user: null,
            name: req.session.name,  
            error: req.session.error
        });
    } catch(error) {
        console.log(error);
    }
}