const express = require('express');
const citaController = require('../controllers/cita.controller');
const isAuth = require('../util/is-auth');
const router = express.Router();

// Agendar Citas
router.get('/agendar-cita', isAuth, citaController.getAgendarCita);
router.get('/agendar-cita/otro-usuario', isAuth, citaController.getAgendarOtro);
router.get('/agendar-cita/propio-usuario', isAuth, citaController.getAgendarPropio);
router.post('/agendar-cita/otro-usuario', isAuth, citaController.postAgendarOtro);
router.post('/agendar-cita/propio-usuario', isAuth, citaController.postAgendarPropio);

// Consultar Citas
router.get('/consultar-cita', isAuth, citaController.getConsultarCitaPropia);

// Cancelar Citas
router.get('/cancelar-cita/:id', isAuth, citaController.getCancelarCitaCliente);


module.exports = router;