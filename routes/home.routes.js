const express = require('express')
const router = express.Router();

router.get("/", (req, res, next) => {
    res.render("home", {
        name: req.session.name,
        cita: req.session.citaConfirmada,
        username: req.session.username
    })
})

module.exports = router;