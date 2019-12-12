const router = require('express').Router();
const logisticsController = require('../../controllers/logisticsController');

router.get('/', logisticsController.getMetrics);

module.exports = router;
