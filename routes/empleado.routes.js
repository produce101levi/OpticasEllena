const express = require('express');
const carteraController = require('../controllers/cartera.controller');
const router = express.Router();

router.get('/cartera', carteraController.get_contratos);

module.exports = router;