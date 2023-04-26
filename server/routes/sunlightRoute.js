const express = require('express');
const SunlightModel = require("../models/readingsModels.js");

const router = express.Router();
router.get('/', async function(req, res) {
    const result = await SunlightModel.find();
    return res.json(result);
});

module.exports = router;