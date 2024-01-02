const express = require('express');
const router = express.Router();
const { registerController, loginController } = require('./../controllers/userController');

//user register
router.post('/register', registerController);

//user login
router.post("/login", loginController);

module.exports = router;