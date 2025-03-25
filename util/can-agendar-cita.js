module.exports = (req, res, next) => {

    let canAgendarCita = false;
    for(let permiso of req.session.permisos) {
        if (permiso.permiso == 'agendar cita'){
            canAgendarCita = true;
        }
    }
    if (canAgendarCita) next();

    else return res.status(400)
}