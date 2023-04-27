const {Router, request, response} = require('express');

const router = Router();

router.post('/', (req=request, res=response) => {
    res.json({
        msg: 'hola',
    })
});

module.exports = router;