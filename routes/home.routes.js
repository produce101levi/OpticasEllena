const express = require('express')
const router = express.Router();

router.get("/", (req, res, next) => {
    res.render("home", {
        name: req.session.name,
    })
})

module.exports = router;