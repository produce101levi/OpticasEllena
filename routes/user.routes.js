const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router();


router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);
router.get('/registrar', userController.getRegistrar);
router.post('/registrar', userController.postRegistrar);
router.get('/logout', userController.getLogout);




module.exports = router;