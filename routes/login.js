const { Router } = require('express');
const { check } = require('express-validator');
const validation = require('../middlewares/validation');
const authentication = require('../controllers/authentication');

const router = Router();

router.post('/',[
    check('mail','Is not a valid email').isEmail(),
    check('password','Is not a valid password').not().isEmpty(),
    validation
], 
authentication);

module.exports = router;