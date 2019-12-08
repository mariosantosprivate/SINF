const router = require('express').Router();
const sales = require('./sales');
const finances = require('./finances');
const metadata = require('./metadata');

router.use('/sales', sales);
router.use('/finances', finances);
router.use('/metadata', metadata);

module.exports = router;
