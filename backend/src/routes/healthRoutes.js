const express = require('express');
const { getHealth } = require('../controllers/logController');

const router = express.Router();

router.get('/health', getHealth);

module.exports = router;
