const express = require('express');
const router = express.Router();
const { testing } = require('./../controllers/testController');

router.get("/check", testing);

module.exports = router;