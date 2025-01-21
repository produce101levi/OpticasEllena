const express = require('express');
const carteraController = require('../controllers/cartera.controller');
const router = express.Router();

router.get('/cartera', carteraController.get_contratos);
router.get('/crear-contrato', carteraController.crear_contrato);

module.exports = router;