const router = require('express').Router();
const financesController = require('../../controllers/financesController');

router.get('/', financesController.getMetrics);

module.exports = router;
