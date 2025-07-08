const express = require('express');
const logRoutes = require('./logRoutes');
const healthRoutes = require('./healthRoutes');

const router = express.Router();

router.use('/logs', logRoutes);
router.use('/', healthRoutes);

module.exports = router;
