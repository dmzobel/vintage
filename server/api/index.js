const router = require('express').Router();
module.exports = router;

router.use('/vintages', require('./vintages'));
