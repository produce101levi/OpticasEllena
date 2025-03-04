const express = require('express');
const citaController = require('../controllers/cita.controller');
const isAuth = require('../util/is-auth');
const router = express.Router();

router.get('/agendar-cita', isAuth, citaController.getAgendarCita);
router.get('/agendar-cita/otro-usuario', isAuth, citaController.getAgendarOtro);


module.exports = router;