const router = require('express').Router();

router.get('/', (req,res) => {

    res.send('List Product');
});

module.exports = router;