const Cita = require('../models/cita.model');
const Usuario = require('../models/usuario.model');

// Middleware para cargar página de "Agendar Cita"
exports.getAgendarCita = async (req, res, next) => {
    try {
        Usuario.getInfoUsuario(req.session.username)
        .then(([users, fieldData]) => {
            // console.log(users);
            const user = users[0];
            console.log(user);
            res.render('agendar_cita', {
                confirmed: false,
                self: true,
                user: user,
                name: req.session.name,  
                error: req.session.error
            });
        });
    } catch {

    }
}