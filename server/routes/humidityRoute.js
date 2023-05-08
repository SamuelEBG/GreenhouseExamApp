const express = require('express');
const { HumidityModel } = require("../models/readingsModels.js");

const router = express.Router();
router.get('/', async function(req, res) {
    const result = await HumidityModel.find();
    return res.json(result);
});

router.get('/:id', async function(req, res) {
    const result = await HumidityModel.find({ greenhouseId: req.params.id });
    return res.json(result);
  });

module.exports = router;