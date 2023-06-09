const { Router } = require('express');
const { check } = require('express-validator');
const validation = require('../middlewares/validation');
const authentication = require('../controllers/authentication');

const router = Router();

router.post('/',[
    check('mail','Email required').not().isEmpty(),
    check('mail','Is not a valid email').isEmail(),
    check('password','Empty password').not().isEmpty(),
    validation
], 
authentication);

module.exports = router;