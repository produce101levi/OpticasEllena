const express = require('express');
const citaController = require('../controllers/cita.controller');
const isAuth = require('../util/is-auth');
const router = express.Router();

router.get('/agendar_cita', isAuth, citaController.getAgendarCita);


module.exports = router;