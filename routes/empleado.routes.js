const express = require('express');
const contratoController = require('../controllers/contrato.controller');
const router = express.Router();

router.get('/cartera', contratoController.get_contratos);
// router.post('/crear-contrato', contratoController.post_crear_contrato);
router.get('/crear-contrato', contratoController.get_tratamientos);

module.exports = router;