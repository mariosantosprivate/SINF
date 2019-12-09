const router = require('express').Router();
const purchasesController = require('../../controllers/purchasesController');

router.get('/', purchasesController.getMetrics);

module.exports = router;
