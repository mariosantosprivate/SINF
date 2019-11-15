const router = require('express').Router();
const dashboard = require('../api/dashboard');

router.use('/dashboard', dashboard);

module.exports = router;