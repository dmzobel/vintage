const router = require('express').Router();
module.exports = router;
const { Vintage } = require('../db/models');

router.get('/', async (req, res, next) => {
  // Vintage.findAll().then(allVintages => res.json(allVintages));
  try {
    const allVintages = await Vintage.findAll({
      order: [['quality', 'DESC']]
    });
    res.json(allVintages);
  } catch (err) {
    next(err);
  }
});
