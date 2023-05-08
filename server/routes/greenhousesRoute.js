const express = require('express');
const Greenhouses = require('../models/greenhouseModels.js');

const router = express.Router();
router.get('/', async function(req, res) {
    const result = await Greenhouses.find();
    return res.json(result);
});

module.exports = router;