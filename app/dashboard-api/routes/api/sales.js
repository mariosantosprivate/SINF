const router = require('express').Router();
const salesController = require('../../controllers/salesController');

router.get('/', salesController.getMetrics);

module.exports = router;
