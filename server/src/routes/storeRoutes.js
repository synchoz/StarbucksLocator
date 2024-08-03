const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController')

router.get('/getcountries', storeController.getStoresByCountry);

/* router.get('/verifystore', storeController.verifyStore); */

module.exports = router;
