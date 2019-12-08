const router = require('express').Router();
const metadataController = require('../../controllers/metadataController');

router.get('/fiscal-years', metadataController.getFiscalYears);

module.exports = router;
