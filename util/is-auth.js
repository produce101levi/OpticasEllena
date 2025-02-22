module.exports = (req, res, next) => {
    if(!req.session.sesionIniciada){
        return res.redirect('/user/login');
    }
    next();
}