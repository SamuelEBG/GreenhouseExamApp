const express = require('express');
const { TemperatureModel } = require("../models/readingsModels.js");

const router = express.Router();
router.get('/', async function(req, res) {
    const result = await TemperatureModel.find();
    return res.json(result);
});

router.get('/:id', async function(req, res) {
    const result = await TemperatureModel.find({ greenhouseId: req.params.id });
    return res.json(result);
});

module.exports = router;