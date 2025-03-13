const express = require('express');
const citaController = require('../controllers/cita.controller');
const isAuth = require('../util/is-auth');
const router = express.Router();

router.get('/agendar-cita', isAuth, citaController.getAgendarCita);
router.get('/agendar-cita/otro-usuario', isAuth, citaController.getAgendarOtro);
router.get('/agendar-cita/propio-usuario', isAuth, citaController.getAgendarPropio);
router.post('/agendar-cita/', isAuth, citaController.postAgendarPropio);


module.exports = router;