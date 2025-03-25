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
                user: user,
                name: req.session.name,  
                error: req.session.error,
                username: req.session.username,
                permisos: req.session.permisos
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
                name: req.session.name,  
                error: req.session.error,
                username: req.session.username,
                permisos: req.session.permisos
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
                user: user,
                name: req.session.name,  
                error: req.session.error,
                username: req.session.username,
                permisos: req.session.permisos
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
            Cita.agendarCita(req.session.username, usuarioActual.nombre, usuarioActual.apellido, usuarioActual.telefono, edad, req.body.fecha_cita)
            .then(() => {
                req.session.citaConfirmada = true;
                res.redirect(`/user/cliente/consultar-cita/`);
            });

        });
    } catch (error){
        console.log(error)
    }
}

exports.postAgendarOtro = async (req, res, next) => {
    try {
        Cita.agendarCita(
            req.session.username, req.body.nombre, req.body.apellido, req.body.telefono,
            req.body.edad, req.body.fecha_cita
        ).then(() => {
            req.session.citaConfirmada = true;
            res.redirect(`/user/cliente/consultar-cita/`);
        });
    } catch(error){
        console.log(error)
    }
}

// Middleware para conseguir información de cita propia de usuario
exports.getConsultarCitaPropia = async (req, res, next) => {
    try {
        Cita.getInfoCitasCliente(req.session.username)
        .then(([citas, fieldData]) => {
            const citasFormato = citas.map(cita => ({
                ...cita,
                fecha: new Intl.DateTimeFormat('es-ES', {dateStyle: "long"}).format(new Date(cita.fecha_hora)),
                hora: new Intl.DateTimeFormat('es-ES', {timeStyle: "short"}).format(new Date(cita.fecha_hora))
            }));
            res.render('consultar_cita_propia', {
                name: req.session.name,
                username: req.session.username,
                citas: citasFormato,
                permisos: req.session.permisos
            })
        });
    } catch(error){
        console.log(error)
    }
}

// Middlewares para que el cliente cancele su propia cita
exports.getCancelarCitaCliente = async (req, res, next) => {
    try {
        const id = req.params.id
        Cita.getUnaCita(id)
        .then(([cita, fieldData]) => {
            const citaFormato = {
                ...cita[0],
                fecha: new Intl.DateTimeFormat('es-ES', {dateStyle: "long"}).format(new Date(cita[0].fecha_hora)),
                hora: new Intl.DateTimeFormat('es-ES', {timeStyle: "short"}).format(new Date(cita[0].fecha_hora))
            };
            res.render('confirmar_cancelar', {
                name: req.session.name,
                username: req.session.username,
                cita: citaFormato,
                permisos: req.session.permisos
            })
        })
    } catch(error){
        console.log(error)
    }
}

exports.postCancelarCitaCliente = async (req, res, next) => {
    try {
        const id = req.params.id;
        Cita.cancelarCitaCliente(id)
        .then(([cita, fieldData]) => {
            res.redirect('/user/cliente/consultar-cita')
        })
    } catch(error) {
        console.log(error)
    }
}