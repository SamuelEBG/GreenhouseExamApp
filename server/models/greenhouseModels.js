const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const greenhouseSchema = mongoose.Schema({
    location: String,
    greenhouseId: String
});

module.exports = mongoose.model("Greenhouses", greenhouseSchema, "greenhouses");