const { Router } = require('express');
const getProducts = require('../controllers/tiendaNube');

const router = Router();

router.post('/', getProducts);

module.exports = router;