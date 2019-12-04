const router = require('express').Router();
const sales = require('./sales');

router.use('/sales', sales);

module.exports = router;
