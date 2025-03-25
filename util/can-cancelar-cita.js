module.exports = (req, res, next) => {

    let canCancelarCita = false;
    for(let permiso of req.session.permisos) {
        if (permiso.permiso == 'cancelar cita'){
            canCancelarCita = true;
        }
    }
    if (canCancelarCita) next();

    else return res.render('404');
}