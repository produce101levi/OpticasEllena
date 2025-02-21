const express = require('express');
const contratoController = require('../controllers/contrato.controller');
const router = express.Router();

router.get('/cartera', contratoController.get_contratos);
// router.post('/crear-contrato', contratoController.post_crear_contrato);
router.get('/cartera/buscar/', contratoController.get_buscar_contrato);
router.get('/cartera/buscar/:valor_busqueda', contratoController.get_buscar_contrato);
router.get('/crear-contrato', contratoController.get_tratamientos, contratoController.get_armazones);
router.get('/crear-contrato/get-json', contratoController.get_json);
router.post('/crear-contrato', contratoController.post_contrato);

router.get('/test', (req, res) => {
    console.log('Test route hit!');
    res.status(200).json({ message: 'Test route is working!' });
});

module.exports = router;