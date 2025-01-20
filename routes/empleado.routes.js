const express = require('express');
const router = express.Router();

router.get("/cartera", (req, res, next) => {
    res.render("cartera");
})

module.exports = router;