const router = require('express').Router();
const sales = require('./sales');
const finances = require('./finances');

router.use('/sales', sales);
router.use('/finances', finances);

module.exports = router;
