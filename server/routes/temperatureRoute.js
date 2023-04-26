const express = require('express');
const mongoose = require("mongoose");
const { TemperatureModel } = require("../models/readingsModels.js");

const router = express.Router();
router.get('/', async function(req, res) {
    const result = await TemperatureModel.find();
    return res.json(result);
});

module.exports = router;