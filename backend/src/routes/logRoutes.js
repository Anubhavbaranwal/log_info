const express = require('express');
const { createLog, getLogs } = require('../controllers/logController');
const { validateLog } = require('../middleware/validation');

const router = express.Router();

router.post('/', validateLog, createLog);

router.get('/', getLogs);

module.exports = router;
