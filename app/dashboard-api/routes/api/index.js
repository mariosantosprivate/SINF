const router = require('express').Router();
const sales = require('./sales');
const finances = require('./finances');
const purchases = require('./purchases');
const metadata = require('./metadata');
const logistics = require('./logistics');

router.use('/sales', sales);
router.use('/finances', finances);
router.use('/purchases', purchases);
router.use('/metadata', metadata);
router.use('/logistics', logistics);

module.exports = router;
