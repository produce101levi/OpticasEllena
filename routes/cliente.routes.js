const express = require('express');
const citaController = require('../controllers/cita.controller');

const isAuth = require('../util/is-auth');
const canAgendarCita = require('../util/can-agendar-cita');
const canCancelarCita = require('../util/can-cancelar-cita');
const router = express.Router();

// Agendar Citas
router.get('/agendar-cita', isAuth, canAgendarCita, citaController.getAgendarCita);
router.get('/agendar-cita/otro-usuario', isAuth, canAgendarCita, citaController.getAgendarOtro);
router.get('/agendar-cita/propio-usuario', isAuth, canAgendarCita, citaController.getAgendarPropio);
router.post('/agendar-cita/otro-usuario', isAuth, canAgendarCita, citaController.postAgendarOtro);
router.post('/agendar-cita/propio-usuario', isAuth, canAgendarCita, citaController.postAgendarPropio);

// Consultar Citas
router.get('/consultar-cita', isAuth, citaController.getConsultarCitaPropia);

// Cancelar Citas
router.get('/cancelar-cita/:id', isAuth, canCancelarCita, citaController.getCancelarCitaCliente);
router.post('/cancelar-cita/:id', isAuth, canCancelarCita, citaController.postCancelarCitaCliente)

module.exports = router;