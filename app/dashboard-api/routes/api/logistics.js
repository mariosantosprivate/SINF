const router = require('express').Router();
constlogisticsController = require('../../controllers/logisticsController');

router.get('/', logisticsController.getMetrics);

module.exports = router;
