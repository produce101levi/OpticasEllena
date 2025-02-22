const express = require('express');
const contratoController = require('../controllers/contrato.controller');
const isAuth = require('../util/is-auth');
const router = express.Router();

router.get('/cartera', isAuth, contratoController.get_contratos);
// router.post('/crear-contrato', contratoController.post_crear_contrato);
router.get('/cartera/buscar/', isAuth, contratoController.get_buscar_contrato);
router.get('/cartera/buscar/:valor_busqueda', isAuth, contratoController.get_buscar_contrato);
router.get('/crear-contrato', isAuth, contratoController.get_tratamientos, contratoController.get_armazones);
router.get('/crear-contrato/get-json', isAuth, contratoController.get_json);
router.post('/crear-contrato', isAuth, contratoController.post_contrato);

router.get('/test', (req, res) => {
    console.log('Test route hit!');
    res.status(200).json({ message: 'Test route is working!' });
});

module.exports = router;